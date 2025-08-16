import React from 'react';
import { IonPage, IonContent, IonHeader } from '@ionic/react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

export default function AdminLayout({ children, dark, toggleDark, sidebarOpen, toggleSidebar }) {
  return (
    <>
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <IonPage id="admin-main">
        <IonHeader>
          <AdminHeader dark={dark} toggleDark={toggleDark} toggleSidebar={toggleSidebar} />
        </IonHeader>

        <IonContent className="main-body admin-content" scrollY={false}>
          {children}
        </IonContent>
      </IonPage>
    </>
  );
}