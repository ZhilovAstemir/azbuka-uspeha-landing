"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Интерактивная 3D-сцена героя.
 * Центр — «живая» сфера с шейдерным шумовым рельефом, плавным градиентом
 * и fresnel-ободком. Вокруг — облако частиц.
 *
 * Интерактив:
 *  • курсор — сцена наклоняется за указателем, движение усиливает рельеф;
 *  • скролл — камера отъезжает, сфера вращается и меняет цвет,
 *    облако частиц разлетается и растворяется (scroll-driven).
 * Уважает prefers-reduced-motion, чистится при размонтировании.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uFreq;
  varying float vNoise;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main(){
    float n1 = snoise(position * uFreq + vec3(0.0, 0.0, uTime * 0.18));
    float n2 = snoise(position * (uFreq * 2.1) + vec3(uTime * 0.25)) * 0.5;
    float sum = n1 + n2;
    vNoise = sum;
    vec3 newPos = position + normal * sum * uAmp;
    vec4 worldPos = modelMatrix * vec4(newPos, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uScroll;
  varying float vNoise;
  varying vec3 vNormalW;
  varying vec3 vViewDir;

  void main(){
    float t = smoothstep(-1.2, 1.2, vNoise);
    vec3 col = mix(uColorA, uColorB, t);
    col = mix(col, uColorC, clamp(vNoise * 0.5 + 0.5, 0.0, 1.0) * 0.45 + uScroll * 0.35);
    float fres = pow(1.0 - max(dot(normalize(vNormalW), normalize(vViewDir)), 0.0), 2.5);
    col += fres * vec3(1.0) * 0.55;
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 640px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const CAM_Z = 5.4;
    camera.position.z = CAM_Z;

    const world = new THREE.Group();
    scene.add(world);

    // --- Живая сфера ---
    const detail = isMobile ? 5 : 6;
    const blobGeo = new THREE.IcosahedronGeometry(1.5, detail);
    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uFreq: { value: 0.9 },
      uScroll: { value: 0 },
      uColorA: { value: new THREE.Color("#7b61ff") },
      uColorB: { value: new THREE.Color("#ff7eb3") },
      uColorC: { value: new THREE.Color("#38b6ff") },
    };
    const blobMat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const blob = new THREE.Mesh(blobGeo, blobMat);
    world.add(blob);

    // --- Облако частиц ---
    const N = isMobile ? 140 : 260;
    const pos = new Float32Array(N * 3);
    const rad = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const r = 2.1 + Math.random() * 1.8;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = r * Math.cos(ph);
      rad[i] = r;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const basePos = pos.slice();
    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    world.add(points);

    // --- Интерактив: указатель и скролл ---
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let pulse = 0;
    let lastX = 0;
    let lastY = 0;

    const onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      pulse = Math.min(pulse + Math.hypot(nx - lastX, ny - lastY) * 3, 0.35);
      lastX = nx;
      lastY = ny;
      pointer.x = nx * 2;
      pointer.y = ny * 2;
    };

    let scrollProgress = 0;
    const onScroll = () => {
      scrollProgress = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
    };
    onScroll();

    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const t = clock.getElapsedTime();
      const s = scrollProgress;

      // сфера
      uniforms.uTime.value = t;
      uniforms.uAmp.value = 0.16 + s * 0.22 + pulse;
      uniforms.uScroll.value = s;
      blob.rotation.y += 0.0015 + s * 0.004;
      blob.scale.setScalar(1 - s * 0.25);

      // облако частиц разлетается и растворяется на скролле
      const spread = 1 + s * 0.6;
      const arr = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < N; i++) {
        arr[i * 3] = basePos[i * 3] * spread;
        arr[i * 3 + 1] = basePos[i * 3 + 1] * spread;
        arr[i * 3 + 2] = basePos[i * 3 + 2] * spread;
      }
      pGeo.attributes.position.needsUpdate = true;
      points.rotation.y += 0.0008;
      pMat.opacity = 0.85 * (1 - s * 0.85);

      // наклон всей сцены за курсором (с демпфированием)
      smooth.x += (pointer.x - smooth.x) * 0.05;
      smooth.y += (pointer.y - smooth.y) * 0.05;
      world.rotation.y = smooth.x * 0.5;
      world.rotation.x = -smooth.y * 0.35;

      // камера отъезжает на скролле
      camera.position.z = CAM_Z + s * 2.4;
      camera.position.y = s * 0.6;
      camera.lookAt(0, 0, 0);

      pulse *= 0.92;
      renderer.render(scene, camera);
    };

    // Цикл рендера работает только пока герой виден на экране —
    // экономим CPU/батарею и не мешаем анимациям ниже по странице.
    let running = false;
    const loop = () => {
      if (!running) return;
      render();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      loop();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const vis = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    vis.observe(mount);
    if (reduce) render();

    const onResize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      stop();
      vis.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      blobGeo.dispose();
      blobMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
