import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle className="text-white text-2xl">Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {/* THIS DIV is styled by Tailwind (outside Ionic Shadow DOM) */}
        <div className="min-h-full flex flex-col items-center justify-center bg-gray-100 text-center w-full">
          <p className="text-red-500 text-xl font-bold">✅ Tailwind is working!</p>
          <p className="text-blue-600">Hello from Home!</p>
          <p className="text-green-600">Hello from Home!</p>
          <p className="text-purple-600">Hello from Home!</p>
        </div>
      </IonContent>

    </IonPage>
  );
};

export default Home;
