export type PaperSize = 'A4' | 'Letter' | 'Legal';
export type Orientation = 'Portrait' | 'Landscape';

export const PAPER_SIZES: Record<PaperSize, { width: number; height: number }> = {
  A4: { width: 595.28, height: 841.89 }, // points
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
};
