import React from "react";
import Map, { Marker, Popup } from "react-map-gl";

const MapBox = () => {
  const [viewState, setViewState] = React.useState({
    longitude: 77.5946,
    latitude: 12.9716,
    zoom: 10
  });

  const [showPopup, setShowPopup] = React.useState(true);

  return (
    <div className="w-full h-[500px]">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}  {/* ✅ Correct for Vite */}
      >
        <Marker longitude={77.5946} latitude={12.9716} anchor="bottom">
          <div className="text-red-500 text-2xl">📍</div>
        </Marker>

        {showPopup && (
          <Popup
            longitude={77.5946}
            latitude={12.9716}
            onClose={() => setShowPopup(false)}
            closeOnClick={false}
          >
            <div>Bengaluru City</div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapBox;

