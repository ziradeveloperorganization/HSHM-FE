import React, { useState, useEffect, useRef } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonAvatar,
  IonButtons,
  IonBackButton,
  IonText,
  IonCard,
  IonCardContent,
  IonImg
} from '@ionic/react';
import { sendOutline, imageOutline, callOutline, videocamOutline } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { messageService } from '../../../services/mockServices';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

export default function ChatDetail() {
  const history = useHistory();
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const currentUserId = 1; // Mock current user ID

  useEffect(() => {
    loadMessages();
    loadConversation();
  }, [conversationId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (contentRef.current) {
      contentRef.current.scrollToBottom(300);
    }
  }, [messages]);

  const loadConversation = async () => {
    try {
      const response = await messageService.getConversations(currentUserId);
      if (response.success) {
        const conv = response.data.find(c => c.id === parseInt(conversationId));
        setConversation(conv);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  const loadMessages = async () => {
    setLoading(true);
    try {
      const response = await messageService.getMessages(conversationId);
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      conversationId: parseInt(conversationId),
      senderId: currentUserId,
      receiverId: conversation?.participants.find(p => p.id !== currentUserId)?.id,
      listingId: conversation?.listing.id,
      message: newMessage.trim()
    };

    try {
      const response = await messageService.sendMessage(messageData);
      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const otherUser = conversation?.participants.find(p => p.id !== currentUserId);

  if (loading || !conversation) {
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
          <div className="ion-text-center ion-padding">
            Loading conversation...
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
          
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
            <IonAvatar style={{ width: '32px', height: '32px', marginRight: '12px' }}>
              <img src={otherUser.avatar} alt={otherUser.fullName} />
            </IonAvatar>
            <div>
              <IonTitle style={{ fontSize: '1rem', padding: 0 }}>
                {otherUser.fullName}
              </IonTitle>
              <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                {conversation.listing.title}
              </IonText>
            </div>
          </div>

          <IonButtons slot="end">
            <IonButton fill="clear">
              <IonIcon icon={callOutline} />
            </IonButton>
            <IonButton fill="clear">
              <IonIcon icon={videocamOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} className="ion-padding">
        {/* Listing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ion-margin-bottom"
        >
          <IonCard>
            <IonCardContent>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IonImg
                  src={conversation.listing.images[0]}
                  alt={conversation.listing.title}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '8px',
                    marginRight: '12px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>
                    {conversation.listing.title}
                  </h3>
                  <IonText color="primary" style={{ fontWeight: 'bold' }}>
                    {conversation.listing.currency}{conversation.listing.price}
                  </IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </motion.div>

        {/* Messages */}
        <div className="messages-container">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUserId;
            
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  display: 'flex',
                  justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                  marginBottom: '12px'
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    backgroundColor: isCurrentUser 
                      ? 'var(--ion-color-primary)' 
                      : 'var(--ion-color-light)',
                    color: isCurrentUser 
                      ? 'var(--ion-color-primary-contrast)' 
                      : 'var(--ion-color-dark)',
                    position: 'relative'
                  }}
                >
                  <p style={{ margin: '0 0 4px 0' }}>
                    {message.message}
                  </p>
                  <IonText 
                    style={{ 
                      fontSize: '0.7rem',
                      opacity: 0.7,
                      display: 'block',
                      textAlign: 'right'
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </IonText>
                </div>
              </motion.div>
            );
          })}
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonItem lines="none">
            <IonButton 
              fill="clear" 
              slot="start"
              disabled
            >
              <IonIcon icon={imageOutline} />
            </IonButton>
            
            <IonInput
              value={newMessage}
              onIonInput={(e) => setNewMessage(e.detail.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              style={{
                background: 'var(--ion-color-light)',
                borderRadius: '20px',
                padding: '8px 16px',
                margin: '0 8px'
              }}
            />
            
            <IonButton 
              fill="clear" 
              slot="end"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              <IonIcon icon={sendOutline} />
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}