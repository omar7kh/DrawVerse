import Shape from '../../assets/images/Rectangle.svg';
import { Logo } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { FaEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import Cookies from 'js-cookie';

const LogIn = () => {
  const { backendApiUrl, setUserId, userData, setUserData } =
    useContext(UserContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isAuthTrue, setIsAuthTrue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });
  const [unauthenticatedMsg, setUnauthenticatedMsg] = useState('');

  const handleDataChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backendApiUrl}/signIn`, userData, {
        withCredentials: true,
      });
      // for deployment it should be fixed
      localStorage.setItem('JWTinfo', res.data.token);
      // on deployment not work
      // Cookies.set('JWTinfo', res.data.token);
      if (res.data.error) {
        setUnauthenticatedMsg(() => res.data.error);
      }
      if (res.data.errors) {
        const errors = {};
        res.data.errors.forEach((error) => {
          errors[error.path] = error.msg;
        });

        setFieldErrors(errors);
        setLoading(false);
        setIsAuthTrue(false);
        console.log(errors);
      } else if (res.data.success) {
        const userId = res.data.userId;
        localStorage.setItem('userId', userId);
        navigate('/main');
        setUserData({
          userName: res.data.username,
          email: res.data.email,
          password: userData.password,
        });
      } else {
        setFieldErrors((error) => error === '');
        setLoading(false);
        setIsAuthTrue(true);
      }
    } catch (error) {
      console.log('error while logging in:', error);
    }
  };

  return (
    <div className='main-container bg-[#DFB700] w-full z-0 min-h-screen relative overflow-hidden'>
      <Logo
        width={40}
        height={40}
        textClasses='font-bold text-sm md:text-xl lg:text-2xl'
        divStyle='absolute left-10 top-5 text-white'
      />

      <div className='min-h-screen w-[55%] absolute top-0 bottom-0 -z-10'>
        <img
          src={Shape}
          className='w-full h-full object-cover object-right '
          alt='background'
        />
      </div>

      <div className='h-[840px] flex justify-center items-center'>
        <div className='w-96 min-h-96 bg-[#1F2937] p-5 opacity-95 relative flex flex-col justify-center items-center rounded-3xl shadow-[-15px_-10px_4px_1px_rgba(0,0,0,0.5)]'>
          <h2 className='title text-white mb-4 text-xl w-full text-center'>
            <span className='text-[#DFB700]'>Welcome to</span> DrawVerse
          </h2>

          <form
            onSubmit={handleFormSubmit}
            className='flex flex-col gap-2 text-white w-full h-full'
          >
            <label htmlFor='email'>
              E-mail:
              <input
                className='w-full block rounded-md p-1 leading-7 text-black'
                type='email'
                id='email'
                name='email'
                placeholder='Enter your Email'
                onChange={handleDataChange}
              />
            </label>
            {fieldErrors.email && (
              <span className='bg-red-700 text-sm p-1 mb-2 block w-fit max-w-[330px] rounded-md'>
                {fieldErrors.email}
              </span>
            )}
            <div className='relative'>
              <label htmlFor='password'>
                Password:
                <input
                  className={`w-full block rounded-md p-1 pr-8 leading-7 text-black`}
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='Enter your Password'
                  onChange={handleDataChange}
                  autoComplete='true'
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-2 top-[30px] mt-1 text-black hover:cursor-pointer'
                  />
                ) : (
                  <FaRegEye
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-2 top-[30px] mt-1 text-black hover:cursor-pointer'
                  />
                )}
              </label>
            </div>
            {fieldErrors.password && (
              <span className='bg-red-700 text-sm p-1 mb-2 block w-fit max-w-[330px] rounded-md'>
                {fieldErrors.password}
              </span>
            )}

            {unauthenticatedMsg && (
              <span className='bg-red-700 text-sm p-1 mb-2 block w-fit max-w-[330px] rounded-md'>
                {unauthenticatedMsg}
              </span>
            )}

            {loading ? (
              <button
                disabled
                className='font-bold bg-[#DFB700] text-black w-full p-2 mb-3 rounded-md flex justify-center items-center cursor-wait'
              >
                <svg
                  aria-hidden='true'
                  role='status'
                  className='inline w-4 h-4 me-3 text-black animate-spin'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='#E5E7EB'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentColor'
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <button
                className='font-bold bg-[#DFB700] text-black w-full mx-auto transition-colors delay-75 duration-500 text-textWhite block rounded-md p-2 mb-3 border border-[#0b1c34] hover:border-black'
                type='submit'
              >
                Log In
              </button>
            )}
          </form>
          <div className='flex gap-3 items-center mt-3'>
            <hr className='w-28 h-1 decoration-white' />
            <h3 className='text-white'>OR</h3>
            <hr className='w-28 h-1 decoration-white' />
          </div>
          <p className='text-white'>
            Don't have account?{' '}
            <Link to='/signup' className='text-[#DFB700] ml-2 hover:underline'>
              Sign Up
            </Link>{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
