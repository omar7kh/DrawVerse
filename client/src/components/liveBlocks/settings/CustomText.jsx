import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from '../../../constants';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';

const selectConfigs = [
  {
    property: 'fontFamily',
    placeholder: 'Choose a font',
    options: fontFamilyOptions,
  },
  { property: 'fontSize', placeholder: '30', options: fontSizeOptions },
  {
    property: 'fontWeight',
    placeholder: 'Semibold',
    options: fontWeightOptions,
  },
];

const CustomText = ({
  fontFamily,
  fontSize,
  fontWeight,
  handleInputChange,
}) => (
  <div className='flex flex-col gap-3 border-b border-gray-200 px-2 py-3'>
    <h3 className='text-[10px] uppercase'>Text</h3>

    <div className='flex flex-col gap-3'>
      {RenderSelect({
        config: selectConfigs[0],
        fontSize,
        fontWeight,
        fontFamily,
        handleInputChange,
      })}

      <div className='flex flex-col lg:flex-row gap-2'>
        {selectConfigs.slice(1).map((config) =>
          RenderSelect({
            config,
            fontSize,
            fontWeight,
            fontFamily,
            handleInputChange,
          })
        )}
      </div>
    </div>
  </div>
);

const RenderSelect = ({
  config,
  fontSize,
  fontWeight,
  fontFamily,
  handleInputChange,
}) => (
  <Select
    key={config.property}
    onValueChange={(value) => handleInputChange(config.property, value)}
    value={
      config.property === 'fontFamily'
        ? fontFamily
        : config.property === 'fontSize'
        ? fontSize
        : fontWeight
    }
  >
    <SelectTrigger className='w-full rounded-md border border-gray-200'>
      <SelectValue
        placeholder={
          config.property === 'fontFamily'
            ? 'Choose a font'
            : config.property === 'fontSize'
            ? '30'
            : 'Semibold'
        }
      />
    </SelectTrigger>
    <SelectContent className='border-gray-200 bg-black text-gray-300'>
      {config.options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          className='hover:bg-yellow-500 hover:text-black cursor-pointer'
        >
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default CustomText;
