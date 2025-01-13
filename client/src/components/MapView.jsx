
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";
import Homes from "./Homes";

function MapView({ homes }) {
  // Set a default map center and zoom level
  const defaultCenter = [40.4168, -3.7038]; // Example: Madrid, Spain
  const defaultZoom = 10;

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: "100%", width: "100%" }}>
        {/* Base map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render markers for each home */}
        {homes
          .filter((home) => home.latitude && home.longitude) // Ensure valid coordinates
          .map((home) => (
          <Marker key={home._id} position={[home.latitude, home.longitude]}>
            <Popup>
                <Homes homes={[home]} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

MapView.propTypes = {
  homes: PropTypes.array.isRequired,
};

export default MapView;
