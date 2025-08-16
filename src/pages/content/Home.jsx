import React from "react";
import { useState, useEffect } from "react";
import {
  IonContent, IonSearchbar, IonSegment, IonSegmentButton, IonLabel,
  IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent,
  IonRefresher, IonRefresherContent, IonText, IonSkeletonText
} from "@ionic/react";
import { addOutline, filterOutline, gridOutline, listOutline } from "ionicons/icons";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { listingService, categoryService } from "../../services/mockServices";
import '../../assets/css/pages/Home.css';
import ProductCard from "./Product/ProductCard";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const history = useHistory();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterListings();
  }, [searchText, selectedCategory]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [listingsResponse, categoriesResponse] = await Promise.all([
        listingService.getListings(),
        categoryService.getCategories()
      ]);

      if (listingsResponse.success) {
        setListings(listingsResponse.data);
      }

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterListings = async () => {
    const filters = {};

    if (searchText.trim()) {
      filters.search = searchText;
    }

    if (selectedCategory !== 'all') {
      filters.category = selectedCategory;
    }

    try {
      const response = await listingService.getListings(filters);
      if (response.success) {
        setListings(response.data);
      }
    } catch (error) {
      console.error('Error filtering listings:', error);
    }
  };

  const doRefresh = (event) => {
    loadData().then(() => {
      event.detail.complete();
    });
  };

  return (
    <IonContent scrollY={true}>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <div className="ion-padding">
        {/* Header with Search and Add Button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <motion.h1
            className="text-primary"
            style={{ margin: 0, flex: 1, color: 'var(--ion-text-color)' }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Marketplace
          </motion.h1>

          <IonButton
            fill="solid"
            onClick={() => history.push('/create-listing')}
          >
            <IonIcon icon={addOutline} slot="start" />
            Sell
          </IonButton>
        </div>

        {/* Search Bar */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value)}
          placeholder="Search items..."
          showClearButton="focus"
          style={{
            marginBottom: '16px',
            '--color': 'var(--ion-text-color)',  // Fix for dark mode
            '--placeholder-color': 'var(--ion-color-medium)',
            '--icon-color': 'var(--ion-color-medium)'
          }}
        />

        {/* Category Filter */}
        <div style={{ marginBottom: '16px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', minWidth: 'max-content', paddingBottom: '8px' }}>
            <IonButton
              fill={selectedCategory === 'all' ? 'solid' : 'outline'}
              size="small"
              onClick={() => setSelectedCategory('all')}
            >
              All
            </IonButton>
            {categories.map(category => (
              <IonButton
                key={category.id}
                fill={selectedCategory === category.name ? 'solid' : 'outline'}
                size="small"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon} {category.name}
              </IonButton>
            ))}
          </div>
        </div>

        {/* View Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <IonText style={{ color: 'var(--ion-text-color)' }}>
            {listings.length} items found
          </IonText>

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

        {/* Loading State */}
        {loading ? (
          <IonGrid>
            <IonRow>
              {[1, 2, 3, 4, 5, 6].map(i => (
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
        ) : (
          /* Products Grid */
          <div className="row">
            {listings.map((product, index) => (
              <motion.div
                key={product.id}
                className={viewMode === 'grid' ? 'col-md-4 col-sm-6 mb-4' : 'col-12 mb-3'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="ion-text-center" style={{ marginTop: '50%', color: 'var(--ion-text-color)' }}>
            <IonIcon
              icon={gridOutline}
              style={{ fontSize: '4rem', color: 'var(--ion-color-medium)' }}
            />
            <h3 style={{ color: 'var(--ion-text-color)' }}>No items found</h3>
            <p style={{ color: 'var(--ion-color-medium)' }}>Try adjusting your search or filters</p>
            <IonButton fill="outline" onClick={() => {
              setSearchText('');
              setSelectedCategory('all');
            }}>
              Clear Filters
            </IonButton>
          </div>
        )}
      </div>
    </IonContent>
  );
}