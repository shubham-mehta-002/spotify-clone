import {createContext , useState , useContext ,useEffect } from 'react'
import Cookies from 'js-cookie'
export const LoginContext = createContext();

export const useLoginContext = () =>useContext(LoginContext)


export const LoginProvider = ({children}) => {
    
    const [loginState,setLoginState] = useState(false)

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token || token===' ')
            setLoginState(false)
        else
            setLoginState(true)
            
    })


    return(
        <LoginContext.Provider value={{loginState , setLoginState }}>
            {children}
        </LoginContext.Provider>
    )
}


