import Shape from '../../assets/images/Rectangle.svg';
import { Logo } from '../../components';
import { useGoogleLogin } from '@react-oauth/google';
import Buttons from '../../components/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { FaEyeSlash } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';

const SignUp = () => {
  const navigate = useNavigate();

  const { backendApiUrl } = useContext(UserContext);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleFormChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value.toLowerCase() });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backendApiUrl}/signup`, userData);

      if (res.data.errors) {
        const errors = {};
        res.data.errors.forEach((error) => {
          errors[error.path] = error.msg;
        });
        console.log(errors);

        setFieldErrors(errors);
        setLoading(false);
      } else {
        navigate('/login');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className='main-container bg-[#DFB700] w-full min-h-screen z-0 relative overflow-hidden'>
      <div className='flex gap-4 items-center ml-5 mt-5'>
        <Logo
          width={40}
          height={40}
          textClasses='font-bold text-sm md:text-xl lg:text-2xl'
          divStyle='absolute left-10 top-5 text-white'
        />
      </div>

      <div className='min-h-screen w-[55%] absolute top-0 bottom-0 -z-10'>
        <img
          src={Shape}
          className='w-full h-full object-cover object-right '
          alt='background'
        />
      </div>

      <div className='h-[840px] w-full flex justify-center items-center'>
        <div className='w-96 min-h-[450px] bg-[#1F2937] opacity-95 relative flex flex-col p-5 justify-center items-center rounded-3xl shadow-[-15px_-10px_4px_1px_rgba(0,0,0,0.5)]'>
          <h2 className='title text-white mb-4 text-xl w-full text-center'>
            <span className='text-[#DFB700]'>Welcome to</span> DrawVerse
          </h2>
          <form
            className='flex w-full h-full flex-col gap-2 text-white'
            onSubmit={handleFormSubmit}
            noValidate
          >
            <div>
              <label htmlFor='userName'>User Name</label>
              <input
                className='w-full block rounded-md p-1 leading-7 text-black mb-1'
                type='text'
                id='userName'
                name='username'
                onChange={(e) => handleFormChange(e)}
              />
              {fieldErrors.username && (
                <span className='bg-red-700 text-sm p-1 mb-2 block w-fit max-w-[330px] rounded-md'>
                  {fieldErrors.username}
                </span>
              )}
            </div>

            <div>
              <label htmlFor='email'>Email</label>
              <input
                className='w-full block rounded-md p-1 leading-7 text-black mb-1'
                type='email'
                id='email'
                name='email'
                onChange={(e) => handleFormChange(e)}
              />
              {fieldErrors.email && (
                <span className='bg-red-700 text-sm p-1 mb-2 block w-fit max-w-[330px] rounded-md'>
                  {fieldErrors.email}
                </span>
              )}
            </div>

            <div>
              <div className='relative'>
                <label htmlFor='password'>Password</label>
                <input
                  className='w-full block rounded-md p-1 pr-8 leading-7 text-black mb-1'
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  onChange={(e) => handleFormChange(e)}
                />

                {!showPassword ? (
                  <FaRegEye
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-2 bottom-[9px] text-black hover:cursor-pointer'
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-2 bottom-[9px] text-black hover:cursor-pointer'
                  />
                )}
              </div>

              {fieldErrors.password && (
                <span className='bg-red-700 text-sm p-1 mb-2 block w-fit max-w-[330px] rounded-md'>
                  {fieldErrors.password}
                </span>
              )}
            </div>

            <button
              type='submit'
              className='font-bold bg-[#DFB700] text-black w-full mx-auto transition-colors delay-75 duration-500 text-textWhite block rounded-md p-2 mb-3 border border-[#0b1c34] hover:border-black'
            >
              Sign Up
            </button>

            <div className='flex  gap-3 justify-center items-center mt-3'>
              <hr className='w-28 h-1 decoration-white ' />
              <h3 className='text-white'>OR</h3>
              <hr className='w-28 h-1 decoration-white ' />
            </div>

            <p className='text-white flex justify-center'>
              Have you already an account?{' '}
              <Link to='/login' className='text-[#DFB700] ml-2 hover:underline'>
                Log In
              </Link>{' '}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
