import { useEffect, useRef, useState } from "react";
import useYoutube from "../../utils/hooks/useYoutube"
import Youtube from "react-youtube";
import VolumeControl from "./VolumeControl";


const MusicController = () => {
    const [selectedVideo, changeSelectedVideo] = useYoutube();
    const [volume, setVolume] = useState(60);

    const [currentState, setCurrentState] = useState("paused");

    const youtubeRef = useRef(null);

    useEffect(() => {
        changeSelectedVideo('8YA825ZNAIE')
    },[])

    // useEffect(() => {
    //     console.log("AFTER CHANGES",selectedVideo, currentState);
    //     if(selectedVideo && currentState === "playing" && youtubeRef.current){
    //         youtubeRef.current.internalPlayer.playVideo();
    //     }
    // },[selectedVideo, currentState])

    const toggleState = () => {
        console.log("TOGGLE",currentState, youtubeRef.current?.internalPlayer)
        if(currentState === "paused"){
            setCurrentState("playing");
            youtubeRef.current.internalPlayer.playVideo();
        } else {
            setCurrentState("paused");
            youtubeRef.current.internalPlayer.pauseVideo();
        }
    }

    const changeVolume = (volume) => {
        console.log("VOLUME",volume);
        //Change internet tab volume
        youtubeRef.current.internalPlayer.setVolume(volume)
        setVolume(volume);
    }

    console.log("SELECTED ",selectedVideo?.id);


    return <div className="music-controller">
        <h1>Music Controller</h1>
        <select onChange={(e) => changeSelectedVideo(e.target.value)}>
            <option value="jfKfPfyJRdk">lofi hip hop radio 📚 - beats to relax/study to
</option>
            <option value="MVPTGNGiI-4">synthwave radio 🌌 - beats to chill/game to
</option>
            <option value="DHHgoAMflOs">Medieval Lofi 24/7
</option>
            <option value="8YA825ZNAIE">Coding in Chicago v2.0 | 🎧 24/7 LoFi Hip-Hop Radio
</option>
        </select>
        
        <button onClick={toggleState}>
            {currentState === "paused" ? "Play" : "Pause"}
        </button>
     
       {selectedVideo && <Youtube
         videoId={selectedVideo?.id}
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
                        setCurrentState("playing");
                        break;
                    case 2:
                        console.log("PAUSED");
                        setCurrentState("paused");
                        break;
                    case 3:
                        console.log("BUFFERING");
                        break;
                    case 5:
                        console.log("CUED");
                        if(currentState === "playing"){
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

export default MusicController;