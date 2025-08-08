import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { sunny, moon, menu } from 'ionicons/icons';

export default function Header({ dark, toggleDark, toggleSidebar }) {
  return (
    <IonHeader>
      <IonToolbar>
        {/* Sidebar toggle button */}
        <IonButtons slot="start">
          <IonButton onClick={toggleSidebar}>
            <IonIcon icon={menu} />
          </IonButton>
        </IonButtons>

        <IonTitle>My App</IonTitle>

        {/* Theme Toggle */}
        <IonButtons slot="end">
          <IonButton onClick={toggleDark}>
            <IonIcon icon={dark ? sunny : moon} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
