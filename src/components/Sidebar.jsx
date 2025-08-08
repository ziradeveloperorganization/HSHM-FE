import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { closeOutline, menuOutline, personCircleOutline, logOutOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import '../assets/css/component/Sidebar.css';
import { sidebarMenus } from './Data/menuData';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Register icons
addIcons({
  'close-outline': closeOutline,
  'menu-outline': menuOutline,
  'person-circle-outline': personCircleOutline,
  'log-out-outline': logOutOutline
});

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const history = useHistory();

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
    console.log("Logging out...");
    history.push("/login");
    toggleSidebar(false);
  };

  return (
    <>
      {/* Overlay - now works for ALL screen sizes */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => toggleSidebar(false)}
      ></div>

      {/* Mobile toggle button */}
      {/* {isMobile && (
        <button
          className="sidebar-toggle-btn btn btn-primary d-lg-none"
          onClick={() => toggleSidebar()}
        >
          <IonIcon icon={isOpen ? 'close-outline' : 'menu-outline'} />
        </button>
      )} */}

      {/* Sidebar Panel */}
      <div className={`sidebar-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header d-flex justify-content-between align-items-center">
          <h5 className="sidebar-title mb-0">Menu</h5>
          <button
            className="sidebar-close-btn btn btn-link p-0 ms-2"
            onClick={() => toggleSidebar(false)}
            aria-label="Close Sidebar"
          >
            <IonIcon icon="close-outline" style={{ fontSize: '1.5rem' }} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="sidebar-content">
          <ul className="nav flex-column">
            {sidebarMenus.map((item, index) => (
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

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <IonIcon icon="person-circle-outline" className="user-avatar" />
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-email">john@example.com</div>
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
