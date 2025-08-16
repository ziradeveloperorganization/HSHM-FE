import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { IonPage, IonContent } from '@ionic/react';

const ProtectedRoute = ({ 
  component: Component, 
  requiredRole, 
  redirectTo = '/login',
  ...rest 
}) => {
  const { user, hasPermission, loading } = useAuth();

  if (loading) {
    return (
      <IonPage>
        <IonContent>
          <div className="ion-text-center ion-padding" style={{ marginTop: '50%' }}>
            <h3>Loading...</h3>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to={redirectTo} />;
        }

        if (requiredRole && !hasPermission(requiredRole)) {
          return <Redirect to="/unauthorized" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;