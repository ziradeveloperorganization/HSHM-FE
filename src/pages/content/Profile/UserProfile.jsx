import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonAvatar,
  IonText,
  IonIcon,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonItem,
  IonList,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonImg
} from '@ionic/react';
import {
  locationOutline,
  calendarOutline,
  starOutline,
  star,
  listOutline,
  checkmarkCircleOutline,
  settingsOutline,
  pencilOutline,
  pricetagOutline,
  eyeOutline,
  heartOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { userService, listingService } from '../../../services/mockServices';
import { motion } from 'framer-motion';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSegment, setActiveSegment] = useState('listings');
  const history = useHistory();
  const currentUserId = 1; // Mock current user ID

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      const [userResponse, listingsResponse] = await Promise.all([
        userService.getUserProfile(currentUserId),
        userService.getUserListings(currentUserId)
      ]);

      if (userResponse.success) {
        setUser(userResponse.data);
      }

      if (listingsResponse.success) {
        setUserListings(listingsResponse.data);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const doRefresh = (event) => {
    loadUserData().then(() => {
      event.detail.complete();
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<IonIcon key={i} icon={star} color="warning" />);
    }

    if (hasHalfStar) {
      stars.push(<IonIcon key="half" icon={starOutline} color="warning" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IonIcon key={`empty-${i}`} icon={starOutline} color="medium" />);
    }

    return stars;
  };

  if (loading) {
    return (
      <IonContent>
        <div className="ion-padding">
          <IonCard>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <IonAvatar style={{ width: '80px', height: '80px', marginRight: '16px' }}>
                  <IonSkeletonText animated />
                </IonAvatar>
                <div style={{ flex: 1 }}>
                  <IonSkeletonText animated style={{ width: '60%', height: '24px' }} />
                  <IonSkeletonText animated style={{ width: '80%', height: '16px' }} />
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    );
  }

  if (!user) {
    return (
      <IonContent>
        <div className="ion-text-center ion-padding">
          <h3>User not found</h3>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <div className="ion-padding">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <IonCard>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <IonAvatar style={{ width: '80px', height: '80px', marginRight: '16px' }}>
                  <img src={user.avatar} alt={user.fullName} />
                </IonAvatar>
                
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                    {user.fullName}
                  </h2>
                  <IonText color="medium">@{user.username}</IonText>
                  
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                    {renderStars(user.rating)}
                    <IonText color="medium" style={{ marginLeft: '8px', fontSize: '0.9rem' }}>
                      ({user.rating})
                    </IonText>
                  </div>
                </div>

                <IonButton fill="outline" size="small" onClick={() => history.push('/profile/edit')}>
                  <IonIcon icon={pencilOutline} slot="start" />
                  Edit
                </IonButton>
              </div>

              {/* User Stats */}
              <IonGrid>
                <IonRow>
                  <IonCol size="4" className="ion-text-center">
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ion-color-primary)' }}>
                      {user.totalListings}
                    </div>
                    <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                      Listings
                    </IonText>
                  </IonCol>
                  <IonCol size="4" className="ion-text-center">
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ion-color-success)' }}>
                      {user.completedDeals}
                    </div>
                    <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                      Sold
                    </IonText>
                  </IonCol>
                  <IonCol size="4" className="ion-text-center">
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--ion-color-warning)' }}>
                      {user.rating}
                    </div>
                    <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                      Rating
                    </IonText>
                  </IonCol>
                </IonRow>
              </IonGrid>

              {/* User Info */}
              <IonList lines="none" style={{ marginTop: '16px' }}>
                <IonItem>
                  <IonIcon icon={locationOutline} slot="start" color="medium" />
                  <IonLabel>
                    <p>{user.location.address}</p>
                    <p>{user.location.city}, {user.location.state}</p>
                  </IonLabel>
                </IonItem>
                
                <IonItem>
                  <IonIcon icon={calendarOutline} slot="start" color="medium" />
                  <IonLabel>
                    <p>Joined {formatDate(user.joinedDate)}</p>
                  </IonLabel>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>
        </motion.div>

        {/* Segment Control */}
        <IonSegment 
          value={activeSegment} 
          onIonChange={(e) => setActiveSegment(e.detail.value)}
          style={{ marginBottom: '16px' }}
        >
          <IonSegmentButton value="listings">
            <IonIcon icon={listOutline} />
            <IonLabel>My Listings</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="settings">
            <IonIcon icon={settingsOutline} />
            <IonLabel>Settings</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* Content based on active segment */}
        {activeSegment === 'listings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {userListings.length === 0 ? (
              <IonCard>
                <IonCardContent className="ion-text-center">
                  <IonIcon 
                    icon={listOutline} 
                    style={{ fontSize: '3rem', color: 'var(--ion-color-medium)' }} 
                  />
                  <h3>No listings yet</h3>
                  <p>Start selling by creating your first listing</p>
                  <IonButton fill="outline" onClick={() => history.push('/create-listing')}>
                    Create Listing
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ) : (
              <IonGrid>
                <IonRow>
                  {userListings.map((listing, index) => (
                    <IonCol size="12" sizeMd="6" key={listing.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <IonCard 
                          button
                          onClick={() => history.push(`/product/${listing.id}`)}
                        >
                          <div style={{ display: 'flex' }}>
                            <IonImg
                              src={listing.images[0]}
                              alt={listing.title}
                              style={{ 
                                width: '100px', 
                                height: '100px', 
                                objectFit: 'cover',
                                borderRadius: '8px 0 0 8px'
                              }}
                            />
                            
                            <IonCardContent style={{ flex: 1, padding: '12px' }}>
                              <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>
                                {listing.title}
                              </h3>
                              
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                <IonIcon icon={pricetagOutline} color="primary" style={{ marginRight: '4px' }} />
                                <IonText color="primary" style={{ fontWeight: 'bold' }}>
                                  {listing.currency}{listing.price}
                                </IonText>
                                
                                <IonBadge 
                                  color={listing.isActive ? 'success' : 'medium'} 
                                  style={{ marginLeft: 'auto' }}
                                >
                                  {listing.isActive ? 'Active' : 'Inactive'}
                                </IonBadge>
                              </div>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <IonIcon icon={eyeOutline} color="medium" style={{ marginRight: '4px' }} />
                                  <IonText color="medium">{listing.views}</IonText>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <IonIcon icon={heartOutline} color="medium" style={{ marginRight: '4px' }} />
                                  <IonText color="medium">{listing.likes}</IonText>
                                </div>
                              </div>
                            </IonCardContent>
                          </div>
                        </IonCard>
                      </motion.div>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            )}
          </motion.div>
        )}

        {activeSegment === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <IonCard>
              <IonCardContent>
                <IonList>
                  <IonItem button onClick={() => history.push('/profile/edit')}>
                    <IonIcon icon={pencilOutline} slot="start" />
                    <IonLabel>Edit Profile</IonLabel>
                  </IonItem>
                  
                  <IonItem button onClick={() => history.push('/notifications')}>
                    <IonIcon icon={settingsOutline} slot="start" />
                    <IonLabel>Notification Settings</IonLabel>
                  </IonItem>
                  
                  <IonItem button onClick={() => history.push('/privacy')}>
                    <IonIcon icon={settingsOutline} slot="start" />
                    <IonLabel>Privacy Settings</IonLabel>
                  </IonItem>
                </IonList>
              </IonCardContent>
            </IonCard>
          </motion.div>
        )}
      </div>
    </IonContent>
  );
}