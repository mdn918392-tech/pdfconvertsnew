'use client';

import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { PAPER_SIZES, PaperSize, Orientation } from '../types';

/* ============================================================
   Helper: Fix SharedArrayBuffer → Blob
============================================================ */
function toPdfBlob(bytes: Uint8Array | ArrayBuffer | any): Blob {
  const uint8 = Uint8Array.from(bytes as any);
  return new Blob([uint8.buffer], { type: "application/pdf" });
}

/* ============================================================
   IMAGE → PDF
============================================================ */
export async function imageToPdf(files: File[], paperSize: PaperSize, orientation: Orientation): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let dims = PAPER_SIZES[paperSize];

  if (orientation === 'Landscape') {
    dims = { width: dims.height, height: dims.width };
  }

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const image = file.type === 'image/png'
      ? await pdfDoc.embedPng(arrayBuffer)
      : await pdfDoc.embedJpg(arrayBuffer);

    const page = pdfDoc.addPage([dims.width, dims.height]);
    const imgDims = image.scale(1);

    const scale = Math.min(dims.width / imgDims.width, dims.height / imgDims.height);
    const scaledWidth = imgDims.width * scale;
    const scaledHeight = imgDims.height * scale;

    page.drawImage(image, {
      x: (dims.width - scaledWidth) / 2,
      y: (dims.height - scaledHeight) / 2,
      width: scaledWidth,
      height: scaledHeight,
    });
  }

  const bytes = await pdfDoc.save();
  return toPdfBlob(bytes);
}

/* ============================================================
   MERGE PDFs
============================================================ */
export async function mergePdfs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach(p => mergedPdf.addPage(p));
  }

  const bytes = await mergedPdf.save();
  return toPdfBlob(bytes);
}

/* ============================================================
   SPLIT PDF
============================================================ */
export async function splitPdf(file: File): Promise<Blob[]> {
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  const result: Blob[] = [];

  for (let i = 0; i < pdf.getPageCount(); i++) {
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(page);

    const bytes = await newPdf.save();
    result.push(toPdfBlob(bytes));
  }

  return result;
}

/* ============================================================
   EXTRACT PAGES
============================================================ */
export async function extractPages(file: File, pageNumbers: number[]): Promise<Blob> {
  const pdf = await PDFDocument.load(await file.arrayBuffer());

  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdf, pageNumbers.map(n => n - 1));
  pages.forEach(p => newPdf.addPage(p));

  const bytes = await newPdf.save();
  return toPdfBlob(bytes);
}

/* ============================================================
   REMOVE PAGES
============================================================ */
export async function removePages(file: File, pageNumbers: number[]): Promise<Blob> {
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  const count = pdf.getPageCount();

  const keep = Array.from({ length: count }, (_, i) => i + 1)
    .filter(n => !pageNumbers.includes(n))
    .map(n => n - 1);

  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdf, keep);
  pages.forEach(p => newPdf.addPage(p));

  const bytes = await newPdf.save();
  return toPdfBlob(bytes);
}

/* ============================================================
   ROTATE PDF
============================================================ */
export async function rotatePdf(file: File, rotationData: number | number[]): Promise<Blob> {
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  const pages = pdf.getPages();

  if (typeof rotationData === 'number') {
    pages.forEach(p => p.setRotation(degrees(rotationData)));
  } else {
    pages.forEach((p, i) => p.setRotation(degrees(rotationData[i])));
  }

  const bytes = await pdf.save();
  return toPdfBlob(bytes);
}

/* ============================================================
   COMPRESS PDF
============================================================ */
export async function compressPdf(file: File): Promise<Blob> {
  const pdf = await PDFDocument.load(await file.arrayBuffer());
  const bytes = await pdf.save({ useObjectStreams: true });

  return toPdfBlob(bytes);
}
