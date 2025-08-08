import React, { useState, useEffect } from 'react';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <IonApp>
      <IonReactRouter>
        <MainLayout dark={dark} toggleDark={() => setDark(!dark)}>
          <AppRoutes />
        </MainLayout>
      </IonReactRouter>
    </IonApp>
  );
}
