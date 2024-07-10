import { useEffect, useRef } from "react";
import maplibregl, { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const emporiumMallPolygon: any = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        label: "Emporium Mall",
        color: "#89CFF0",
        height: 20,
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26533468143214,
              31.467539815138267
            ],
            [
              74.264964236532,
              31.467469398658352
            ],
            [
              74.26470970673847,
              31.467409396546202
            ],
            [
              74.26475792976137,
              31.46721011873464
            ],
            [
              74.26482537378325,
              31.467064447795195
            ],
            [
              74.26508996902373,
              31.467103743119523
            ],
            [
              74.26486720797894,
              31.467032852165815
            ],
            [
              74.26488585088347,
              31.466877349041567
            ],
            [
              74.26499518936805,
              31.46655492538575
            ],
            [
              74.26520153424113,
              31.466586750037152
            ],
            [
              74.26523372810126,
              31.46646584027455
            ],
            [
              74.26502152519211,
              31.466359565000886
            ],
            [
              74.26514735095427,
              31.466089169188976
            ],
            [
              74.26576180994348,
              31.466343515316538
            ],
            [
              74.26578946804682,
              31.466289108143016
            ],
            [
              74.26705925857442,
              31.466591212480168
            ],
            [
              74.26698188824855,
              31.466842715150705
            ],
            [
              74.2670540844907,
              31.466857222891022
            ],
            [
              74.26682782721565,
              31.467671342021276
            ],
            [
              74.26674381813584,
              31.46764660957639
            ],
            [
              74.26666227693192,
              31.467887841875637
            ],
            [
              74.26638888364906,
              31.46783904371958
            ],
            [
              74.26636563434238,
              31.46791299827028
            ],
            [
              74.26608277135364,
              31.467836967817064
            ],
            [
              74.2658007066268,
              31.467827703139434
            ],
            [
              74.26551075870125,
              31.467772701574944
            ],
            [
              74.26552477251144,
              31.46773999473821
            ],
            [
              74.26536086156855,
              31.467681341873742
            ],
            [
              74.26533468143214,
              31.467539815138267
            ]
          ]
        ],
        "type": "Polygon"
      }
    }
  ]
}

const MAPTILER_KEY = "sjn0iuxKyGPkOiVCMU8R";

function App() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>();

  useEffect(() => {
    if (!map.current) {
      map.current = new Map({
        container: mapContainer.current as HTMLElement,
        style: `https://api.maptiler.com/maps/bright-v2-light/style.json?key=${MAPTILER_KEY}`,
        center: [74.2652867, 31.4671306],
        zoom: 16,
      });
  
      map.current.on("load", function () {  
        // Polygon Source
        map.current?.addSource("polygonSource", {
          type: "geojson",
          data: emporiumMallPolygon,
        });
  
        // // Polygon Layer
        map.current?.addLayer({
          id: "polygonLayer",
          type: "fill",
          source: "polygonSource",
          layout: {},
          paint: {
            "fill-color": ["get", "color"],
            "fill-opacity": 0.5,
          },
        });
  
        // Extrusion Layer
        map.current?.addLayer({
          id: "polygonExtrusion",
          type: "fill-extrusion",
          source: "polygonSource",
          paint: {
            "fill-extrusion-color": ["get", "color"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-opacity": 1,
          },
        });
      });
    }
  }, []);

  return (
    <>
      <div className="map-wrap">
        <div ref={mapContainer} className="map" />
      </div>
    </>
  );
}

export default App;
