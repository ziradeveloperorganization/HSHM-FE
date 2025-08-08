import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import ThemeToggle from '../components/ThemeToggle';

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="home-title">Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="home-container">
          <p className="status-message">✅ Tailwind is removed!</p>
          <p className="text-blue">Hello from Home!</p>
          <p className="text-green">Hello from Home!</p>
          <p className="text-purple">Hello from Home!</p>
          <div className="theme-toggle-container">
            <ThemeToggle />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
