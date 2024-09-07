import { Children, createContext , useContext } from "react";

export const PlayerFunctionsContext= createContext()

export const usePlayerFunctionsContext = useContext(PlayerFunctionsContext)

export const PlayerFucntionsProvider = ({children})=>{
    return(
        <PlayerFunctionsContext.Provide>
            {children}
        </PlayerFunctionsContext.Provide>
    )
}
