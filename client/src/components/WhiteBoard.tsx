import { useEffect, useRef } from "react";
import { socket } from "../hooks/useSocket";

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Track the last point to draw continuous lines
  const prevPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Set default styles
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "black";

    socket.on("draw", (data) => {
      if (data.type === "DRAW") {
        const { x, y } = data;

        if (prevPoint.current) {
          ctx.beginPath();
          ctx.moveTo(prevPoint.current.x, prevPoint.current.y);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // Update last point
        prevPoint.current = { x, y };
      }

      if (data.type === "SHAPE") {
        // Reset the previous point so we don't connect shape to next drawing immediately
        prevPoint.current = null;

        ctx.beginPath();
        ctx.strokeStyle = "red"; // Distinct color for shapes
        ctx.lineWidth = 5;

        const pts = data.points;

        if (data.shape === "CIRCLE") {
          if (pts.length > 0) {
            const centerX = pts.reduce((a: number, p: any) => a + p[0], 0) / pts.length;
            const centerY = pts.reduce((a: number, p: any) => a + p[1], 0) / pts.length;
            // Radius estimation
            const radius = Math.hypot(pts[0][0] - centerX, pts[0][1] - centerY);
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          }
        } else if (data.shape === "RECTANGLE") {
          if (pts.length > 0) {
            const xs = pts.map((p: any) => p[0]);
            const ys = pts.map((p: any) => p[1]);
            const minX = Math.min(...xs);
            const minY = Math.min(...ys);
            const width = Math.max(...xs) - minX;
            const height = Math.max(...ys) - minY;
            ctx.rect(minX, minY, width, height);
          }
        }

        ctx.stroke();

        // Reset style
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
      }

      // Clear event to reset drawing state if needed? 
      // Actually, if we stop receiving DRAW events, prevPoint stays. 
      // Ideally we should timeout or detect "finger up", but backend doesn't send it.
      // We will assume continuous stream for now. 
      // If the jump is too big, maybe reset?
    });

    // Cleanup
    return () => {
      socket.off("draw");
    };

  }, []);

  return (
    <div className="whiteboard-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="whiteboard-canvas"
      />
      <div className="instructions">
        <p>1. Raise index finger to <b>DRAW</b></p>
        <p>2. Draw a shape (Circle/Rectangle) to <b>DETECT</b></p>
      </div>
    </div>
  );
}