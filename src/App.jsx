import React, { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';

export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <IonApp>
      <IonReactRouter>
        <MainLayout dark={dark} toggleDark={() => setDark(!dark)}>
          <IonRouterOutlet>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
          </IonRouterOutlet>
        </MainLayout>
      </IonReactRouter>
    </IonApp>
  );
}
