// MapComponent.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

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
  [48.8566, 2.3522],
  [48.8584, 2.2945],
  [48.8534, 2.3488],
];

let list = [
  { id: 1, position: listP[0], name: "Point de collecte 1" },
  { id: 2, position: listP[1], name: "Point de collecte 2" },
  { id: 3, position: listP[2], name: "Point de collecte 3" },
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
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {collectionPoints.map((point) => (
        <Marker position={point.position} key={point.id}>
          <Popup>
            {point.id} - {point.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyMap;
