import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Header from '../components/Header';

export default function AppLayout({ children }) {
  return (
    <IonApp>
      <IonReactRouter>
        <Header />
        {children}
      </IonReactRouter>
    </IonApp>
  );
}