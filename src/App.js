import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import * as parkData from "./data/fakeData.json";
// import mapStyles from "./mapStyles";

function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
      // defaultOptions={{ styles: mapStyles }}
    >
      {parkData.features.map((park) => (
        <Marker
          key={park.properties.ID}
          position={{
            lat: park.geometry.coordinates[0],
            lng: park.geometry.coordinates[1],
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          // icon={{
          //   url: `/skateboarding.svg`,
          //   scaledSize: new window.google.maps.Size(25, 25),
          // }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.geometry.coordinates[0],
            lng: selectedPark.geometry.coordinates[1],
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            {/* <p>{selectedPark.properties.DESCRIPTIO}</p> */}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "50%", height: "100vh" }}>
      <MapWrapped
        googleMapURL={
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJnQzocSDXHYNSPG71tejT2PRo047ehro&v=3.exp&libraries=geometry,drawing,places"
        }
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
