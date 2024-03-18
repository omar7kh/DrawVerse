const images = [
  '1.svg',
  '2.svg',
  '3.svg',
  '4.svg',
  '5.svg',
  '6.svg',
  '7.svg',
  '8.svg',
  '9.svg',
  '10.svg',
];

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomIndex];

  return selectedImage;
};
