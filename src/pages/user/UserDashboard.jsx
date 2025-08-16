import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonIcon,
  IonText,
  IonButton,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import {
  listOutline,
  heartOutline,
  chatbubbleOutline,
  eyeOutline,
  addCircleOutline,
  trendingUpOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { userService, favoritesService, messageService } from '../../services/mockServices';
import { motion } from 'framer-motion';

export default function UserDashboard() {
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    totalFavorites: 0,
    unreadMessages: 0
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
      const [userListings, favorites, conversations] = await Promise.all([
        userService.getUserListings(user.id),
        favoritesService.getFavorites(user.id),
        messageService.getConversations(user.id)
      ]);

      if (userListings.success) {
        const listings = userListings.data;
        const totalViews = listings.reduce((sum, listing) => sum + (listing.views || 0), 0);
        
        setStats(prev => ({
          ...prev,
          totalListings: listings.length,
          activeListings: listings.filter(l => l.isActive).length,
          totalViews
        }));
      }

      if (favorites.success) {
        setStats(prev => ({
          ...prev,
          totalFavorites: favorites.data.length
        }));
      }

      if (conversations.success) {
        const unreadCount = conversations.data.reduce((sum, conv) => sum + conv.unreadCount, 0);
        setStats(prev => ({
          ...prev,
          unreadMessages: unreadCount
        }));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
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
      title: 'My Listings',
      value: stats.totalListings,
      subtitle: `${stats.activeListings} active`,
      icon: listOutline,
      color: 'primary',
      action: () => history.push('/profile')
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      subtitle: 'All time',
      icon: eyeOutline,
      color: 'success',
      action: () => history.push('/profile')
    },
    {
      title: 'Favorites',
      value: stats.totalFavorites,
      subtitle: 'Saved items',
      icon: heartOutline,
      color: 'danger',
      action: () => history.push('/favorites')
    },
    {
      title: 'Messages',
      value: stats.unreadMessages,
      subtitle: 'Unread',
      icon: chatbubbleOutline,
      color: 'warning',
      action: () => history.push('/chat')
    }
  ];

  const quickActions = [
    {
      title: 'Sell Item',
      description: 'Create a new listing',
      icon: addCircleOutline,
      color: 'primary',
      action: () => history.push('/create-listing')
    },
    {
      title: 'Browse Items',
      description: 'Find great deals',
      icon: trendingUpOutline,
      color: 'secondary',
      action: () => history.push('/home')
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
            Welcome back, {user?.fullName?.split(' ')[0]}!
          </h1>
          <IonText color="medium">
            <p>Here's what's happening with your marketplace activity</p>
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
                  <IonCard 
                    button 
                    onClick={card.action}
                    style={{ height: '100%' }}
                  >
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
                        {loading ? '...' : card.value}
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

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 style={{ margin: '32px 0 16px 0' }}>Quick Actions</h2>
          <IonGrid>
            <IonRow>
              {quickActions.map((action, index) => (
                <IonCol size="12" sizeMd="6" key={index}>
                  <IonCard button onClick={action.action}>
                    <IonCardContent>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon 
                          icon={action.icon} 
                          color={action.color}
                          style={{ fontSize: '2rem', marginRight: '16px' }}
                        />
                        <div>
                          <h3 style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                            {action.title}
                          </h3>
                          <IonText color="medium">
                            {action.description}
                          </IonText>
                        </div>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </motion.div>

        {/* Recent Activity Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 style={{ margin: '32px 0 16px 0' }}>Recent Activity</h2>
          <IonCard>
            <IonCardContent className="ion-text-center">
              <IonText color="medium">
                <p>Your recent marketplace activity will appear here</p>
              </IonText>
              <IonButton fill="outline" onClick={() => history.push('/home')}>
                Start Browsing
              </IonButton>
            </IonCardContent>
          </IonCard>
        </motion.div>
      </div>
    </IonContent>
  );
}