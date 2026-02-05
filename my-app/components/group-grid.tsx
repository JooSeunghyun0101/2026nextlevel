"use client";

import { useEffect, useRef, useState } from "react";

interface Person {
    name: string;
    department: string;
    position: string;
    title: string;
    image?: string;
    croppedImage?: string;
    video?: string;
}

interface GroupGridProps {
    groupNumber: number;
    groupTitle: string;
    people: Person[];
    onNext: () => void;
    onPrevious: () => void;
    rows?: 1 | 2;
}

// WebGL Shader Background
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

export default function GroupGrid({ groupNumber, groupTitle, people, onNext, onPrevious, rows = 2 }: GroupGridProps) {
    const canvasRef = useShaderBackground();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") onNext();
            else if (e.key === "ArrowLeft") onPrevious();
        };
        const handleClick = () => onNext();
        const handleContextMenu = (e: MouseEvent) => { e.preventDefault(); onPrevious(); };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [onNext, onPrevious]);

    // 2줄로 분배 (rows === 2일 때만 사용)
    const halfLength = rows === 2 ? Math.ceil(people.length / 2) : people.length;
    const firstRow = people.slice(0, halfLength);
    const secondRow = rows === 2 ? people.slice(halfLength) : [];

    // 사진 크기
    const getPhotoSize = () => {
        const count = rows === 1 ? people.length : Math.max(firstRow.length, secondRow.length);
        if (rows === 1) {
            if (count <= 4) return { width: 220, height: 293 };
            return { width: 180, height: 240 };
        }
        // 2줄일 때
        if (count <= 4) return { width: 200, height: 266 };
        if (count <= 5) return { width: 180, height: 240 };
        if (count <= 6) return { width: 150, height: 200 };
        // 7명 이상 (총 14명 이상)일 때
        return { width: 180, height: 240 };
    };

    const photoSize = getPhotoSize();

    // 갭 조정 (사람이 많으면 좁게)
    const getGapClass = () => {
        const count = rows === 1 ? people.length : Math.max(firstRow.length, secondRow.length);
        if (rows === 2 && count >= 7) return "gap-2"; // 촘촘하게
        return "gap-6";
    };

    const gapClass = getGapClass();

    const renderPhotoCard = (person: Person, index: number, delay: number) => (
        <div
            key={index}
            className={`relative overflow-hidden transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            style={{
                width: `${photoSize.width}px`,
                height: `${photoSize.height}px`,
                transitionDelay: `${delay}s`,
                border: '2px solid #C9A227',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }}
        >
            <img
                src={person.croppedImage || person.image}
                alt={person.name}
                className="w-full h-full object-cover object-top"
                loading="eager"
            />
            {/* 이름 오버레이 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <p className="text-white text-sm md:text-base lg:text-lg font-medium text-center truncate">
                    {person.name}
                </p>
            </div>
        </div>
    );

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black cursor-pointer">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-contain touch-none"
                style={{ background: "black" }}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
                {/* 타이틀 */}
                <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 bg-clip-text text-transparent">
                        {groupTitle}
                    </h1>
                </div>

                {/* 사진 그리드 */}
                <div className="flex flex-col items-center gap-8">
                    {rows === 1 ? (
                        /* 1줄 배치 */
                        <div className={`flex justify-center ${gapClass} flex-wrap`}>
                            {people.map((person, index) => renderPhotoCard(person, index, index * 0.05))}
                        </div>
                    ) : (
                        /* 2줄 배치 */
                        <>
                            <div className={`flex justify-center ${gapClass} flex-wrap`}>
                                {firstRow.map((person, index) => renderPhotoCard(person, index, index * 0.05))}
                            </div>
                            <div className={`flex justify-center ${gapClass} flex-wrap`}>
                                {secondRow.map((person, index) => renderPhotoCard(person, index + halfLength, (index + halfLength) * 0.05))}
                            </div>
                        </>
                    )}
                </div>

                {/* 하단 정보 */}
                <div className={`mt-8 text-orange-300/60 text-base transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    총 {people.length}명
                </div>
            </div>
        </div>
    );
}
