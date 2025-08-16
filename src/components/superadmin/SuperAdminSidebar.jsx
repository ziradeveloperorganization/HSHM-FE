import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { 
  closeOutline, 
  menuOutline, 
  personCircleOutline, 
  logOutOutline,
  gridOutline,
  peopleOutline,
  listOutline,
  flagOutline,
  analyticsOutline,
  settingsOutline,
  shieldOutline,
  documentTextOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import '../../assets/css/component/Sidebar.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Register icons
addIcons({
  'close-outline': closeOutline,
  'menu-outline': menuOutline,
  'person-circle-outline': personCircleOutline,
  'log-out-outline': logOutOutline
});

const superAdminMenus = [
  { path: '/superadmin/dashboard', label: 'Dashboard', icon: gridOutline },
  { path: '/superadmin/role-management', label: 'Role Management', icon: shieldOutline },
  { path: '/superadmin/admin-management', label: 'Admin Management', icon: peopleOutline },
  { path: '/superadmin/users', label: 'All Users', icon: peopleOutline },
  { path: '/superadmin/categories', label: 'Categories', icon: listOutline },
  { path: '/superadmin/listings', label: 'All Listings', icon: flagOutline },
  { path: '/superadmin/system-logs', label: 'System Logs', icon: documentTextOutline },
  { path: '/superadmin/settings', label: 'Platform Settings', icon: settingsOutline },
  { path: '/superadmin/analytics', label: 'Analytics', icon: analyticsOutline }
];

export default function SuperAdminSidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const history = useHistory();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen, isMobile]);

  useEffect(() => {
    if (isOpen && isMobile) {
      toggleSidebar(false);
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    history.push("/login");
    toggleSidebar(false);
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => toggleSidebar(false)}
      ></div>

      <div className={`sidebar-panel ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h5 className="sidebar-title mb-0">Super Admin</h5>
          <button
            className="sidebar-close-btn btn btn-link p-0 ms-2"
            onClick={() => toggleSidebar(false)}
            aria-label="Close Sidebar"
          >
            <IonIcon icon="close-outline" style={{ fontSize: '1.5rem' }} />
          </button>
        </div>

        <div className="sidebar-content">
          <ul className="nav flex-column">
            {superAdminMenus.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                  to={item.path}
                  onClick={() => toggleSidebar(false)}
                >
                  <IonIcon icon={item.icon} className="sidebar-icon" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <IonIcon icon="person-circle-outline" className="user-avatar" />
            <div className="user-info">
              <div className="user-name">{user?.fullName}</div>
              <div className="user-email">Super Admin</div>
            </div>
          </div>
          <button
            className="btn btn-outline-danger w-100 mt-3"
            onClick={handleLogout}
          >
            <IonIcon icon="log-out-outline" className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}