import { Input } from './Input';
import { Label } from './Label';

const dimensionsOptions = [
  { label: 'W', property: 'width' },
  { label: 'H', property: 'height' },
];

const Dimensions = ({ width, height, isEditingRef, handleInputChange }) => (
  <section className='flex flex-col border-b border-gray-200'>
    <div className='flex flex-col gap-4 px-3 py-3'>
      {dimensionsOptions.map((item) => (
        <div
          key={item.label}
          className='flex flex-1 items-center gap-3 rounded-sm'
        >
          <Label htmlFor={item.property} className='text-[10px] font-bold'>
            {item.label}
          </Label>
          <Input
            type='number'
            id={item.property}
            placeholder='100'
            value={item.property === 'width' ? width : height}
            className='input-ring text-black'
            min={10}
            onChange={(e) => handleInputChange(item.property, e.target.value)}
            onBlur={() => {
              isEditingRef.current = false;
            }}
          />
        </div>
      ))}
    </div>
  </section>
);

export default Dimensions;
