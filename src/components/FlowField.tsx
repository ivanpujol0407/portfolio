import { useEffect, useRef, RefObject } from "react";

/**
 * Live 2D potential-flow visualisation (uniform stream around a cylinder).
 * The "cylinder" is positioned on the hero portrait, so streamlines
 * physically deflect around the photo — the engineer as the bluff body.
 *
 * u = U · [1 − R²(dx² − dy²)/r⁴]
 * v = −U · 2R²·dx·dy / r⁴
 *
 * Respects prefers-reduced-motion (renders static streamlines once),
 * pauses when offscreen or when the tab is hidden.
 */

interface FlowFieldProps {
  obstacleRef: RefObject<HTMLElement>;
}

interface Particle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  green: boolean;
}

const FlowField = ({ obstacleRef }: FlowFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let R = 0;
    let raf = 0;
    let running = true;
    let visible = true;
    let particles: Particle[] = [];

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const obstacle = obstacleRef.current;
      if (obstacle) {
        const o = obstacle.getBoundingClientRect();
        cx = o.left - rect.left + o.width / 2;
        cy = o.top - rect.top + o.height / 2;
        R = Math.max(o.width, o.height) * 0.62;
      } else {
        cx = width * 0.7;
        cy = height * 0.5;
        R = Math.min(width, height) * 0.22;
      }
    };

    // Velocity field: uniform stream (left → right) around a cylinder at (cx, cy)
    const velocity = (x: number, y: number): [number, number] => {
      const dx = x - cx;
      const dy = y - cy;
      const r2 = dx * dx + dy * dy;
      if (r2 < 1) return [1, 0];
      const k = (R * R) / (r2 * r2);
      return [1 - k * (dx * dx - dy * dy), -2 * k * dx * dy];
    };

    const spawn = (randomX: boolean): Particle => ({
      x: randomX ? Math.random() * width : -10 - Math.random() * 40,
      y: Math.random() * height,
      life: 0,
      maxLife: 400 + Math.random() * 400,
      green: Math.random() < 0.1,
    });

    const insideObstacle = (x: number, y: number) => {
      const dx = x - cx;
      const dy = y - cy;
      return dx * dx + dy * dy < R * R * 1.04;
    };

    const initParticles = () => {
      const count = Math.min(220, Math.max(70, Math.floor((width * height) / 9000)));
      particles = Array.from({ length: count }, () => spawn(true)).filter(
        (p) => !insideObstacle(p.x, p.y)
      );
    };

    // Static fallback: draw a set of streamlines once, no animation
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const lines = 16;
      for (let i = 0; i <= lines; i++) {
        const y0 = (i / lines) * height;
        const green = i === Math.round(lines * 0.35) || i === Math.round(lines * 0.65);
        ctx.beginPath();
        ctx.strokeStyle = green ? "rgba(99,171,133,0.30)" : "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
        let x = 0;
        let y = y0;
        ctx.moveTo(x, y);
        for (let s = 0; s < 700 && x < width; s++) {
          const [u, v] = velocity(x, y);
          x += u * 2.2;
          y += v * 2.2;
          if (insideObstacle(x, y)) break;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    let last = performance.now();
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!running || !visible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Fade previous trails
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      const speed = 65 * dt;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const [u, v] = velocity(p.x, p.y);
        const nx = p.x + u * speed;
        const ny = p.y + v * speed;
        p.life++;

        if (nx > width + 10 || ny < -10 || ny > height + 10 || insideObstacle(nx, ny) || p.life > p.maxLife) {
          particles[i] = spawn(false);
          continue;
        }

        ctx.beginPath();
        ctx.strokeStyle = p.green ? "rgba(99,171,133,0.55)" : "rgba(255,255,255,0.13)";
        ctx.lineWidth = p.green ? 1.3 : 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
      }
    };

    const onResize = () => {
      measure();
      if (reduceMotion) drawStatic();
      else initParticles();
    };

    measure();
    if (reduceMotion) {
      drawStatic();
    } else {
      initParticles();
      raf = requestAnimationFrame(frame);
    }

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    // Fonts/images loading can shift the portrait — remeasure once settled
    window.addEventListener("load", onResize);
    const settle = window.setTimeout(onResize, 1200);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("load", onResize);
      window.clearTimeout(settle);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [obstacleRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default FlowField;
