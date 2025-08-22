(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/(private)/YOU%27ILL%20NEVER%20GUESS/_components/Orb.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Orb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Renderer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Program.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/core/Mesh.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/extras/Triangle.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ogl/src/math/Vec3.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Orb(param) {
    let { hue = 0, hoverIntensity = 0.2, rotateOnHover = true, forceHoverState = false } = param;
    _s();
    const ctnDom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const vert = "\n    precision highp float;\n    attribute vec2 position;\n    attribute vec2 uv;\n    varying vec2 vUv;\n    void main() {\n      vUv = uv;\n      gl_Position = vec4(position, 0.0, 1.0);\n    }\n  ";
    const frag = "\n    precision highp float;\n\n    uniform float iTime;\n    uniform vec3 iResolution;\n    uniform float hue;\n    uniform float hover;\n    uniform float rot;\n    uniform float hoverIntensity;\n    varying vec2 vUv;\n\n    vec3 rgb2yiq(vec3 c) {\n      float y = dot(c, vec3(0.299, 0.587, 0.114));\n      float i = dot(c, vec3(0.596, -0.274, -0.322));\n      float q = dot(c, vec3(0.211, -0.523, 0.312));\n      return vec3(y, i, q);\n    }\n    \n    vec3 yiq2rgb(vec3 c) {\n      float r = c.x + 0.956 * c.y + 0.621 * c.z;\n      float g = c.x - 0.272 * c.y - 0.647 * c.z;\n      float b = c.x - 1.106 * c.y + 1.703 * c.z;\n      return vec3(r, g, b);\n    }\n    \n    vec3 adjustHue(vec3 color, float hueDeg) {\n      float hueRad = hueDeg * 3.14159265 / 180.0;\n      vec3 yiq = rgb2yiq(color);\n      float cosA = cos(hueRad);\n      float sinA = sin(hueRad);\n      float i = yiq.y * cosA - yiq.z * sinA;\n      float q = yiq.y * sinA + yiq.z * cosA;\n      yiq.y = i;\n      yiq.z = q;\n      return yiq2rgb(yiq);\n    }\n    \n    vec3 hash33(vec3 p3) {\n      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));\n      p3 += dot(p3, p3.yxz + 19.19);\n      return -1.0 + 2.0 * fract(vec3(\n        p3.x + p3.y,\n        p3.x + p3.z,\n        p3.y + p3.z\n      ) * p3.zyx);\n    }\n    \n    float snoise3(vec3 p) {\n      const float K1 = 0.333333333;\n      const float K2 = 0.166666667;\n      vec3 i = floor(p + (p.x + p.y + p.z) * K1);\n      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);\n      vec3 e = step(vec3(0.0), d0 - d0.yzx);\n      vec3 i1 = e * (1.0 - e.zxy);\n      vec3 i2 = 1.0 - e.zxy * (1.0 - e);\n      vec3 d1 = d0 - (i1 - K2);\n      vec3 d2 = d0 - (i2 - K1);\n      vec3 d3 = d0 - 0.5;\n      vec4 h = max(0.6 - vec4(\n        dot(d0, d0),\n        dot(d1, d1),\n        dot(d2, d2),\n        dot(d3, d3)\n      ), 0.0);\n      vec4 n = h * h * h * h * vec4(\n        dot(d0, hash33(i)),\n        dot(d1, hash33(i + i1)),\n        dot(d2, hash33(i + i2)),\n        dot(d3, hash33(i + 1.0))\n      );\n      return dot(vec4(31.316), n);\n    }\n    \n    vec4 extractAlpha(vec3 colorIn) {\n      float a = max(max(colorIn.r, colorIn.g), colorIn.b);\n      return vec4(colorIn.rgb / (a + 1e-5), a);\n    }\n    \n    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);\n    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);\n    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);\n    const float innerRadius = 0.6;\n    const float noiseScale = 0.65;\n    \n    float light1(float intensity, float attenuation, float dist) {\n      return intensity / (1.0 + dist * attenuation);\n    }\n    \n    float light2(float intensity, float attenuation, float dist) {\n      return intensity / (1.0 + dist * dist * attenuation);\n    }\n    \n    vec4 draw(vec2 uv) {\n      vec3 color1 = adjustHue(baseColor1, hue);\n      vec3 color2 = adjustHue(baseColor2, hue);\n      vec3 color3 = adjustHue(baseColor3, hue);\n      \n      float ang = atan(uv.y, uv.x);\n      float len = length(uv);\n      float invLen = len > 0.0 ? 1.0 / len : 0.0;\n      \n      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;\n      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);\n      float d0 = distance(uv, (r0 * invLen) * uv);\n      float v0 = light1(1.0, 10.0, d0);\n      v0 *= smoothstep(r0 * 1.05, r0, len);\n      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;\n      \n      float a = iTime * -1.0;\n      vec2 pos = vec2(cos(a), sin(a)) * r0;\n      float d = distance(uv, pos);\n      float v1 = light2(1.5, 5.0, d);\n      v1 *= light1(1.0, 50.0, d0);\n      \n      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);\n      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);\n      \n      vec3 col = mix(color1, color2, cl);\n      col = mix(color3, col, v0);\n      col = (col + v1) * v2 * v3;\n      col = clamp(col, 0.0, 1.0);\n      \n      return extractAlpha(col);\n    }\n    \n    vec4 mainImage(vec2 fragCoord) {\n      vec2 center = iResolution.xy * 0.5;\n      float size = min(iResolution.x, iResolution.y);\n      vec2 uv = (fragCoord - center) / size * 2.0;\n      \n      float angle = rot;\n      float s = sin(angle);\n      float c = cos(angle);\n      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);\n      \n      uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);\n      uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);\n      \n      return draw(uv);\n    }\n    \n    void main() {\n      vec2 fragCoord = vUv * iResolution.xy;\n      vec4 col = mainImage(fragCoord);\n      gl_FragColor = vec4(col.rgb * col.a, col.a);\n    }\n  ";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Orb.useEffect": ()=>{
            const container = ctnDom.current;
            if (!container) return;
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Renderer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Renderer"]({
                alpha: true,
                premultipliedAlpha: false
            });
            const gl = renderer.gl;
            gl.clearColor(0, 0, 0, 0);
            container.appendChild(gl.canvas);
            const geometry = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$extras$2f$Triangle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Triangle"](gl);
            const program = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Program$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Program"](gl, {
                vertex: vert,
                fragment: frag,
                uniforms: {
                    iTime: {
                        value: 0
                    },
                    iResolution: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$math$2f$Vec3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vec3"](gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
                    },
                    hue: {
                        value: hue
                    },
                    hover: {
                        value: 0
                    },
                    rot: {
                        value: 0
                    },
                    hoverIntensity: {
                        value: hoverIntensity
                    }
                }
            });
            const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ogl$2f$src$2f$core$2f$Mesh$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](gl, {
                geometry,
                program
            });
            function resize() {
                if (!container) return;
                const dpr = window.devicePixelRatio || 1;
                const width = container.clientWidth;
                const height = container.clientHeight;
                renderer.setSize(width * dpr, height * dpr);
                gl.canvas.style.width = width + "px";
                gl.canvas.style.height = height + "px";
                program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height);
            }
            window.addEventListener("resize", resize);
            resize();
            let targetHover = 0;
            let lastTime = 0;
            let currentRot = 0;
            const rotationSpeed = 0.3;
            const handleMouseMove = {
                "Orb.useEffect.handleMouseMove": (e)=>{
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const width = rect.width;
                    const height = rect.height;
                    const size = Math.min(width, height);
                    const centerX = width / 2;
                    const centerY = height / 2;
                    const uvX = (x - centerX) / size * 2.0;
                    const uvY = (y - centerY) / size * 2.0;
                    if (Math.sqrt(uvX * uvX + uvY * uvY) < 0.8) {
                        targetHover = 1;
                    } else {
                        targetHover = 0;
                    }
                }
            }["Orb.useEffect.handleMouseMove"];
            const handleMouseLeave = {
                "Orb.useEffect.handleMouseLeave": ()=>{
                    targetHover = 0;
                }
            }["Orb.useEffect.handleMouseLeave"];
            container.addEventListener("mousemove", handleMouseMove);
            container.addEventListener("mouseleave", handleMouseLeave);
            let rafId;
            const update = {
                "Orb.useEffect.update": (t)=>{
                    rafId = requestAnimationFrame(update);
                    const dt = (t - lastTime) * 0.001;
                    lastTime = t;
                    program.uniforms.iTime.value = t * 0.001;
                    program.uniforms.hue.value = hue;
                    program.uniforms.hoverIntensity.value = hoverIntensity;
                    const effectiveHover = forceHoverState ? 1 : targetHover;
                    program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;
                    if (rotateOnHover && effectiveHover > 0.5) {
                        currentRot += dt * rotationSpeed;
                    }
                    program.uniforms.rot.value = currentRot;
                    renderer.render({
                        scene: mesh
                    });
                }
            }["Orb.useEffect.update"];
            rafId = requestAnimationFrame(update);
            return ({
                "Orb.useEffect": ()=>{
                    var _gl_getExtension;
                    cancelAnimationFrame(rafId);
                    window.removeEventListener("resize", resize);
                    container.removeEventListener("mousemove", handleMouseMove);
                    container.removeEventListener("mouseleave", handleMouseLeave);
                    container.removeChild(gl.canvas);
                    (_gl_getExtension = gl.getExtension("WEBGL_lose_context")) === null || _gl_getExtension === void 0 ? void 0 : _gl_getExtension.loseContext();
                }
            })["Orb.useEffect"];
        }
    }["Orb.useEffect"], [
        hue,
        hoverIntensity,
        rotateOnHover,
        forceHoverState
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ctnDom,
        className: "w-full h-full"
    }, void 0, false, {
        fileName: "[project]/app/(private)/YOU%27ILL%20NEVER%20GUESS/_components/Orb.tsx",
        lineNumber: 290,
        columnNumber: 10
    }, this);
}
_s(Orb, "RK9NRNXyqwE64a4o6Ka2phRjmok=");
_c = Orb;
var _c;
__turbopack_context__.k.register(_c, "Orb");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(private)/YOU%27ILL%20NEVER%20GUESS/_components/FuzzyText.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const FuzzyText = (param)=>{
    let { children, fontSize = "3rem", fontWeight = 900, fontFamily = "inherit", color = "#fff", enableHover = true, baseIntensity = 0.18, hoverIntensity = 0.5 } = param;
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FuzzyText.useEffect": ()=>{
            let animationFrameId;
            let isCancelled = false;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const init = {
                "FuzzyText.useEffect.init": async ()=>{
                    var _document_fonts;
                    if ((_document_fonts = document.fonts) === null || _document_fonts === void 0 ? void 0 : _document_fonts.ready) {
                        await document.fonts.ready;
                    }
                    if (isCancelled) return;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return;
                    const computedFontFamily = fontFamily === "inherit" ? window.getComputedStyle(canvas).fontFamily || "sans-serif" : fontFamily;
                    const fontSizeStr = typeof fontSize === "number" ? "".concat(fontSize, "px") : fontSize;
                    let numericFontSize;
                    if (typeof fontSize === "number") {
                        numericFontSize = fontSize;
                    } else {
                        const temp = document.createElement("span");
                        temp.style.fontSize = fontSize;
                        document.body.appendChild(temp);
                        const computedSize = window.getComputedStyle(temp).fontSize;
                        numericFontSize = parseFloat(computedSize);
                        document.body.removeChild(temp);
                    }
                    const text = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Children.toArray(children).join("");
                    const offscreen = document.createElement("canvas");
                    const offCtx = offscreen.getContext("2d");
                    if (!offCtx) return;
                    offCtx.font = "".concat(fontWeight, " ").concat(fontSizeStr, " ").concat(computedFontFamily);
                    offCtx.textBaseline = "alphabetic";
                    const metrics = offCtx.measureText(text);
                    var _metrics_actualBoundingBoxLeft;
                    const actualLeft = (_metrics_actualBoundingBoxLeft = metrics.actualBoundingBoxLeft) !== null && _metrics_actualBoundingBoxLeft !== void 0 ? _metrics_actualBoundingBoxLeft : 0;
                    var _metrics_actualBoundingBoxRight;
                    const actualRight = (_metrics_actualBoundingBoxRight = metrics.actualBoundingBoxRight) !== null && _metrics_actualBoundingBoxRight !== void 0 ? _metrics_actualBoundingBoxRight : metrics.width;
                    var _metrics_actualBoundingBoxAscent;
                    const actualAscent = (_metrics_actualBoundingBoxAscent = metrics.actualBoundingBoxAscent) !== null && _metrics_actualBoundingBoxAscent !== void 0 ? _metrics_actualBoundingBoxAscent : numericFontSize;
                    var _metrics_actualBoundingBoxDescent;
                    const actualDescent = (_metrics_actualBoundingBoxDescent = metrics.actualBoundingBoxDescent) !== null && _metrics_actualBoundingBoxDescent !== void 0 ? _metrics_actualBoundingBoxDescent : numericFontSize * 0.2;
                    const textBoundingWidth = Math.ceil(actualLeft + actualRight);
                    const tightHeight = Math.ceil(actualAscent + actualDescent);
                    const extraWidthBuffer = 10;
                    const offscreenWidth = textBoundingWidth + extraWidthBuffer;
                    offscreen.width = offscreenWidth;
                    offscreen.height = tightHeight;
                    const xOffset = extraWidthBuffer / 2;
                    offCtx.font = "".concat(fontWeight, " ").concat(fontSizeStr, " ").concat(computedFontFamily);
                    offCtx.textBaseline = "alphabetic";
                    offCtx.fillStyle = color;
                    offCtx.fillText(text, xOffset - actualLeft, actualAscent);
                    const horizontalMargin = 50;
                    const verticalMargin = 0;
                    canvas.width = offscreenWidth + horizontalMargin * 2;
                    canvas.height = tightHeight + verticalMargin * 2;
                    ctx.translate(horizontalMargin, verticalMargin);
                    const interactiveLeft = horizontalMargin + xOffset;
                    const interactiveTop = verticalMargin;
                    const interactiveRight = interactiveLeft + textBoundingWidth;
                    const interactiveBottom = interactiveTop + tightHeight;
                    let isHovering = false;
                    const fuzzRange = 30;
                    const run = {
                        "FuzzyText.useEffect.init.run": ()=>{
                            if (isCancelled) return;
                            ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
                            const intensity = isHovering ? hoverIntensity : baseIntensity;
                            for(let j = 0; j < tightHeight; j++){
                                const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
                                ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
                            }
                            animationFrameId = window.requestAnimationFrame(run);
                        }
                    }["FuzzyText.useEffect.init.run"];
                    run();
                    const isInsideTextArea = {
                        "FuzzyText.useEffect.init.isInsideTextArea": (x, y)=>x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom
                    }["FuzzyText.useEffect.init.isInsideTextArea"];
                    const handleMouseMove = {
                        "FuzzyText.useEffect.init.handleMouseMove": (e)=>{
                            if (!enableHover) return;
                            const rect = canvas.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            isHovering = isInsideTextArea(x, y);
                        }
                    }["FuzzyText.useEffect.init.handleMouseMove"];
                    const handleMouseLeave = {
                        "FuzzyText.useEffect.init.handleMouseLeave": ()=>{
                            isHovering = false;
                        }
                    }["FuzzyText.useEffect.init.handleMouseLeave"];
                    const handleTouchMove = {
                        "FuzzyText.useEffect.init.handleTouchMove": (e)=>{
                            if (!enableHover) return;
                            e.preventDefault();
                            const rect = canvas.getBoundingClientRect();
                            const touch = e.touches[0];
                            const x = touch.clientX - rect.left;
                            const y = touch.clientY - rect.top;
                            isHovering = isInsideTextArea(x, y);
                        }
                    }["FuzzyText.useEffect.init.handleTouchMove"];
                    const handleTouchEnd = {
                        "FuzzyText.useEffect.init.handleTouchEnd": ()=>{
                            isHovering = false;
                        }
                    }["FuzzyText.useEffect.init.handleTouchEnd"];
                    if (enableHover) {
                        canvas.addEventListener("mousemove", handleMouseMove);
                        canvas.addEventListener("mouseleave", handleMouseLeave);
                        canvas.addEventListener("touchmove", handleTouchMove, {
                            passive: false
                        });
                        canvas.addEventListener("touchend", handleTouchEnd);
                    }
                    const cleanup = {
                        "FuzzyText.useEffect.init.cleanup": ()=>{
                            window.cancelAnimationFrame(animationFrameId);
                            if (enableHover) {
                                canvas.removeEventListener("mousemove", handleMouseMove);
                                canvas.removeEventListener("mouseleave", handleMouseLeave);
                                canvas.removeEventListener("touchmove", handleTouchMove);
                                canvas.removeEventListener("touchend", handleTouchEnd);
                            }
                        }
                    }["FuzzyText.useEffect.init.cleanup"];
                    canvas.cleanupFuzzyText = cleanup;
                }
            }["FuzzyText.useEffect.init"];
            init();
            return ({
                "FuzzyText.useEffect": ()=>{
                    isCancelled = true;
                    window.cancelAnimationFrame(animationFrameId);
                    if (canvas && canvas.cleanupFuzzyText) {
                        canvas.cleanupFuzzyText();
                    }
                }
            })["FuzzyText.useEffect"];
        }
    }["FuzzyText.useEffect"], [
        children,
        fontSize,
        fontWeight,
        fontFamily,
        color,
        enableHover,
        baseIntensity,
        hoverIntensity
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef
    }, void 0, false, {
        fileName: "[project]/app/(private)/YOU%27ILL%20NEVER%20GUESS/_components/FuzzyText.tsx",
        lineNumber: 209,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(FuzzyText, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = FuzzyText;
const __TURBOPACK__default__export__ = FuzzyText;
var _c;
__turbopack_context__.k.register(_c, "FuzzyText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_%28private%29_YOU%2527ILL%2520NEVER%2520GUESS__components_eb611144._.js.map