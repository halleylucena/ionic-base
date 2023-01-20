import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { lazy, Suspense } from "react"

const Button = lazy(() => import("remote/ButtonDesktop"))

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
                <Suspense>
                    <Button text={"ola"}/>
                </Suspense>
            </IonContent>
        </IonPage>
    )
}

export default Home