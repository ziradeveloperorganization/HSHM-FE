import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import React, { useEffect } from 'react';
import { logoWhatsapp, mailOutline, locationOutline, phonePortraitOutline } from 'ionicons/icons';
import { commonData } from '../../core/commondatas';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../../assets/css/component/About.css';

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const features = [
    {
      icon: '🛒',
      title: 'Local Marketplace',
      description: 'Buy and sell within your neighborhood (5km radius)'
    },
    {
      icon: '💬',
      title: 'Instant Messaging',
      description: 'Chat directly with buyers/sellers in real-time'
    },
    {
      icon: '📍',
      title: 'Location-Based',
      description: 'Automatically shows items near your location'
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Verified user profiles for safe transactions'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <IonContent scrollY={true} className="ion-padding about-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        ref={ref}
      >
        <motion.div className="app-logo-container" variants={itemVariants}>
          <motion.img
            src={commonData.applogo}
            alt={`${commonData.appName} Logo`}
            className="app-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </motion.div>
        <motion.h1 className="display-4 text-center mb-4" variants={itemVariants}>
          Welcome to <span className="text-primary">{commonData.appName}</span>
        </motion.h1>
        <motion.p className="lead text-center mb-5" variants={itemVariants}>
          Your hyperlocal marketplace for second-hand goods
        </motion.p>
      </motion.section>

      {/* App Features */}
      <section className="features-section mb-5">
        <motion.h2 
          className="text-center mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={slideFromLeft}
        >
          Why Choose Us?
        </motion.h2>
        <IonGrid>
          <IonRow>
            {features.map((feature, index) => (
              <IonCol size="12" sizeMd="6" sizeLg="3" key={index}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                >
                  <IonCard
                    className="feature-card"
                    whileHover={{ y: -5 }}
                  >
                    <IonCardHeader>
                      <motion.div 
                        className="feature-icon"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3
                        }}
                      >
                        {feature.icon}
                      </motion.div>
                      <IonCardTitle>{feature.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {feature.description}
                    </IonCardContent>
                  </IonCard>
                </motion.div>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </section>

      {/* How It Works */}
      <section className="how-it-works mb-5">
        <motion.h2 
          className="text-center mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromRight}
        >
          How It Works
        </motion.h2>
        <motion.div 
          className="steps-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div className="step" variants={slideFromLeft}>
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>List or Browse</h3>
              <p>Post items you want to sell or browse local listings</p>
            </div>
          </motion.div>
          <motion.div className="step" variants={slideFromRight}>
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Connect Locally</h3>
              <p>Chat with buyers/sellers in your neighborhood</p>
            </div>
          </motion.div>
          <motion.div className="step" variants={slideFromLeft}>
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Meet & Exchange</h3>
              <p>Arrange safe local meetups to complete transactions</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <motion.h2 
          className="text-center mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromRight}
        >
          Contact Us
        </motion.h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideFromLeft}
        >
          <IonCard className="contact-card">
            <IonCardContent>
              <div className="contact-info">
                <IonButton
                  fill="clear"
                  href={`mailto:${commonData.DeveloperEmail}`}
                  className="contact-item"
                >
                  <IonIcon icon={mailOutline} slot="start" />
                  {commonData.DeveloperEmail}
                </IonButton>

                 {/* <IonButton
                  fill="clear"
                  href={`https://wa.me/${commonData.DeveloperWhatsApp}`}
                  className="contact-item"
                >
                  <IonIcon icon={logoWhatsapp} slot="start" />
                  Chat on WhatsApp
                </IonButton>

                <IonButton
                  fill="clear"
                  href="tel:+1234567890"
                  className="contact-item"
                >
                  <IonIcon icon={phonePortraitOutline} slot="start" />
                  Call Support
                </IonButton>

                <IonButton
                  fill="clear"
                  href="#"
                  className="contact-item"
                >
                  <IonIcon icon={locationOutline} slot="start" />
                  Based in India
                </IonButton> */}
                
              </div>
            </IonCardContent>
          </IonCard>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="text-center mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <p>© {new Date().getFullYear()} {commonData.appName}. All rights reserved.</p>
        <p>Developed by {commonData.DeveloperName}</p>
      </motion.footer>
    </IonContent>
  );
}