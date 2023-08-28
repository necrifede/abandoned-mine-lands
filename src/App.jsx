import { useCallback, useState } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import "./App.css";
import areasData from "./assets/poddolovane_uzemi.geojson?raw";

const token = import.meta.env.VITE_MAPBOX_TOKEN;
const initialViewport = {
  latitude: 49.805449,
  longitude: 15.628458,
  zoom: 7,
};
const layer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#4E3FC8",
    "fill-opacity": 0.3,
    "fill-outline-color": "purple",
  },
};
const areas = JSON.parse(areasData);

function App() {
  const [viewport, setViewport] = useState(initialViewport);
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = useCallback((event) => {
    const {
      features,
      point: { x, y },
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature && {feature: hoveredFeature, x, y});
  }, []);

  return (
    <ReactMapGL
      mapboxAccessToken={token}
      style={{ width: "100vw", height: "100vh" }}
      {...viewport}
      onMove={(event) => setViewport(event.viewState)}
      interactiveLayerIds={["data"]}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onMouseMove={onHover}
    >
      <Source id="mine-regions" type="geojson" data={areas}>
        <Layer {...layer} />
      </Source>
      {hoverInfo && (
        <div
          className="tooltip"
          style={{ left: hoverInfo.x, top: hoverInfo.y }}
        >
          <div>Region Name: {hoverInfo.feature.properties.nazev}</div>
          <div>area m2: {hoverInfo.feature.properties.plocha_m2}</div>
          <div>raw material: {hoverInfo.feature.properties.surovina}</div>
          <div>
            year of acquisition: {hoverInfo.feature.properties.rok_porizeni}
          </div>
        </div>
      )}
    </ReactMapGL>
  );
}

export default App;
