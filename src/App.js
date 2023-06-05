import { useState } from "react";
import MusicController from "./components/MusicController";
// MATH get random number between 1 and 83
function App() {

  const [backgroundImage, setBackgroundImage] = useState(`images/${Math.floor(Math.random() * 83) + 1}.gif`);

  return (
    <div className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
      <MusicController/>
    </div>
  );
}

export default App;
