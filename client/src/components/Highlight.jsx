const Highlight = ({ imgSrc }) => {
  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <div className='w-[300px] h-[150px] lg:w-[250px] lg:h-[150px] xl:w-[380px] xl:h-[250px]'>
        <img src={imgSrc} className='h-full w-full' />
      </div>
    </div>
  );
};

export default Highlight;
