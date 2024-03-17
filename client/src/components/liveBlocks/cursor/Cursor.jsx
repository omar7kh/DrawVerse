import CursorSVG from './CursorImage';

const Cursor = ({ cursorColor, x, y, message }) => (
  <div
    className='pointer-events-none absolute left-0 top-0'
    style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
  >
    <CursorSVG color={cursorColor} />

    {message && (
      <div
        className='absolute left-2 top-5 rounded-3xl px-4 py-2'
        style={{ backgroundColor: cursorColor, borderRadius: 20 }}
      >
        <p className='whitespace-nowrap text-sm leading-relaxed text-white'>
          {message}
        </p>
      </div>
    )}
  </div>
);

export default Cursor;
