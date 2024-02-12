import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import Map from "./components/Map";
import "./styles.css";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function App() {
  const [coords, setCoords] = useState({
    longitude: 0,
    latitude: 0,
  });

  async function getISSCoords() {
    try {
      const response = await fetch(URL);
      const data = await response.json();

      const newCoords = { longitude: data.longitude, latitude: data.latitude };
      console.log(newCoords);
      setCoords(newCoords);
    } catch (error) {
      console.log(error);
    }
  }
  // setInterval(getISSCoords: () => getISSCoords, ms: 5000 )

  useEffect(() => {
    const myInterval = setInterval(() => {
      getISSCoords();
    }, 5000);
    // setInterval(getISSCoords, 5000);
    let intervalID;
    return clearInterval(intervalID);
  }, []);
  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={getISSCoords}
      />
    </main>
  );
}
