import { useEffect, useRef, useState } from "react";
import useYoutube from "../../utils/hooks/useYoutube"
import Youtube from "react-youtube";
import VolumeControl from "./VolumeControl";
import { useRadio } from "../../utils/context/RadioContext";
import { useSettings } from "../../utils/context/SettingsContext";
import RadioControls from "./RadioControls";


const Radio = () => {
    const settings = useSettings()
    const radio = useRadio()
    const [volume, setVolume] = useState(60);

    const [playState, setPlayState] = useState("paused");

    const youtubeRef = useRef(null);
    

    useEffect(() => {
        // changeSelectedVideo('8YA825ZNAIE')
//         <option value="jfKfPfyJRdk">lofi hip hop radio 📚 - beats to relax/study to
// </option>
//             <option value="MVPTGNGiI-4">synthwave radio 🌌 - beats to chill/game to
// </option>
//             <option value="DHHgoAMflOs">Medieval Lofi 24/7
// </option>
//             <option value="8YA825ZNAIE">Coding in Chicago v2.0 | 🎧 24/7 LoFi Hip-Hop Radio
// </option>
    },[])

    useEffect(() => {
        if(youtubeRef.current){
            youtubeRef.current.internalPlayer.setVolume(settings.state.volume)
        }
    },[settings.state.volume])

    // useEffect(() => {
    //     console.log("AFTER CHANGES",selectedVideo, currentState);
    //     if(selectedVideo && currentState === "playing" && youtubeRef.current){
    //         youtubeRef.current.internalPlayer.playVideo();
    //     }
    // },[selectedVideo, currentState])

    const toggleState = () => {
        console.log("TOGGLE",playState, youtubeRef.current?.internalPlayer)
        if(playState === "paused"){
            setPlayState("playing");
            youtubeRef.current.internalPlayer.playVideo();
        } else {
            setPlayState("paused");
            youtubeRef.current.internalPlayer.pauseVideo();
        }
    }

    const changeStation = (station, modifier = 1) => {
        if(station){
            radio.setStation(station);
        }
        else {
            let currentStationIndex = radio.state.stations.findIndex((s) => s.id === radio.state.station.id);
            let nextStationIndex = currentStationIndex + modifier;

            if(nextStationIndex < 0){
                nextStationIndex = radio.state.stations.length - 1;
            } else if(nextStationIndex >= radio.state.stations.length){
                nextStationIndex = 0;
            }
            radio.setStation(radio.state.stations[nextStationIndex]);
        }
    }

    const changeVolume = (volume) => {
        console.log("VOLUME",volume);
        //Change internet tab volume
        youtubeRef.current.internalPlayer.setVolume(volume)
        setVolume(volume);
    }
    console.log("station", radio.state.station)
    return <div className="music-controller">
        <h1>Music Controller</h1>
        {radio.state.station && <p>Now playing: {radio.state.station?.snippet?.title}</p>}
       < RadioControls
        playState={playState}
        togglePlayState={toggleState}
        changeStation={changeStation}
       />

       {radio.state.station && <Youtube
         videoId={radio.state.station?.id}
         id="youtube-player"
         style={{
           display: "none" 
         }}
         ref={youtubeRef}
         onStateChange={(e) => {
                console.log(e);
                switch(e.data){
                    case 0:
                        console.log("ENDED");
                        break;
                    case 1:
                        console.log("PLAYING");
                        setPlayState("playing");
                        break;
                    case 2:
                        console.log("PAUSED");
                        setPlayState("paused");
                        break;
                    case 3:
                        console.log("BUFFERING");
                        break;
                    case 5:
                        console.log("CUED");
                        if(playState === "playing"){
                            youtubeRef.current.internalPlayer.playVideo();
                        }
                        break;
                    default:
                        console.log("UNHANDLED");
                        break;
                }
            }
         }
       />}
       <VolumeControl
        volume={volume}
        setVolume={changeVolume}
       />
    </div>


}

export default Radio;