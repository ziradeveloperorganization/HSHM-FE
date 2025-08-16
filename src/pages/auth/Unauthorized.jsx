import React from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { lockClosedOutline, homeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Unauthorized() {
  const history = useHistory();
  const { user, logout } = useAuth();

  const handleGoHome = () => {
    if (user) {
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          history.push('/admin/dashboard');
          break;
        case 'superadmin':
          history.push('/superadmin/dashboard');
          break;
        default:
          history.push('/home');
      }
    } else {
      history.push('/login');
    }
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonContent>
        <div 
          className="ion-text-center ion-padding" 
          style={{ 
            marginTop: '30%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <IonIcon 
            icon={lockClosedOutline} 
            style={{ 
              fontSize: '5rem', 
              color: 'var(--ion-color-danger)' 
            }} 
          />
          
          <h1 style={{ color: 'var(--ion-color-danger)' }}>
            Access Denied
          </h1>
          
          <IonText color="medium" style={{ maxWidth: '400px' }}>
            <p>
              You don't have permission to access this page. 
              Please contact your administrator if you believe this is an error.
            </p>
          </IonText>

          {user && (
            <IonText color="medium">
              <p>Current role: <strong>{user.role}</strong></p>
            </IonText>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <IonButton 
              fill="solid" 
              onClick={handleGoHome}
            >
              <IonIcon icon={homeOutline} slot="start" />
              Go Home
            </IonButton>
            
            <IonButton 
              fill="outline" 
              color="medium"
              onClick={handleLogout}
            >
              Logout
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}