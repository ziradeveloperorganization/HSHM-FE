import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <IonMenu side="start" menuId="main-menu" contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/">Home</IonItem>
          <IonItem routerLink="/about">About</IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}
