import { DropdownMenu, Logo } from '../components';
import { IoPerson } from 'react-icons/io5';
import Highlight from '../components/Highlight';
import bgYellow from '../assets/images/wave-haikei.svg';
import { useContext, useEffect, useState } from 'react';
import designImg from '../assets/images/design.svg';
import teamImg from '../assets/images/team_collaboration_re_ow29.svg';
import creativeImg from '../assets/images/creative.svg';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Home = () => {
  const { checkIfIsAuthenticated } = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const check = async () => {
      const checkIsAuth = await checkIfIsAuthenticated();
      if (checkIsAuth) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    check();
  }, [isAuthenticated]);

  return (
    <div className='min-h-screen w-full bg-gray-800 text-white relative'>
      <nav className='flex justify-between items-center px-5 h-20 z-50 absolute inset-x-0 lg:px-16'>
        <Logo
          width={40}
          height={40}
          textClasses='font-bold text-sm md:text-xl lg:text-2xl'
        />
        <IoPerson
          className='text-xl md:text-2xl lg:text-3xl cursor-pointer'
          onClick={toggleDropdown}
        />{' '}
        {showDropdown && (
          <div className='absolute top-14 right-16'>
            <DropdownMenu />
          </div>
        )}
      </nav>

      <div className='w-full h-[210px]'>
        <img
          src={bgYellow}
          className='w-full h-full object-cover object-bottom'
        />
      </div>

      <div className='flex flex-col justify-center items-center mt-20 mb-20 lg:mb-0 gap-10'>
        <p
          className='text-[18px] w-[80%] text-justify md:text-[22px] lg:max-w-[70%] lg:text-[25px] lg:tracking-wide'
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          Welcome to the{' '}
          <span
            className='text-[#DFB700] font-bold'
            style={{ textShadow: 'none' }}
          >
            DrawVerse
          </span>{' '}
          – where <span className='italic'>creativity</span> and{' '}
          <span className='italic'>collaboration</span> thrive. Every mark here
          is a <span className='font-bold'>symphony</span> of ideas,{' '}
          <span
            className='text-[#DFB700] font-bold'
            style={{ textShadow: 'none' }}
          >
            sparking
          </span>{' '}
          <span className='italic'>innovation</span> and igniting{' '}
          <span className='font-bold'>expression</span>. This dynamic{' '}
          <span
            className='font-bold text-[#DFB700]'
            style={{ textShadow: 'none' }}
          >
            platform
          </span>{' '}
          sees <span className='italic'>projects</span> evolve,{' '}
          <span className='italic'>plans</span> materialize, and connections
          intertwine, shaping a world of{' '}
          <span className='underline'>possibilities</span>.
        </p>

        <Link
          to={isAuthenticated ? '/main' : '/login'}
          className='relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium bg-yellow-400 text-black border border-black hover:border-yellow-400 rounded-lg hover:text-yellow-400 group hover:bg-gray-800'
        >
          <span className='absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease'>
            <svg
              className='w-5 h-10'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              ></path>
            </svg>
          </span>
          <span className='relative'>Get started</span>
        </Link>
      </div>

      <div className='h-auto w-full py-10 flex flex-col justify-around gap-10 flex-wrap md:flex-row lg:gap-0 md:mt-20'>
        <Highlight imgSrc={designImg} />
        <Highlight imgSrc={creativeImg} />
        <Highlight imgSrc={teamImg} />
      </div>
    </div>
  );
};

export default Home;
