import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonImg,
  IonText,
  IonIcon,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/react';
import {
  heartOutline,
  heart,
  locationOutline,
  pricetagOutline,
  gridOutline,
  listOutline,
  trashOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { favoritesService } from '../../../services/mockServices';
import { motion } from 'framer-motion';

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const history = useHistory();
  const currentUserId = 1; // Mock current user ID

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    filterAndSortFavorites();
  }, [searchText, sortBy, favorites]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const response = await favoritesService.getFavorites(currentUserId);
      if (response.success) {
        setFavorites(response.data);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortFavorites = () => {
    let filtered = [...favorites];

    // Filter by search text
    if (searchText.trim()) {
      filtered = filtered.filter(fav =>
        fav.listing.title.toLowerCase().includes(searchText.toLowerCase()) ||
        fav.listing.category.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Sort favorites
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.listing.price - b.listing.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.listing.price - a.listing.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.listing.title.localeCompare(b.listing.title));
        break;
      default:
        break;
    }

    setFilteredFavorites(filtered);
  };

  const removeFavorite = async (listingId) => {
    try {
      const response = await favoritesService.removeFromFavorites(currentUserId, listingId);
      if (response.success) {
        setFavorites(prev => prev.filter(fav => fav.listingId !== listingId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleItemClick = (listingId) => {
    history.push(`/product/${listingId}`);
  };

  const doRefresh = (event) => {
    loadFavorites().then(() => {
      event.detail.complete();
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <IonContent>
        <div className="ion-padding">
          <IonSearchbar disabled />
          <IonGrid>
            <IonRow>
              {[1, 2, 3, 4].map(i => (
                <IonCol size="6" sizeMd="4" sizeLg="3" key={i}>
                  <IonCard>
                    <IonSkeletonText animated style={{ height: '150px' }} />
                    <IonCardContent>
                      <IonSkeletonText animated style={{ width: '80%' }} />
                      <IonSkeletonText animated style={{ width: '60%' }} />
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
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
        {/* Search and Controls */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value)}
          placeholder="Search favorites..."
          showClearButton="focus"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <IonSegment
            value={sortBy}
            onIonChange={(e) => setSortBy(e.detail.value)}
            style={{ width: 'auto' }}
          >
            <IonSegmentButton value="recent">
              <IonLabel>Recent</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="price-low">
              <IonLabel>Price ↑</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="price-high">
              <IonLabel>Price ↓</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <div>
            <IonButton
              fill={viewMode === 'grid' ? 'solid' : 'clear'}
              size="small"
              onClick={() => setViewMode('grid')}
            >
              <IonIcon icon={gridOutline} />
            </IonButton>
            <IonButton
              fill={viewMode === 'list' ? 'solid' : 'clear'}
              size="small"
              onClick={() => setViewMode('list')}
            >
              <IonIcon icon={listOutline} />
            </IonButton>
          </div>
        </div>

        {/* Empty State */}
        {filteredFavorites.length === 0 ? (
          <div className="ion-text-center" style={{ marginTop: '50%' }}>
            <IonIcon
              icon={heartOutline}
              style={{ fontSize: '4rem', color: 'var(--ion-color-medium)' }}
            />
            <h3>No favorites yet</h3>
            <p>Items you like will appear here</p>
            <IonButton
              fill="outline"
              onClick={() => history.push('/home')}
            >
              Browse Items
            </IonButton>
          </div>
        ) : (
          /* Favorites Grid/List */
          <IonGrid>
            <IonRow>
              {filteredFavorites.map((favorite, index) => (
                <IonCol
                  key={favorite.id}
                  size={viewMode === 'grid' ? '6' : '12'}
                  sizeMd={viewMode === 'grid' ? '4' : '12'}
                  sizeLg={viewMode === 'grid' ? '3' : '12'}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <IonCard
                      button
                      onClick={() => handleItemClick(favorite.listing.id)}
                      style={{ margin: 0, height: '100%' }}
                    >
                      <div style={{ position: 'relative' }}>
                        <IonImg
                          src={favorite.listing.images[0]}
                          alt={favorite.listing.title}
                          style={{
                            height: viewMode === 'grid' ? '150px' : '120px',
                            objectFit: 'cover'
                          }}
                        />

                        {/* Remove from favorites button */}
                        <IonButton
                          fill="clear"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFavorite(favorite.listing.id);
                          }}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: '50%',
                            width: '36px',
                            height: '36px'
                          }}
                        >
                          <IonIcon icon={heart} color="danger" />
                        </IonButton>
                      </div>

                      <IonCardContent>
                        <h3 style={{
                          margin: '0 0 8px 0',
                          fontSize: viewMode === 'grid' ? '0.9rem' : '1.1rem',
                          fontWeight: 'bold'
                        }}>
                          {favorite.listing.title}
                        </h3>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                          <IonIcon icon={pricetagOutline} color="primary" style={{ marginRight: '4px' }} />
                          <IonText color="primary" style={{ fontWeight: 'bold' }}>
                            {favorite.listing.currency}{favorite.listing.price}
                          </IonText>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <IonIcon icon={locationOutline} color="medium" style={{ marginRight: '4px' }} />
                          <IonText className="secondary-text" style={{ fontSize: '0.8rem' }}>
                            {favorite.listing.location.distance}
                          </IonText>
                        </div>

                        <IonText color="medium" style={{ fontSize: '0.7rem' }}>
                          Added {formatDate(favorite.addedDate)}
                        </IonText>
                      </IonCardContent>
                    </IonCard>
                  </motion.div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </div>
    </IonContent>
  );
}