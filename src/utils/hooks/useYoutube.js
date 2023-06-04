import { useState } from "react";
import youtubeClient from "../api/YoutubeClient";


const useYoutube = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const changeSelectedVideo = async (videoId) => {
        const video = await youtubeClient.getVideo(videoId);
        setSelectedVideo(video);
    }

    return [selectedVideo, changeSelectedVideo];
}

export default useYoutube;
