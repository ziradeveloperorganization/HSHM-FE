import React, { useState, useEffect } from 'react';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './layouts/MainLayout';

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <IonApp>
      <IonReactRouter>
        <AppRoutes dark={dark} toggleDark={() => setDark(!dark)} MainLayout={MainLayout} />
      </IonReactRouter>
    </IonApp>
  );
}
