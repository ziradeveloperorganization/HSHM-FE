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
import { commonData } from '../core/CommonDatas';
import '../assets/css/component/Header.css';

const dummyUser = {
  loggedIn: true,
  username: 'John Doe',
  avatarUrl: 'https://i.pravatar.cc/40',
};

export default function Header({ dark, toggleDark, toggleSidebar }) {
  const [searchText, setSearchText] = useState('');
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [user, setUser] = useState(dummyUser);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const inputRef = useRef(null);
  const profileButtonRef = useRef(null);

  const { i18n } = useTranslation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openLocationModal = () => alert('Open location modal (to be implemented)');
  const onLogout = () => {
    alert('Logging out...');
    setUser({ loggedIn: false });
    setProfilePopoverOpen(false);
  };
  const onLogin = () => alert('Show login screen...');
  const doSearch = (query) => {
    if (query.trim()) alert(`Searching for: ${query}`);
  };
  const onMobileSearchSubmit = () => {
    if (searchText.trim()) {
      doSearch(searchText);
      setMobileSearchOpen(false);
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'Tamil' },
  ];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
    setProfilePopoverOpen(false);
  };

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar>
        {!mobileSearchOpen ? (
          <>
            <IonButtons slot="start">
              <IonButton
                fill="clear"
                className="icon-button"
                style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                onClick={toggleSidebar}
              >
                <IonIcon icon={menu} />
              </IonButton>
            </IonButtons>

            <div
              className="header-content"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              {/* Brand */}
              <div
                className="app-brand"
                style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}
              >
                <img
                  src={commonData.applogo}
                  alt="Logo"
                  style={{ height: 32, width: 32, marginRight: 8 }}
                />
                {!isMobile && (
                  <IonTitle
                    style={{
                      padding: 0,
                      fontSize: '1.1rem',
                      color: dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)',
                    }}
                  >
                    {commonData.appName}
                  </IonTitle>
                )}
              </div>

              {/* Desktop Search */}
              {!isMobile && (
                <div style={{ flex: 1, maxWidth: 400, margin: '0 16px' }}>
                  <IonInput
                    value={searchText}
                    onIonInput={(e) => setSearchText(e.detail.value || '')}
                    placeholder="Search items..."
                    clearInput
                    style={{
                      background: dark ? 'var(--ion-color-dark)' : 'var(--ion-color-light)',
                      color: dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)',
                      borderRadius: '20px',
                      padding: '8px 16px',
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && doSearch(searchText)}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <IonButtons slot="end" style={{ gap: '4px' }}>
                <IonButton fill="clear" className="icon-button" onClick={openLocationModal}>
                  <IonIcon icon={locationSharp} slot="icon-only" />
                </IonButton>

                {isMobile && (
                  <IonButton fill="clear" onClick={() => setMobileSearchOpen(true)}>
                    <IonIcon icon={search} />
                  </IonButton>
                )}

                <IonButton fill="clear" onClick={toggleDark}>
                  <IonIcon icon={dark ? sunny : moon} />
                </IonButton>

                {user.loggedIn ? (
                  <>
                    <IonButton
                      ref={profileButtonRef}
                      id="profile-button"
                      fill="clear"
                      className="icon-button"
                      onClick={() => {
                        setProfilePopoverOpen(true);
                        setShowLanguageMenu(false);
                      }}
                    >
                      <IonAvatar style={{ width: 32, height: 32 }}>
                        <img src={user.avatarUrl} alt="Profile" />
                      </IonAvatar>
                      {!isMobile && (
                        <span
                          style={{
                            marginLeft: 8,
                            maxWidth: 100,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {user.username}
                        </span>
                      )}
                    </IonButton>

                    {/* Profile + Language Popover */}
                    <IonPopover
                      isOpen={profilePopoverOpen}
                      onDidDismiss={() => {
                        setProfilePopoverOpen(false);
                        setShowLanguageMenu(false);
                      }}
                      side="bottom"
                      alignment="end"
                      trigger="profile-button"
                      cssClass="profile-popover"
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
                ) : (
                  <IonButton onClick={onLogin}>Login</IonButton>
                )}
              </IonButtons>
            </div>
          </>
        ) : (
          // Mobile Search
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
              style={{
                flex: 1,
                background: dark ? 'var(--ion-color-dark)' : 'var(--ion-color-light)',
                color: dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)',
                borderRadius: '20px',
                padding: '8px 16px',
                margin: '0 8px',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onMobileSearchSubmit();
                if (e.key === 'Escape') setMobileSearchOpen(false);
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
