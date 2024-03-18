import { exportToPdf } from '../../../lib/utils';

const Export = () => (
  <div className='flex flex-col gap-3 px-5 py-3'>
    <h3 className='text-[10px] uppercase'>Export</h3>
    <button
      className='w-full text-black bg-yellow-500 border border-yellow-500 rounded-md text-sm p-1 font-bold hover:bg-transparent hover:text-white transition-colors'
      onClick={exportToPdf}
    >
      Download as PDF
    </button>
  </div>
);

export default Export;
