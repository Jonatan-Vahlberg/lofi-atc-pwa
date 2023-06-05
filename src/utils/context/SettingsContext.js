import React from 'react'
import settingsStorageKit from '../storage/SettingsStorageKit'

const defaultSettings = {
    theme: 'light',
    mood: 'happy',
    volume: 60,
}

const SettingsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        case 'SET_MOOD':
            return {
                ...state,
                mood: action.payload
            }
        case 'SET_VOLUME':
            return {
                ...state,
                volume: action.payload
            }
        case 'SET_SETTINGS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

const SettingsContext = React.createContext({
    state: defaultSettings,
    setTheme: (theme) => {},
    setMood: (mood) => {},
    setVolume: (volume) => {}
})

const SettingsProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(SettingsReducer, defaultSettings)

    React.useEffect(() => {
        const settings = settingsStorageKit.getSettings()
        dispatch({
            type: 'SET_SETTINGS',
            payload: settings
        })
    }, [])

    const setTheme = (theme) => {
        dispatch({
            type: 'SET_THEME',
            payload: theme
        })
        settingsStorageKit.setTheme(theme)
    }

    const setMood = (mood) => {
        dispatch({
            type: 'SET_MOOD',
            payload: mood
        })
        settingsStorageKit.setMood(mood)
    }

    const setVolume = (volume = 0) => {
        dispatch({
            type: 'SET_VOLUME',
            payload: volume
        })
        settingsStorageKit.setMusicVolume(volume)
    }

    return (
        <SettingsContext.Provider value={{
            state,
            setTheme,
            setMood,
            setVolume
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

const useSettings = () => {
    const context = React.useContext(SettingsContext)
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}

export { SettingsProvider, useSettings }