import React, { useState, useEffect, useMemo   } from "react";
import MapGL, {Source, Layer} from "react-map-gl";
import {heatmapLayer, unclusteredPointLayer} from './map-style';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Dialog from '@material-ui/core/Dialog';
import ResultsPage from './ResultsPage';
import ResultsItem from "./ResultsItem";
// import 'bootstrap/dist/css/boostrap.css'

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

    getNearbySupermarkets2();
  }, []);

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
    "results": [{
      "Name": "Woolworths",
      "Address": "12 woolies st",
      "lat": 1.009,
      "long": 2,
      "Popularity": 90
    }, {
      "Name": "Coles",
      "Address": "24 coles st",
      "lat": 1.009,
      "long": 2,
      "Popularity": 50
    }]
  }

  const updateSupermarkets = (data) => {
    setSupermarkets(data)
  }

  var getNearbySupermarkets2 = () => {
    if (postcode === '' || postcode === null) {
      alert("please enter a postcode")
      return
    }
    let data = sampleData.results;
    updateSupermarkets(data)
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
      {
        supermarkets.map((value, index) => (
          <ResultsItem name={value.Name} popularity={value.Popularity} address={value.Address}/>
        ))
      }
      {dataValues && (
          <Source type="geojson" data={dataValues}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
        
    </MapGL>

  );
}

export default App;
