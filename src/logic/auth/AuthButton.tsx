import { useHistory } from "react-router-dom"
import { useAuth } from "./useProvideAuth"

const AuthButton = () => {
    let history = useHistory()
    let auth = useAuth()

    return auth?.user ? (
        <p>
            Welcome!{" "}
            <button
                onClick={() => {
                    auth?.signout(() => history.push("/"))
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    )
}

export default AuthButton
