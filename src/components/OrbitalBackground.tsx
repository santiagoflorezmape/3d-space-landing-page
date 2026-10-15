"use client";

import { useEffect, useRef } from "react";

interface V3 {
  x: number;
  y: number;
  z: number;
}

function rotX(p: V3, a: number): V3 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}

function rotY(p: V3, a: number): V3 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return { x: p.x * c - p.z * s, y: p.y, z: p.x * s + p.z * c };
}

function rotZ(p: V3, a: number): V3 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
}

function project(p: V3, cx: number, cy: number, fov: number) {
  const d = fov / (fov + p.z);
  return { x: cx + p.x * d, y: cy + p.y * d, s: d };
}

function ringPoints(
  radius: number,
  rx: number,
  ry: number,
  rz: number,
  n: number
): V3[] {
  const pts: V3[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    let p: V3 = { x: Math.cos(a) * radius, y: 0, z: Math.sin(a) * radius };
    p = rotX(p, rx);
    p = rotY(p, ry);
    p = rotZ(p, rz);
    pts.push(p);
  }
  return pts;
}

function sphereWireframe(
  r: number,
  latLines: number,
  lonLines: number
): V3[][] {
  const lines: V3[][] = [];
  for (let i = 0; i <= latLines; i++) {
    const theta = (i / latLines) * Math.PI;
    const line: V3[] = [];
    for (let j = 0; j <= lonLines; j++) {
      const phi = (j / lonLines) * Math.PI * 2;
      line.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.cos(theta),
        z: r * Math.sin(theta) * Math.sin(phi),
      });
    }
    lines.push(line);
  }
  for (let j = 0; j < lonLines; j++) {
    const phi = (j / lonLines) * Math.PI * 2;
    const line: V3[] = [];
    for (let i = 0; i <= latLines; i++) {
      const theta = (i / latLines) * Math.PI;
      line.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.cos(theta),
        z: r * Math.sin(theta) * Math.sin(phi),
      });
    }
    lines.push(line);
  }
  return lines;
}

const RING_CFG = [
  { r: 1.65, rx: 1.2, ry: 0, rz: 0.3, speed: 0.22, sat: 0.07 },
  { r: 2.05, rx: 0.5, ry: 0.6, rz: 0, speed: -0.15, sat: 0.055 },
  { r: 2.5, rx: -0.8, ry: 0, rz: 0.9, speed: 0.1, sat: 0.045 },
];

export function OrbitalBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0,
      h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const satPositions = RING_CFG.map(() => Math.random());

    const draw = (t: number) => {
      if (w < 10 || h < 10) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.58;
      const cy = h * 0.4;
      const fov = 700;
      const baseR = Math.min(w * 0.22, 180);
      const rot = t * 0.00008;

      // ambient glow behind everything
      const ambGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 4);
      ambGrd.addColorStop(0, "rgba(139,115,230,0.07)");
      ambGrd.addColorStop(0.4, "rgba(139,115,230,0.02)");
      ambGrd.addColorStop(1, "transparent");
      ctx.fillStyle = ambGrd;
      ctx.fillRect(0, 0, w, h);

      // --- outer rim ring (r=2.9 in reference) ---
      const outerRim = ringPoints(baseR * 2.9, 0.15, 0, 0.05, 200);
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = "#9A88B8";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < outerRim.length; i++) {
        const p = rotY(outerRim[i], rot * 0.3);
        const pr = project(p, cx, cy, fov);
        if (i === 0) ctx.moveTo(pr.x, pr.y);
        else ctx.lineTo(pr.x, pr.y);
      }
      ctx.stroke();

      // tick marks on outer rim
      ctx.globalAlpha = 0.2;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < outerRim.length; i += 8) {
        const p = rotY(outerRim[i], rot * 0.3);
        const pr = project(p, cx, cy, fov);
        const nextIdx = Math.min(i + 1, outerRim.length - 1);
        const p2 = rotY(outerRim[nextIdx], rot * 0.3);
        const pr2 = project(p2, cx, cy, fov);
        const dx = pr2.x - pr.x;
        const dy = pr2.y - pr.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 0.1) continue;
        const nx = (-dy / len) * 6;
        const ny = (dx / len) * 6;
        ctx.beginPath();
        ctx.moveTo(pr.x - nx, pr.y - ny);
        ctx.lineTo(pr.x + nx, pr.y + ny);
        ctx.stroke();
      }
      ctx.restore();

      // --- 3 orbital rings + satellites ---
      for (let ri = 0; ri < RING_CFG.length; ri++) {
        const cfg = RING_CFG[ri];
        const ringPts = ringPoints(
          baseR * cfg.r,
          cfg.rx,
          cfg.ry,
          cfg.rz,
          160
        );

        // draw ring
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = "#CFBED8";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < ringPts.length; i++) {
          const p = rotY(ringPts[i], rot);
          const pr = project(p, cx, cy, fov);
          if (i === 0) ctx.moveTo(pr.x, pr.y);
          else ctx.lineTo(pr.x, pr.y);
        }
        ctx.stroke();
        ctx.restore();

        // satellite
        satPositions[ri] =
          (satPositions[ri] + cfg.speed * 0.008 + 1) % 1;
        const sIdx = Math.floor(satPositions[ri] * (ringPts.length - 1));
        const sPt = ringPts[sIdx];
        if (sPt) {
          const sp = rotY(sPt, rot);
          const spr = project(sp, cx, cy, fov);

          // glow
          ctx.save();
          const satGlow = ctx.createRadialGradient(
            spr.x,
            spr.y,
            0,
            spr.x,
            spr.y,
            12 * spr.s
          );
          satGlow.addColorStop(0, "rgba(244,237,255,0.5)");
          satGlow.addColorStop(0.5, "rgba(184,168,240,0.15)");
          satGlow.addColorStop(1, "transparent");
          ctx.fillStyle = satGlow;
          ctx.beginPath();
          ctx.arc(spr.x, spr.y, 12 * spr.s, 0, Math.PI * 2);
          ctx.fill();

          // core
          ctx.globalAlpha = 0.9 * spr.s;
          ctx.fillStyle = "#F4EDFF";
          ctx.beginPath();
          ctx.arc(spr.x, spr.y, 3 * spr.s, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // --- main sphere ---
      const sphereR = baseR * 0.95;

      // sphere body: dark metallic gradient with specular highlight
      ctx.save();
      // base fill
      const bodyGrd = ctx.createRadialGradient(
        cx - sphereR * 0.25,
        cy - sphereR * 0.3,
        0,
        cx,
        cy,
        sphereR
      );
      bodyGrd.addColorStop(0, "rgba(60,50,90,0.95)");
      bodyGrd.addColorStop(0.3, "rgba(30,25,55,0.9)");
      bodyGrd.addColorStop(0.7, "rgba(18,15,38,0.85)");
      bodyGrd.addColorStop(1, "rgba(10,8,22,0.8)");
      ctx.fillStyle = bodyGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.fill();

      // specular highlight (top-right)
      const specX = cx + sphereR * 0.2;
      const specY = cy - sphereR * 0.25;
      const specGrd = ctx.createRadialGradient(
        specX,
        specY,
        0,
        specX,
        specY,
        sphereR * 0.7
      );
      specGrd.addColorStop(0, "rgba(200,195,230,0.55)");
      specGrd.addColorStop(0.15, "rgba(160,150,200,0.3)");
      specGrd.addColorStop(0.4, "rgba(100,90,150,0.1)");
      specGrd.addColorStop(1, "transparent");
      ctx.fillStyle = specGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.fill();

      // secondary purple reflection (bottom-left)
      const ref2X = cx - sphereR * 0.4;
      const ref2Y = cy + sphereR * 0.35;
      const ref2Grd = ctx.createRadialGradient(
        ref2X,
        ref2Y,
        0,
        ref2X,
        ref2Y,
        sphereR * 0.5
      );
      ref2Grd.addColorStop(0, "rgba(139,115,230,0.2)");
      ref2Grd.addColorStop(0.5, "rgba(139,115,230,0.05)");
      ref2Grd.addColorStop(1, "transparent");
      ctx.fillStyle = ref2Grd;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.fill();

      // edge rim light
      const rimGrd = ctx.createRadialGradient(cx, cy, sphereR * 0.85, cx, cy, sphereR);
      rimGrd.addColorStop(0, "transparent");
      rimGrd.addColorStop(0.5, "rgba(180,170,220,0.08)");
      rimGrd.addColorStop(1, "rgba(200,190,240,0.15)");
      ctx.fillStyle = rimGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // wireframe grid on sphere (subtle)
      const wireR = sphereR * 0.96;
      const wires = sphereWireframe(wireR, 8, 10);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.04;
      ctx.strokeStyle = "#B8A8F0";
      ctx.lineWidth = 0.5;
      for (const line of wires) {
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < line.length; i++) {
          const p = rotY(rotX(line[i], 0.15), rot * 0.5);
          // only draw front-facing parts
          if (p.z > wireR * 0.1) continue;
          const pr = project(p, cx, cy, fov);
          if (!started) {
            ctx.moveTo(pr.x, pr.y);
            started = true;
          } else {
            ctx.lineTo(pr.x, pr.y);
          }
        }
        ctx.stroke();
      }
      ctx.restore();

      // clearcoat shine (small bright spot)
      ctx.save();
      const shineX = cx + sphereR * 0.15;
      const shineY = cy - sphereR * 0.2;
      const shineGrd = ctx.createRadialGradient(
        shineX,
        shineY,
        0,
        shineX,
        shineY,
        sphereR * 0.2
      );
      shineGrd.addColorStop(0, "rgba(255,255,255,0.35)");
      shineGrd.addColorStop(0.3, "rgba(255,255,255,0.1)");
      shineGrd.addColorStop(1, "transparent");
      ctx.fillStyle = shineGrd;
      ctx.beginPath();
      ctx.arc(cx, cy, sphereR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // draw orbital rings that pass in front of the sphere on top
      for (let ri = 0; ri < RING_CFG.length; ri++) {
        const cfg = RING_CFG[ri];
        const ringPts = ringPoints(
          baseR * cfg.r,
          cfg.rx,
          cfg.ry,
          cfg.rz,
          160
        );

        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = "#CFBED8";
        ctx.lineWidth = 1;
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < ringPts.length; i++) {
          const p = rotY(ringPts[i], rot);
          // only draw segments in front of sphere
          const distFromCenter = Math.sqrt(p.x * p.x + p.y * p.y);
          if (p.z > 0 && distFromCenter < sphereR * 1.05) continue;
          const pr = project(p, cx, cy, fov);
          if (!started) {
            ctx.moveTo(pr.x, pr.y);
            started = true;
          } else {
            ctx.lineTo(pr.x, pr.y);
          }
        }
        ctx.stroke();
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
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
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 58% 40%, transparent 0%, rgba(7,6,13,0.6) 40%, rgba(7,6,13,0.95) 100%)",
        }}
      />
    </>
  );
}
