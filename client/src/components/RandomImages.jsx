import { useEffect, useState } from 'react';

const RandomImages = ({ imageList }) => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    const selectedImage = imageList[randomIndex];

    setRandomImage(selectedImage);
  });
  return randomImage;
};

export default RandomImages;
