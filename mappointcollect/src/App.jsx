import { useState } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import MyMap from './components/MyMap';
import CustomMap from './components/CustomMap';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1>Carte des points de collecte d'emballages écologiques</h1>
      <div>
        {/* <h1>Ma Carte OpenStreetMap</h1> */}
        {/* <MyMap /> */}
        <CustomMap/>
      </div>
    </div>
    </>
  )
}

export default App
