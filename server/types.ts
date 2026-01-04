export type DrawEvent =
  | {
      type: "DRAW";
      x: number;
      y: number;
    }
  | {
      type: "SHAPE";
      shape: "CIRCLE" | "RECTANGLE" | "FREE";
      points: [number, number][];
    };