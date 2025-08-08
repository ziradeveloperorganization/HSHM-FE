import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

export default function MainLayout({ children, dark, toggleDark }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Sidebar Overlay */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
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
