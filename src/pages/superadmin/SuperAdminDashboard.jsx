import React, { useState, useEffect, Suspense } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonButton
} from '@ionic/react';
import {
  peopleOutline,
  listOutline,
  shieldOutline,
  analyticsOutline,
  serverOutline,
  settingsOutline,
  trendingUpOutline,
  warningOutline
} from 'ionicons/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

// Lazy load components
const SuperAdminStatsChart = React.lazy(() => import('../../components/superadmin/SuperAdminStatsChart'));

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalListings: 0,
    systemHealth: 0,
    activeUsers: 0,
    systemAlerts: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Simulate API calls with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalUsers: 1247,
        totalAdmins: 8,
        totalListings: 3892,
        systemHealth: 98.5,
        activeUsers: 342,
        systemAlerts: 3
      });
    } catch (error) {
      console.error('Error loading super admin dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const doRefresh = (event) => {
    loadDashboardData().then(() => {
      event.detail.complete();
    });
  };

  const dashboardCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      subtitle: `${stats.activeUsers} active now`,
      icon: peopleOutline,
      color: 'primary',
      action: () => history.push('/superadmin/users')
    },
    {
      title: 'Admins',
      value: stats.totalAdmins,
      subtitle: 'Platform administrators',
      icon: shieldOutline,
      color: 'secondary',
      action: () => history.push('/superadmin/admin-management')
    },
    {
      title: 'Total Listings',
      value: stats.totalListings,
      subtitle: 'All marketplace items',
      icon: listOutline,
      color: 'success',
      action: () => history.push('/superadmin/listings')
    },
    {
      title: 'System Health',
      value: `${stats.systemHealth}%`,
      subtitle: 'All systems operational',
      icon: serverOutline,
      color: 'tertiary',
      action: () => history.push('/superadmin/system-logs')
    },
    {
      title: 'System Alerts',
      value: stats.systemAlerts,
      subtitle: 'Require attention',
      icon: warningOutline,
      color: 'warning',
      action: () => history.push('/superadmin/system-logs')
    },
    {
      title: 'Platform Settings',
      value: '✓',
      subtitle: 'All configured',
      icon: settingsOutline,
      color: 'medium',
      action: () => history.push('/superadmin/settings')
    }
  ];

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <div className="ion-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ marginBottom: '8px' }}>
            Super Admin Dashboard
          </h1>
          <IonText color="medium">
            <p>Complete system overview and control panel for {user?.fullName}</p>
          </IonText>
        </motion.div>

        {/* Stats Cards */}
        <IonGrid>
          <IonRow>
            {dashboardCards.map((card, index) => (
              <IonCol size="6" sizeMd="4" sizeLg="2" key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IonCard 
                    button 
                    onClick={card.action}
                    style={{ height: '100%' }}
                  >
                    <IonCardContent className="ion-text-center">
                      <IonIcon 
                        icon={card.icon} 
                        color={card.color}
                        style={{ fontSize: '2rem', marginBottom: '8px' }}
                      />
                      <h2 style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '1.4rem', 
                        fontWeight: 'bold',
                        color: `var(--ion-color-${card.color})`
                      }}>
                        {loading ? '...' : (typeof card.value === 'number' ? card.value.toLocaleString() : card.value)}
                      </h2>
                      <h3 style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {card.title}
                      </h3>
                      <IonText color="medium" style={{ fontSize: '0.7rem' }}>
                        {card.subtitle}
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </motion.div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 style={{ margin: '32px 0 16px 0' }}>Quick Actions</h2>
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="4">
                <IonButton 
                  expand="block" 
                  fill="outline"
                  onClick={() => history.push('/superadmin/role-management')}
                >
                  <IonIcon icon={shieldOutline} slot="start" />
                  Manage Roles
                </IonButton>
              </IonCol>
              <IonCol size="12" sizeMd="4">
                <IonButton 
                  expand="block" 
                  fill="outline"
                  onClick={() => history.push('/superadmin/admin-management')}
                >
                  <IonIcon icon={peopleOutline} slot="start" />
                  Admin Management
                </IonButton>
              </IonCol>
              <IonCol size="12" sizeMd="4">
                <IonButton 
                  expand="block" 
                  fill="outline"
                  onClick={() => history.push('/superadmin/settings')}
                >
                  <IonIcon icon={settingsOutline} slot="start" />
                  Platform Settings
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </motion.div>

        {/* System Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 style={{ margin: '32px 0 16px 0' }}>System Analytics</h2>
          <IonCard>
            <IonCardContent>
              <Suspense fallback={
                <div>
                  <IonSkeletonText animated style={{ height: '200px' }} />
                  <IonSkeletonText animated style={{ width: '60%', marginTop: '16px' }} />
                </div>
              }>
                <SuperAdminStatsChart />
              </Suspense>
            </IonCardContent>
          </IonCard>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 style={{ margin: '32px 0 16px 0' }}>System Status</h2>
          <IonCard>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <IonIcon icon={serverOutline} color="success" style={{ marginRight: '12px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                    All Systems Operational
                  </h3>
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                    System health: {stats.systemHealth}% - All services running normally
                  </IonText>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <IonIcon icon={trendingUpOutline} color="primary" style={{ marginRight: '12px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                    Platform Growth
                  </h3>
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                    User base growing steadily - 89 new registrations this month
                  </IonText>
                </div>
              </div>
              
              {stats.systemAlerts > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IonIcon icon={warningOutline} color="warning" style={{ marginRight: '12px' }} />
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                      System Alerts
                    </h3>
                    <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                      {stats.systemAlerts} alerts require your attention
                    </IonText>
                  </div>
                </div>
              )}
            </IonCardContent>
          </IonCard>
        </motion.div>
      </div>
    </IonContent>
  );
}