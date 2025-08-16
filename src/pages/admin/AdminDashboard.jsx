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
  IonSkeletonText
} from '@ionic/react';
import {
  peopleOutline,
  listOutline,
  flagOutline,
  analyticsOutline,
  trendingUpOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

// Lazy load components
const AdminStatsChart = React.lazy(() => import('../../components/admin/AdminStatsChart'));

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    pendingReports: 0,
    activeListings: 0,
    newUsersThisMonth: 0,
    resolvedReports: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
        totalListings: 3892,
        pendingReports: 12,
        activeListings: 2156,
        newUsersThisMonth: 89,
        resolvedReports: 156
      });
    } catch (error) {
      console.error('Error loading admin dashboard data:', error);
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
      subtitle: `+${stats.newUsersThisMonth} this month`,
      icon: peopleOutline,
      color: 'primary'
    },
    {
      title: 'Total Listings',
      value: stats.totalListings,
      subtitle: `${stats.activeListings} active`,
      icon: listOutline,
      color: 'success'
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports,
      subtitle: 'Need attention',
      icon: flagOutline,
      color: 'warning'
    },
    {
      title: 'Resolved Reports',
      value: stats.resolvedReports,
      subtitle: 'This month',
      icon: checkmarkCircleOutline,
      color: 'tertiary'
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
            Admin Dashboard
          </h1>
          <IonText color="medium">
            <p>Welcome back, {user?.fullName}. Here's your platform overview.</p>
          </IonText>
        </motion.div>

        {/* Stats Cards */}
        <IonGrid>
          <IonRow>
            {dashboardCards.map((card, index) => (
              <IonCol size="6" sizeMd="3" key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IonCard style={{ height: '100%' }}>
                    <IonCardContent className="ion-text-center">
                      <IonIcon 
                        icon={card.icon} 
                        color={card.color}
                        style={{ fontSize: '2.5rem', marginBottom: '12px' }}
                      />
                      <h2 style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '1.8rem', 
                        fontWeight: 'bold',
                        color: `var(--ion-color-${card.color})`
                      }}>
                        {loading ? '...' : card.value.toLocaleString()}
                      </h2>
                      <h3 style={{ 
                        margin: '0 0 4px 0', 
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {card.title}
                      </h3>
                      <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                        {card.subtitle}
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                </motion.div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 style={{ margin: '32px 0 16px 0' }}>Analytics Overview</h2>
          <IonCard>
            <IonCardContent>
              <Suspense fallback={
                <div>
                  <IonSkeletonText animated style={{ height: '200px' }} />
                  <IonSkeletonText animated style={{ width: '60%', marginTop: '16px' }} />
                </div>
              }>
                <AdminStatsChart />
              </Suspense>
            </IonCardContent>
          </IonCard>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 style={{ margin: '32px 0 16px 0' }}>Recent Activity</h2>
          <IonCard>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <IonIcon icon={trendingUpOutline} color="success" style={{ marginRight: '12px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                    New user registration spike
                  </h3>
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                    89 new users joined this month
                  </IonText>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <IonIcon icon={listOutline} color="primary" style={{ marginRight: '12px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                    High listing activity
                  </h3>
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                    156 new listings posted this week
                  </IonText>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IonIcon icon={flagOutline} color="warning" style={{ marginRight: '12px' }} />
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '0.9rem' }}>
                    Reports pending review
                  </h3>
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                    12 reports need your attention
                  </IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </motion.div>
      </div>
    </IonContent>
  );
}