import { useSettings } from "../../utils/context/SettingsContext";

const options = [
    {
      label: 'Mute',
      value: 0,
      color: "#808080",
      selectedColor: "#fff2f7"
    },
    {
      label: 'Low',
      value: 20,
      color: "#b3b3b3",
      selectedColor: "#ffe6f0"
    },
    {
      label: 'Medium',
      value: 40,
      color: "#cccccc",
      selectedColor: "#ffd3e1"
    },
    {
      label: 'High',
      value: 60,
      color: "#e6e6e6",
      selectedColor: "#ffc0d1"
    },
    {
      label: 'Max',
      value: 80,
      color: "#f2f2f2",
      selectedColor: "#ffadc1"
    },
    {
      label: 'Full',
      value: 100,
      color: "#ffffff",
      selectedColor: "#ff99a8"
    }
  ];

const VolumeControl = () => {
  const settings = useSettings()
    return (
        <div className="volume-control">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => settings.setVolume(option.value)}
                    style={{
                        backgroundColor: "transparent",
                        color: settings.state.volume >= option.value ? option.selectedColor : option.color,
                        border: "none",
                        fontSize: "1.5rem",
                        
                    }}
                >
                    ❚
                </button>
            ))}
        </div>
    )   
}

export default VolumeControl;