import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <IonHeader>
      <IonToolbar className="bg-gradient-to-r from-blue-500 to-purple-600">
        <IonTitle className="text-white font-bold">HSHM App</IonTitle>
        <IonButtons slot="end">
          <IonButton routerLink="/">Home</IonButton>
          <IonButton routerLink="/about">About</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}