import React, { useMemo } from 'react';
import { getShapeInfo } from '../../lib/utils';

const LeftSideBar = ({ allShapes }) => {
  const memoizedShapes = useMemo(
    () => (
      <section className='hidden bg-[#1F2937] md:flex flex-col w-[200px] h-full select-none overflow-y-auto pb-20'>
        <h3 className='px-5 py-4 text-xs uppercase border-b pb-1 text-center'>
          Layers
        </h3>
        <div className='flex flex-col'>
          {allShapes?.map((shape) => {
            const info = getShapeInfo(shape[1]?.type);

            return (
              <div
                key={shape[1]?.objectId}
                className='group my-1 flex items-center gap-2 px-5 py-2.5'
              >
                <img src={info?.icon} alt='Layer' width={16} height={16} />
                <h3 className='text-sm font-semibold capitalize'>
                  {info.name}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    ),
    [allShapes?.length]
  );
  return memoizedShapes;
};

export default LeftSideBar;
