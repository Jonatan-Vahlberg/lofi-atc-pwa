import storageKit, { STORAGE_KEYS } from "./StorageKit";

class RadioStorageKit extends storageKit{

    getRadioStation(){
        return this._get(STORAGE_KEYS.LAST_PLAYED_STATION, null, true);
    }

    setRadioStation(station = {}){
        this._set(STORAGE_KEYS.LAST_PLAYED_STATION, station);
    }

    getFavouriteStations(){
        return this._get(STORAGE_KEYS.FAVOURITE_STATIONS, [], true);
    }

    setFavouriteStations(stations = []){
        this._set(STORAGE_KEYS.FAVOURITE_STATIONS, stations);
    }

    clearFavouriteStations(){
        this._set(STORAGE_KEYS.FAVOURITE_STATIONS, []);
    }

}

const radioStorageKit = new RadioStorageKit();

export default radioStorageKit;
