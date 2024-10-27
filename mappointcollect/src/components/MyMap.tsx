// MapComponent.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L, { LatLngExpression } from "leaflet";

// // Configuration des icônes de marqueur
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

// Liste des points de collecte (exemple)

const listP: LatLngExpression[] = [
  [48.8566, 2.3522],  //Paris
  [48.8584, 2.2945],  //France
  [48.8534, 2.3488],  //Paris
  [3.8480, 11.5021],  // Ngaoundéré
  [4.0584, 9.7343],   // Douala
  [3.848, 13.0514],   // Garoua
  [6.3667, 10.3522],  // Bamenda
  [3.848, 11.5021],   // Bafoussam
  [2.037, 11.4704],   // Maroua
  [4.159, 9.231],     // Limbe
    // Ngaoundéré, Douala, Garoua, etc.
  [3.8480, 11.5021],  // Yaoundé (Centre)

  // Bastos
  [3.8650, 11.5190],  // Carrefour Bastos
  [3.8665, 11.5210],  // Supermarché DOVV Bastos
  [3.8675, 11.5230],  // Ambassade Carrefour
  [3.8640, 11.5180],  // Pharmacie Bastos
  [3.8630, 11.5200],  // Eglise Bastos

  // Melen
  [3.8482, 11.5123],  // Carrefour Melen
  [3.8479, 11.5112],  // Supermarché Santa Lucia Melen
  [3.8495, 11.5129],  // École Melen Carrefour
  [3.8488, 11.5105],  // Pharmacie Melen
  [3.8470, 11.5135],  // Station-service Melen

  // Nkolbisson
  [3.8743, 11.5005],  // Carrefour Nkolbisson
  [3.8730, 11.5010],  // Église Nkolbisson
  [3.8725, 11.5020],  // Marché Nkolbisson
  [3.8740, 11.4995],  // Collège Nkolbisson
  [3.8755, 11.5015],  // Supermarché Nkolbisson

  // Essos
  [3.8665, 11.5227],  // Carrefour Essos
  [3.8659, 11.5240],  // Supermarché Mahima Essos
  [3.8670, 11.5219],  // Marché Essos
  [3.8660, 11.5235],  // Église Essos
  [3.8650, 11.5220],  // Hôpital Essos

  // Etoudi
  [3.8789, 11.5173],  // Carrefour Etoudi
  [3.8795, 11.5180],  // Pharmacie Etoudi
  [3.8800, 11.5165],  // Palais présidentiel Carrefour
  [3.8785, 11.5178],  // École Etoudi
  [3.8790, 11.5160],  // Marché Etoudi

  // Ekounou
  [3.8375, 11.5210],  // Carrefour Ekounou
  [3.8365, 11.5205],  // École Ekounou
  [3.8380, 11.5208],  // Pharmacie Ekounou
  [3.8378, 11.5195],  // Station-service Ekounou
  [3.8368, 11.5212],  // Marché Ekounou

  // Biyem-Assi
  [3.8377, 11.5152],  // Carrefour Biyem-Assi
  [3.8369, 11.5148],  // Supermarché Mahima Biyem-Assi
  [3.8372, 11.5160],  // Église Biyem-Assi
  [3.8380, 11.5145],  // Marché Biyem-Assi
  [3.8365, 11.5165],  // Collège Biyem-Assi

  // Obili
  [3.8359, 11.5132],  // Carrefour Obili
  [3.8365, 11.5138],  // Pharmacie Obili
  [3.8350, 11.5125],  // Marché Obili
  [3.8345, 11.5130],  // Église Obili
  [3.8360, 11.5120],  // École Obili

  // Mendong
  [3.8492, 11.5068],  // Carrefour Mendong
  [3.8485, 11.5075],  // Supermarché Mahima Mendong
  [3.8490, 11.5055],  // Marché Mendong
  [3.8480, 11.5060],  // Église Mendong
  [3.8500, 11.5065],  // École Mendong

  // Oyom-Abang
  [3.8446, 11.5073],  // Carrefour Oyom-Abang
  [3.8450, 11.5068],  // Pharmacie Oyom-Abang
  [3.8440, 11.5078],  // Marché Oyom-Abang
  [3.8442, 11.5062],  // Station-service Oyom-Abang
  [3.8455, 11.5070],  // École Oyom-Abang
];

let list = [
  { id: 1, position: listP[0], name: "Point de collecte 1" },
  { id: 2, position: listP[1], name: "Point de collecte 2" },
  { id: 3, position: listP[2], name: "Point de collecte 3" },
  
  { id: 1, position: listP[1], name: "Point de collecte Carrefour Bastos" },
  { id: 2, position: listP[2], name: "Point de collecte Supermarché DOVV Bastos" },
  { id: 3, position: listP[3], name: "Point de collecte Ambassade Bastos" },
  { id: 4, position: listP[4], name: "Point de collecte Pharmacie Bastos" },
  { id: 5, position: listP[5], name: "Point de collecte Eglise Bastos" },
  
  // Ajoutez des points pour chaque quartier ici...
  { id: 6, position: listP[6], name: "Point de collecte Carrefour Melen" },
  { id: 7, position: listP[7], name: "Point de collecte Supermarché Santa Lucia Melen" },{ id: 1, position: [48.8566, 2.3522], name: "Point de collecte Paris 1" },
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

const MyMap = () => {
  const [collectionPoints, setCollectionPoints] = useState<any>(list);
  const [myPosition, setMyPosition] = useState<any>(listP[0]);
  const fdsfs: string = "";

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
    <MapContainer
      center={myPosition ? myPosition : listP[0]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {collectionPoints.map((point) => (
        <Marker position={point.position} key={point.id}
        >
          <Popup>
            {point.id} - {point.name}
          </Popup>
        </Marker>
      ))}
 //paris   </MapContainer>  
  );
};

export default MyMap;
    