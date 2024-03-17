import { useState } from 'react';

const ShapesMenu = ({ item, activeElement, handleActiveElement }) => {
  const isDropdownElem = item.value.some(
    (elem) => elem?.value === activeElement.value
  );
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      <button
        className='relative '
        onClick={() => {
          handleActiveElement(item);
          setToggleMenu(!toggleMenu);
        }}
      >
        <img
          src={isDropdownElem ? activeElement.icon : item.icon}
          alt={item.name}
          className={isDropdownElem ? 'invert' : ''}
        />
      </button>

      {toggleMenu && (
        <div className='mt-6 flex flex-col gap-y-1 border-none text-white absolute top-10 bg-black'>
          {item.value.map((elem) => (
            <button
              key={elem?.name}
              onClick={() => {
                setToggleMenu(false);
                handleActiveElement(elem);
              }}
              className={`flex justify-between gap-10 rounded-none px-5 py-3 focus:border-none ${
                activeElement.value === elem?.value
                  ? 'bg-yellow-400'
                  : 'hover:bg-stone-800'
              }`}
            >
              <div className='group flex items-center gap-2'>
                <img
                  src={elem?.icon}
                  alt={elem?.name}
                  width={20}
                  height={20}
                  className={
                    activeElement.value === elem?.value ? 'invert' : ''
                  }
                />
                <p
                  className={`text-xs ${
                    activeElement.value === elem?.value
                      ? 'text-black'
                      : 'text-white'
                  }`}
                >
                  {elem?.name}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default ShapesMenu;
