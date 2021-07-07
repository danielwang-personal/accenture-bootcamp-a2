import React, { useState, useEffect, useMemo   } from "react";
import MapGL, {Source, Layer} from "react-map-gl";
import {heatmapLayer, unclusteredPointLayer} from './map-style';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Dialog from '@material-ui/core/Dialog';
import resultsPage from './resultsPage';

function App() {

  const [viewport, setViewport] = useState({
    latitude: -37.8136,
    longitude: 144.9631,
    width: "100vw",
    height: "100vh",
    zoom: 12
  })

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
      .then(data => {
        setCovidCases(data);
      });
  }, []);


  const url = 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=supermarket+near+2220&key=AIzaSyDkrXYeR2UBNKY2Vn3-jQoCmTKsj5I-at0'

  // const getNearbySupermarkets = async () => {
  //   if (postcode === '' || postcode === null) {
  //     alert("please enter a postcode")
  //     return
  //   }
  //   const res = await fetch(url, {
  //     mode: 'cors',
  //     headers: {
  //       'Access-Control-Allow-Origin':'*',
  //       'Accept':'*/*'
  //     }
  //   });
  //   setSupermarkets(await res.json());

  
    // takes in postcode -> should return list of supermarkets, or update the state to have the list!!
  // }

  const sampleData = {
    'results': [{
      'Name': "Woolworths",
      "Address": "12 woolies st",
      "lat": 1.009,
      "long": 2,
      "Popularity": 100
    }]
  }

  const getNearbySupermarkets2 = async () => {
    if (postcode === '' || postcode === null) {
      alert("please enter a postcode")
      return
    }
    alert(sampleData.results)
    let data = sampleData['results'];
    console.log(data)
    alert(data.length)
    alert("hi")
    alert(data.type)
    setSupermarkets(data)
    alert(supermarkets.length)
    alert(supermarkets[0].Popularity)
  }

  const dataValues = CovidCases

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
      <button onClick={getNearbySupermarkets2}>Submit Postcode</button>
      {dataValues && (
          <Source type="geojson" data={dataValues}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
        
    </MapGL>

  );
}

export default App;
