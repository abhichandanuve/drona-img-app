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

const MapWithMarkers = ({ locations }) => {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[locations[0].lat, locations[0].lng]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapWithMarkers;
