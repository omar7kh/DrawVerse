import { useMutation } from '../../../liveblocks.config';
import { defaultNavElement, navElements } from '../../constants';
import { handleDelete } from '../../lib/shapes';
import ShapesMenu from './shapesMenu';

const ToolBar = ({
  fabricRef,
  setActiveElement,
  activeElement,
  imageInputRef,
  selectedShapeRef,
}) => {
  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get('canvasObjects');
    if (!canvasObjects || canvasObjects.size === 0) return true;
    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key);
    }
    return canvasObjects.size === 0;
  }, []);

  const deleteShapeFromStorage = useMutation(({ storage }, shapeId) => {
    const canvasObjects = storage.get('canvasObjects');
    canvasObjects.delete(shapeId);
  }, []);

  const handleActiveElement = (elem) => {
    setActiveElement(elem);

    switch (elem?.value) {
      case 'reset':
        deleteAllShapes();
        fabricRef.current?.clear();
        setActiveElement(defaultNavElement);
        break;

      case 'delete':
        handleDelete(fabricRef.current, deleteShapeFromStorage);
        setActiveElement(defaultNavElement);
        break;

      default:
        selectedShapeRef.current = elem?.value;
        break;
    }
  };

  const isActive = (value) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  return (
    <ul className='h-16 absolute -top-16 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex'>
      {navElements.map((item) => (
        <li
          key={item.name}
          onClick={() => {
            if (Array.isArray(item.value)) return;
            handleActiveElement(item);
          }}
          className={`group w-10 px-2.5 py-4 flex justify-center items-center
            ${isActive(item.value) ? 'bg-yellow-500' : 'hover:bg-stone-800'}
            `}
        >
          {Array.isArray(item.value) ? (
            <ShapesMenu
              item={item}
              activeElement={activeElement}
              imageInputRef={imageInputRef}
              handleActiveElement={handleActiveElement}
            />
          ) : (
            <button className='relative w-5 h-5 object-contain'>
              <img
                src={item.icon}
                alt={item.name}
                className={isActive(item.value) ? 'invert' : ''}
              />
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ToolBar;
