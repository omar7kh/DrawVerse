import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';

const DropdownMenu = () => {
  const navigate = useNavigate();
  const {
    backendApiUrl,
    isAuthenticated,
    checkIfIsAuthenticated,
    setIsAuthenticated,
  } = useContext(UserContext);

  useEffect(() => {
    setIsAuthenticated(false);
    const check = async () => {
      const checkResult = await checkIfIsAuthenticated();

      if (!checkResult) {
        navigate('/');
      }
    };
    check();
  }, []);

  const handleLogout = () => {
    const axiosInstance = axios.create({
      withCredentials: true,
    });
    axiosInstance
      .post(`${backendApiUrl}/logout`)
      .then((res) => {
        navigate('/login');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='absolute top-16 right-16 bg-gray-800 p-2 rounded-lg border border-[#DFB700]'>
      <ul className='text-white'>
        {!isAuthenticated ? (
          <>
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
          </>
        ) : (
          <>
            <li
              className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b-2 hover:border-[#DFB700] delay-75 duration-150'
              onClick={() => navigate('/profile')}
            >
              Profile
            </li>
            <li
              className='cursor-pointer hover:bg-slate-800 p-1 border-gray-800 border-b-2 hover:border-[#DFB700] delay-75 duration-150'
              onClick={handleLogout}
            >
              Logout
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DropdownMenu;
