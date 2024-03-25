import { fabric } from 'fabric';
import { v4 as uuidv4 } from 'uuid';

export const createRectangle = (pointer) => {
  return new fabric.Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: '#2d2e2d',
    objectId: uuidv4(),
  });
};

export const createTriangle = (pointer) => {
  return new fabric.Triangle({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: '#2d2e2d',
    objectId: uuidv4(),
  });
};

export const createCircle = (pointer) => {
  return new fabric.Circle({
    left: pointer.x,
    top: pointer.y,
    radius: 50,
    fill: '#2d2e2d',
    objectId: uuidv4(),
  });
};

export const createLine = (pointer) => {
  return new fabric.Line(
    [pointer.x, pointer.y, pointer.x + 100, pointer.y + 100],
    {
      stroke: '#2d2e2d',
      strokeWidth: 2,
      objectId: uuidv4(),
    }
  );
};

export const createText = (pointer, text) => {
  return new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: '#2d2e2d',
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: '400',
    objectId: uuidv4(),
  });
};

export const createSpecificShape = (shapeType, pointer) => {
  switch (shapeType) {
    case 'rectangle':
      return createRectangle(pointer);

    case 'triangle':
      return createTriangle(pointer);

    case 'circle':
      return createCircle(pointer);

    case 'line':
      return createLine(pointer);

    case 'text':
      return createText(pointer, 'Tap to Type');

    default:
      return null;
  }
};

export const createShape = (canvas, pointer, shapeType) => {
  if (shapeType === 'freeform') {
    canvas.isDrawingMode = true;
    return null;
  }

  return createSpecificShape(shapeType, pointer);
};

export const modifyShape = ({
  canvas,
  property,
  value,
  activeObjectRef,
  syncShapeInStorage,
}) => {
  const selectedElement = canvas.getActiveObject();
  console.log('activeObjectRef.current', activeObjectRef.current);

  if (!selectedElement || selectedElement?.type === 'activeSelection') return;

  if (property === 'width') {
    selectedElement.set('scaleX', 1);
    selectedElement.set('width', value);
  } else if (property === 'height') {
    selectedElement.set('scaleY', 1);
    selectedElement.set('height', value);
  } else {
    if (selectedElement[property] === value) return;
    selectedElement.set(property, value);
  }

  activeObjectRef.current = selectedElement;

  syncShapeInStorage(selectedElement);
};

export const bringElement = ({ canvas, direction, syncShapeInStorage }) => {
  if (!canvas) return;

  const selectedElement = canvas.getActiveObject();

  if (!selectedElement || selectedElement.type === 'activeSelection') return;

  if (direction === 'front') {
    canvas.bringToFront(selectedElement);
  } else if (direction === 'back') {
    canvas.sendToBack(selectedElement);
  }

  syncShapeInStorage(selectedElement);
};

export const handleDelete = (canvas, deleteShapeFromStorage) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj) => {
      if (!obj.objectId) return;
      canvas.remove(obj);
      deleteShapeFromStorage(obj.objectId);
    });
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
};
