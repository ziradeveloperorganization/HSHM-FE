import React from 'react';
import { IonPage, IonContent, IonHeader, IonFooter } from '@ionic/react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function UserLayout({ children, dark, toggleDark, sidebarOpen, toggleSidebar }) {
  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <IonPage id="main">
        <IonHeader>
          <Header dark={dark} toggleDark={toggleDark} toggleSidebar={toggleSidebar} />
        </IonHeader>

        <IonContent className="main-body" scrollY={false}>
          {children}
        </IonContent>

        <IonFooter>
          <Footer />
        </IonFooter>
      </IonPage>
    </>
  );
}