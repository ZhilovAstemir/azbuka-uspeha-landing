"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * 3D-сцена героя: мягкие глянцевые шары в фирменных цветах.
 * Настоящие отражения (studio-окружение), плавное парение и лёгкий
 * параллакс от курсора. Живёт в отдельной колонке и не перекрывает текст.
 * Уважает prefers-reduced-motion и аккуратно очищается при размонтировании.
 */

const ORBS = [
  { color: "#7b61ff", r: 1.15, x: 0.2, y: 0.4, z: 0 },
  { color: "#ff7eb3", r: 0.85, x: -2.4, y: 1.6, z: -1 },
  { color: "#ffc93c", r: 0.7, x: 2.6, y: 1.5, z: -0.5 },
  { color: "#2ec4b6", r: 0.95, x: -2.2, y: -1.6, z: -0.5 },
  { color: "#ff6b6b", r: 0.6, x: 2.5, y: -1.5, z: 0.4 },
  { color: "#38b6ff", r: 0.55, x: 0.4, y: 2.4, z: -1.4 },
  { color: "#a66cff", r: 0.5, x: -0.6, y: -2.4, z: 0.2 },
  { color: "#ff9f1c", r: 0.42, x: 3.3, y: 0.2, z: -1.2 },
  { color: "#ffffff", r: 0.35, x: -3.3, y: 0.3, z: 0.6 },
];

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return; // WebGL недоступен — останется мягкий фон
    }

    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 9;

    // студийное окружение для мягких отражений на шарах
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    // свет для объёма и цветных бликов
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0xff7eb3, 40, 40);
    rim.position.set(-6, -3, 5);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.SphereGeometry(1, 48, 48);
    type Orb = { mesh: THREE.Mesh; base: number; speed: number; phase: number; spin: number };
    const orbs: Orb[] = [];

    ORBS.forEach((o, i) => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(o.color),
        roughness: 0.14,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.15,
        emissive: new THREE.Color(o.color),
        emissiveIntensity: 0.06,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(o.x, o.y, o.z);
      mesh.scale.setScalar(o.r);
      group.add(mesh);
      orbs.push({
        mesh,
        base: o.y,
        speed: 0.5 + Math.random() * 0.5,
        phase: i * 1.7,
        spin: (Math.random() - 0.5) * 0.3,
      });
    });

    // параллакс по курсору
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      const t = clock.getElapsedTime();
      orbs.forEach((o) => {
        o.mesh.position.y = o.base + Math.sin(t * o.speed + o.phase) * 0.28;
        o.mesh.rotation.y += o.spin * 0.01;
      });
      group.rotation.y += (target.x * 0.25 - group.rotation.y) * 0.05;
      group.rotation.x += (-target.y * 0.18 - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) render();
    else loop();

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
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      orbs.forEach((o) => (o.mesh.material as THREE.Material).dispose());
      geo.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
