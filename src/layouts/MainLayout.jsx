import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function MainLayout({ children, dark, toggleDark, sidebarOpen, toggleSidebar }) {
  return (
    <>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <IonPage id="main">
        <Header dark={dark} toggleDark={toggleDark} toggleSidebar={toggleSidebar} />
        
        <IonContent className="main-body">
          {children}
        </IonContent>

        <Footer />
      </IonPage>
    </>
  );
}
