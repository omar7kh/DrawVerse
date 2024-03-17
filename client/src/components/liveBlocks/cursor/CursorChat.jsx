import CursorImage from './CursorImage';

const CursorChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}) => {
  const handleChange = (e) => {
    updateMyPresence({ message: e.target.value });
    setCursorState({
      type: 'chat',
      previousMessage: null,
      message: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setCursorState({
        type: 'chat',
        previousMessage: cursorState.message,
        message: '',
      });
    } else if (e.key === 'Escape') {
      setCursorState({
        type: 'hidden',
      });
    }
  };

  return (
    <div
      className='absolute top-0 left-0'
      style={{
        transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
      }}
    >
      {cursorState.type === 'chat' && (
        <>
          <CursorImage color='#000' />

          <div
            className='absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white'
            onKeyUp={(e) => e.stopPropagation()}
            style={{
              borderRadius: 20,
            }}
          >
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}
            <input
              className='z-10 w-60 border-none	bg-transparent text-white placeholder-blue-300 outline-none'
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={cursorState.previousMessage ? '' : 'Say something…'}
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CursorChat;
