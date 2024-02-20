import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <main className='select-none'>
      <Outlet />
    </main>
  );
};

export default Root;
