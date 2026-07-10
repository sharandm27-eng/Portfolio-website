import { useEffect, useRef, useState } from "react";

interface ElectricSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  decay: number;
  color: string;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  // Position history for lightning discharge targets
  const trailLength = 8;
  const segmentsRef = useRef<{ x: number; y: number }[]>([]);
  const sparksRef = useRef<ElectricSpark[]>([]);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    segmentsRef.current = Array.from({ length: trailLength }, () => ({
      x: -1000,
      y: -1000,
    }));

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("[data-cursor]") ||
          target.closest('[role="button"]') ||
          window.getComputedStyle(target).cursor === "pointer")
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    let animationFrameId: number;
    let targetOrbRadius = 8;
    let currentOrbRadius = 8;

    // Helper to draw a single lightning path
    const drawLightningBolt = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      color: string,
      glowColor: string,
      thickness: number,
      glowSize: number,
    ) => {
      const dx = endX - startX;
      const dy = endY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 4) return;

      const segments: { x: number; y: number }[] = [{ x: startX, y: startY }];
      const divisions = Math.max(3, Math.floor(distance / 10));
      const angle = Math.atan2(dy, dx);

      for (let i = 1; i < divisions; i++) {
        const ratio = i / divisions;
        const baseX = startX + dx * ratio;
        const baseY = startY + dy * ratio;

        // Jagged offset perpendicular to bolt direction
        const maxOffset = 5 + (Math.random() - 0.5) * 3;
        const offsetAngle = angle + Math.PI / 2 + (Math.random() < 0.5 ? 0 : Math.PI);
        const offsetDist = (Math.random() - 0.5) * maxOffset * 1.8;

        segments.push({
          x: baseX + Math.cos(offsetAngle) * offsetDist,
          y: baseY + Math.sin(offsetAngle) * offsetDist,
        });
      }
      segments.push({ x: endX, y: endY });

      // Draw outer lightning glow
      ctx.shadowBlur = glowSize;
      ctx.shadowColor = glowColor;
      ctx.strokeStyle = glowColor;
      ctx.lineWidth = thickness * 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(segments[0].x, segments[0].y);
      for (let i = 1; i < segments.length; i++) {
        ctx.lineTo(segments[i].x, segments[i].y);
      }
      ctx.stroke();

      // Draw white hot inner core
      ctx.shadowBlur = 0;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = thickness;
      ctx.stroke();

      // Draw branches
      for (let i = 1; i < segments.length - 1; i++) {
        if (Math.random() < 0.15) {
          const branchStartX = segments[i].x;
          const branchStartY = segments[i].y;
          const branchAngle = angle + (Math.random() - 0.5) * 1.6;
          const branchLength = (1 - i / segments.length) * distance * 0.4;

          const branchEndX = branchStartX + Math.cos(branchAngle) * branchLength;
          const branchEndY = branchStartY + Math.sin(branchAngle) * branchLength;

          ctx.shadowBlur = glowSize * 0.7;
          ctx.shadowColor = glowColor;
          ctx.strokeStyle = glowColor;
          ctx.lineWidth = thickness * 1.2;

          ctx.beginPath();
          ctx.moveTo(branchStartX, branchStartY);

          // midpoint displacement for branch
          const mx = (branchStartX + branchEndX) / 2 + (Math.random() - 0.5) * 4;
          const my = (branchStartY + branchEndY) / 2 + (Math.random() - 0.5) * 4;
          ctx.lineTo(mx, my);
          ctx.lineTo(branchEndX, branchEndY);
          ctx.stroke();

          // Branch core
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = thickness * 0.6;
          ctx.stroke();
        }
      }
    };

    const updateAndDraw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const segments = segmentsRef.current;

      // Rotate HUD elements
      rotationRef.current += 0.04;

      // Handle hover scale transitions
      targetOrbRadius = isHovered ? 14 : 8;
      currentOrbRadius += (targetOrbRadius - currentOrbRadius) * 0.15;

      // Easing segment history targets
      if (mouse.x !== -1000) {
        if (segments[0].x === -1000) {
          for (let i = 0; i < trailLength; i++) {
            segments[i].x = mouse.x;
            segments[i].y = mouse.y;
          }
        } else {
          segments[0].x += (mouse.x - segments[0].x) * 0.4;
          segments[0].y += (mouse.y - segments[0].y) * 0.4;
        }

        for (let i = 1; i < trailLength; i++) {
          segments[i].x += (segments[i - 1].x - segments[i].x) * 0.3;
          segments[i].y += (segments[i - 1].y - segments[i].y) * 0.3;
        }
      }

      // Draw lightning discharge lines (crackling behind head)
      if (mouse.x !== -1000 && time - lastTimeRef.current > 40) {
        // Spark combustion: add spark particles on discharge
        const sparksCount = Math.floor(Math.random() * 2) + 1;
        for (let s = 0; s < sparksCount; s++) {
          const spAngle = Math.random() * Math.PI * 2;
          const spSpeed = Math.random() * 3 + 2;
          sparksRef.current.push({
            x: segments[0].x,
            y: segments[0].y,
            vx: Math.cos(spAngle) * spSpeed,
            vy: Math.sin(spAngle) * spSpeed,
            length: Math.random() * 8 + 4,
            alpha: 1.0,
            decay: Math.random() * 0.04 + 0.03,
            color: Math.random() < 0.5 ? "rgba(0, 240, 255, " : "rgba(255, 110, 0, ",
          });
        }
        lastTimeRef.current = time;
      }

      // Draw Lightning discharges
      if (segments[0].x !== -1000) {
        ctx.globalCompositeOperation = "lighter";

        // Bolt 1: Cyan/Blue lightning discharges to mid-trail
        if (Math.random() < 0.65) {
          drawLightningBolt(
            segments[0].x,
            segments[0].y,
            segments[3].x + (Math.random() - 0.5) * 15,
            segments[3].y + (Math.random() - 0.5) * 15,
            "#ffffff",
            "rgba(0, 200, 255, 0.95)",
            1.2,
            12,
          );
        }

        // Bolt 2: Orange lightning discharges to end-trail
        if (Math.random() < 0.65) {
          drawLightningBolt(
            segments[0].x,
            segments[0].y,
            segments[6].x + (Math.random() - 0.5) * 15,
            segments[6].y + (Math.random() - 0.5) * 15,
            "#ffffff",
            "rgba(255, 100, 0, 0.95)",
            1.2,
            12,
          );
        }

        // Bolt 3: Short erratic grounding arcs discharge to nearby thin air (corona discharge)
        if (Math.random() < 0.3) {
          const randomArcAngle = Math.random() * Math.PI * 2;
          const arcDistance = Math.random() * 35 + 20;
          const tx = segments[0].x + Math.cos(randomArcAngle) * arcDistance;
          const ty = segments[0].y + Math.sin(randomArcAngle) * arcDistance;
          const randomColor =
            Math.random() < 0.5 ? "rgba(0, 200, 255, 0.9)" : "rgba(255, 100, 0, 0.9)";
          drawLightningBolt(segments[0].x, segments[0].y, tx, ty, "#ffffff", randomColor, 0.8, 8);
        }
      }

      // Update and draw spark particles
      const sparks = sparksRef.current;
      const survivingSparks: ElectricSpark[] = [];

      ctx.globalCompositeOperation = "lighter";
      ctx.shadowBlur = 0;

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;

        if (s.alpha > 0) {
          survivingSparks.push(s);

          ctx.beginPath();
          ctx.strokeStyle = `${s.color}${s.alpha})`;
          ctx.lineWidth = 1.5;
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 1.5, s.y - s.vy * 1.5);
          ctx.stroke();
        }
      }
      sparksRef.current = survivingSparks;

      // Draw Futuristic Crosshair Head
      if (segments[0].x !== -1000) {
        ctx.globalCompositeOperation = "source-over";
        ctx.shadowBlur = 0;

        const hx = segments[0].x;
        const hy = segments[0].y;

        // Draw HUD Outer Rotating Bracket (Cyan)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 240, 255, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.arc(
          hx,
          hy,
          currentOrbRadius * 1.6,
          rotationRef.current,
          rotationRef.current + Math.PI * 0.4,
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          hx,
          hy,
          currentOrbRadius * 1.6,
          rotationRef.current + Math.PI,
          rotationRef.current + Math.PI * 1.4,
        );
        ctx.stroke();

        // Draw HUD Inner Rotating Bracket (Orange - rotating backwards)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 100, 0, 0.85)";
        ctx.lineWidth = 1.2;
        ctx.arc(
          hx,
          hy,
          currentOrbRadius * 1.0,
          -rotationRef.current * 1.5,
          -rotationRef.current * 1.5 + Math.PI * 0.35,
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(
          hx,
          hy,
          currentOrbRadius * 1.0,
          -rotationRef.current * 1.5 + Math.PI,
          -rotationRef.current * 1.5 + Math.PI * 1.35,
        );
        ctx.stroke();

        // White glowing hot-spot core in center
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    animationFrameId = requestAnimationFrame(updateAndDraw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[99999] h-full w-full" />
  );
}
