import React from 'react'
import radioStorageKit from '../storage/RadioStorageKit'
import youtubeClient from '../api/YoutubeClient'

const defaultState = {
    station: null,
    stations: [],
    favouriteStations: []
}

const atcReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STATION':
            return {
                ...state,
                station: action.payload
            }
        case 'SET_STATIONS':
            return {
                ...state,
                stations: action.payload
            }
        case 'SET_FAVOURITE_STATIONS':
            return {
                ...state,
                favouriteStations: action.payload
            }
        default:
            return state
    }
}

const RadioContext = React.createContext({
    state: defaultState,
    getStation: (stationKey = "", setStorage = false) => {},
    setStation: (stationKey) => {},
    setStations: (searchKey) => {},
    setFavouriteStations: (stations = []) => {}
})

const RadioProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(atcReducer, defaultState)

    React.useEffect(() => {
        const station = radioStorageKit.getRadioStation()
        console.log("station CONTEXT", typeof station)
        if(station) {
            setStation(station)
        }
        else {
            getStation("", false)
        }
    }, [])

    const getStation = (stationKey = "", setStorage = false) => {
    youtubeClient.getVideo(stationKey || "3WBPGAzCcng")
        .then((response) => {
            console.log("response", response)
            if(response){
                setStation(response, setStorage)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const setStation = (station, setStorage = true) => {
        dispatch({
            type: 'SET_STATION',
            payload: station
        })
        if(setStorage){
            radioStorageKit.setRadioStation(station)
        }
    }

    const setStations = (searchKey = "") => {
        youtubeClient.searchVideos(searchKey)
            .then((response) => {
                dispatch({
                    type: 'SET_STATIONS',
                    payload: response.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const setFavouriteStations = (stations = []) => {
        dispatch({
            type: 'SET_FAVOURITE_STATIONS',
            payload: stations
        })
        radioStorageKit.setFavouriteStations(stations)
    }
    
    return (
        <RadioContext.Provider value={{ state, 
            getStation,
            setStation,
            setStations,
            setFavouriteStations
        }}>
            {children}
        </RadioContext.Provider>
    )
}

const useRadio = () => {
    const context = React.useContext(RadioContext)
    if (context === undefined) {
        throw new Error('useATC must be used within a ATCProvider')
    }
    return context
}

export { RadioProvider, useRadio }