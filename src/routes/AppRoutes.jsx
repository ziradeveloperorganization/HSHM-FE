import React from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';

// Pages with layout
import Home from '../pages/Home';
import About from '../pages/About';

// Pages without layout
/* import Login from '../pages/Login'; */

export default function AppRoutes({ dark, toggleDark, MainLayout }) {
  return (
    <IonRouterOutlet>
      {/* Routes WITH Layout */}
      <Route
        path="/"
        exact
        render={() => (
          <MainLayout dark={dark} toggleDark={toggleDark}>
            <Home />
          </MainLayout>
        )}
      />
      <Route
        path="/about"
        exact
        render={() => (
          <MainLayout dark={dark} toggleDark={toggleDark}>
            <About />
          </MainLayout>
        )}
      />

      {/* Routes WITHOUT Layout */}
      {/* <Route path="/login" exact component={Login} /> */}
    </IonRouterOutlet>
  );
}
