import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonImg, IonGrid, IonRow, IonCol, IonIcon, IonButton } from "@ionic/react";
import { locationOutline, pricetagOutline, callOutline, mailOutline } from "ionicons/icons";
import { products } from "./products"; // Import your products array

const ProductDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <IonPage>
        <IonContent>
          <div className="text-center py-5">
            <h3>Product not found</h3>
            <IonButton onClick={() => history.push('/home')}>Back to Home</IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Mock additional images for the product
  const additionalImages = [
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800"
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{product.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-padding">
          {/* Main Product Image */}
          <IonImg 
            src={product.image} 
            alt={product.name} 
            className="rounded-lg mb-4"
            style={{ height: "300px", objectFit: "cover" }}
          />

          {/* Product Details */}
          <h1 className="text-xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <IonIcon icon={pricetagOutline} className="mr-2 text-primary" />
            <span className="text-2xl font-bold text-primary">{product.price}</span>
          </div>
          
          <div className="flex items-center mb-4">
            <IonIcon icon={locationOutline} className="mr-2 text-secondary" />
            <span>{product.distance}</span>
          </div>

          <div className="mb-6">
            <span className="badge bg-light text-secondary">{product.category}</span>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Additional Images */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">More Images</h2>
            <IonGrid className="ion-no-padding">
              <IonRow>
                {additionalImages.map((img, index) => (
                  <IonCol size="4" key={index}>
                    <IonImg 
                      src={img} 
                      className="rounded-lg"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>

          {/* Seller Contact */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Contact Seller</h2>
            <div className="flex flex-col space-y-3">
              <IonButton expand="block" color="primary">
                <IonIcon icon={callOutline} slot="start" />
                Call Seller
              </IonButton>
              <IonButton expand="block" color="secondary">
                <IonIcon icon={mailOutline} slot="start" />
                Send Message
              </IonButton>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;