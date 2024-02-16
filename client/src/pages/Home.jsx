import { DropdownMenu, Logo } from '../components';
import { IoPerson } from 'react-icons/io5';
import Highlight from '../components/Highlight';
import bgYellow from '../assets/images/wave-haikei.svg';
import { useState } from 'react';
import designImg from '../assets/images/design.svg';
import teamImg from '../assets/images/team_collaboration_re_ow29.svg';
import creativeImg from '../assets/images/creative.svg';
import { Link } from 'react-router-dom';

const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='min-h-screen w-full bg-gray-800 text-white relative'>
      <nav className='flex justify-between items-center px-5 lg:px-16 h-20 z-50 fixed left-0 right-0 bg-[#DFB700]'>
        <Logo
          width={40}
          height={40}
          textClasses='font-bold text-sm md:text-xl lg:text-2xl'
        />
        <IoPerson
          className='text-xl md:text-2xl lg:text-3xl cursor-pointer'
          onClick={toggleDropdown}
        />{' '}
        {showDropdown && <DropdownMenu />}
      </nav>

      <div
        className='h-[450px] w-full flex flex-col justify-center items-center font-medium gap-12'
        style={{
          backgroundImage: `url(${bgYellow})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      >
        <p
          className='text-[18px] w-[80%] text-justify md:text-[22px] lg:max-w-[70%] lg:text-[25px] lg:tracking-wide'
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          Welcome to the{' '}
          <span
            className='text-[#202020] font-bold'
            style={{ textShadow: 'none' }}
          >
            DrawVerse
          </span>{' '}
          – where <span className='italic'>creativity</span> and{' '}
          <span className='italic'>collaboration</span> thrive. Every mark here
          is a <span className='font-bold'>symphony</span> of ideas,{' '}
          <span
            className='text-[#202020] font-bold'
            style={{ textShadow: 'none' }}
          >
            sparking
          </span>{' '}
          <span className='italic'>innovation</span> and igniting{' '}
          <span className='font-bold'>expression</span>. This dynamic{' '}
          <span
            className='font-bold text-[#202020]'
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
          to='/'
          className='bg-gray-800 p-2 rounded-md text-xl font-bold hover:text-[#DFB700] delay-75 duration-200'
        >
          Get started
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
