import StorageKit, { STORAGE_KEYS } from "./StorageKit";


class SettingsStorageKit extends StorageKit {

    getSettings() {
        return {
            theme: this.getTheme(),
            mood: this.getMood(),
            volume: this.getMusicVolume()
        }
    }

    getMusicVolume() {
        return this._get(STORAGE_KEYS.VOLUME_MUSIC, 60, true);
    }

    setMusicVolume(volume) {
        this._set(STORAGE_KEYS.VOLUME_MUSIC, volume);
    }

    getMood() {
        return this._get(STORAGE_KEYS.MOOD, "happy");
    }

    setMood(mood) {
        this._set(STORAGE_KEYS.MOOD, mood);
    }

    getTheme() {
        return this._get(STORAGE_KEYS.THEME, "light");
    }

    setTheme(theme) {
        this._set(STORAGE_KEYS.THEME, theme);
    }
    
}

const settingsStorageKit = new SettingsStorageKit();

export default settingsStorageKit;