import React from 'react';
import { Route } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';

// Pages
import Home from '../pages/Home';
import About from '../pages/About';

export default function AppRoutes() {
  return (
    <IonRouterOutlet>
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/about" exact component={About} />
    </IonRouterOutlet>
  );
}
