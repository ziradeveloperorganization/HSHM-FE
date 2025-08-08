import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { sunny, moon } from 'ionicons/icons';

export default function Header({ dark, toggleDark }) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>My App</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={toggleDark}>
            <IonIcon icon={dark ? sunny : moon} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
