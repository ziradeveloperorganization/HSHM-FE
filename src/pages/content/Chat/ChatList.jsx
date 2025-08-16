import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonBadge,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonSkeletonText,
  IonText,
  IonIcon
} from '@ionic/react';
import { chatbubbleOutline, timeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { messageService } from '../../../services/mockServices';
import { motion } from 'framer-motion';

export default function ChatList() {
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    filterConversations();
  }, [searchText, conversations]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const response = await messageService.getConversations(1); // Mock user ID
      if (response.success) {
        setConversations(response.data);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterConversations = () => {
    if (!searchText.trim()) {
      setFilteredConversations(conversations);
      return;
    }

    const filtered = conversations.filter(conv => {
      const otherUser = conv.participants.find(p => p.id !== 1); // Mock current user ID
      return (
        otherUser.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        conv.listing.title.toLowerCase().includes(searchText.toLowerCase()) ||
        conv.lastMessage.message.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setFilteredConversations(filtered);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleConversationClick = (conversation) => {
    history.push(`/chat/${conversation.id}`);
  };

  const doRefresh = (event) => {
    loadConversations().then(() => {
      event.detail.complete();
    });
  };

  if (loading) {
    return (
      <IonContent>
        <div className="ion-padding">
          <IonSearchbar disabled />
          <IonList>
            {[1, 2, 3].map(i => (
              <IonItem key={i}>
                <IonAvatar slot="start">
                  <IonSkeletonText animated />
                </IonAvatar>
                <IonLabel>
                  <IonSkeletonText animated style={{ width: '60%' }} />
                  <IonSkeletonText animated style={{ width: '80%' }} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <div className="ion-padding-horizontal ion-padding-top">
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value)}
          placeholder="Search conversations..."
          showClearButton="focus"
        />
      </div>

      {filteredConversations.length === 0 ? (
        <div className="ion-text-center ion-padding" style={{ marginTop: '50%' }}>
          <IonIcon 
            icon={chatbubbleOutline} 
            style={{ fontSize: '4rem', color: 'var(--ion-color-medium)' }} 
          />
          <h3>No conversations yet</h3>
          <p>Start browsing items to connect with sellers!</p>
        </div>
      ) : (
        <IonList>
          {filteredConversations.map((conversation, index) => {
            const otherUser = conversation.participants.find(p => p.id !== 1);
            
            return (
              <motion.div
                key={conversation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <IonItem 
                  button 
                  onClick={() => handleConversationClick(conversation)}
                  className="conversation-item"
                >
                  <IonAvatar slot="start">
                    <img src={otherUser.avatar} alt={otherUser.fullName} />
                  </IonAvatar>
                  
                  <IonLabel>
                    <h2 style={{ fontWeight: 'bold' }}>
                      {otherUser.fullName}
                    </h2>
                    <h3 style={{ color: 'var(--ion-color-medium)', fontSize: '0.9rem' }}>
                      {conversation.listing.title}
                    </h3>
                    <p style={{ 
                      color: conversation.unreadCount > 0 ? 'var(--ion-color-dark)' : 'var(--ion-color-medium)',
                      fontWeight: conversation.unreadCount > 0 ? 'bold' : 'normal'
                    }}>
                      {conversation.lastMessage.message}
                    </p>
                  </IonLabel>
                  
                  <div slot="end" className="ion-text-end">
                    <IonText color="medium" style={{ fontSize: '0.8rem' }}>
                      <IonIcon icon={timeOutline} style={{ marginRight: '4px' }} />
                      {formatTime(conversation.lastMessage.timestamp)}
                    </IonText>
                    {conversation.unreadCount > 0 && (
                      <IonBadge color="primary" style={{ marginTop: '8px' }}>
                        {conversation.unreadCount}
                      </IonBadge>
                    )}
                  </div>
                </IonItem>
              </motion.div>
            );
          })}
        </IonList>
      )}
    </IonContent>
  );
}