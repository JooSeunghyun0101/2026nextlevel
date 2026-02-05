"use client";

import { useEffect, useRef } from "react";

interface Person {
    name: string;
    company: string;
    department: string;
    position: string;
    title: string;
    image?: string;
    video?: string;
}

interface GroupSummaryProps {
    groupNumber: number;
    groupTitle: string;
    people: Person[];
    isEnd?: boolean;
    onNext: () => void;
    onPrevious: () => void;
    columns?: 1 | 2;
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
    uv=mix(uv,uv+sin(T),.01);
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

export default function GroupSummary({ groupTitle, people, isEnd, onNext, onPrevious, columns = 2 }: GroupSummaryProps) {
    const canvasRef = useShaderBackground();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                onNext();
            } else if (e.key === "ArrowLeft") {
                onPrevious();
            }
        };

        const handleClick = () => {
            onNext();
        };

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            onPrevious();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("click", handleClick);
        window.addEventListener("contextmenu", handleContextMenu);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, [onNext, onPrevious]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black cursor-pointer">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full object-contain touch-none"
                style={{ background: "black" }}
            />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-32 p-8">
                {/* Title - 상단에 배치 */}
                <div className="text-center mb-32 animate-fadeIn">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                        {groupTitle}
                    </h1>
                </div>

                {/* Names List - 컬럼 수에 따라 배치 변경 */}
                <div
                    className={`grid ${columns === 1 ? 'grid-cols-1 w-fit mx-auto gap-y-8' : 'grid-cols-2 grid-flow-col gap-x-20 gap-y-10 ml-40 w-full'} max-w-[90%] px-8 animate-fadeInUp`}
                    style={columns === 2 ? { gridTemplateRows: `repeat(${Math.ceil(people.length / 2)}, min-content)` } : {}}
                >
                    {people.map((person, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-4 text-left ${columns === 1 ? '' : ''}`}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <span className="text-orange-100/70 text-xl md:text-2xl lg:text-3xl">
                                {person.company}
                            </span>
                            <span className="text-orange-300/50 text-xl md:text-2xl lg:text-3xl">|</span>
                            <span className="text-orange-100/70 text-xl md:text-2xl lg:text-3xl">
                                {person.department}
                            </span>
                            <span className="text-orange-300/50 text-xl md:text-2xl lg:text-3xl">|</span>
                            <span className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                                {person.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-orange-300/50 text-sm">
                    {isEnd ? "다음 조로 이동하려면 클릭하세요" : "클릭하여 개별 소개 시작"}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out forwards;
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out 0.3s forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}
