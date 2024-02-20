import bgYellow from '../assets/images/wave-haikei.svg';
import avatar from '../assets/images/person-img.jpeg';
import { TbPhotoEdit } from 'react-icons/tb';
import { useRef, useState } from 'react';
import { Logo } from '../components';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const fileInputRef = useRef(null);

  const handleFormChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFormRequest = (e) => {
    e.preventDefault();
  };

  const handleProfileImage = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    console.log('Selected file:', image);
  };

  console.log(showPassword);
  return (
    <div className='min-h-screen w-full bg-gray-800 text-white'>
      <div className='relative flex justify-center items-center'>
        <div className='w-full h-[210px]'>
          <img
            src={bgYellow}
            className='w-full h-full object-cover object-bottom'
          />
        </div>
        <Logo
          width={40}
          height={40}
          textClasses='font-bold text-sm md:text-xl lg:text-2xl'
          divStyle='absolute left-16 top-5'
        />
        <div className='w-[200px] h-[200px] absolute -bottom-16'>
          <img
            src={avatar}
            alt='avatar'
            className='w-full h-full object-cover rounded-full relative'
          />
          <TbPhotoEdit
            className='text-5xl absolute right-0 bottom-2 bg-gray-800 p-2 rounded-full cursor-pointer'
            onClick={handleProfileImage}
          />
        </div>
      </div>

      <span className='my-32 mb-16 block text-center font-semibold text-3xl'>
        Edit Profile
      </span>

      <input
        type='file'
        ref={fileInputRef}
        accept='image/*'
        onChange={handleImageChange}
        className='hidden'
      />

      <form
        onSubmit={handleFormRequest}
        className='w-[400px] pb-10 lg:w-[550px] mx-auto flex flex-col gap-5 justify-center items-center'
      >
        <div className='flex flex-col w-full'>
          <label htmlFor='userName'>User Name</label>
          <input
            className='w-full h-10 px-5 py-3 border-2 border-gray-800 text-black rounded-md'
            type='text'
            name='userName'
            id='userName'
            placeholder='Max Mustermann'
            onChange={(e) => handleFormChange(e)}
          />
        </div>

        <div className='flex flex-col w-full'>
          <label htmlFor='email'>Email</label>
          <input
            className='w-full h-10 px-5 py-3 border-2 border-gray-800 text-black rounded-md'
            type='email'
            name='email'
            id='email'
            placeholder='example@gmail.com'
            onChange={(e) => handleFormChange(e)}
          />
        </div>

        <div className='flex flex-col w-full relative'>
          <label htmlFor='password'>New Password</label>
          <input
            className='w-full h-10 pl-5 pr-8 py-3 border-2 border-gray-800 text-black rounded-md'
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            placeholder='New Password'
            onChange={(e) => handleFormChange(e)}
          />
          {!showPassword ? (
            <FaEye
              className='absolute bottom-3 right-3 text-black cursor-pointer'
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <FaEyeSlash
              className='absolute bottom-3 right-3 text-black cursor-pointer'
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <button
          type='submit'
          className='bg-[#DFB700] text-black p-2 rounded-md font-bold text-lg hover:scale-95 transition'
        >
          confirm Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;
