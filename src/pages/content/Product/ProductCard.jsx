import React from "react";
import { motion } from "framer-motion";
import { IonButton, IonIcon, IonImg, IonSkeletonText, useIonRouter, IonText } from "@ionic/react";
import { locationOutline, pricetagOutline, heartOutline, heart, eyeOutline } from "ionicons/icons";
import { useInView } from "react-intersection-observer";
import { favoritesService } from "../../../services/mockServices";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  
  const { ref, inView } = useInView({
  triggerOnce: true,
  threshold: 0.1,
  /* Debugging Lazy Loading */
  /* onChange: (inView) => {
    console.log(`Product ${product.id} in view:`, inView);
  } */
});

const router = useIonRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  const toggleFavorite = async (e) => {
    e.stopPropagation();
    setFavoriteLoading(true);
    
    try {
      if (isFavorite) {
        await favoritesService.removeFromFavorites(1, product.id); // Mock user ID
        setIsFavorite(false);
      } else {
        await favoritesService.addToFavorites(1, product.id); // Mock user ID
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="col-md-4 col-sm-6 mb-4"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card shadow-sm border-0 h-100" style={{ position: 'relative' }}>
        {inView ? (
          <>
            {/* Favorite Button */}
            <IonButton
              fill="clear"
              size="small"
              onClick={toggleFavorite}
              disabled={favoriteLoading}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                width: '36px',
                height: '36px'
              }}
            >
              <IonIcon 
                icon={isFavorite ? heart : heartOutline} 
                color={isFavorite ? "danger" : "medium"} 
              />
            </IonButton>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <IonImg
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px" }}
              />
            </motion.div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title fw-bold">{product.name}</h5>
              <p style={{ color: 'var(--ion-color-medium)' }} className="mb-2">{product.description}</p>
              <h6 className="text-primary mb-2">
                <IonIcon icon={pricetagOutline} /> ${product.price}
              </h6>
              <p className="small text-muted mb-1">
                <IonIcon icon={locationOutline} /> {product.distance}
              </p>
              
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-light text-secondary">
                {product.category}
                </span>
                <div className="d-flex align-items-center">
                  <IonIcon icon={eyeOutline} style={{ marginRight: '4px', fontSize: '0.8rem' }} />
                  <IonText style={{ fontSize: '0.8rem', color: 'var(--ion-color-medium)' }}>
                    {product.views || 0}
                  </IonText>
                </div>
              </div>
              
              <div className="mt-auto">
                <IonButton expand="block" color="primary" size="small">
                  Contact Seller
                </IonButton>
              </div>
            </div>
          </>
        ) : (
          <>
            <div 
              className="card-img-top bg-light" 
              style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <IonSkeletonText animated style={{ width: '100%', height: '100%' }} />
            </div>
            <div className="card-body d-flex flex-column">
              <IonSkeletonText animated style={{ width: '80%', height: '24px' }} />
              <IonSkeletonText animated style={{ width: '100%', height: '16px' }} className="my-2" />
              <IonSkeletonText animated style={{ width: '60%', height: '20px' }} />
              <IonSkeletonText animated style={{ width: '70%', height: '16px' }} className="my-1" />
              <IonSkeletonText animated style={{ width: '50%', height: '24px' }} className="mb-3" />
              <IonSkeletonText animated style={{ width: '100%', height: '36px' }} />
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}