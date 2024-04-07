import React, { useState } from "react";
import EXIF from "exif-js";
import "../styles/ImageUpload.css";
import MapWithMarkers from "./MapWithMarkers";

function DMS2DD(degrees, minutes, seconds, direction) {
  var dd = degrees + (minutes/60) + (seconds/3600);
  if (direction == "S" || direction == "W") {
    dd = dd * -1;
  }
  return dd;
}

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleFileChange = async (event) => {
    const fileList = event.target.files;
    const selectedImages = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const exifData = await readEXIFData(file);
      console.log(exifData, 'exifData')
      const ppi = 300
      const ppi_to_ppm = 0.0254
      const ppm = ppi * ppi_to_ppm
      const pow = 2**exifData.ShutterSpeedValue;
      const imageHeight = exifData.PixelYDimension / ppm
      const imageSpeed = 1/pow
      const latDeg = exifData.GPSLatitude[0].numerator;
      const latMin = exifData.GPSLatitude[1].numerator;
      const latSec = exifData.GPSLatitude[2].numerator;
      const latDir = exifData.GPSLatitudeRef;
      const lngDeg = exifData.GPSLongitude[0].numerator;
      const lngMin = exifData.GPSLongitude[1].numerator;
      const lngSec = exifData.GPSLongitude[2].numerator;
      const lngDir = exifData.GPSLongitudeRef;

      const metadata = {
        width: exifData.PixelXDimension,
        height: imageHeight,
        make: exifData.Make,
        model: exifData.Model,
        dateTime: exifData.DateTimeOriginal,
        speed: imageSpeed,
        lat: DMS2DD(latDeg, latMin, latSec, latDir),
        lng: DMS2DD(lngDeg, lngMin, lngSec, lngDir),
        isFlaged: (imageHeight > 60) || (imageSpeed >5)
      };
      selectedImages.push({ ...images, metadata });
    }

    setImages(selectedImages);
  };

  const readEXIFData = (file) => {
    return new Promise((resolve, reject) => {
      EXIF.getData(file, function () {
        const exifData = EXIF.getAllTags(this);
        resolve(exifData);
      });
    });
  };

  const uploadImages = () => {
    console.log(images);
    // FormData to send images and their EXIF data to the server
    // const formData = new FormData();
    // images.forEach(({ file, exifData }) => {
    //   formData.append('images[]', file);
    //   formData.append('exifData[]', JSON.stringify(exifData));
    // });
    // Then make an AJAX request to upload formData
  };

  return (
    <div className="container">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="file-label"
      />
      <button onClick={uploadImages} className="upload-button">
        Upload Images
      </button>
      <div>
        <h1>Map with Markers</h1>
        <MapWithMarkers images={images} />
      </div>
    </div>
  );
};

export default ImageUpload;