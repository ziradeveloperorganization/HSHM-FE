import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { sunny, moon } from 'ionicons/icons';
import { Link } from 'react-router-dom';

export default function Header({ dark, toggleDark }) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>My App</IonTitle>

        {/* Navigation Links */}
        {/* <nav style={{ marginLeft: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
          <Link to="/about" style={{ marginRight: '10px' }}>About</Link>
          <Link to="/login">Login</Link>
        </nav> */}

        {/* Theme Toggle Button */}
        <IonButtons slot="end">
          <IonButton onClick={toggleDark}>
            <IonIcon icon={dark ? sunny : moon} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
