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
  logIn,
  search,
  close,
} from 'ionicons/icons';
import { commonData } from '../core/CommonDatas';

const dummyUser = {
  loggedIn: true,
  username: 'John Doe',
  avatarUrl: 'https://i.pravatar.cc/40',
};

export default function Header({ dark, toggleDark, toggleSidebar }) {
  const [searchText, setSearchText] = useState('');
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const [user, setUser] = useState(dummyUser);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (mobileSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.setFocus(), 100);
    }
  }, [mobileSearchOpen]);

  const openLocationModal = () => alert('Open location modal (to be implemented)');

  const onLogout = () => {
    alert('Logging out...');
    setUser({ loggedIn: false });
    setProfilePopoverOpen(false);
  };

  const onLogin = () => alert('Show login screen...');

  const doSearch = (query) => {
    if (query.trim()) {
      alert(`Searching for: ${query}`);
    }
  };

  const onMobileSearchSubmit = () => {
    if (searchText.trim()) {
      doSearch(searchText);
      setMobileSearchOpen(false);
    }
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
                aria-label="Menu"
              >
                <IonIcon icon={menu} />
              </IonButton>
            </IonButtons>

            <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {/* App logo and name */}
              <div className="app-brand" style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
                <img
                  src={commonData.applogo}
                  alt="Logo"
                  style={{ height: 32, width: 32, marginRight: 8 }}
                />
                {!isMobile && (
                  <IonTitle style={{ padding: 0, fontSize: '1.1rem', color: dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}>
                    {commonData.appName}
                  </IonTitle>
                )}
              </div>

              {/* Desktop search */}
              {!isMobile && (
                <div className="desktop-search" style={{ flex: 1, maxWidth: 400, margin: '0 16px' }}>
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
                      '--padding-start': '16px',
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && doSearch(searchText)}
                  />
                </div>
              )}

              {/* Right side controls */}
              <IonButtons slot="end" style={{ gap: '4px' }}>
                {/* Location */}
                <IonButton
                  fill="clear"
                  className="icon-button"
                  style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                  onClick={openLocationModal}
                  aria-label="Location"
                >
                  <IonIcon icon={locationSharp} slot="icon-only" />
                </IonButton>

                {/* Mobile search toggle */}
                {isMobile && (
                  <IonButton
                    fill="clear"
                    className="icon-button"
                    style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                    onClick={() => setMobileSearchOpen(true)}
                    aria-label="Search"
                  >
                    <IonIcon icon={search} slot="icon-only" />
                  </IonButton>
                )}

                {/* Theme toggle */}
                <IonButton
                  fill="clear"
                  className="icon-button"
                  style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                  onClick={toggleDark}
                  aria-label="Toggle theme"
                >
                  <IonIcon icon={dark ? sunny : moon} slot="icon-only" />
                </IonButton>

                {/* User profile */}
                {user.loggedIn ? (
                  <>
                    <IonButton
                      ref={profileButtonRef}
                      id="profile-button"
                      fill="clear"
                      className="icon-button"
                      style={{
                        '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)',
                        '--padding-start': '4px',
                        '--padding-end': '4px'
                      }}
                      onClick={() => setProfilePopoverOpen(true)}
                      aria-label="Profile"
                    >
                      <IonAvatar style={{ width: 32, height: 32 }}>
                        <img src={user.avatarUrl} alt="Profile" />
                      </IonAvatar>
                      {!isMobile && (
                        <span style={{
                          marginLeft: 8,
                          maxWidth: 100,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          color: dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)'
                        }}>
                          {user.username}
                        </span>
                      )}
                    </IonButton>

                    <IonPopover
                      isOpen={profilePopoverOpen}
                      onDidDismiss={() => setProfilePopoverOpen(false)}
                      side="bottom"
                      alignment="end"
                      showBackdrop={true}
                      trigger="profile-button"
                      cssClass="profile-popover"
                    >
                      <IonList style={{
                        background: dark ? 'var(--ion-color-dark)' : 'var(--ion-color-light)',
                        color: dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)'
                      }}>
                        <IonItem
                          button
                          detail={false}
                          onClick={() => {
                            alert('Go to Profile');
                            setProfilePopoverOpen(false);
                          }}
                          style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                        >
                          <IonIcon icon={personCircle} slot="start" />
                          <IonLabel>Profile</IonLabel>
                        </IonItem>
                        <IonItem
                          button
                          detail={false}
                          onClick={() => {
                            alert('Go to Settings');
                            setProfilePopoverOpen(false);
                          }}
                          style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                        >
                          <IonIcon icon={settings} slot="start" />
                          <IonLabel>Settings</IonLabel>
                        </IonItem>
                        <IonItem
                          button
                          detail={false}
                          onClick={() => {
                            onLogout();
                            setProfilePopoverOpen(false);
                          }}
                          style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                        >
                          <IonIcon icon={logOut} slot="start" />
                          <IonLabel>Logout</IonLabel>
                        </IonItem>
                      </IonList>
                    </IonPopover>
                  </>
                ) : (
                  <>
                    <IonButton
                      onClick={onLogin}
                      size="small"
                      style={{
                        color: dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)',
                        '--background': dark ? 'var(--ion-color-dark)' : 'var(--ion-color-light)'
                      }}
                    >
                      Login
                    </IonButton>
                    <IonButton
                      fill="clear"
                      className="icon-button"
                      style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                      onClick={() => alert('Settings')}
                      aria-label="Settings"
                    >
                      <IonIcon icon={settings} slot="icon-only" />
                    </IonButton>
                  </>
                )}
              </IonButtons>
            </div>
          </>
        ) : (
          // Mobile search overlay
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0 8px' }}>
            <IonButtons slot="start">
              <IonButton
                fill="clear"
                className="icon-button"
                style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                onClick={() => setMobileSearchOpen(false)}
                aria-label="Close search"
              >
                <IonIcon icon={close} slot="icon-only" />
              </IonButton>
            </IonButtons>

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
                '--padding-start': '16px',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onMobileSearchSubmit();
                if (e.key === 'Escape') setMobileSearchOpen(false);
              }}
            />

            <IonButtons slot="end">
              <IonButton
                fill="clear"
                className="icon-button"
                style={{ '--color': dark ? 'var(--ion-color-light)' : 'var(--ion-color-dark)' }}
                onClick={onMobileSearchSubmit}
                aria-label="Search"
              >
                <IonIcon icon={search} slot="icon-only" />
              </IonButton>
            </IonButtons>
          </div>
        )}
      </IonToolbar>
    </IonHeader>
  );
}