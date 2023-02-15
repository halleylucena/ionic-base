import { createContext, useContext, useState } from "react"
import { Redirect, Route } from "react-router-dom"
import useStore from "../../store/store"

const authContext = createContext<any>("")

export function ProvideAuth({ children }: any) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export function useAuth() {
    return useContext(authContext)
}

export function PrivateRoute({ children, ...rest }: any) {
    let auth = useAuth()
    console.log("api Key: ", auth.apiKey)
    return <Route {...rest} render={() => (auth.apiKey !== null ? children : <Redirect to="/login" />)} />
}

const useProvideAuth = () => {
    const [user, setUser] = useState<any>(null)
    const apiKey = useStore((state: any) => state.apiKey)
    const setApiKey = useStore((state: any) => state.setApiKey)
    const deleteApiKey = useStore((state: any) => state.deleteApiKey)
    const reset = useStore((state: any) => state.reset)

    const signin = (apiKey: string, cb: () => void) => {
        return (() => {
            setUser("logged")
            setApiKey(apiKey)
            cb()
        })()
    }

    const signout = (cb: () => void) => {
        return (() => {
            setUser(null)
            deleteApiKey()
            reset()
            cb()
        })()
    }

    return {
        user,
        apiKey,
        setApiKey,
        deleteApiKey,
        signin,
        signout,
    }
}

export default useProvideAuth
