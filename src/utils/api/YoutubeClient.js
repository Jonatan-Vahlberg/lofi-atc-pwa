import axios from 'axios';


class YoutubeClient {
    constructor() {
        this.youtube = axios.create({
            baseURL: 'https://www.googleapis.com/youtube/v3',
            params: {
                key: process.env.REACT_APP_GOOGLE_API_KEY,
                part: 'snippet',
                maxResults: 5
            }
        })
    }

    async searchVideos(searchTerm) {
        const response = await this.youtube.get('/search', {
            params: {
                q: searchTerm
            }
        })
        return response.data.items;
    }

    async getVideo(videoId) {
        const response = await this.youtube.get('/videos', {
            params: {
                id: videoId,
            }
        })
        return response.data.items[0];
    }
}

const youtubeClient = new YoutubeClient();

export default youtubeClient;