import { createContext } from 'react'
import {useCookies} from 'react-cookie'

export const CookieContext = createContext()

export const useCookieContext = () => useContext(CookieContext)

export function CookieProvider({children})
{
    const [cookie, setCookie] = useCookies()
    return(
        <CookieContext.Provider value={{}}>
            {children}
        </CookieContext.Provider>
    )
}