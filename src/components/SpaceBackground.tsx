"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  twinkle: number;
  speed: number;
}

interface Nebula {
  x: number;
  y: number;
  r: number;
  color: [number, number, number];
  drift: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  len: number;
}

const TYPES = [
  "planet",
  "saturn",
  "star",
  "comet",
  "spaceship",
  "moon",
  "galaxy",
  "asteroid",
] as const;
type ObjType = (typeof TYPES)[number];

interface SpaceObj {
  type: ObjType;
  x: number;
  y: number;
  z: number;
  rot: number;
  rotSpeed: number;
  size: number;
  alpha: number;
  hue: number;
  driftX: number;
  driftY: number;
  phase: number;
  ringTilt: number;
}

export function SpaceBackground() {
  const starsRef = useRef<HTMLCanvasElement>(null);
  const objRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c1 = starsRef.current!;
    const c2 = objRef.current!;
    const ctx1 = c1.getContext("2d")!;
    const ctx2 = c2.getContext("2d")!;

    let W = 0,
      H = 0;
    let mouseX = 0.5,
      mouseY = 0.5,
      scrollY = 0;
    let time = 0;
    let rafId1 = 0,
      rafId2 = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      c1.width = c2.width = W;
      c1.height = c2.height = H;
    }
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX / W;
      mouseY = e.clientY / H;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Stars
    const stars: Star[] = Array.from({ length: 600 }, () => ({
      x: Math.random() * 4000 - 2000,
      y: Math.random() * 4000 - 2000,
      z: Math.random() * 2000,
      size: Math.random() * 1.8 + 0.2,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.3 + 0.1,
    }));

    const nebulae: Nebula[] = [
      { x: 0.25, y: 0.2, r: 350, color: [124, 58, 237], drift: 0.0003 },
      { x: 0.75, y: 0.5, r: 280, color: [167, 139, 250], drift: -0.0002 },
      { x: 0.5, y: 0.8, r: 320, color: [96, 36, 208], drift: 0.00025 },
      { x: 0.15, y: 0.65, r: 200, color: [139, 92, 246], drift: -0.00035 },
    ];

    const shootingStars: ShootingStar[] = [];

    function animateStars() {
      time += 0.016;
      ctx1.clearRect(0, 0, W, H);

      // Deep space gradient
      const bg = ctx1.createRadialGradient(
        W * 0.5,
        H * 0.4,
        0,
        W * 0.5,
        H * 0.5,
        W * 0.9
      );
      bg.addColorStop(0, "#0a0520");
      bg.addColorStop(0.5, "#050210");
      bg.addColorStop(1, "#010008");
      ctx1.fillStyle = bg;
      ctx1.fillRect(0, 0, W, H);

      // Nebulae
      const sf = scrollY * 0.0001;
      for (const n of nebulae) {
        const nx =
          (n.x + Math.sin(time * n.drift * 10) * 0.02 + (mouseX - 0.5) * 0.03) * W;
        const ny = (n.y + sf * 2 + (mouseY - 0.5) * 0.02) * H;
        const grad = ctx1.createRadialGradient(nx, ny, 0, nx, ny, n.r);
        grad.addColorStop(
          0,
          `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0.06)`
        );
        grad.addColorStop(
          0.5,
          `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0.025)`
        );
        grad.addColorStop(1, "transparent");
        ctx1.fillStyle = grad;
        ctx1.fillRect(0, 0, W, H);
      }

      // Stars with parallax
      const px = (mouseX - 0.5) * 30;
      const py = (mouseY - 0.5) * 30;
      const sd = scrollY * 0.15;

      for (const s of stars) {
        const depth = s.z / 2000;
        const sx = (s.x + px * (1 - depth)) % W;
        const sy = (s.y + py * (1 - depth) - sd * (1 - depth * 0.5)) % H;
        const screenX = ((sx % W) + W) % W;
        const screenY = ((sy % H) + H) % H;

        s.twinkle += s.speed * 0.05;
        const alpha = 0.4 + Math.sin(s.twinkle) * 0.4;
        const size = s.size * (1 - depth * 0.5);

        ctx1.beginPath();
        ctx1.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx1.fillStyle = `rgba(210,200,255,${alpha})`;
        ctx1.fill();

        if (size > 1.2) {
          ctx1.beginPath();
          ctx1.arc(screenX, screenY, size * 2.5, 0, Math.PI * 2);
          ctx1.fillStyle = `rgba(167,139,250,${alpha * 0.12})`;
          ctx1.fill();
        }
      }

      // Shooting stars
      if (Math.random() < 0.005 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * W,
          y: Math.random() * H * 0.4,
          vx: (Math.random() - 0.3) * 12,
          vy: Math.random() * 6 + 4,
          life: 1,
          decay: Math.random() * 0.015 + 0.01,
          len: Math.random() * 80 + 40,
        });
      }
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
        if (s.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }
        const grad = ctx1.createLinearGradient(
          s.x,
          s.y,
          s.x - s.vx * (s.len / 12),
          s.y - s.vy * (s.len / 12)
        );
        grad.addColorStop(0, `rgba(200,190,255,${s.life})`);
        grad.addColorStop(1, "transparent");
        ctx1.strokeStyle = grad;
        ctx1.lineWidth = 1.5;
        ctx1.beginPath();
        ctx1.moveTo(s.x, s.y);
        ctx1.lineTo(
          s.x - s.vx * (s.len / 12),
          s.y - s.vy * (s.len / 12)
        );
        ctx1.stroke();
      }

      rafId1 = requestAnimationFrame(animateStars);
    }

    // Space Objects
    const objects: SpaceObj[] = Array.from({ length: 25 }, () => {
      const type = TYPES[Math.floor(Math.random() * TYPES.length)];
      return {
        type,
        x: Math.random() * 3000 - 500,
        y: Math.random() * 3000 - 500,
        z: Math.random() * 1500 + 300,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        size: Math.random() * 28 + 12,
        alpha: Math.random() * 0.35 + 0.1,
        hue: Math.random() * 50 + 245,
        driftX: (Math.random() - 0.5) * 0.25,
        driftY: (Math.random() - 0.5) * 0.18,
        phase: Math.random() * Math.PI * 2,
        ringTilt: Math.random() * 0.4 + 0.15,
      };
    });

    function project(ox: number, oy: number, z: number) {
      const fov = 800;
      const scale = fov / (fov + z);
      return {
        x: W / 2 + (ox - W / 2) * scale,
        y: H / 2 + (oy - H / 2) * scale,
        s: scale,
      };
    }

    function drawObj(ctx: CanvasRenderingContext2D, o: SpaceObj) {
      const parallax = 1 - (o.z / 2000) * 0.7;
      const ox = o.x + (mouseX - 0.5) * 60 * parallax;
      const oy =
        o.y + (mouseY - 0.5) * 40 * parallax - scrollY * 0.12 * parallax;
      const p = project(ox, oy, o.z);
      const s = o.size * p.s;
      const pulse = Math.sin(o.phase) * 0.06;
      const a = Math.min(1, o.alpha + pulse);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(o.rot);

      switch (o.type) {
        case "planet": {
          const grad = ctx.createRadialGradient(
            -s * 0.3,
            -s * 0.3,
            s * 0.1,
            0,
            0,
            s
          );
          grad.addColorStop(0, `hsla(${o.hue},60%,65%,${a})`);
          grad.addColorStop(0.6, `hsla(${o.hue},50%,40%,${a})`);
          grad.addColorStop(1, `hsla(${o.hue},40%,15%,${a * 0.5})`);
          ctx.beginPath();
          ctx.arc(0, 0, s, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          // Glow
          const g2 = ctx.createRadialGradient(0, 0, s, 0, 0, s * 1.25);
          g2.addColorStop(0, `hsla(${o.hue},70%,60%,${a * 0.25})`);
          g2.addColorStop(1, `hsla(${o.hue},70%,60%,0)`);
          ctx.beginPath();
          ctx.arc(0, 0, s * 1.25, 0, Math.PI * 2);
          ctx.fillStyle = g2;
          ctx.fill();
          break;
        }
        case "saturn": {
          const grad = ctx.createRadialGradient(
            -s * 0.25,
            -s * 0.25,
            s * 0.1,
            0,
            0,
            s * 0.75
          );
          grad.addColorStop(0, `hsla(40,55%,65%,${a})`);
          grad.addColorStop(0.7, `hsla(30,45%,40%,${a})`);
          grad.addColorStop(1, `hsla(25,35%,18%,${a * 0.5})`);
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(0, 0, s * 1.5, s * o.ringTilt * 1.5, 0.15, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(35,50%,70%,${a * 0.5})`;
          ctx.lineWidth = s * 0.12;
          ctx.stroke();
          break;
        }
        case "star": {
          const spikes = 4;
          const outerR = s * 1.2;
          const innerR = s * 0.35;
          ctx.beginPath();
          for (let i = 0; i < spikes * 2; i++) {
            const r = i % 2 === 0 ? outerR : innerR;
            const angle = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
            const px2 = Math.cos(angle) * r;
            const py2 = Math.sin(angle) * r;
            if (i === 0) { ctx.moveTo(px2, py2); } else { ctx.lineTo(px2, py2); }
          }
          ctx.closePath();
          const sg = ctx.createRadialGradient(0, 0, 0, 0, 0, outerR);
          sg.addColorStop(0, `hsla(50,90%,90%,${a})`);
          sg.addColorStop(0.5, `hsla(45,80%,70%,${a * 0.7})`);
          sg.addColorStop(1, `hsla(40,70%,50%,${a * 0.2})`);
          ctx.fillStyle = sg;
          ctx.fill();
          break;
        }
        case "comet": {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2);
          const hg = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.4);
          hg.addColorStop(0, `hsla(200,80%,90%,${a})`);
          hg.addColorStop(1, `hsla(220,60%,60%,${a * 0.4})`);
          ctx.fillStyle = hg;
          ctx.fill();
          const tailLen = s * 4;
          const tg = ctx.createLinearGradient(0, 0, tailLen, 0);
          tg.addColorStop(0, `hsla(210,70%,80%,${a * 0.6})`);
          tg.addColorStop(0.3, `hsla(250,60%,70%,${a * 0.3})`);
          tg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.15);
          ctx.quadraticCurveTo(tailLen * 0.5, -s * 0.3, tailLen, 0);
          ctx.quadraticCurveTo(tailLen * 0.5, s * 0.3, 0, s * 0.15);
          ctx.fillStyle = tg;
          ctx.fill();
          break;
        }
        case "spaceship": {
          ctx.lineWidth = 1.2;
          ctx.strokeStyle = `hsla(${o.hue},60%,75%,${a})`;
          ctx.fillStyle = `hsla(${o.hue},50%,50%,${a * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.5);
          ctx.lineTo(s * 0.5, -s * 0.3);
          ctx.lineTo(s * 0.7, s * 0.5);
          ctx.lineTo(s * 0.35, s * 0.8);
          ctx.lineTo(0, s * 0.6);
          ctx.lineTo(-s * 0.35, s * 0.8);
          ctx.lineTo(-s * 0.7, s * 0.5);
          ctx.lineTo(-s * 0.5, -s * 0.3);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        }
        case "moon": {
          const mg = ctx.createRadialGradient(
            -s * 0.2,
            -s * 0.2,
            s * 0.1,
            0,
            0,
            s
          );
          mg.addColorStop(0, `hsla(220,10%,75%,${a})`);
          mg.addColorStop(1, `hsla(220,10%,35%,${a * 0.5})`);
          ctx.beginPath();
          ctx.arc(0, 0, s, 0, Math.PI * 2);
          ctx.fillStyle = mg;
          ctx.fill();
          // Craters
          ctx.globalAlpha = a * 0.3;
          ctx.beginPath();
          ctx.arc(s * 0.3, -s * 0.2, s * 0.2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(220,10%,25%,${a * 0.3})`;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(-s * 0.2, s * 0.3, s * 0.15, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          break;
        }
        case "galaxy": {
          ctx.globalAlpha = a * 0.6;
          for (let arm = 0; arm < 3; arm++) {
            ctx.beginPath();
            for (let t = 0; t < 40; t++) {
              const angle = (arm * Math.PI * 2) / 3 + t * 0.15;
              const r2 = t * s * 0.06;
              const gx = Math.cos(angle) * r2;
              const gy = Math.sin(angle) * r2;
              if (t === 0) { ctx.moveTo(gx, gy); } else { ctx.lineTo(gx, gy); }
            }
            ctx.strokeStyle = `hsla(${o.hue + arm * 20},60%,70%,${a * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          // Core glow
          const gg = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.5);
          gg.addColorStop(0, `hsla(${o.hue},70%,80%,${a * 0.4})`);
          gg.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = gg;
          ctx.fill();
          break;
        }
        case "asteroid": {
          ctx.beginPath();
          const pts = 7;
          for (let i = 0; i < pts; i++) {
            const angle = (i / pts) * Math.PI * 2;
            const r2 = s * (0.6 + Math.sin(i * 2.5) * 0.3);
            const ax = Math.cos(angle) * r2;
            const ay = Math.sin(angle) * r2;
            if (i === 0) { ctx.moveTo(ax, ay); } else { ctx.lineTo(ax, ay); }
          }
          ctx.closePath();
          ctx.fillStyle = `hsla(${o.hue},20%,35%,${a})`;
          ctx.fill();
          ctx.strokeStyle = `hsla(${o.hue},30%,50%,${a * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          break;
        }
      }
      ctx.restore();
    }

    function animateObjects() {
      ctx2.clearRect(0, 0, W, H);
      for (const o of objects) {
        o.rot += o.rotSpeed;
        o.phase += 0.01;
        o.x += o.driftX;
        o.y += o.driftY;
        if (o.x > W + 500) o.x = -500;
        if (o.x < -500) o.x = W + 500;
        if (o.y > H + 500) o.y = -500;
        if (o.y < -500) o.y = H + 500;
        drawObj(ctx2, o);
      }
      rafId2 = requestAnimationFrame(animateObjects);
    }

    animateStars();
    animateObjects();

    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const canvasStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  };

  return (
    <>
      <canvas ref={starsRef} style={{ ...canvasStyle, zIndex: 0 }} />
      <canvas ref={objRef} style={{ ...canvasStyle, zIndex: 1 }} />
    </>
  );
}
