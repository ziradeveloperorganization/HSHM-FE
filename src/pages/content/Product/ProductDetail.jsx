import React from "react";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { 
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, 
  IonImg, IonGrid, IonRow, IonCol, IonIcon, IonButton, IonAvatar, IonText, IonCard,
  IonCardContent, IonBadge, IonSkeletonText, IonAlert
} from "@ionic/react";
import { 
  locationOutline, pricetagOutline, callOutline, mailOutline, heartOutline, heart,
  shareOutline, starOutline, star, eyeOutline, timeOutline, checkmarkCircleOutline
} from "ionicons/icons";
import { listingService, favoritesService } from "../../../services/mockServices";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const response = await listingService.getListingById(id);
      if (response.success) {
        setProduct(response.data);
      } else {
        setAlertMessage('Product not found');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error loading product:', error);
      setAlertMessage('Error loading product');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favoritesService.removeFromFavorites(1, product.id); // Mock user ID
        setIsFavorite(false);
        setAlertMessage('Removed from favorites');
      } else {
        await favoritesService.addToFavorites(1, product.id); // Mock user ID
        setIsFavorite(true);
        setAlertMessage('Added to favorites');
      }
      setShowAlert(true);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleContactSeller = () => {
    // Navigate to chat with seller
    history.push(`/chat/1`); // Mock conversation ID
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<IonIcon key={i} icon={star} color="warning" />);
    }
    
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<IonIcon key={`empty-${i}`} icon={starOutline} color="medium" />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton onClick={() => history.goBack()} />
            </IonButtons>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-padding">
            <IonSkeletonText animated style={{ height: '300px', marginBottom: '16px' }} />
            <IonSkeletonText animated style={{ width: '80%', height: '32px', marginBottom: '8px' }} />
            <IonSkeletonText animated style={{ width: '60%', height: '24px', marginBottom: '16px' }} />
            <IonSkeletonText animated style={{ width: '100%', height: '80px' }} />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!product) {
    return (
      <IonPage>
        <IonContent>
          <div className="ion-text-center ion-padding" style={{ marginTop: '50%' }}>
            <h3>Product not found</h3>
            <IonButton onClick={() => history.push('/home')}>Back to Home</IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton onClick={() => history.goBack()} />
          </IonButtons>
          <IonTitle>{product.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={toggleFavorite}>
              <IonIcon icon={isFavorite ? heart : heartOutline} color={isFavorite ? "danger" : "medium"} />
            </IonButton>
            <IonButton fill="clear">
              <IonIcon icon={shareOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="ion-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Product Image */}
            <IonImg 
              src={product.images[selectedImageIndex]} 
              alt={product.title} 
              style={{ 
                height: "300px", 
                objectFit: "cover", 
                borderRadius: "12px",
                marginBottom: "16px"
              }}
            />

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <IonGrid style={{ marginBottom: '16px' }}>
                <IonRow>
                  {product.images.map((img, index) => (
                    <IonCol size="3" key={index}>
                      <IonImg 
                        src={img} 
                        onClick={() => setSelectedImageIndex(index)}
                        style={{ 
                          height: "60px", 
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: selectedImageIndex === index ? '2px solid var(--ion-color-primary)' : '2px solid transparent',
                          cursor: 'pointer'
                        }}
                      />
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            )}

            {/* Product Details */}
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {product.title}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <IonIcon icon={pricetagOutline} color="primary" style={{ marginRight: '8px' }} />
              <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--ion-color-primary)' }}>
                {product.currency}{product.price}
              </span>
              <IonBadge color="success" style={{ marginLeft: 'auto' }}>
                {product.condition}
              </IonBadge>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <IonIcon icon={locationOutline} color="medium" style={{ marginRight: '8px' }} />
              <IonText color="medium">{product.location.distance}</IonText>
              
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <IonIcon icon={eyeOutline} color="medium" style={{ marginRight: '4px' }} />
                <IonText color="medium" style={{ fontSize: '0.9rem' }}>
                  {product.views} views
                </IonText>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <span style={{ 
                background: 'var(--ion-color-light)', 
                padding: '4px 12px', 
                borderRadius: '16px',
                fontSize: '0.9rem',
                color: 'var(--ion-color-dark)'
              }}>
                {product.category}
              </span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '8px' }}>
                Description
              </h2>
              <p style={{ color: 'var(--ion-color-medium)', lineHeight: '1.5' }}>
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '8px' }}>
                  Tags
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      style={{
                        background: 'var(--ion-color-primary-tint)',
                        color: 'var(--ion-color-primary)',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Information */}
            <IonCard>
              <IonCardContent>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem', fontWeight: '600' }}>
                  Seller Information
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <IonAvatar style={{ width: '50px', height: '50px', marginRight: '12px' }}>
                    <img src={product.seller.avatar} alt={product.seller.fullName} />
                  </IonAvatar>
                  
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                      {product.seller.fullName}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {renderStars(4.8)}
                      <IonText color="medium" style={{ marginLeft: '8px', fontSize: '0.9rem' }}>
                        (4.8)
                      </IonText>
                    </div>
                  </div>
                  
                  <IonButton fill="outline" size="small">
                    View Profile
                  </IonButton>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <IonIcon icon={timeOutline} color="medium" style={{ marginRight: '8px' }} />
                  <IonText color="medium" style={{ fontSize: '0.9rem' }}>
                    Posted {formatDate(product.postedDate)}
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>

            {/* Contact Buttons */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <IonButton 
                expand="block" 
                color="primary"
                onClick={handleContactSeller}
                style={{ flex: 1 }}
              >
                <IonIcon icon={mailOutline} slot="start" />
                Message Seller
              </IonButton>
              
              <IonButton 
                fill="outline" 
                color="primary"
                disabled
                style={{ flex: 1 }}
              >
                <IonIcon icon={callOutline} slot="start" />
                Call
              </IonButton>
            </div>
          </motion.div>
        </div>
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Product Detail"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;