import { Children, createContext , useContext ,useState} from "react";

export const CurrentSongContext = createContext()

export const useCurrentSongContext = () => useContext(CurrentSongContext)

export const CurrentSongProvider = ({children}) =>{
    const [currentSong , setCurrentSong] = useState()
    return(
        <CurrentSongContext.Provider value={{currentSong , setCurrentSong}}>
            {children}
        </CurrentSongContext.Provider>
    )
}