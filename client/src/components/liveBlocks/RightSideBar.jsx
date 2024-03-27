import React, { useEffect, useMemo, useRef } from 'react';
import { modifyShape } from '../../lib/shapes';
import Dimensions from './settings/Dimensions';
import CustomText from './settings/CustomText';
import Color from './settings/Color';
import Export from './settings/Export';

const RightSideBar = ({
  elementAttributes,
  setElementAttributes,
  fabricRef,
  activeObjectRef,
  isEditingRef,
  syncShapeInStorage,
}) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property, value) => {
    if (!isEditingRef.current) isEditingRef.current = true;

    setElementAttributes((prev) => ({ ...prev, [property]: value }));

    modifyShape({
      canvas: fabricRef.current,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  const memoizedContent = useMemo(
    () => (
      <section className='hidden bg-[#1F2937] md:flex flex-col w-[200px] h-full select-none'>
        <h3 className='px-5 pt-4 text-xs uppercase border-b pb-1 text-center'>
          Design
        </h3>
        <Dimensions
          isEditingRef={isEditingRef}
          width={elementAttributes.width}
          height={elementAttributes.height}
          handleInputChange={handleInputChange}
        />

        <CustomText
          fontFamily={elementAttributes.fontFamily}
          fontSize={elementAttributes.fontSize}
          fontWeight={elementAttributes.fontWeight}
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={colorInputRef}
          attribute={elementAttributes.fill}
          placeholder='color'
          attributeType='fill'
          handleInputChange={handleInputChange}
        />

        <Color
          inputRef={strokeInputRef}
          attribute={elementAttributes.stroke}
          placeholder='stroke'
          attributeType='stroke'
          handleInputChange={handleInputChange}
        />

        <Export />
      </section>
    ),
    [elementAttributes]
  );
  return memoizedContent;
};

export default RightSideBar;
