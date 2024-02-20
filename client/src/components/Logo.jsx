import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.svg';

const Logo = ({ width, height, textClasses, divStyle }) => {
  console.log(width);
  return (
    <div
      className={`flex justify-center items-center gap-2 ${
        divStyle && divStyle
      } `}
      style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
    >
      <img
        src={logo}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        alt='DrawVerse Logo'
      />
      <Link to={'/'} className={textClasses}>
        DrawVerse
      </Link>
    </div>
  );
};

export default Logo;
