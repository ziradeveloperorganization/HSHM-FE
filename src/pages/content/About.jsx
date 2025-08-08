import { IonContent } from '@ionic/react';
import React from 'react';

export default function About() {
  return (
    <IonContent scrollY={true} className="ion-padding">
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
    </div>
    </IonContent>
  );
}