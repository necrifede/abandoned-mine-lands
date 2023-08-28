import { useState } from "react";
import ReactMapGL from "react-map-gl";
import "./App.css";

const token = import.meta.env.VITE_MAPBOX_TOKEN;
const initialViewport = {
  latitude: 49.805449,
  longitude: 15.628458,
  zoom: 6,
};

function App() {
  const [viewport, setViewport] = useState(initialViewport);

  console.log("token: ", token);

  return (
    <ReactMapGL
      mapboxAccessToken={token}
      style={{ width: "100vw", height: "100vh" }}
      {...viewport}
      onMove={(event) => setViewport(event.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      hola
    </ReactMapGL>
  );
}

export default App;
