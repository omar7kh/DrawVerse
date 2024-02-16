import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = () => {
  const navigate = useNavigate();

  return (
    <div className='absolute top-16 right-16 bg-gray-800 p-2 rounded-lg border border-[#DFB700]'>
      <ul className='text-white'>
        <li
          className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b-2 hover:border-[#DFB700] delay-75 duration-150'
          onClick={() => navigate('/profile')}
        >
          Profile
        </li>
        <li
          className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b-2 hover:border-[#DFB700] delay-75 duration-150'
          onClick={() => navigate('/login')}
        >
          LogIn
        </li>
        <li
          className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b-2 hover:border-[#DFB700] delay-75 duration-150'
          onClick={() => navigate('/signup')}
        >
          SignUp
        </li>
      </ul>
    </div>
  );
};

DropdownMenu.propTypes = {
  profile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
export default DropdownMenu;
