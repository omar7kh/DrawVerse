import jsPDF from 'jspdf';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getShapeInfo = (shapeType) => {
  switch (shapeType) {
    case 'rect':
      return {
        icon: '/icons/rectangle.svg',
        name: 'Rectangle',
      };

    case 'circle':
      return {
        icon: '/icons/circle.svg',
        name: 'Circle',
      };

    case 'triangle':
      return {
        icon: '/icons/triangle.svg',
        name: 'Triangle',
      };

    case 'line':
      return {
        icon: '/icons/line.svg',
        name: 'Line',
      };

    case 'i-text':
      return {
        icon: '/icons/text.svg',
        name: 'Text',
      };

    case 'freeform':
      return {
        icon: '/icons/freeform.svg',
        name: 'Free Drawing',
      };

    default:
      return {
        icon: '/icons/rectangle.svg',
        name: shapeType,
      };
  }
};

export const exportToPdf = () => {
  const canvas = document.querySelector('canvas');

  if (!canvas) return;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  const data = canvas.toDataURL();

  doc.addImage(data, 'PNG', 0, 0, canvas.width, canvas.height);

  doc.save('DrawVerse.pdf');
};
