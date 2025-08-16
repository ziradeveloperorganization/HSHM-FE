import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonAvatar,
  IonText,
  IonAlert,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonBadge
} from '@ionic/react';
import {
  personOutline,
  shieldOutline,
  checkmarkCircleOutline,
  warningOutline
} from 'ionicons/icons';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers } from '../../data/mockData';
import { motion } from 'framer-motion';

export default function RoleManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const { updateUserRole } = useAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchText, users]);

  const loadUsers = () => {
    setUsers([...mockUsers]);
  };

  const filterUsers = () => {
    if (!searchText.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user =>
      user.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredUsers(filtered);
  };

  const handleRoleChange = (user, role) => {
    if (role === user.role) return;

    setSelectedUser(user);
    setNewRole(role);
    setAlertMessage(`Are you sure you want to change ${user.fullName}'s role from ${user.role} to ${role}?`);
    setShowAlert(true);
  };

  const confirmRoleChange = () => {
    if (selectedUser && newRole) {
      const success = updateUserRole(selectedUser.id, newRole);
      
      if (success) {
        // Update local state
        setUsers(prev => prev.map(user => 
          user.id === selectedUser.id 
            ? { ...user, role: newRole }
            : user
        ));
        
        setAlertMessage(`Successfully updated ${selectedUser.fullName}'s role to ${newRole}`);
      } else {
        setAlertMessage('Failed to update user role. Please try again.');
      }
    }
    
    setSelectedUser(null);
    setNewRole('');
  };

  const doRefresh = (event) => {
    loadUsers();
    event.detail.complete();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin':
        return 'danger';
      case 'admin':
        return 'warning';
      case 'user':
      default:
        return 'primary';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'superadmin':
      case 'admin':
        return shieldOutline;
      case 'user':
      default:
        return personOutline;
    }
  };

  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <div className="ion-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ marginBottom: '8px' }}>Role Management</h1>
          <IonText color="medium">
            <p>Manage user roles and permissions across the platform</p>
          </IonText>
        </motion.div>

        {/* Search */}
        <IonSearchbar
          value={searchText}
          onIonInput={(e) => setSearchText(e.detail.value)}
          placeholder="Search users..."
          showClearButton="focus"
          style={{ marginBottom: '16px' }}
        />

        {/* Role Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <IonCard>
            <IonCardContent>
              <h3 style={{ margin: '0 0 16px 0' }}>Role Distribution</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <IonText color="primary" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {users.filter(u => u.role === 'user').length}
                  </IonText>
                  <br />
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>Users</IonText>
                </div>
                <div>
                  <IonText color="warning" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {users.filter(u => u.role === 'admin').length}
                  </IonText>
                  <br />
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>Admins</IonText>
                </div>
                <div>
                  <IonText color="danger" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                    {users.filter(u => u.role === 'superadmin').length}
                  </IonText>
                  <br />
                  <IonText color="medium" style={{ fontSize: '0.8rem' }}>Super Admins</IonText>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </motion.div>

        {/* Users List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <IonCard>
            <IonCardContent>
              <h3 style={{ margin: '0 0 16px 0' }}>Users ({filteredUsers.length})</h3>
              
              <IonList>
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <IonItem>
                      <IonAvatar slot="start">
                        <img src={user.avatar} alt={user.fullName} />
                      </IonAvatar>
                      
                      <IonLabel>
                        <h2 style={{ fontWeight: 'bold' }}>{user.fullName}</h2>
                        <p>{user.email}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--ion-color-medium)' }}>
                          @{user.username} • Joined {new Date(user.joinedDate).toLocaleDateString()}
                        </p>
                      </IonLabel>

                      <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <IonBadge color={getRoleColor(user.role)}>
                          <IonIcon icon={getRoleIcon(user.role)} style={{ marginRight: '4px' }} />
                          {user.role}
                        </IonBadge>
                        
                        <IonSelect
                          value={user.role}
                          onSelectionChange={(e) => handleRoleChange(user, e.detail.value)}
                          interface="popover"
                          placeholder="Change Role"
                        >
                          <IonSelectOption value="user">User</IonSelectOption>
                          <IonSelectOption value="admin">Admin</IonSelectOption>
                          <IonSelectOption value="superadmin">Super Admin</IonSelectOption>
                        </IonSelect>
                      </div>
                    </IonItem>
                  </motion.div>
                ))}
              </IonList>

              {filteredUsers.length === 0 && (
                <div className="ion-text-center ion-padding">
                  <IonIcon 
                    icon={personOutline} 
                    style={{ fontSize: '3rem', color: 'var(--ion-color-medium)' }} 
                  />
                  <h3>No users found</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              )}
            </IonCardContent>
          </IonCard>
        </motion.div>
      </div>

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Confirm Role Change"
        message={alertMessage}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Confirm',
            handler: confirmRoleChange
          }
        ]}
      />
    </IonContent>
  );
}