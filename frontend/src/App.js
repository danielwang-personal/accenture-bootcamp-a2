import React, { useState, useEffect, useMemo   } from "react";
import MapGL, {Source, Layer} from "react-map-gl";
import {heatmapLayer, unclusteredPointLayer} from './map-style';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// function filterFeaturesByDay(featureCollection, time) {
//   const date = new Date(time);
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const day = date.getDate();
//   const features = featureCollection.features.filter(feature => {
//     const featureDate = new Date(feature.properties.time);
//     return (
//       featureDate.getFullYear() === year &&
//       featureDate.getMonth() === month &&
//       featureDate.getDate() === day
//     );
//   });
//   return {type: 'FeatureCollection', features};
// }

function App() {

  const [viewport, setViewport] = useState({
    latitude: -37.8136,
    longitude: 144.9631,
    width: "100vw",
    height: "100vh",
    zoom: 12
  })

  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [CovidCases, setCovidCases] = useState(null);
  const [postcode, setPostcode] = useState("2000");
  const [supermarkets, setSupermarkets] = useState([]);

  useEffect(() => {
    /* global fetch */
    //http://127.0.0.1:5000/all
    fetch('http://127.0.0.1:5000/all', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Accept':'*/*'
      }
    })
      .then(resp => resp.json())
      .then(json => {
        const features = json.features;
        // const endTime = features[0].properties.time;
        // const startTime = features[features.length - 1].properties.time;

        // setTimeRange([startTime, endTime]);
        setCovidCases(json);
        console.log(json)
        // selectTime(endTime);
      });
  }, []);

  // const data = useMemo(() => {
  //   return allDays ? CovidCases : filterFeaturesByDay(CovidCases, selectedTime);
  // }, [CovidCases, allDays, selectedTime]);

  const data = CovidCases

  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=supermarket+near+2220&key=AIzaSyDkrXYeR2UBNKY2Vn3-jQoCmTKsj5I-at0'

  const getSupermarkets = async () => {
    // alert(postcode);
    await fetch(url, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Accept':'*/*'
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })

  
    // takes in postcode -> should return list of supermarkets, or update the state to have the list!!
  }

  return (
    <MapGL {...viewport} 
    mapboxApiAccessToken="pk.eyJ1IjoiZGFuaWVsLXdhbmcxMyIsImEiOiJja3FyazNqNWozMDRqMm9tbHJrNXF6MXR3In0.87deKFP-tRAVQYv0ftaFwg"
    mapStyle="mapbox://styles/daniel-wang13/ckqrl5x94en2v17no8natcaj9"
    onViewportChange={viewport =>  {
      setViewport(viewport)
    }}
    >
      <h1>{postcode}</h1>
      <input type="text" onChange={(e) => {
        setPostcode(e.target.value);
      }}/>
      <button onClick={getSupermarkets}>Submit Postcode</button>
      {data && (
        
          <Source type="geojson" data={data}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
        
    </MapGL>
    

  );
}

export default App;
