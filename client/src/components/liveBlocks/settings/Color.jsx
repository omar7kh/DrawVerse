import { Label } from './Label';

const Color = ({
  inputRef,
  attribute,
  placeholder,
  attributeType,
  handleInputChange,
}) => (
  <div className='flex flex-col gap-3 border-b border-gray-200 p-5'>
    <h3 className='text-[10px] uppercase'>{placeholder}</h3>
    <div
      className='flex items-center gap-2 border border-gray-200 rounded-md'
      onClick={() => inputRef.current.click()}
    >
      <input
        type='color'
        value={attribute}
        ref={inputRef}
        onChange={(e) => handleInputChange(attributeType, e.target.value)}
        className='rounded-l'
      />
      <Label className='flex-1'>{attribute}</Label>
    </div>
  </div>
);

export default Color;
