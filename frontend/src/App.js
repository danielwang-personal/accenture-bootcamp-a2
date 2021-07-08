import React, { useState, useEffect, useMemo   } from "react";
import MapGL, {Source, Layer, Marker} from "react-map-gl";
import {heatmapLayer, unclusteredPointLayer} from './map-style';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
//import Dialog from '@material-ui/core/Dialog';
import ResultsItem from "./ResultsItem";
// import 'bootstrap/dist/css/boostrap.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
const SIZE = 20;

function App() {

  const [viewport, setViewport] = useState({
    latitude: -37.8136,
    longitude: 144.9631,
    width: "100vw",
    height: "100vh",
    zoom: 8
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

    // getNearbySupermarkets2();
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
      "Name": "Woolworths Lygon Court",
      "Address": " Lygon Court, 368 - 380 Lygon St, Carlton VIC 3053",
      "lat": -37.7983,
      "long": 144.9686,
      "Popularity": 90
    }, {
      "Name": "Coles Local Fitzroy",
      "Address": "95-103 Johnston St, Fitzroy VIC 3065",
      "lat": -37.7982,
      "long": 144.9780,
      "Popularity": 50
    },{
      "Name": "ALDI Melbourne CBD",
      "Address": "501 Swanston St, Melbourne VIC 3000",
      "lat": -37.8074,
      "long": 144.9622,
      "Popularity": 50
    }]
  }

  const viewPortCarlton = {latitude: -37.8001,
    longitude: 144.9671,
    width: "100vw",
    height: "100vh",
    zoom: 14
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
    setViewport(viewPortCarlton)
  }

  const dataValues = CovidCases

  return (
    <MapGL {...viewport} 
    mapboxApiAccessToken="pk.eyJ1IjoiZGFuaWVsLXdhbmcxMyIsImEiOiJja3FyazNqNWozMDRqMm9tbHJrNXF6MXR3In0.87deKFP-tRAVQYv0ftaFwg"
    mapStyle="mapbox://styles/daniel-wang13/ckqrl5x94en2v17no8natcaj9"
    onViewportChange={viewport =>  {
      setViewport(viewport)
    }}
    class="container"
    >
      <div class="row px-5 py-3" >
        <h1 style={{ fontSize: "2.5rem", color: "white", fontWeight: "600" }}>Covid at a Glance</h1>
      </div>
      <div class="row px-5 py-2">
          <input type="text" placeholder="Enter postcode" class="form-control col-md-3" onChange={(e) => {
            setPostcode(e.target.value);
          }} />
          <button onClick={getNearbySupermarkets2} class="form-control col-md-1">Submit</button>
      </div>
      {
        supermarkets.map((value, index) => (
          <ResultsItem 
            key={index} 
            name={value.Name} 
            popularity={value.Popularity} 
            address={value.Address}
            latitude={value.lat}
            longitude={value.long}/>
        ))
        
      }
      {
        supermarkets.map((value, index) => (
          <Marker latitude={value.lat} longitude={value.long}>
            <svg
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: 'pointer',
                fill: '#d00',
                stroke: 'none',
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              }}
            >
              <path d={ICON} />
            </svg>
          </Marker>
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
