import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

interface PointColl{
    id: number;
    position: number[] | any;
    name: string;
}
const pointsDeCollecte : PointColl[] = [
    { id: 2, position: [48.8584, 2.2945], name: "Point de collecte France" },
  { id: 3, position: [48.8534, 2.3488], name: "Point de collecte Paris 2" },
  { id: 4, position: [3.8480, 11.5021], name: "Point de collecte Ngaoundéré" },
  { id: 5, position: [4.0584, 9.7343], name: "Point de collecte Douala" },
  { id: 6, position: [3.848, 13.0514], name: "Point de collecte Garoua" },
  { id: 7, position: [6.3667, 10.3522], name: "Point de collecte Bamenda" },
  { id: 8, position: [3.848, 11.5021], name: "Point de collecte Bafoussam" },
  { id: 9, position: [2.037, 11.4704], name: "Point de collecte Maroua" },
  { id: 10, position: [4.159, 9.231], name: "Point de collecte Limbe" },

  // Yaoundé (Centre) et Quartiers
  { id: 11, position: [3.8480, 11.5021], name: "Centre Yaoundé" },

  // Bastos
  { id: 12, position: [3.8650, 11.5190], name: "Carrefour Bastos" },
  { id: 13, position: [3.8665, 11.5210], name: "Supermarché DOVV Bastos" },
  { id: 14, position: [3.8675, 11.5230], name: "Ambassade Carrefour" },
  { id: 15, position: [3.8640, 11.5180], name: "Pharmacie Bastos" },
  { id: 16, position: [3.8630, 11.5200], name: "Église Bastos" },

  // Melen
  { id: 17, position: [3.8482, 11.5123], name: "Carrefour Melen" },
  { id: 18, position: [3.8479, 11.5112], name: "Supermarché Santa Lucia Melen" },
  { id: 19, position: [3.8495, 11.5129], name: "École Melen Carrefour" },
  { id: 20, position: [3.8488, 11.5105], name: "Pharmacie Melen" },
  { id: 21, position: [3.8470, 11.5135], name: "Station-service Melen" },

  // Nkolbisson
  { id: 22, position: [3.8743, 11.5005], name: "Carrefour Nkolbisson" },
  { id: 23, position: [3.8730, 11.5010], name: "Église Nkolbisson" },
  { id: 24, position: [3.8725, 11.5020], name: "Marché Nkolbisson" },
  { id: 25, position: [3.8740, 11.4995], name: "Collège Nkolbisson" },
  { id: 26, position: [3.8755, 11.5015], name: "Supermarché Nkolbisson" },

  // Essos
  { id: 27, position: [3.8665, 11.5227], name: "Carrefour Essos" },
  { id: 28, position: [3.8659, 11.5240], name: "Supermarché Mahima Essos" },
  { id: 29, position: [3.8670, 11.5219], name: "Marché Essos" },
  { id: 30, position: [3.8660, 11.5235], name: "Église Essos" },
  { id: 31, position: [3.8650, 11.5220], name: "Hôpital Essos" },

  // Etoudi
  { id: 32, position: [3.8789, 11.5173], name: "Carrefour Etoudi" },
  { id: 33, position: [3.8795, 11.5180], name: "Pharmacie Etoudi" },
  { id: 34, position: [3.8800, 11.5165], name: "Palais présidentiel Carrefour" },
  { id: 35, position: [3.8785, 11.5178], name: "École Etoudi" },
  { id: 36, position: [3.8790, 11.5160], name: "Marché Etoudi" },

  // Ekounou
  { id: 37, position: [3.8375, 11.5210], name: "Carrefour Ekounou" },
  { id: 38, position: [3.8365, 11.5205], name: "École Ekounou" },
  { id: 39, position: [3.8380, 11.5208], name: "Pharmacie Ekounou" },
  { id: 40, position: [3.8378, 11.5195], name: "Station-service Ekounou" },
  { id: 41, position: [3.8368, 11.5212], name: "Marché Ekounou" },

  // Biyem-Assi
  { id: 42, position: [3.8377, 11.5152], name: "Carrefour Biyem-Assi" },
  { id: 43, position: [3.8369, 11.5148], name: "Supermarché Mahima Biyem-Assi" },
  { id: 44, position: [3.8372, 11.5160], name: "Église Biyem-Assi" },
  { id: 45, position: [3.8380, 11.5145], name: "Marché Biyem-Assi" },
  { id: 46, position: [3.8365, 11.5165], name: "Collège Biyem-Assi" },

  // Obili
  { id: 47, position: [3.8359, 11.5132], name: "Carrefour Obili" },
  { id: 48, position: [3.8365, 11.5138], name: "Pharmacie Obili" },
  { id: 49, position: [3.8350, 11.5125], name: "Marché Obili" },
  { id: 50, position: [3.8345, 11.5130], name: "Église Obili" },
  { id: 51, position: [3.8360, 11.5120], name: "École Obili" },

  // Mendong
  { id: 52, position: [3.8492, 11.5068], name: "Carrefour Mendong" },
  { id: 53, position: [3.8485, 11.5075], name: "Supermarché Mahima Mendong" },
  { id: 54, position: [3.8490, 11.5055], name: "Marché Mendong" },
  { id: 55, position: [3.8480, 11.5060], name: "Église Mendong" },
  { id: 56, position: [3.8500, 11.5065], name: "École Mendong" },

  // Oyom-Abang
  { id: 57, position: [3.8446, 11.5073], name: "Carrefour Oyom-Abang" },
  { id: 58, position: [3.8450, 11.5068], name: "Pharmacie Oyom-Abang" },
  { id: 59, position: [3.8440, 11.5078], name: "Marché Oyom-Abang" },
  { id: 60, position: [3.8442, 11.5062], name: "Station-service Oyom-Abang" },
  { id: 61, position: [3.8455, 11.5070], name: "École Oyom-Abang" },
];

const CustomMap = () => {
const [collectionPoints, setCollectionPoints] = useState<any>(pointsDeCollecte);
const [myPosition, setMyPosition] = useState<any>([48.8566, 2.3522]);
  useEffect(() => {
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geolocationCoordinates: GeolocationCoordinates =
            position.coords;

          const c: LatLngExpression = [
            geolocationCoordinates.latitude,
            geolocationCoordinates.longitude,
          ];

          if (c) {
            const data = {
              id: 4,
              position: c,
              name: "Ma superbe position !!!",
            };
            const cPs = [data, ...collectionPoints];
            setCollectionPoints(cPs);
            setMyPosition(c);
          }
        },
        (error) => {
          console.error("Error getting location", error);
          // setMyPosition([51.505, -0.09]); // Default to London
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // setMyPosition([51.505, -0.09]); // Default to London
    }
  }, []);
  
  return (
<>
{console.log(myPosition)}
<MapContainer center={myPosition ? myPosition : [48.8566, 2.3522]}
    zoom={13}
    scrollWheelZoom={false} style={{ height: "100vh", width: "100%" }}>
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
         <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {pointsDeCollecte.map((point) => (
        <CircleMarker
  key={point.id}
  center={point.position}
  // position={point.position}
  radius={10}  // Taille du marqueur
  color={point.id % 2 === 0 ? "blue" : "red"}  // Alternance de couleur
  fillColor={point.id % 2 === 0 ? "blue" : "red"}  // Couleur de remplissage
  fillOpacity={0.6}
>
  <Popup>{point.name}</Popup>
</CircleMarker>
      ))}
    </MapContainer>
</>
   
  );
};

export default CustomMap;
