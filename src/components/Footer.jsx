import React from 'react';
import { IonFooter, IonToolbar, IonTitle } from '@ionic/react';

export default function Footer() {
  return (
    <IonFooter>
      <IonToolbar>
        <IonTitle className="text-center">© 2025 My App</IonTitle>
      </IonToolbar>
    </IonFooter>
  );
}
