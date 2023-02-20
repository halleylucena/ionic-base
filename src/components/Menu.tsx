import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react"
import { useHistory, useLocation } from "react-router-dom"
import { documents, logOut } from "ionicons/icons"
import "./Menu.scss"
// import { lazy, Suspense } from "react"
// import useStore from "../store/store"
import { useAuth } from "../logic/auth/useProvideAuth"

interface AppPage {
    url: string
    iosIcon: string
    mdIcon: string
    title: string
}

const appPages: AppPage[] = [
    // {
    //     title: "Home",
    //     url: "/home",
    //     iosIcon: homeSharp,
    //     mdIcon: homeSharp,
    // },
    {
        title: "Documents",
        url: "/documents",
        iosIcon: documents,
        mdIcon: documents,
    },
]

// const DocumentFilter = lazy(() => import("remote/DocumentFilter"))

const Menu: React.FC = () => {
    const location = useLocation()
    // const typesFiltered = useStore((state: any) => state.typesFiltered)
    // const setTypesFiltered = useStore((state: any) => state.setTypesFiltered)
    const auth = useAuth()
    const history = useHistory()

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    {appPages.map((appPage, index) => (
                        <IonMenuToggle key={index} autoHide={false}>
                            <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                <IonLabel>{appPage.title}</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    ))}
                </IonList>
                {auth.apiKey !== "" ? (
                    <IonList id="action-list">
                        <IonMenuToggle autoHide={true}>
                            <IonItem
                                onClick={() => {
                                    auth.signout(() => history.go(0))
                                }}
                                routerLink={"/"}
                                lines="none"
                                detail={false}
                            >
                                <IonIcon slot="start" icon={logOut} />
                                <IonLabel className="">Sign out</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                ) : null}
                {/* <div className="menu-container">
                    <IonGrid>
                        <IonRow>
                            {location.pathname === "/documents/" || location.pathname === "/documents" ? (
                                <Suspense>
                                    <DocumentFilter typesFiltered={typesFiltered} setTypesFiltered={setTypesFiltered} />
                                </Suspense>
                            ) : null}
                        </IonRow>
                    </IonGrid>
                </div> */}
            </IonContent>
        </IonMenu>
    )
}

export default Menu
