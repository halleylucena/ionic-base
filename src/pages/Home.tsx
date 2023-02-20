import { IonButtons, IonContent, IonHeader, IonImg, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React from "react"
const dashboardImg = "/assets/img/dashboard.svg"

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>

                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <div className="ion-padding">
                    <IonImg className="" src={dashboardImg} />
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Home
