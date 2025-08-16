import React, { useState, useEffect, useRef } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonAvatar,
  IonText,
  IonPopover,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import {
  sunny,
  moon,
  menu,
  notificationsOutline,
  personCircle,
  settings,
  logOut,
  globeOutline,
  chevronBack,
  locationSharp
} from 'ionicons/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { commonData } from '../../core/commondatas';

export default function AdminHeader({ dark, toggleDark, toggleSidebar }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const profileButtonRef = useRef(null);
  const { user, logout } = useAuth();
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'Tamil' },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
    setProfilePopoverOpen(false);
  };

  const onLogout = () => {
    logout?.(); // if logout is defined in context
    setProfilePopoverOpen(false);
  };

  const openLocationModal = () => {
    alert('Open location modal (to be implemented)');
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton fill="clear" onClick={toggleSidebar}>
            <IonIcon icon={menu} />
          </IonButton>
        </IonButtons>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
            <img
              src={commonData.applogo}
              alt="Logo"
              style={{ height: 32, width: 32, marginRight: 8 }}
            />
            {!isMobile && (
              <IonTitle style={{ padding: 0, fontSize: '1.1rem' }}>
                Admin Panel
              </IonTitle>
            )}
          </div>

          <IonButtons slot="end" style={{ gap: '4px' }}>
            <IonButton fill="clear" onClick={openLocationModal}>
              <IonIcon icon={locationSharp} />
            </IonButton>

            <IonButton fill="clear">
              <IonIcon icon={notificationsOutline} />
            </IonButton>

            <IonButton fill="clear" onClick={toggleDark}>
              <IonIcon icon={dark ? sunny : moon} />
            </IonButton>

            {user && (
              <>
                <IonButton
                  ref={profileButtonRef}
                  id="admin-profile-button"
                  fill="clear"
                  onClick={() => {
                    setProfilePopoverOpen(true);
                    setShowLanguageMenu(false);
                  }}
                >
                  <IonAvatar style={{ width: 32, height: 32 }}>
                    <img src={user?.avatar} alt="Profile" />
                  </IonAvatar>
                  {!isMobile && (
                    <div style={{ marginLeft: 8, textAlign: 'left' }}>
                      <IonText style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {user?.fullName}
                      </IonText>
                      <br />
                      <IonText color="medium" style={{ fontSize: '0.7rem' }}>
                        Admin
                      </IonText>
                    </div>
                  )}
                </IonButton>

                <IonPopover
                  isOpen={profilePopoverOpen}
                  onDidDismiss={() => {
                    setProfilePopoverOpen(false);
                    setShowLanguageMenu(false);
                  }}
                  side="bottom"
                  alignment="end"
                  trigger="admin-profile-button"
                >
                  <IonList>
                    {!showLanguageMenu ? (
                      <>
                        <IonItem
                          button
                          onClick={() => {
                            alert('Go to Profile');
                            setProfilePopoverOpen(false);
                          }}
                        >
                          <IonIcon icon={personCircle} slot="start" />
                          <IonLabel>Profile</IonLabel>
                        </IonItem>
                        <IonItem
                          button
                          onClick={() => {
                            alert('Go to Settings');
                            setProfilePopoverOpen(false);
                          }}
                        >
                          <IonIcon icon={settings} slot="start" />
                          <IonLabel>Settings</IonLabel>
                        </IonItem>
                        <IonItem button onClick={() => setShowLanguageMenu(true)}>
                          <IonIcon icon={globeOutline} slot="start" />
                          <IonLabel>Language</IonLabel>
                        </IonItem>
                        <IonItem button onClick={onLogout}>
                          <IonIcon icon={logOut} slot="start" />
                          <IonLabel>Logout</IonLabel>
                        </IonItem>
                      </>
                    ) : (
                      <>
                        <IonItem button onClick={() => setShowLanguageMenu(false)}>
                          <IonIcon icon={chevronBack} slot="start" />
                          <IonLabel>Back</IonLabel>
                        </IonItem>
                        {languages.map((lang) => (
                          <IonItem
                            key={lang.code}
                            button
                            onClick={() => handleLanguageChange(lang.code)}
                          >
                            <IonLabel>{lang.name}</IonLabel>
                          </IonItem>
                        ))}
                      </>
                    )}
                  </IonList>
                </IonPopover>
              </>
            )}
          </IonButtons>
        </div>
      </IonToolbar>
    </IonHeader>
  );
}
