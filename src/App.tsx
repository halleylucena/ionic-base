import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route } from "react-router-dom"
import Menu from "./components/Menu"
import useStore from "./store/store"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

// /* Theme variables */
import "./theme/variables.scss"
import "./theme/global.scss"
import Home from "./pages/Home"
import { lazy, Suspense, useEffect, useState } from "react"
import { PrivateRoute, ProvideAuth } from "./logic/auth/useProvideAuth"
import LoginPage from "./pages/LoginPage"

const Documents = lazy(() => import("documents/Documents"))
const DocumentDetail = lazy(() => import("documents/DocumentDetail"))

setupIonicReact({
    rippleEffect: false,
    mode: "md",
})

const App: React.FC = () => {
    const store: any = useStore()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [disablePane, setDisablePane] = useState(false)

    useEffect(() => {
        return () => {}
    }, [])

    return (
        <IonApp>
            <ProvideAuth>
                <IonReactRouter>
                    <IonSplitPane contentId="main" when={false}>
                        <Menu />
                        <IonRouterOutlet id="main">
                            <Route path="/" exact={true}>
                                <Redirect to="/documents" />
                            </Route>
                            <Route path="/login" exact={true}>
                                <LoginPage />
                            </Route>
                            <PrivateRoute path="/home" exact={true}>
                                <Home />
                            </PrivateRoute>
                            <PrivateRoute path="/documents" exact={true}>
                                <Suspense>
                                    <Documents typesFiltered={store.typesFiltered} setTypesFiltered={store.setTypesFiltered} apiKey={store.apiKey} />
                                </Suspense>
                            </PrivateRoute>
                            <PrivateRoute path="/documents/:id" exact={true}>
                                <Suspense>
                                    <DocumentDetail apiKey={store.apiKey} />
                                </Suspense>
                            </PrivateRoute>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </ProvideAuth>
        </IonApp>
    )
}

export default App
