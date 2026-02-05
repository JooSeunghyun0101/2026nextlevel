"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Person {
    name: string;
    company?: string;
    department: string;
    position: string;
    title: string;
    image?: string;
    video?: string;
}

interface PromotionCarouselProps {
    people: Person[];
    className?: string;
    initialIndex?: number;
    onComplete?: () => void;
    onPrevious?: () => void;
    hideDetails?: boolean;
    variant?: "default" | "group7" | "group78" | "group7side";
}

// WebGL Shader Background (optimized)
const useShaderBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl2");
        if (!gl) return;

        const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

        const resize = () => {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };

        resize();
        window.addEventListener("resize", resize);

        const vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

        const fragmentSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) { t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col*.7,1);
}`;

        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, vertexSrc);
        gl.compileShader(vs);

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, fragmentSrc);
        gl.compileShader(fs);

        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);

        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        const resolutionLoc = gl.getUniformLocation(program, "resolution");
        const timeLoc = gl.getUniformLocation(program, "time");

        const render = (now: number) => {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
            gl.uniform1f(timeLoc, now * 1e-3);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationFrameRef.current = requestAnimationFrame(render);
        };

        render(0);

        return () => {
            window.removeEventListener("resize", resize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return canvasRef;
};

// Optimized carousel card component
const CarouselCard = React.memo(({
    person,
    isCenter,
    isAdjacent,
    pos
}: {
    person: Person;
    isCenter: boolean;
    isAdjacent: boolean;
    pos: number;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isCenter) {
                videoRef.current.currentTime = 0;
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isCenter]);

    // Only render visible cards
    if (Math.abs(pos) > 1) return null;

    return (
        <div
            className="absolute w-72 h-[420px] md:w-96 md:h-[560px] lg:w-[480px] lg:h-[680px]"
            style={{
                transform: `translateX(${pos * 60}%) scale(${isCenter ? 1 : 0.8}) rotateY(${pos * -15}deg)`,
                zIndex: isCenter ? 10 : 5,
                opacity: isCenter ? 1 : 0.5,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out',
                willChange: 'transform, opacity',
            }}
        >
            <div className="w-full h-full overflow-hidden rounded-2xl border-2 border-orange-300/30 shadow-2xl bg-black">
                {person.video ? (
                    <video
                        ref={videoRef}
                        src={person.video}
                        muted
                        playsInline
                        preload={isCenter || isAdjacent ? "auto" : "none"}
                        className="h-full w-full object-cover"
                        style={{
                            transform: "scale(1.05)",
                            transformOrigin: "center center",
                        }}
                    />
                ) : (
                    <img
                        src={person.image}
                        alt={person.name}
                        className="h-full w-full object-cover"
                        style={{
                            transform: "scale(1.05)",
                            transformOrigin: "center center"
                        }}
                        loading={isCenter || isAdjacent ? "eager" : "lazy"}
                    />
                )}
            </div>
        </div>
    );
});

CarouselCard.displayName = 'CarouselCard';

export default function PromotionCarousel({ people, className, initialIndex = 0, onComplete, onPrevious, hideDetails = false, variant = "default" }: PromotionCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const canvasRef = useShaderBackground();
    const isTransitioning = useRef(false);

    const handleNext = useCallback(() => {
        if (isTransitioning.current) return;

        if (currentIndex === people.length - 1) {
            if (onComplete) {
                onComplete();
            }
        } else {
            isTransitioning.current = true;
            setCurrentIndex((prev) => prev + 1);
            setTimeout(() => { isTransitioning.current = false; }, 300);
        }
    }, [currentIndex, people.length, onComplete]);

    const handlePrev = useCallback(() => {
        if (isTransitioning.current) return;

        if (currentIndex === 0) {
            if (onPrevious) {
                onPrevious();
            }
        } else {
            isTransitioning.current = true;
            setCurrentIndex((prev) => prev - 1);
            setTimeout(() => { isTransitioning.current = false; }, 300);
        }
    }, [currentIndex, onPrevious]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                handleNext();
            } else if (e.key === "ArrowLeft") {
                handlePrev();
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            handlePrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("contextmenu", handleContextMenu);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [handleNext, handlePrev]);

    const currentPerson = people[currentIndex];

    // Memoize visible cards calculation
    const visibleCards = useMemo(() => {
        const total = people.length;
        return people.map((person, index) => {
            const offset = index - currentIndex;
            let pos = (offset + total) % total;
            if (pos > Math.floor(total / 2)) pos = pos - total;

            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;

            return { person, pos, isCenter, isAdjacent, index };
        }).filter(card => Math.abs(card.pos) <= 1);
    }, [people, currentIndex]);

    return (
        <div
            className={cn("relative w-full h-screen overflow-hidden bg-black cursor-pointer", className)}
            onClick={handleNext}
        >
            {/* Shader Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-contain touch-none"
                style={{ background: "black" }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex">
                {/* Left - Carousel (55%) */}
                <div className="w-[55%] h-full flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
                        {visibleCards.map(({ person, pos, isCenter, isAdjacent, index }) => (
                            <CarouselCard
                                key={index}
                                person={person}
                                isCenter={isCenter}
                                isAdjacent={isAdjacent}
                                pos={pos}
                            />
                        ))}
                    </div>
                </div>

                {/* Right - Person Info (45%) */}
                {/* Right - Person Info (45%) */}
                <div className="w-[45%] h-full flex items-center pl-12 pr-16 relative z-50">
                    <div className="text-white w-full text-left" key={currentIndex}>
                        <div className={cn("space-y-4", hideDetails ? "space-y-8" : "")}>
                            {variant === "group7" ? (
                                <>
                                    {/* Group 7 Layout: Position -> Name -> Department -> Company */}

                                    {/* 직급 (이름 위에 추가) */}
                                    <p
                                        className={cn(
                                            "text-3xl md:text-4xl lg:text-4xl font-bold pl-3 mb-4 whitespace-pre-line leading-relaxed",
                                            "bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent"
                                        )}
                                        style={{ animation: 'fadeIn 0.3s ease-out' }}
                                    >
                                        {currentPerson.position}
                                    </p>

                                    {/* 이름 */}
                                    <h2
                                        className="text-8xl md:text-9xl lg:text-[10rem] font-bold bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent leading-none pb-2 mb-8"
                                        style={{ animation: 'fadeIn 0.3s ease-out 0.05s' }}
                                    >
                                        {currentPerson.name}
                                    </h2>

                                    {/* 부서 */}
                                    <p
                                        className={cn(
                                            "text-4xl md:text-5xl lg:text-5xl font-bold pl-3 mb-8 whitespace-pre-line leading-relaxed",
                                            "bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent"
                                        )}
                                        style={{ animation: 'fadeIn 0.3s ease-out 0.05s both' }}
                                    >
                                        {currentPerson.department}
                                    </p>

                                    {/* 회사 */}
                                    {currentPerson.company && (
                                        <p
                                            className={cn(
                                                "text-orange-100/60 font-medium pl-3",
                                                "text-3xl md:text-4xl lg:text-4xl whitespace-pre-line leading-relaxed"
                                            )}
                                            style={{ animation: 'fadeIn 0.3s ease-out 0.1s both' }}
                                        >
                                            {currentPerson.company}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Default Layout: Company -> Department -> Name */}
                                    {/* group78일 때 position을 회사 위에 추가 */}
                                    {variant === "group78" && (
                                        <p
                                            className="text-4xl md:text-5xl lg:text-5xl font-bold pl-2 mb-6 bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent"
                                            style={{ animation: 'fadeIn 0.3s ease-out' }}
                                        >
                                            {currentPerson.position}
                                        </p>
                                    )}
                                    {/* 회사 (있는 경우만 표시) */}
                                    {currentPerson.company && (
                                        <p
                                            className={cn(
                                                "text-orange-100/60 font-medium pl-3",
                                                hideDetails ? "text-4xl md:text-5xl lg:text-5xl mb-2" : "text-2xl md:text-3xl"
                                            )}
                                            style={{ animation: 'fadeIn 0.3s ease-out 0.02s both' }}
                                        >
                                            {currentPerson.company}
                                        </p>
                                    )}
                                    {/* 부서 */}
                                    <p
                                        className={cn(
                                            "text-orange-300/80 font-medium pl-2",
                                            hideDetails ? "text-5xl md:text-6xl lg:text-7xl mb-4 whitespace-pre-line" : "text-3xl md:text-4xl whitespace-pre-line"
                                        )}
                                        style={{ animation: 'fadeIn 0.3s ease-out 0.05s both' }}
                                    >
                                        {currentPerson.department}
                                    </p>
                                    {/* 이름 + group7side일 때 position 왼쪽 추가 */}
                                    <div
                                        className="flex items-baseline gap-3"
                                        style={{ animation: 'fadeIn 0.3s ease-out 0.1s both' }}
                                    >
                                        {variant === "group7side" && (
                                            <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                                                {currentPerson.position}
                                            </span>
                                        )}
                                        <h2 className="text-8xl md:text-9xl lg:text-[10rem] font-bold bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent leading-none pb-2">
                                            {currentPerson.name}
                                        </h2>
                                    </div>
                                </>
                            )}
                        </div>
                        {!hideDetails && variant !== "group7" && (
                            <div
                                className="space-y-4 text-3xl md:text-4xl text-orange-100/90 mt-8"
                                style={{ animation: 'fadeIn 0.3s ease-out 0.1s both' }}
                            >
                                <p><span className="text-orange-300/60">직급:</span> {currentPerson.position}</p>
                                <p><span className="text-orange-300/60">직책:</span> {currentPerson.title}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div >
    );
}
