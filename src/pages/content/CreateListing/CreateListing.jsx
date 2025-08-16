import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCheckbox,
  IonAlert,
  IonLoading
} from '@ionic/react';
import {
  cameraOutline,
  imageOutline,
  locationOutline,
  pricetagOutline,
  informationCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { categoryService, listingService } from '../../../services/mockServices';
import { motion } from 'framer-motion';

export default function CreateListing() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    categoryId: null,
    condition: '',
    images: [],
    tags: '',
    location: {
      address: '123 Main St, Downtown', // Mock location
      coordinates: { lat: 40.7128, lng: -74.0060 }
    }
  });
  
  const history = useHistory();
  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
  const mockImages = [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryChange = (categoryName) => {
    const category = categories.find(cat => cat.name === categoryName);
    setFormData(prev => ({
      ...prev,
      category: categoryName,
      categoryId: category?.id || null
    }));
  };

  const addMockImage = () => {
    if (formData.images.length < 5) {
      const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, randomImage]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setAlertMessage('Please enter a title for your listing');
      setShowAlert(true);
      return false;
    }
    
    if (!formData.description.trim()) {
      setAlertMessage('Please enter a description');
      setShowAlert(true);
      return false;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setAlertMessage('Please enter a valid price');
      setShowAlert(true);
      return false;
    }
    
    if (!formData.category) {
      setAlertMessage('Please select a category');
      setShowAlert(true);
      return false;
    }
    
    if (!formData.condition) {
      setAlertMessage('Please select the item condition');
      setShowAlert(true);
      return false;
    }
    
    if (formData.images.length === 0) {
      setAlertMessage('Please add at least one image');
      setShowAlert(true);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const listingData = {
        ...formData,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        seller: {
          id: 1, // Mock current user ID
          username: 'john_doe',
          fullName: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=1'
        }
      };
      
      const response = await listingService.createListing(listingData);
      
      if (response.success) {
        setAlertMessage('Listing created successfully!');
        setShowAlert(true);
        setTimeout(() => {
          history.push('/home');
        }, 2000);
      } else {
        setAlertMessage('Failed to create listing. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      setAlertMessage('An error occurred. Please try again.');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Create Listing</IonTitle>
          <IonButtons slot="end">
            <IonButton 
              fill="solid" 
              onClick={handleSubmit}
              disabled={loading}
            >
              Post
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
            {/* Images Section */}
            <IonCard>
              <IonCardContent>
                <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center' }}>
                  <IonIcon icon={imageOutline} style={{ marginRight: '8px' }} />
                  Photos ({formData.images.length}/5)
                </h3>
                
                <IonGrid>
                  <IonRow>
                    {formData.images.map((image, index) => (
                      <IonCol size="4" key={index}>
                        <div style={{ position: 'relative' }}>
                          <img 
                            src={image} 
                            alt={`Upload ${index + 1}`}
                            style={{ 
                              width: '100%', 
                              height: '80px', 
                              objectFit: 'cover', 
                              borderRadius: '8px' 
                            }}
                          />
                          <IonButton
                            fill="clear"
                            size="small"
                            onClick={() => removeImage(index)}
                            style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              background: 'rgba(255, 255, 255, 0.9)',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px'
                            }}
                          >
                            ×
                          </IonButton>
                        </div>
                      </IonCol>
                    ))}
                    
                    {formData.images.length < 5 && (
                      <IonCol size="4">
                        <div
                          onClick={addMockImage}
                          style={{
                            width: '100%',
                            height: '80px',
                            border: '2px dashed var(--ion-color-medium)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            background: 'var(--ion-color-light)'
                          }}
                        >
                          <IonIcon icon={cameraOutline} size="large" color="medium" />
                        </div>
                      </IonCol>
                    )}
                  </IonRow>
                </IonGrid>
                
                <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                  <IonIcon icon={informationCircleOutline} style={{ marginRight: '4px' }} />
                  Click the camera icon to add mock images
                </IonText>
              </IonCardContent>
            </IonCard>

            {/* Basic Information */}
            <IonCard>
              <IonCardContent>
                <h3 style={{ margin: '0 0 16px 0' }}>Basic Information</h3>
                
                <IonItem>
                  <IonLabel position="stacked">Title *</IonLabel>
                  <IonInput
                    value={formData.title}
                    onIonInput={(e) => handleInputChange('title', e.detail.value)}
                    placeholder="What are you selling?"
                    maxlength={100}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Description *</IonLabel>
                  <IonTextarea
                    value={formData.description}
                    onIonInput={(e) => handleInputChange('description', e.detail.value)}
                    placeholder="Describe your item in detail..."
                    rows={4}
                    maxlength={500}
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">
                    <IonIcon icon={pricetagOutline} style={{ marginRight: '4px' }} />
                    Price ($) *
                  </IonLabel>
                  <IonInput
                    type="number"
                    value={formData.price}
                    onIonInput={(e) => handleInputChange('price', e.detail.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </IonItem>
              </IonCardContent>
            </IonCard>

            {/* Category and Condition */}
            <IonCard>
              <IonCardContent>
                <h3 style={{ margin: '0 0 16px 0' }}>Category & Condition</h3>
                
                <IonItem>
                  <IonLabel position="stacked">Category *</IonLabel>
                  <IonSelect
                    value={formData.category}
                    onSelectionChange={(e) => handleCategoryChange(e.detail.value)}
                    placeholder="Select category"
                  >
                    {categories.map(category => (
                      <IonSelectOption key={category.id} value={category.name}>
                        {category.icon} {category.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                
                <IonItem>
                  <IonLabel position="stacked">Condition *</IonLabel>
                  <IonSelect
                    value={formData.condition}
                    onSelectionChange={(e) => handleInputChange('condition', e.detail.value)}
                    placeholder="Select condition"
                  >
                    {conditions.map(condition => (
                      <IonSelectOption key={condition} value={condition}>
                        {condition}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </IonCardContent>
            </IonCard>

            {/* Additional Details */}
            <IonCard>
              <IonCardContent>
                <h3 style={{ margin: '0 0 16px 0' }}>Additional Details</h3>
                
                <IonItem>
                  <IonLabel position="stacked">Tags (comma separated)</IonLabel>
                  <IonInput
                    value={formData.tags}
                    onIonInput={(e) => handleInputChange('tags', e.detail.value)}
                    placeholder="e.g. vintage, wooden, handmade"
                  />
                </IonItem>
                
                <IonItem>
                  <IonIcon icon={locationOutline} slot="start" />
                  <IonLabel>
                    <h3>Location</h3>
                    <p>{formData.location.address}</p>
                  </IonLabel>
                </IonItem>
              </IonCardContent>
            </IonCard>

            {/* Submit Button */}
            <IonButton 
              expand="block" 
              size="large" 
              onClick={handleSubmit}
              disabled={loading}
              style={{ margin: '20px 0' }}
            >
              <IonIcon icon={checkmarkCircleOutline} slot="start" />
              {loading ? 'Creating...' : 'Create Listing'}
            </IonButton>
          </motion.div>
        </div>

        <IonLoading isOpen={loading} message="Creating your listing..." />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Create Listing"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
}