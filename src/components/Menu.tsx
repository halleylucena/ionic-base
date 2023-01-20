import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle } from "@ionic/react"

import { useLocation } from "react-router-dom"
import { documents, homeSharp } from "ionicons/icons"
import "./Menu.css"

interface AppPage {
    url: string
    iosIcon: string
    mdIcon: string
    title: string
}

const appPages: AppPage[] = [
    {
        title: "Home",
        url: "/home",
        iosIcon: homeSharp,
        mdIcon: homeSharp,
    },
    {
        title: "Documents",
        url: "/documents",
        iosIcon: documents,
        mdIcon: documents,
    },
]

const Menu: React.FC = () => {
    const location = useLocation()

    return (
        <IonMenu contentId="main" type="overlay">
            <IonContent>
                <IonList id="inbox-list">
                    {appPages.map((appPage, index) => {
                        return (
                            <IonMenuToggle key={index} autoHide={false}>
                                <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                                    <IonLabel>{appPage.title}</IonLabel>
                                </IonItem>
                            </IonMenuToggle>
                        )
                    })}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default Menu
