import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AppRoutes from "./routes/AppRoutes";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <IonApp>
          <IonReactRouter>
            <AppRoutes />
          </IonReactRouter>
        </IonApp>
      </AuthProvider>
    </I18nextProvider>
  );
}
