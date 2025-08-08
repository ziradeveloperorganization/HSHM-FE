import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Dark overlay background */}
      {isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar panel */}
      <div
        className={`bg-dark text-white p-3 vh-100 position-fixed top-0 start-0`}
        style={{
          width: '220px',
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <h5 className="mb-4">Menu</h5>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/about" onClick={toggleSidebar}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
