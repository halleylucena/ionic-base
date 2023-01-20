import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import React, { lazy } from "react"
import { useParams } from "react-router"
import PopOverMenu from "../components/PopOverMenu"
import { arrowBackSharp } from "ionicons/icons"
import { useHistory } from "react-router-dom"

const DocumentDetails = lazy(() => import("remote/DocumentDetail"))
const DocumentDetailsOptions = lazy(() => import("remote/DocumentDetailOptions"))

const DocumentDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>()

    const history = useHistory()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                        <IonButton
                            onClick={(e) => {
                                e.preventDefault()
                                history.goBack()
                            }}
                        >
                            <IonIcon icon={arrowBackSharp} slot="start"></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="secondary">
                        <React.Suspense>
                            <PopOverMenu children={<DocumentDetailsOptions />} />
                        </React.Suspense>
                    </IonButtons>
                    <IonTitle>{`Document ${id}`}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <React.Suspense>
                    <DocumentDetails />
                </React.Suspense>
            </IonContent>
        </IonPage>
    )
}

export default DocumentDetail
