import { useEffect, useRef } from "react";
import maplibregl, { CustomLayerInterface, Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as turf from "@turf/turf";
import * as THREE from "three";
import CustomThreeJSWrapper from "./CustomThreeJsWrapper/CustomThreeJsWrapper";
import { projectToWorld } from "./CustomThreeJsWrapper/utility/utils";

interface Content3DLayer extends CustomLayerInterface {
  id: string;
  type: "custom";
  renderingMode: "3d";
  render(): void;
}

const emporiumMallPolygon: any = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "image": "./sk.png",
        "label": "SALT by ideas",
        "color": "#89CAA0",
        "height": 50
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26584232566765,
              31.467096384757795
            ],
            [
              74.26574861273292,
              31.46737254346253
            ],
            [
              74.26530765851737,
              31.467274313840974
            ],
            [
              74.26540042063286,
              31.4669893836366
            ],
            [
              74.26584232566765,
              31.467096384757795
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Emporium Mall",
        "color": "#89CFF0",
        "height": 1
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
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 1",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26633676364852,
              31.467904324503564
            ],
            [
              74.26606021000728,
              31.46782628930694
            ],
            [
              74.26612803538688,
              31.467577137739866
            ],
            [
              74.26642566212462,
              31.46763917430603
            ],
            [
              74.26633676364852,
              31.467904324503564
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 2",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26703247240852,
              31.466932140816596
            ],
            [
              74.26694479775608,
              31.467255251720772
            ],
            [
              74.26644814486306,
              31.467142830790067
            ],
            [
              74.26655312587158,
              31.466818817352276
            ],
            [
              74.26703247240852,
              31.466932140816596
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "image": "./nature.jpg",
        "label": "Shop 3",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26667080053411,
              31.46649880920404
            ],
            [
              74.26659574112205,
              31.466753123942667
            ],
            [
              74.26612956604481,
              31.46664052923215
            ],
            [
              74.26621274392011,
              31.466391741029042
            ],
            [
              74.26667080053411,
              31.46649880920404
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "image": "./salt-logo.png",
        "label": "Shop 4",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.2661854054939,
              31.466383904843795
            ],
            [
              74.26609844829736,
              31.46663187888747
            ],
            [
              74.26567486241689,
              31.466514606254762
            ],
            [
              74.2657916275001,
              31.466287889640085
            ],
            [
              74.2661854054939,
              31.466383904843795
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 5",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26705784657119,
              31.46659166989342
            ],
            [
              74.26698122570869,
              31.466842738361606
            ],
            [
              74.26662102238326,
              31.466758770875785
            ],
            [
              74.26669730745948,
              31.466505790171453
            ],
            [
              74.26705784657119,
              31.46659166989342
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 6",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26568415955455,
              31.466313223526768
            ],
            [
              74.26551966949089,
              31.466594934719524
            ],
            [
              74.2650242847709,
              31.466359330447318
            ],
            [
              74.26514823644033,
              31.466088660830366
            ],
            [
              74.26568415955455,
              31.466313223526768
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 7",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26646105156064,
              31.466829231929665
            ],
            [
              74.26635297913543,
              31.467152877579906
            ],
            [
              74.2659438893323,
              31.4670524938455
            ],
            [
              74.26605151429729,
              31.46673090183316
            ],
            [
              74.26646105156064,
              31.466829231929665
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 8",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26598503753246,
              31.466714094785956
            ],
            [
              74.26587233169477,
              31.467034362681602
            ],
            [
              74.26548603484497,
              31.466934196508888
            ],
            [
              74.26558916609807,
              31.466618279558404
            ],
            [
              74.26598503753246,
              31.466714094785956
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 8",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26529185980127,
              31.466612819797504
            ],
            [
              74.26512694346198,
              31.467110620552972
            ],
            [
              74.26486724428084,
              31.46702881464639
            ],
            [
              74.26488630164647,
              31.466880091974417
            ],
            [
              74.26499585190561,
              31.466555786384745
            ],
            [
              74.26529185980127,
              31.466612819797504
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 9",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26512660513151,
              31.467111013013664
            ],
            [
              74.26533572678301,
              31.467540062365003
            ],
            [
              74.26496955954934,
              31.467473698981642
            ],
            [
              74.26470947879639,
              31.46740926234621
            ],
            [
              74.26475637949892,
              31.467211725460338
            ],
            [
              74.26482666757519,
              31.46706614070348
            ],
            [
              74.26512660513151,
              31.467111013013664
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 10",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26692781669354,
              31.46731557631989
            ],
            [
              74.26684495637596,
              31.46760892756207
            ],
            [
              74.26637517161521,
              31.467499320605867
            ],
            [
              74.26645339839985,
              31.46721529940011
            ],
            [
              74.26692781669354,
              31.46731557631989
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 11",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26635755499791,
              31.46723037002829
            ],
            [
              74.26627632837824,
              31.467511331518452
            ],
            [
              74.26581816476983,
              31.467408106147076
            ],
            [
              74.26590977056352,
              31.467124992623354
            ],
            [
              74.26635755499791,
              31.46723037002829
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 13",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.2667414696829,
              31.467643392033025
            ],
            [
              74.2666612495614,
              31.467887140908914
            ],
            [
              74.26639043180236,
              31.467834809528
            ],
            [
              74.26647545539569,
              31.467580084395962
            ],
            [
              74.2667414696829,
              31.467643392033025
            ]
          ]
        ],
        "type": "Polygon"
      }
    },
    {
      "type": "Feature",
      "properties": {
        "label": "Shop 14",
        "color": "#89CAA0",
        "height": 10
      },
      "geometry": {
        "coordinates": [
          [
            [
              74.26610778107079,
              31.46757236332988
            ],
            [
              74.26603437573019,
              31.4678322546321
            ],
            [
              74.26580737807419,
              31.467823935614753
            ],
            [
              74.26551399227972,
              31.467773177118943
            ],
            [
              74.26552636127326,
              31.467739125537552
            ],
            [
              74.26536302403798,
              31.467681813698995
            ],
            [
              74.26544184442746,
              31.467421733869834
            ],
            [
              74.26562192267636,
              31.46746321269552
            ],
            [
              74.26610778107079,
              31.46757236332988
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
  const wrapper = useRef<CustomThreeJSWrapper | null>(null);
  
  const content3DLayer: Content3DLayer = {
    id: "custom-threejs-layer",
    type: "custom",
    renderingMode: "3d",

    render() {
      if (wrapper.current) wrapper.current.update();
    },
  };

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

        if (!map.current?.getLayer("custom-threejs-layer")) {
          map.current?.addLayer(content3DLayer);
        }

        wrapper.current = new CustomThreeJSWrapper(
          map.current as any,
          map.current?.getCanvas().getContext("webgl") as WebGLRenderingContext
        );

        let items: any[] = [];
        emporiumMallPolygon.features.map((feature: any) => {
          let coordinates = feature.geometry.coordinates;
          const polygon: any = turf.polygon(coordinates);
          // console.log("polygon", polygon);
          const centroid = turf.center(polygon).geometry.coordinates;
          centroid.push(feature.properties.height);
          // console.log("centroid", centroid);
          const modelPosition = projectToWorld(centroid);
          // console.log("modelPosition", modelPosition);

          if (feature.properties.image != undefined) {
            console.log ("Image found: ", feature.properties.image);
            // Load Texture
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(feature.properties.image, (texture: THREE.Texture) => {
            console.log ("textureLoader: ", textureLoader);

            // Create a plane geometry and material with the loaded texture
            const geometry = new THREE.PlaneGeometry(texture.image.width, texture.image.height);
            geometry.computeBoundingBox();
            const material = new THREE.MeshStandardMaterial({ 
              map: texture,
              transparent: true, // Enable transparency
              opacity: 1,
              visible: true,
              emissive: 0xffffff,
            });
            const plane = new THREE.Mesh(geometry, material);
            
            const group = new THREE.Group();
            const childContainer = new THREE.Group();
            childContainer.add(plane);
            childContainer.rotateZ(Math.PI);
            childContainer.rotateZ(Math.PI/9);
            childContainer.updateMatrixWorld();

            group.add(childContainer);

            const geojsonbbox = turf.bbox(polygon);

            const bbox1 = new THREE.Box3(projectToWorld([geojsonbbox[2], geojsonbbox[3]]), projectToWorld([geojsonbbox[0], geojsonbbox[1]]));
            const bbox2 = new THREE.Box3().setFromObject(plane);

            const size1 = new THREE.Vector3();
            bbox1.getSize(size1);
            size1.setZ(1);

            const size2 = new THREE.Vector3();
            bbox2.getSize(size2);
            size2.setZ(1);

            const ratio = size1.divide( size2 );

            const ratioCopy = ratio.clone().multiplyScalar(0.85);

            plane.scale.set(plane.scale.x * (ratioCopy.x), plane.scale.y * (ratioCopy.y), plane.scale.z * (ratioCopy.z));

            // Set the position of the plane to the centroid
            group.position.set(
              modelPosition.x,
              modelPosition.y,
              modelPosition.z+1
            );
            items.push(group);
            console.log("group", group);

            wrapper.current?.add(group);
            });
          }
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
