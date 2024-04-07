import React, { useState } from "react";
import EXIF from "exif-js";
import "../styles/ImageUpload.css";
import MapWithMarkers from "./MapWithMarkers";
import AxiosInstance  from "../Axios";
const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const locations = [
    { name: "New York", lat: 40.7128, lng: -74.006 },
    { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  ];

  const handleFileChange = async (event) => {
    const fileList = event.target.files;
  
    const selectedImages = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const exifData = await readEXIFData(file);
      const metadata = {
        width: exifData.PixelXDimension,
        height: exifData.PixelYDimension,
        make: exifData.Make,
        model: exifData.Model,
        dateTime: exifData.DateTimeOriginal,
      };
      selectedImages.push({ ...file, exifData });
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
    AxiosInstance.post(`project/`, {
      name: 'luffy',
      height: 165
    });
    const d = AxiosInstance.get(`project/3`, {
      name: 'Luffy',
      height: 165
    });
    console.log(d);
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
        <MapWithMarkers locations={locations} />
      </div>
    </div>
  );
};

export default ImageUpload;
