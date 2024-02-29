import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <main className='select-none h-screen w-full bg-[#1F2937]'>
      <Outlet />
    </main>
  );
};

export default Root;
