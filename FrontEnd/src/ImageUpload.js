import React, { useState } from 'react';
import EXIF from 'exif-js';

const ImageUpload = () => {
  const [imageData, setImageData] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      setImageData(imageUrl);

      // Extract EXIF data
      EXIF.getData(file, function() {
        const exifData = EXIF.getAllTags(this);
        console.log('EXIF Data:', exifData);
        const metadata = {
          width: exifData.PixelXDimension,
          height: exifData.PixelYDimension,
          make: exifData.Make,
          model: exifData.Model,
          dateTime: exifData.DateTimeOriginal,
        };
        console.log(metadata);
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageData && <img src={imageData} alt="Uploaded" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default ImageUpload;
