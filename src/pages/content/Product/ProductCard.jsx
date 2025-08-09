import React from "react";
import { motion } from "framer-motion";
import { IonButton, IonIcon, IonImg, IonSkeletonText, useIonRouter } from "@ionic/react";
import { locationOutline, pricetagOutline } from "ionicons/icons";
import { useInView } from "react-intersection-observer";

export default function ProductCard({ product }) {
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

  return (
    <motion.div
      ref={ref}
      className="col-md-4 col-sm-6 mb-4"
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card shadow-sm border-0 h-100">
        {inView ? (
          <>
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
              <p className="card-text text-muted mb-2">{product.description}</p>
              <h6 className="text-primary mb-2">
                <IonIcon icon={pricetagOutline} /> {product.price}
              </h6>
              <p className="small text-muted mb-1">
                <IonIcon icon={locationOutline} /> {product.distance}
              </p>
              <span className="badge bg-light text-secondary mb-3">
                {product.category}
              </span>
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