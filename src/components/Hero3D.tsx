"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * 3D-сцена героя: парящие «кубики алфавита» с буквами и цифрами.
 * Тематика центра «Азбука Успеха» — буквы, из которых складывается успех.
 * Реагирует на движение курсора, уважает prefers-reduced-motion,
 * корректно очищается при размонтировании.
 */

const FACES = [
  { ch: "А", color: "#7b61ff" },
  { ch: "Б", color: "#ff6b6b" },
  { ch: "В", color: "#2ec4b6" },
  { ch: "1", color: "#ffc93c" },
  { ch: "2", color: "#38b6ff" },
  { ch: "+", color: "#ff7eb3" },
  { ch: "?", color: "#a66cff" },
  { ch: "★", color: "#ff9f1c" },
  { ch: "Ц", color: "#2ec4b6" },
  { ch: "Ы", color: "#7b61ff" },
  { ch: "!", color: "#ff6b6b" },
];

function makeLetterTexture(ch: string, color: string) {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  // фон-плашка
  const r = 44;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.arcTo(s, 0, s, s, r);
  ctx.arcTo(s, s, 0, s, r);
  ctx.arcTo(0, s, 0, 0, r);
  ctx.arcTo(0, 0, s, 0, r);
  ctx.closePath();
  ctx.fill();
  // мягкий блик сверху
  const g = ctx.createLinearGradient(0, 0, 0, s);
  g.addColorStop(0, "rgba(255,255,255,0.28)");
  g.addColorStop(0.5, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fill();
  // буква
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 150px Nunito, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(ch, s / 2, s / 2 + 10);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

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
      return; // WebGL недоступен — просто останется CSS-фон
    }

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 14;

    // свет
    scene.add(new THREE.AmbientLight(0xffffff, 1.05));
    const dir = new THREE.DirectionalLight(0xffffff, 0.7);
    dir.position.set(6, 10, 8);
    scene.add(dir);
    const rim = new THREE.PointLight(0xff7eb3, 0.6, 60);
    rim.position.set(-10, -6, 6);
    scene.add(rim);

    const group = new THREE.Group();
    scene.add(group);

    type Cube = { mesh: THREE.Mesh; speed: number; phase: number; rot: THREE.Vector3 };
    const cubes: Cube[] = [];
    const geo = new THREE.BoxGeometry(1, 1, 1);

    FACES.forEach((f, i) => {
      const tex = makeLetterTexture(f.ch, f.color);
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.45, metalness: 0.05 });
      const mesh = new THREE.Mesh(geo, mat);
      const scale = 1.3 + Math.random() * 1.5;
      mesh.scale.setScalar(scale);
      // распределяем по объёму сцены
      mesh.position.set(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6 - 1,
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(mesh);
      cubes.push({
        mesh,
        speed: 0.3 + Math.random() * 0.5,
        phase: i * 1.3,
        rot: new THREE.Vector3((Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.5, 0),
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
      cubes.forEach((c) => {
        c.mesh.position.y += Math.sin(t * c.speed + c.phase) * 0.004;
        c.mesh.rotation.x += c.rot.x * 0.01;
        c.mesh.rotation.y += c.rot.y * 0.01;
      });
      group.rotation.y += (target.x * 0.35 - group.rotation.y) * 0.05;
      group.rotation.x += (target.y * 0.25 - group.rotation.x) * 0.05;
      renderer.render(scene, camera);
    };

    const loop = () => {
      render();
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      render(); // один статичный кадр
    } else {
      loop();
    }

    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
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
      cubes.forEach((c) => {
        (c.mesh.material as THREE.MeshStandardMaterial).map?.dispose();
        (c.mesh.material as THREE.Material).dispose();
      });
      geo.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-0" aria-hidden="true" />;
}
