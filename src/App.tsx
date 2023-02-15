import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { Redirect, Route, Switch } from "react-router-dom"
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
import { lazy, Suspense } from "react"
import { PrivateRoute, ProvideAuth } from "./logic/auth/useProvideAuth"
import LoginPage from "./pages/LoginPage"

const Documents = lazy(() => import("remote/Documents"))
const DocumentDetail = lazy(() => import("remote/DocumentDetail"))

setupIonicReact()

const App: React.FC = () => {
    const store: any = useStore()

    return (
        <IonApp>
            <ProvideAuth>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <Menu />
                        <IonRouterOutlet id="main">
                            <PrivateRoute path="/home" exact={true}>
                                <Home />
                            </PrivateRoute>
                            <PrivateRoute path="/documents" exact={true}>
                                <Suspense>
                                    <Documents typesFiltered={store.typesFiltered} apiKey={store.apiKey} />
                                </Suspense>
                            </PrivateRoute>
                            <PrivateRoute path="/documents/:id" exact={true}>
                                <Suspense>
                                    <DocumentDetail apiKey={store.apiKey} />
                                </Suspense>
                            </PrivateRoute>
                            <Route component={Home} />
                        </IonRouterOutlet>
                    </IonSplitPane>
                    <Switch>
                        <Route path="/" exact={true}>
                            <Redirect to="/home" />
                        </Route>
                        <Route path="/login" exact={true}>
                            <LoginPage />
                        </Route>
                    </Switch>
                </IonReactRouter>
            </ProvideAuth>
        </IonApp>
    )
}

export default App
