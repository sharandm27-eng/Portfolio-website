import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

interface Point {
  x: number;
  y: number;
}

interface Bolt {
  points: Point[];
  branches: { points: Point[]; alpha: number }[];
  color: string;
  glowColor: string;
  thickness: number;
  maxAlpha: number;
  fadeSpeed: number;
  alpha: number;
}

export function LightningStrike() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [flashAlpha, setFlashAlpha] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Store active lightning bolts and current flash alpha value in refs to avoid useEffect closure warning
  const boltsRef = useRef<Bolt[]>([]);
  const strikeProgressRef = useRef(0); // 0 to 1 for downward strike animation
  const flashAlphaRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Only play lightning strike on the home/landing page
    if (pathname !== "/") {
      setIsActive(false);
      return;
    }

    if (isMobile) {
      setIsActive(true);

      const startTime = performance.now();
      let animId: number;

      const animateMobileFlash = (time: number) => {
        const elapsed = time - startTime;
        const duration = 450; // 450ms total transition

        if (elapsed >= duration) {
          setFlashAlpha(0);
          setIsActive(false);
          return;
        }

        // Double-peak lightning flash signature (highly performant and responsive on mobile screen sizes)
        let alpha = 0;
        if (elapsed < 120) {
          // First peak (up to 0.35, then decay to 0.05)
          const t = elapsed / 120;
          alpha = t < 0.3 ? (t / 0.3) * 0.35 : 0.35 - ((t - 0.3) / 0.7) * 0.3;
        } else if (elapsed < 350) {
          // Second peak (up to 0.5, then decay to 0.05)
          const t = (elapsed - 120) / 230;
          alpha = t < 0.25 ? 0.05 + (t / 0.25) * 0.45 : 0.5 - ((t - 0.25) / 0.75) * 0.45;
        } else {
          // Final decay to 0
          const t = (elapsed - 350) / 100;
          alpha = 0.05 * (1 - t);
        }

        setFlashAlpha(Math.max(0, alpha));
        animId = requestAnimationFrame(animateMobileFlash);
      };

      animId = requestAnimationFrame(animateMobileFlash);
      return () => {
        cancelAnimationFrame(animId);
      };
    }

    // Start lightning transition on path change (Desktop Only)
    setIsActive(true);
    strikeProgressRef.current = 0;
    flashAlphaRef.current = 0.35;
    setFlashAlpha(0.35); // Initial sky flash

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle viewport resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate main lightning bolt points
    const generateBoltPoints = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      displace: number,
    ): Point[] => {
      const points: Point[] = [{ x: startX, y: startY }];

      const subdivide = (p1: Point, p2: Point, disp: number) => {
        const midY = (p1.y + p2.y) / 2;
        if (p2.y - p1.y < 8) return;

        // Perpendicular displacement
        const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * disp;
        const midPoint = { x: midX, y: midY };

        subdivide(p1, midPoint, disp / 2);
        points.push(midPoint);
        subdivide(midPoint, p2, disp / 2);
      };

      subdivide({ x: startX, y: startY }, { x: endX, y: endY }, displace);
      points.push({ x: endX, y: endY });

      // Sort points by Y coordinate to ensure top-to-bottom order
      points.sort((a, b) => a.y - b.y);
      return points;
    };

    // Generate lightning bolt details
    const startX = Math.random() * (canvas.width * 0.6) + canvas.width * 0.2;
    const endX = startX + (Math.random() - 0.5) * 150;
    const mainPoints = generateBoltPoints(startX, 0, endX, canvas.height, 120);

    // Generate branches
    const branches: { points: Point[]; alpha: number }[] = [];
    for (let i = 2; i < mainPoints.length - 2; i += 3) {
      if (Math.random() < 0.45) {
        const bp = mainPoints[i];
        const angle = Math.PI / 3 + Math.random() * (Math.PI / 3); // slant downwards
        const direction = Math.random() < 0.5 ? -1 : 1;
        const branchLength = Math.random() * 120 + 80;
        const bx = bp.x + Math.cos(angle) * branchLength * direction;
        const by = bp.y + Math.sin(angle) * branchLength;

        const branchPoints = generateBoltPoints(bp.x, bp.y, bx, Math.min(by, canvas.height), 40);
        branches.push({ points: branchPoints, alpha: 1.0 });
      }
    }

    // Build bolt object
    boltsRef.current = [
      {
        points: mainPoints,
        branches,
        color: "#ffffff",
        glowColor: Math.random() < 0.5 ? "rgba(255, 60, 0, 1)" : "rgba(255, 120, 0, 1)", // Red/Orange glow
        thickness: 2.5,
        maxAlpha: 1.0,
        fadeSpeed: 0.02,
        alpha: 1.0,
      },
    ];

    // Play secondary smaller bolt slightly delayed
    const secTimer = setTimeout(() => {
      const secStartX = startX + (Math.random() - 0.5) * 200;
      const secEndX = secStartX + (Math.random() - 0.5) * 100;
      const secPoints = generateBoltPoints(secStartX, 0, secEndX, canvas.height * 0.85, 80);

      boltsRef.current.push({
        points: secPoints,
        branches: [],
        color: "#ffffff",
        glowColor: "rgba(255, 30, 0, 0.8)", // Intense Red
        thickness: 1.5,
        maxAlpha: 0.8,
        fadeSpeed: 0.035,
        alpha: 0.8,
      });
    }, 200);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Advance strike descending progress
      if (strikeProgressRef.current < 1) {
        strikeProgressRef.current += 0.08; // Descend over ~12 frames (200ms)
        if (strikeProgressRef.current >= 1) {
          strikeProgressRef.current = 1;
          flashAlphaRef.current = 0.5;
          setFlashAlpha(0.5); // Flash bright when it hits ground
        }
      }

      // 2. Render each active lightning bolt
      boltsRef.current.forEach((bolt) => {
        if (bolt.alpha <= 0) return;

        // Draw bolt lines using composite operation to glow
        ctx.globalCompositeOperation = "lighter";

        // Filter points by current strike progress
        const visiblePointsCount = Math.floor(bolt.points.length * strikeProgressRef.current);
        if (visiblePointsCount < 2) return;

        // Draw outer thick color glow
        ctx.shadowBlur = 18;
        ctx.shadowColor = bolt.glowColor;
        ctx.strokeStyle = bolt.glowColor;
        ctx.lineWidth = bolt.thickness * 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = bolt.alpha;

        ctx.beginPath();
        ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
        for (let i = 1; i < visiblePointsCount; i++) {
          ctx.lineTo(bolt.points[i].x, bolt.points[i].y);
        }
        ctx.stroke();

        // Draw white hot core
        ctx.shadowBlur = 0;
        ctx.strokeStyle = bolt.color;
        ctx.lineWidth = bolt.thickness;
        ctx.stroke();

        // Draw visible branch bolts
        bolt.branches.forEach((branch) => {
          // Only show branches if parent joint is visible
          const rootY = branch.points[0].y;
          const parentJointIndex = bolt.points.findIndex((p) => p.y === rootY);
          if (parentJointIndex !== -1 && parentJointIndex > visiblePointsCount) return;

          ctx.shadowBlur = 10;
          ctx.strokeStyle = bolt.glowColor;
          ctx.lineWidth = bolt.thickness * 1.2;
          ctx.globalAlpha = bolt.alpha * branch.alpha;

          ctx.beginPath();
          ctx.moveTo(branch.points[0].x, branch.points[0].y);
          for (let i = 1; i < branch.points.length; i++) {
            ctx.lineTo(branch.points[i].x, branch.points[i].y);
          }
          ctx.stroke();

          // Branch core
          ctx.shadowBlur = 0;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = bolt.thickness * 0.5;
          ctx.stroke();
        });

        // Decay bolt opacity
        bolt.alpha -= bolt.fadeSpeed;
      });

      // Decay background flash opacity
      flashAlphaRef.current = Math.max(0, flashAlphaRef.current - 0.015);
      setFlashAlpha(flashAlphaRef.current);

      // End animation after all bolts fade
      const anyActive = boltsRef.current.some((b) => b.alpha > 0);
      if (anyActive || strikeProgressRef.current < 1 || flashAlphaRef.current > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        setIsActive(false);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(secTimer);
    };
  }, [pathname, isMobile]);

  return (
    <>
      {/* Sky Flash Overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: `rgba(255, 75, 0, ${flashAlpha})`,
          pointerEvents: "none",
          zIndex: 84,
          transition: "background-color 0.05s ease-out",
          display: isActive ? "block" : "none",
        }}
      />
      {/* Lightning Canvas */}
      {!isMobile && (
        <canvas
          ref={canvasRef}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 85,
            display: isActive ? "block" : "none",
          }}
        />
      )}
    </>
  );
}
