import React from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import SuperAdminSidebar from '../components/superadmin/SuperAdminSidebar';
import SuperAdminHeader from '../components/superadmin/SuperAdminHeader';

export default function SuperAdminLayout({ children, dark, toggleDark, sidebarOpen, toggleSidebar }) {
  return (
    <>
      <SuperAdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <IonPage id="superadmin-main">
        <IonHeader>
          <SuperAdminHeader dark={dark} toggleDark={toggleDark} toggleSidebar={toggleSidebar} />
        </IonHeader>

        <IonContent className="main-body superadmin-content" scrollY={false}>
          {children}
        </IonContent>
      </IonPage>
    </>
  );
}