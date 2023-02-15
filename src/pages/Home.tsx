import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { lazy, Suspense } from "react"
import { useHistory } from "react-router"
import { useAuth } from "../logic/auth/useProvideAuth"

const Button = lazy(() => import("remote/ButtonDesktop"))

const Home: React.FC = () => {
    const auth = useAuth()
    const history = useHistory()
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
                    <Suspense>
                        <Button text={"Button MFE"} />
                    </Suspense>

                    <IonButton
                        onClick={() => {
                            auth.signout(() => history.push("/login"))
                        }}
                    >
                        Sign out
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Home
