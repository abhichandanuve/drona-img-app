import React, { useEffect, useState } from "react";
import EXIF from "exif-js";
import "../styles/ImageUpload.css";
import MapWithMarkers from "./MapWithMarkers";
import AxiosInstance from "../Axios";
import MapChart from "./ImageChart";

function DMS2DD(degrees, minutes, seconds, direction) {
  var dd = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") {
    dd = dd * -1;
  }
  return dd;
}

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [graphData, setGraphData] = useState({});
  const [showToast, setShowToast] = useState(false);

  const getAnalyticsData = () => {
    AxiosInstance.get(`project/`).then((res) => {
      setAnalyticsData(res.data);
    });
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  useEffect(() => {
    getAnalyticsData();
  }, [images]);
  const handleFileChange = async (event) => {
    const fileList = event.target.files;
    const selectedImages = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const exifData = await readEXIFData(file);
      console.log(exifData, "exifData");
      if (!Object.keys(exifData)) {
        console.log("ExifData does not exits");
        return;
      }
      const ppi = 300;
      const ppi_to_ppm = 0.0254;
      const ppm = ppi * ppi_to_ppm;
      const pow = 2 ** exifData.ShutterSpeedValue;
      const imageHeight = exifData.PixelYDimension / ppm;
      const imageSpeed = 1 / pow;
      const latDeg = exifData?.GPSLatitude?.[0].numerator;
      const latMin = exifData?.GPSLatitude?.[1].numerator;
      const latSec = exifData?.GPSLatitude?.[2].numerator;
      const latDir = exifData?.GPSLatitudeRef;
      const lngDeg = exifData?.GPSLongitude?.[0].numerator;
      const lngMin = exifData?.GPSLongitude?.[1].numerator;
      const lngSec = exifData?.GPSLongitude?.[2].numerator;
      const lngDir = exifData?.GPSLongitudeRef;

      const metadata = {
        width: exifData?.PixelXDimension,
        height: Math.floor(imageHeight),
        dateTime: exifData?.DateTimeOriginal,
        speed: imageSpeed,
        lat: DMS2DD(latDeg, latMin, latSec, latDir),
        lng: DMS2DD(lngDeg, lngMin, lngSec, lngDir),
        isFlagged: imageHeight > 60 || imageSpeed > 5,
        name: file.name,
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
    images.forEach((image) => {
      AxiosInstance.post(`project/`, image.metadata)
        .then((res) => setShowToast("Image Uploaded Successfully!"))
        .catch((err) => {
          setShowToast(err.response.data.name[0]);
          setTimeout(() => {
            setShowToast(false);
          }, 50000);
        });
    });
    setImages([]);
    getAnalyticsData();
  };

  return (
    <div className="container">
      <div className={`toast ${showToast ? "show" : ""}`}>
        <div className="toast-message">{showToast}</div>
        <button className="close-button" onClick={() => setShowToast(false)}>
          &times;
        </button>
      </div>
      <h1>
        <u>DronaMaps</u>
      </h1>
      <div className="input-container">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-label"
        />
        <button onClick={uploadImages} className="upload-button">
          Upload Images
        </button>
      </div>
      {analyticsData.length ? (
        <div>
          <div className="tab-container">
            <h1>Analytics Section</h1>
            <div className="tab-container">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => {
                    handleTabClick("tab1");
                  }}
                >
                  Analytics Maps
                </button>
                <button
                  className={`tab ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => {
                    setGraphData({});
                    handleTabClick("tab2");
                  }}
                >
                  Analytics Graph
                </button>
              </div>
              <div
                id="tab1"
                className={`tab-content ${
                  activeTab === "tab1" ? "active" : ""
                }`}
              >
                <MapWithMarkers images={analyticsData} graphData={graphData} />
              </div>

              <div
                id="tab2"
                className={`tab-content ${
                  activeTab === "tab2" ? "active" : ""
                }`}
              >
                <MapChart
                  onClickGraph={(index) => {
                    setGraphData(analyticsData[index]);
                    handleTabClick("tab1");
                  }}
                  analyticsData={analyticsData}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>
          There is no data, please upload your images to view the Analytics
          Section
        </h2>
      )}
    </div>
  );
};

export default ImageUpload;
