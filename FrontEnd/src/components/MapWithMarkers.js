import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import icon from "leaflet/dist/images/marker-icon.png"; // Import marker icon
import iconShadow from "leaflet/dist/images/marker-shadow.png"; // Import marker shadow
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapWithMarkers = ({ images, graphData }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={
          Object.keys(graphData).length
            ? [graphData.lat, graphData.lng]
            : [images[0].lat, images[0].lng]
        }
        zoom={2}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Object.keys(graphData).length ? (
          <Marker position={[graphData.lat, graphData.lng]}>
            <Popup>{graphData.name}</Popup>
          </Marker>
        ) : (
          images.map(
            (image, index) =>
              image.lat && (
                <Marker key={index} position={[image.lat, image.lng]}>
                  <Popup>{image.name}</Popup>
                </Marker>
              )
          )
        )}
      </MapContainer>
    </div>
  );
};

export default MapWithMarkers;
