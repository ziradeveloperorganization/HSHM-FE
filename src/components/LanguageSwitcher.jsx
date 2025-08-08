// LanguageSwitcher.js

import React from 'react';
import { IonItem, IonLabel, IonIcon } from '@ionic/react';
import { globeOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ onLanguageChange }) {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'Tamil' },
  ];

  return (
    <>
      {languages.map((lang) => (
        <IonItem
          button
          onClick={(e) => {
            setLanguagePopoverEvent(e.nativeEvent); // Captures the click event
            setLanguagePopoverOpen(true);
          }}
        >
          <IonIcon icon={globeOutline} slot="start" />
          <IonLabel>Language</IonLabel>
        </IonItem>
      ))}
    </>
  );
}
