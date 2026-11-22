"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Point3 = { x: number; y: number; z: number };

const LATITUDES = [-72, -54, -36, -18, 0, 18, 36, 54, 72];
const MERIDIANS = 16;
const SEGMENTS = 64;

function rotatePoint(point: Point3, angleY: number, tiltX: number): Point3 {
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x = point.x * cosY - point.z * sinY;
  const z = point.x * sinY + point.z * cosY;

  const cosX = Math.cos(tiltX);
  const sinX = Math.sin(tiltX);

  return { x, y: point.y * cosX - z * sinX, z: point.y * sinX + z * cosX };
}

/**
 * Вычислительная сфера: каркас из параллелей и меридианов, частицы на
 * поверхности и внешние орбиты. Рисуется на canvas 2D — без WebGL, поэтому
 * hero остаётся лёгким и работает на любом железе.
 */
export function SphereCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let time = reduced ? 1.4 : 0;
    let visible = true;
    let raf = 0;

    const particles: Point3[] = Array.from({ length: 120 }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1 + Math.random() * 0.02;
      return {
        x: Math.sin(phi) * Math.cos(theta) * radius,
        y: Math.cos(phi) * radius,
        z: Math.sin(phi) * Math.sin(theta) * radius,
      };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const cx = width * 0.52;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.345;
      const angleY = time * 0.5;
      const tiltX = -0.34 + Math.sin(time * 0.24) * 0.05;

      const project = (point: Point3) => {
        const rotated = rotatePoint(point, angleY, tiltX);
        const perspective = 2 / (2 + rotated.z * 0.55);
        return {
          x: cx + rotated.x * radius * perspective,
          y: cy - rotated.y * radius * perspective,
          z: rotated.z,
          scale: perspective,
        };
      };

      // Мягкое ядро и свечение
      const glow = context.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.5);
      glow.addColorStop(0, "rgba(0,184,121,0.28)");
      glow.addColorStop(0.45, "rgba(0,184,121,0.1)");
      glow.addColorStop(1, "rgba(8,11,9,0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(cx, cy, radius * 1.5, 0, Math.PI * 2);
      context.fill();

      const strokeArc = (
        build: (step: number) => Point3,
        close = true,
        baseAlpha = 0.5,
      ) => {
        const points = Array.from({ length: SEGMENTS + 1 }, (_, index) =>
          project(build((index / SEGMENTS) * Math.PI * 2)),
        );

        for (let index = 0; index < points.length - 1; index += 1) {
          const a = points[index];
          const b = points[index + 1];
          const depth = (a.z + b.z) / 2;
          const front = depth > 0;
          const alpha = Math.max(0.05, (front ? 0.72 : 0.22) * baseAlpha * (0.55 + Math.abs(depth) * 0.7));
          context.strokeStyle = front
            ? `rgba(163,255,112,${alpha.toFixed(3)})`
            : `rgba(0,184,121,${(alpha * 0.9).toFixed(3)})`;
          context.lineWidth = front ? 1.05 : 0.8;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.lineTo(b.x, b.y);
          context.stroke();
        }

        if (close) return points;
        return points;
      };

      // Меридианы
      for (let index = 0; index < MERIDIANS; index += 1) {
        const lon = (index / MERIDIANS) * Math.PI * 2;
        strokeArc((theta) => ({
          x: Math.cos(theta) * Math.cos(lon),
          y: Math.sin(theta),
          z: Math.cos(theta) * Math.sin(lon),
        }));
      }

      // Параллели
      for (const latitude of LATITUDES) {
        const lat = (latitude * Math.PI) / 180;
        strokeArc(
          (theta) => ({
            x: Math.cos(lat) * Math.cos(theta),
            y: Math.sin(lat),
            z: Math.cos(lat) * Math.sin(theta),
          }),
          true,
          0.8,
        );
      }

      // Частицы
      for (const particle of particles) {
        const point = project(particle);
        const depth = (point.z + 1) / 2;
        const alpha = 0.12 + depth * 0.62;
        const size = 0.7 + depth * 1.5;
        context.fillStyle =
          point.z > 0.45 ? `rgba(203,255,155,${alpha.toFixed(3)})` : `rgba(0,184,121,${alpha.toFixed(3)})`;
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fill();
      }

      // Внешние орбиты
      context.save();
      context.translate(cx, cy);
      context.rotate(-0.32 + Math.sin(time * 0.18) * 0.04);
      context.setLineDash([2, 10]);
      context.lineWidth = 1;
      for (const [scale, alpha] of [
        [1.28, 0.22],
        [1.52, 0.12],
      ] as const) {
        context.strokeStyle = `rgba(163,255,112,${alpha})`;
        context.beginPath();
        context.ellipse(0, 0, radius * scale, radius * scale * 0.34, 0, 0, Math.PI * 2);
        context.stroke();
      }
      context.restore();

      // Орбитальный маркер
      const orbitAngle = time * 0.35;
      const orbitX = cx + Math.cos(orbitAngle) * radius * 1.28;
      const orbitY = cy + Math.sin(orbitAngle) * radius * 1.28 * 0.34 - radius * 0.32;
      context.fillStyle = "rgba(203,255,155,0.9)";
      context.beginPath();
      context.arc(orbitX, orbitY, 2.1, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(203,255,155,0.22)";
      context.beginPath();
      context.arc(orbitX, orbitY, 7, 0, Math.PI * 2);
      context.stroke();
    };

    const loop = () => {
      if (!visible) return;
      time += 0.006;
      draw();
      raf = window.requestAnimationFrame(loop);
    };

    resize();
    draw();

    if (!reduced) {
      raf = window.requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reduced) {
          window.cancelAnimationFrame(raf);
          raf = window.requestAnimationFrame(loop);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(raf);
      } else if (visible && !reduced) {
        window.cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("h-full w-full", className)} />;
}
