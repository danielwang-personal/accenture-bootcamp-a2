import React, { useState } from "react";
import ReactMapGl from "react-map-gl";

function App() {

  const [viewport, setViewport] = useState({
    latitude: -33.8688 ,
    longitude:  151.2093,
    width: "100vw",
    height: "100vh",
    zoom: 12
  })

  return (
    <ReactMapGl {...viewport} 
    mapboxApiAccessToken="pk.eyJ1IjoiZGFuaWVsLXdhbmcxMyIsImEiOiJja3FyazNqNWozMDRqMm9tbHJrNXF6MXR3In0.87deKFP-tRAVQYv0ftaFwg"
    mapStyle="mapbox://styles/daniel-wang13/ckqrl5x94en2v17no8natcaj9"
    onViewportChange={viewport =>  {
      setViewport(viewport)
    }}
    >
      markers here
    </ReactMapGl>
  );
}

export default App;
