import React, { useState, useEffect, useRef } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonInput,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonTitle,
} from '@ionic/react';
import {
  sunny,
  moon,
  menu,
  locationSharp,
  personCircle,
  settings,
  logOut,
  search,
  close,
  globeOutline,
  chevronBack,
} from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { commonData } from '../core/commondatas';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/component/Header.css';

export default function Header({ dark, toggleDark, toggleSidebar }) {
  const [searchText, setSearchText] = useState('');
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const inputRef = useRef(null);
  const { user, logout } = useAuth();
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'Tamil' },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openLocationModal = () => alert('Open location modal (to be implemented)');
  const onLogout = () => {
    logout?.();
    setProfilePopoverOpen(false);
  };

  const onMobileSearchSubmit = () => {
    if (searchText.trim()) {
      alert(`Searching for: ${searchText}`);
      setMobileSearchOpen(false);
    }
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
    setProfilePopoverOpen(false);
  };

  return (
    <IonHeader className={`ion-no-border ${dark ? 'dark-mode' : ''}`}>
      <IonToolbar>
        {!mobileSearchOpen ? (
          <>
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
              {/* Logo + Title */}
              <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
                <img
                  src={commonData.applogo}
                  alt="Logo"
                  style={{ height: 32, width: 32, marginRight: 8 }}
                />
                {!isMobile && (
                  <IonTitle style={{ padding: 0, fontSize: '1.1rem' }}>
                    {commonData.appName}
                  </IonTitle>
                )}
              </div>

              {/* Search - desktop only */}
              {!isMobile && (
                <div style={{ flex: 1, maxWidth: 400, margin: '0 16px' }}>
                  <IonInput
                    value={searchText}
                    onIonInput={(e) => setSearchText(e.detail.value || '')}
                    placeholder="Search items..."
                    clearInput
                    onKeyDown={(e) => e.key === 'Enter' && onMobileSearchSubmit()}
                    style={{
                      background: 'var(--ion-color-step-50)',
                      color: 'var(--ion-text-color)',
                      borderRadius: '20px',
                      padding: '8px 16px',
                    }}
                  />
                </div>
              )}

              {/* Right-side buttons */}
              <IonButtons slot="end" style={{ gap: '4px' }}>
                <IonButton fill="clear" onClick={openLocationModal}>
                  <IonIcon icon={locationSharp} />
                </IonButton>

                {isMobile && (
                  <IonButton fill="clear" onClick={() => setMobileSearchOpen(true)}>
                    <IonIcon icon={search} />
                  </IonButton>
                )}

                <IonButton fill="clear" onClick={toggleDark}>
                  <IonIcon icon={dark ? sunny : moon} />
                </IonButton>

                {user ? (
                  <>
                    <IonButton
                      id="main-profile-button"
                      fill="clear"
                      onClick={() => {
                        setProfilePopoverOpen(true);
                        setShowLanguageMenu(false);
                      }}
                    >
                      <IonAvatar style={{ width: 32, height: 32 }}>
                        <img src={user?.avatar || 'https://i.pravatar.cc/40'} alt="Profile" />
                      </IonAvatar>
                      {!isMobile && (
                        <span style={{ marginLeft: 8 }}>{user?.fullName || 'User'}</span>
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
                      trigger="main-profile-button"
                    >
                      <IonList>
                        {!showLanguageMenu ? (
                          <>
                            <IonItem button onClick={() => alert('Go to Profile')}>
                              <IonIcon icon={personCircle} slot="start" />
                              <IonLabel>Profile</IonLabel>
                            </IonItem>
                            <IonItem button onClick={() => alert('Go to Settings')}>
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
                ) : (
                  <IonButton onClick={() => alert('Show login screen...')}>Login</IonButton>
                )}
              </IonButtons>
            </div>
          </>
        ) : (
          // Mobile search bar
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '0 8px',
            }}
          >
            <IonButton fill="clear" onClick={() => setMobileSearchOpen(false)}>
              <IonIcon icon={close} />
            </IonButton>

            <IonInput
              ref={inputRef}
              value={searchText}
              onIonInput={(e) => setSearchText(e.detail.value || '')}
              placeholder="Search items..."
              clearInput
              onKeyDown={(e) => {
                if (e.key === 'Enter') onMobileSearchSubmit();
                if (e.key === 'Escape') setMobileSearchOpen(false);
              }}
              style={{
                flex: 1,
                background: 'var(--ion-color-step-50)',
                color: 'var(--ion-text-color)',
                borderRadius: '20px',
                padding: '8px 16px',
                margin: '0 8px',
              }}
            />

            <IonButton onClick={onMobileSearchSubmit}>
              <IonIcon icon={search} />
            </IonButton>
          </div>
        )}
      </IonToolbar>
    </IonHeader>
  );
}
