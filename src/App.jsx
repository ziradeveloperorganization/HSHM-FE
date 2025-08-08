import React, { useState, useEffect } from 'react';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './layouts/MainLayout';

export default function App() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggleSidebar = (value) => {
    if (typeof value === 'boolean') {
      setSidebarOpen(value);
    } else {
      setSidebarOpen(prev => !prev);
    }
  };

  return (
    <IonApp>
      <IonReactRouter>
        <MainLayout
          dark={dark}
          toggleDark={() => setDark(!dark)}
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        >
          <AppRoutes />
        </MainLayout>
      </IonReactRouter>
    </IonApp>
  );
}
