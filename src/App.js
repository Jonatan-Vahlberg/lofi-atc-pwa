import { useState } from "react";
import Radio from "./components/MusicController";
// MATH get random number between 10 and 83
function App() {

  const [backgroundImage, setBackgroundImage] = useState(`images/${Math.floor(Math.random() * (83 - 10 + 1)) + 10}.gif`);

  return (
    <div className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
      <Radio/>
    </div>
  );
}

export default App;
