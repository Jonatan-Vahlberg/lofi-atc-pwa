

export const STORAGE_KEYS = {
    LAST_PLAYED_STATION: "LAST_PLAYED_MUSIC",
    FAVOURITE_STATIONS: "FAVOURITE_MUSIC",
    VOLUME_MUSIC: "VOLUME_MUSIC",
    VOLUME_ATC: "VOLUME_ATC",
    MOOD: "MOOD",
}

class StorageKit{
    
    _get(key, _default = null, parse = false){
        if(parse){
            return JSON.parse(localStorage.getItem(key)) || _default;
        }
        return localStorage.getItem(key) || _default;
    }

    _set(key, value){
        if(typeof value !== "string"){
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
    }

    _remove(key){
        localStorage.removeItem(key);
    }

    clear(){
        localStorage.clear();
    }
}

export default StorageKit;