import emptyImage from '../assets/images/empty-inbox-flatline.svg';

const EmptyBoards = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <div className='w-[200px] h-[200px]'>
        <img
          src={emptyImage}
          alt='empty_image'
          className='h-full w-full object-cover'
        />
      </div>
      <div className='flex gap-10'>
        <p className='text-xl font-bold'>There is no Boards</p>
        <button className='bg-[#DFB700] text-black font-semibold p-1 rounded-md'>
          New Board
        </button>
      </div>
    </div>
  );
};

export default EmptyBoards;
