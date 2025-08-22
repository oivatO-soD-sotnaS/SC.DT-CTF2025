(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/react-bits/dither.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dither
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-e3cb66e2.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/postprocessing/build/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const waveVertexShader = "\nprecision highp float;\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  gl_Position = projectionMatrix * viewPosition;\n}\n";
const waveFragmentShader = "\nprecision highp float;\nuniform vec2 resolution;\nuniform float time;\nuniform float waveSpeed;\nuniform float waveFrequency;\nuniform float waveAmplitude;\nuniform vec3 waveColor;\nuniform vec2 mousePos;\nuniform int enableMouseInteraction;\nuniform float mouseRadius;\n\nvec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }\nvec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\nvec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\n\nfloat cnoise(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);\n  Pi = mod289(Pi);\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));\n  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);\n}\n\nconst int OCTAVES = 4;\nfloat fbm(vec2 p) {\n  float value = 0.0;\n  float amp = 1.0;\n  float freq = waveFrequency;\n  for (int i = 0; i < OCTAVES; i++) {\n    value += amp * abs(cnoise(p));\n    p *= freq;\n    amp *= waveAmplitude;\n  }\n  return value;\n}\n\nfloat pattern(vec2 p) {\n  vec2 p2 = p - time * waveSpeed;\n  return fbm(p + fbm(p2)); \n}\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / resolution.xy;\n  uv -= 0.5;\n  uv.x *= resolution.x / resolution.y;\n  float f = pattern(uv);\n  if (enableMouseInteraction == 1) {\n    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);\n    mouseNDC.x *= resolution.x / resolution.y;\n    float dist = length(uv - mouseNDC);\n    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);\n    f -= 0.5 * effect;\n  }\n  vec3 col = mix(vec3(0.0), waveColor, f);\n  gl_FragColor = vec4(col, 1.0);\n}\n";
const ditherFragmentShader = "\nprecision highp float;\nuniform float colorNum;\nuniform float pixelSize;\nconst float bayerMatrix8x8[64] = float[64](\n  0.0/64.0, 48.0/64.0, 12.0/64.0, 60.0/64.0,  3.0/64.0, 51.0/64.0, 15.0/64.0, 63.0/64.0,\n  32.0/64.0,16.0/64.0, 44.0/64.0, 28.0/64.0, 35.0/64.0,19.0/64.0, 47.0/64.0, 31.0/64.0,\n  8.0/64.0, 56.0/64.0,  4.0/64.0, 52.0/64.0, 11.0/64.0,59.0/64.0,  7.0/64.0, 55.0/64.0,\n  40.0/64.0,24.0/64.0, 36.0/64.0, 20.0/64.0, 43.0/64.0,27.0/64.0, 39.0/64.0, 23.0/64.0,\n  2.0/64.0, 50.0/64.0, 14.0/64.0, 62.0/64.0,  1.0/64.0,49.0/64.0, 13.0/64.0, 61.0/64.0,\n  34.0/64.0,18.0/64.0, 46.0/64.0, 30.0/64.0, 33.0/64.0,17.0/64.0, 45.0/64.0, 29.0/64.0,\n  10.0/64.0,58.0/64.0,  6.0/64.0, 54.0/64.0,  9.0/64.0,57.0/64.0,  5.0/64.0, 53.0/64.0,\n  42.0/64.0,26.0/64.0, 38.0/64.0, 22.0/64.0, 41.0/64.0,25.0/64.0, 37.0/64.0, 21.0/64.0\n);\n\nvec3 dither(vec2 uv, vec3 color) {\n  vec2 scaledCoord = floor(uv * resolution / pixelSize);\n  int x = int(mod(scaledCoord.x, 8.0));\n  int y = int(mod(scaledCoord.y, 8.0));\n  float threshold = bayerMatrix8x8[y * 8 + x] - 0.25;\n  float step = 1.0 / (colorNum - 1.0);\n  color += threshold * step;\n  float bias = 0.2;\n  color = clamp(color - bias, 0.0, 1.0);\n  return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);\n}\n\nvoid mainImage(in vec4 inputColor, in vec2 uv, out vec4 outputColor) {\n  vec2 normalizedPixelSize = pixelSize / resolution;\n  vec2 uvPixel = normalizedPixelSize * floor(uv / normalizedPixelSize);\n  vec4 color = texture2D(inputBuffer, uvPixel);\n  color.rgb = dither(uv, color.rgb);\n  outputColor = color;\n}\n";
class RetroEffectImpl extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$postprocessing$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Effect"] {
    set colorNum(value) {
        this.uniforms.get("colorNum").value = value;
    }
    get colorNum() {
        return this.uniforms.get("colorNum").value;
    }
    set pixelSize(value) {
        this.uniforms.get("pixelSize").value = value;
    }
    get pixelSize() {
        return this.uniforms.get("pixelSize").value;
    }
    constructor(){
        const uniforms = new Map([
            [
                "colorNum",
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](4.0)
            ],
            [
                "pixelSize",
                new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](2.0)
            ]
        ]);
        super("RetroEffect", ditherFragmentShader, {
            uniforms
        }), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "uniforms", void 0);
        this.uniforms = uniforms;
    }
}
const RetroEffect = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])((props, ref)=>{
    const { colorNum, pixelSize } = props;
    const WrappedRetroEffect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapEffect"])(RetroEffectImpl);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WrappedRetroEffect, {
        ref: ref,
        colorNum: colorNum,
        pixelSize: pixelSize
    }, void 0, false, {
        fileName: "[project]/components/react-bits/dither.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c = RetroEffect;
RetroEffect.displayName = "RetroEffect";
function DitheredWaves(param) {
    let { waveSpeed, waveFrequency, waveAmplitude, waveColor, colorNum, pixelSize, disableAnimation, enableMouseInteraction, mouseRadius } = param;
    _s();
    const mesh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mouseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]());
    const { viewport, size, gl } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const waveUniformsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        time: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](0),
        resolution: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0, 0)),
        waveSpeed: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](waveSpeed),
        waveFrequency: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](waveFrequency),
        waveAmplitude: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](waveAmplitude),
        waveColor: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](...waveColor)),
        mousePos: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0, 0)),
        enableMouseInteraction: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](enableMouseInteraction ? 1 : 0),
        mouseRadius: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Uniform"](mouseRadius)
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DitheredWaves.useEffect": ()=>{
            const dpr = gl.getPixelRatio();
            const newWidth = Math.floor(size.width * dpr);
            const newHeight = Math.floor(size.height * dpr);
            const currentRes = waveUniformsRef.current.resolution.value;
            if (currentRes.x !== newWidth || currentRes.y !== newHeight) {
                currentRes.set(newWidth, newHeight);
            }
        }
    }["DitheredWaves.useEffect"], [
        size,
        gl
    ]);
    const prevColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([
        ...waveColor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DitheredWaves.useFrame": (param)=>{
            let { clock } = param;
            const u = waveUniformsRef.current;
            if (!disableAnimation) {
                u.time.value = clock.getElapsedTime();
            }
            if (u.waveSpeed.value !== waveSpeed) u.waveSpeed.value = waveSpeed;
            if (u.waveFrequency.value !== waveFrequency) u.waveFrequency.value = waveFrequency;
            if (u.waveAmplitude.value !== waveAmplitude) u.waveAmplitude.value = waveAmplitude;
            if (!prevColor.current.every({
                "DitheredWaves.useFrame": (v, i)=>v === waveColor[i]
            }["DitheredWaves.useFrame"])) {
                u.waveColor.value.set(...waveColor);
                prevColor.current = [
                    ...waveColor
                ];
            }
            u.enableMouseInteraction.value = enableMouseInteraction ? 1 : 0;
            u.mouseRadius.value = mouseRadius;
            if (enableMouseInteraction) {
                u.mousePos.value.copy(mouseRef.current);
            }
        }
    }["DitheredWaves.useFrame"]);
    const handlePointerMove = (e)=>{
        if (!enableMouseInteraction) return;
        const rect = gl.domElement.getBoundingClientRect();
        const dpr = gl.getPixelRatio();
        mouseRef.current.set((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                ref: mesh,
                scale: [
                    viewport.width,
                    viewport.height,
                    1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            1,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/react-bits/dither.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                        vertexShader: waveVertexShader,
                        fragmentShader: waveFragmentShader,
                        uniforms: waveUniformsRef.current
                    }, void 0, false, {
                        fileName: "[project]/components/react-bits/dither.tsx",
                        lineNumber: 276,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/react-bits/dither.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RetroEffect, {
                    colorNum: colorNum,
                    pixelSize: pixelSize
                }, void 0, false, {
                    fileName: "[project]/components/react-bits/dither.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/react-bits/dither.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                onPointerMove: handlePointerMove,
                position: [
                    0,
                    0,
                    0.01
                ],
                scale: [
                    viewport.width,
                    viewport.height,
                    1
                ],
                visible: false,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            1,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/react-bits/dither.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        transparent: true,
                        opacity: 0
                    }, void 0, false, {
                        fileName: "[project]/components/react-bits/dither.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/react-bits/dither.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(DitheredWaves, "qhu7UlhC7Amf/94EB3zPhubfraM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$e3cb66e2$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = DitheredWaves;
function Dither(param) {
    let { waveSpeed = 0.05, waveFrequency = 3, waveAmplitude = 0.3, waveColor = [
        0.5,
        0.5,
        0.5
    ], colorNum = 4, pixelSize = 2, disableAnimation = false, enableMouseInteraction = true, mouseRadius = 1 } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        className: "w-full h-full relative",
        camera: {
            position: [
                0,
                0,
                6
            ]
        },
        gl: {
            antialias: true,
            preserveDrawingBuffer: true
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DitheredWaves, {
            waveSpeed: waveSpeed,
            waveFrequency: waveFrequency,
            waveAmplitude: waveAmplitude,
            waveColor: waveColor,
            colorNum: colorNum,
            pixelSize: pixelSize,
            disableAnimation: disableAnimation,
            enableMouseInteraction: enableMouseInteraction,
            mouseRadius: mouseRadius
        }, void 0, false, {
            fileName: "[project]/components/react-bits/dither.tsx",
            lineNumber: 329,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/react-bits/dither.tsx",
        lineNumber: 324,
        columnNumber: 5
    }, this);
}
_c2 = Dither;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "RetroEffect");
__turbopack_context__.k.register(_c1, "DitheredWaves");
__turbopack_context__.k.register(_c2, "Dither");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_react-bits_dither_tsx_0be06d3a._.js.map