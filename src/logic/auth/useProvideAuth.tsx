import { createContext, useContext } from "react"
import { useQueryClient } from "react-query"
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
    return (
        <Route
            {...rest}
            render={() =>
                auth.apiKey !== null ? (
                    children
                ) : (
                    <>
                        <Redirect
                            to={{
                                pathname: "/login",
                            }}
                        />
                    </>
                )
            }
        />
    )
}

const useProvideAuth = () => {
    const apiKey = useStore((state: any) => state.apiKey)
    const setApiKey = useStore((state: any) => state.setApiKey)
    const resetStore = useStore((state: any) => state.resetStore)
    const queryClient = useQueryClient()

    const signin = (apiKey: string, cb: () => void) => {
        return (() => {
            setApiKey(apiKey)
            cb()
        })()
    }

    const signout = (cb: () => void) => {
        return (() => {
            resetStore()
            queryClient.removeQueries()
            cb()
        })()
    }

    return {
        apiKey,
        setApiKey,
        signin,
        signout,
    }
}

export default useProvideAuth
