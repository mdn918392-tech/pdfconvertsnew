export type PaperSize = "A4" | "A3" | "Letter" | "Legal" | "Custom";
export type Orientation = "Portrait" | "Landscape";
export type RotationDegree = 90 | 180 | 270;

export type MarginSize = "no-margin" | "small" | "big";

export interface PaperDimensions {
  width: number;
  height: number;
}

export const PAPER_SIZES: Record<PaperSize, PaperDimensions> = {
  A4: { width: 595, height: 842 },
  A3: { width: 842, height: 1191 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
  Custom: { width: 600, height: 800 },
};

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: "pdf" | "image" | "convert";




  
  
  color: string;
  href: string;
 
}
