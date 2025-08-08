import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function MainLayout({ children, dark, toggleDark }) {
  return (
    <>
      <Sidebar />
      <IonPage id="main">
        <Header dark={dark} toggleDark={toggleDark} />
        <IonContent className="main-body">
          {children}
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
}
