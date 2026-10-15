"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function OrbitalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(4, 5, 6);
    scene.add(key);

    const rim = new THREE.PointLight(0x8b73ff, 70, 0, 2);
    rim.position.set(-5, -2, -3);
    scene.add(rim);

    const root = new THREE.Group();
    scene.add(root);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.95, 96, 96),
      new THREE.MeshPhysicalMaterial({
        color: 0x17112a,
        metalness: 1,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.25,
      })
    );
    root.add(core);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1, 64, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        vertexShader:
          "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
        fragmentShader:
          "varying vec3 vN; void main(){ float d = clamp(-dot(vN, vec3(0.0,0.0,1.0)), 0.0, 1.0); float i = pow(d, 2.6) * 0.75; gl_FragColor = vec4(0.62,0.52,0.95,1.0) * i; }",
      })
    );
    halo.scale.setScalar(1.45);
    root.add(halo);

    const metal = (color: number, rough: number) =>
      new THREE.MeshStandardMaterial({ color, metalness: 1, roughness: rough });
    const pearl = new THREE.MeshPhysicalMaterial({
      color: 0xf4edff,
      metalness: 0.2,
      roughness: 0.15,
      clearcoat: 1,
    });

    const rings: { ring: THREE.Mesh; speed: number }[] = [];
    [
      { r: 1.65, tube: 8e-3, rx: 1.2, ry: 0, rz: 0.3, speed: 0.22, sat: 0.07 },
      { r: 2.05, tube: 6e-3, rx: 0.5, ry: 0.6, rz: 0, speed: -0.15, sat: 0.055 },
      { r: 2.5, tube: 5e-3, rx: -0.8, ry: 0, rz: 0.9, speed: 0.1, sat: 0.045 },
    ].forEach((cfg) => {
      const holder = new THREE.Group();
      holder.rotation.set(cfg.rx, cfg.ry, cfg.rz);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.r, cfg.tube, 12, 260),
        metal(0xcfbed8, 0.25)
      );
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(cfg.sat, 32, 32),
        pearl
      );
      sat.position.set(cfg.r, 0, 0);
      ring.add(sat);
      holder.add(ring);
      root.add(holder);
      rings.push({ ring, speed: cfg.speed });
    });

    const dial = new THREE.Group();
    dial.rotation.set(1.25, 0, -0.25);
    root.add(dial);

    const base = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 4e-3, 8, 300),
      metal(0x9a88b8, 0.35)
    );
    dial.add(base);

    const ticks: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>[] = [];
    const tickGeo = new THREE.BoxGeometry(0.035, 0.2, 0.035);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2 + Math.PI / 2;
      const mat = new THREE.MeshStandardMaterial({
        color: 0x4a3c66,
        metalness: 0.8,
        roughness: 0.4,
        emissive: 0xb8a8f0,
        emissiveIntensity: 0,
      });
      const t = new THREE.Mesh(tickGeo, mat);
      t.position.set(Math.cos(a) * 3.05, Math.sin(a) * 3.05, 0);
      t.rotation.z = a - Math.PI / 2;
      dial.add(t);
      ticks.push(t);
    }

    let w = 1,
      h = 1,
      desktop = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const pos = { x: 2.4, y: 0, s: 0.85 };
    let lit = 0,
      scrollP = 0,
      fade = 0;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const speedK = reduce ? 0.25 : 1;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      desktop = w > 900;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    function readScroll() {
      const y = window.scrollY;
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - h
      );
      scrollP = clamp(y / max, 0, 1);
      fade = clamp(y / (h * 0.8), 0, 1);

      const procEl = document.getElementById("process");
      if (procEl) {
        const r = procEl.getBoundingClientRect();
        const procP = clamp(
          (h * 0.7 - r.top) / (r.height * 0.9),
          0,
          1
        );
        lit = Math.round(procP * 14);
      }
    }

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", readScroll, { passive: true });
    const onPointerMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / w - 0.5) * 2;
      mouse.ty = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);
    resize();
    readScroll();

    const clock = new THREE.Clock();
    let raf: number;

    function frame() {
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      mouse.x = lerp(mouse.x, mouse.tx, 0.05);
      mouse.y = lerp(mouse.y, mouse.ty, 0.05);

      const tx = desktop
        ? 2.4 * Math.cos(scrollP * Math.PI * 3.4)
        : 0;
      const ty = desktop
        ? Math.sin(scrollP * Math.PI * 2) * 0.4
        : 0.9 - fade * 0.9;
      const ts = desktop ? 0.85 : 0.52;

      pos.x = lerp(pos.x, tx, 0.045);
      pos.y = lerp(pos.y, ty, 0.045);
      pos.s = lerp(pos.s, ts, 0.06);

      root.position.set(pos.x, pos.y + Math.sin(t * 0.6) * 0.06, 0);
      root.scale.setScalar(pos.s);
      root.rotation.y = lerp(
        root.rotation.y,
        scrollP * Math.PI * 3 + mouse.x * 0.35,
        0.05
      );
      root.rotation.x = lerp(root.rotation.x, mouse.y * 0.18, 0.05);

      rings.forEach((r) => {
        r.ring.rotation.z += r.speed * dt * speedK;
      });
      dial.rotation.z += 0.04 * dt * speedK;
      core.rotation.y += 0.1 * dt * speedK;

      ticks.forEach((tk, i) => {
        const target = i < lit ? 1.7 : 0;
        tk.material.emissiveIntensity = lerp(
          tk.material.emissiveIntensity,
          target,
          0.12
        );
      });

      const minOp = desktop ? 0.55 : 0.28;
      canvas!.style.opacity = String(lerp(1, minOp, fade));

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      pmrem.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="scene"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
