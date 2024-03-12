const Cursor = ({ x, y }) => {
  return (
    <svg
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
      }}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='red'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='m13.67 6.03-11-4a.5.5 0 0 0-.64.64l4 11a.5.5 0 0 0 .935.015l1.92-4.8 4.8-1.92a.5.5 0 0 0 0-.935h-.015Z'
        fill='var(--preview-background-inverse)'
      />
    </svg>
  );
};

export default Cursor;
