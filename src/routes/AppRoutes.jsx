import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";

// Auth Pages
import Login from "../pages/auth/Login";
import Unauthorized from "../pages/auth/Unauthorized";

// User Pages
const Home = React.lazy(() => import("../pages/content/Home"));
const UserDashboard = React.lazy(() => import("../pages/user/UserDashboard"));

// Shared Pages
import About from "../pages/content/About";
import ProductDetail from "../pages/content/Product/ProductDetail";
import ChatList from "../pages/content/Chat/ChatList";
import ChatDetail from "../pages/content/Chat/ChatDetail";
import FavoritesList from "../pages/content/Favorites/FavoritesList";
import UserProfile from "../pages/content/Profile/UserProfile";
import CreateListing from "../pages/content/CreateListing/CreateListing";

// Admin Pages (Lazy Loaded)
const AdminDashboard = React.lazy(() => import("../pages/admin/AdminDashboard"));

// Super Admin Pages (Lazy Loaded)
const SuperAdminDashboard = React.lazy(() => import("../pages/superadmin/SuperAdminDashboard"));
const RoleManagement = React.lazy(() => import("../pages/superadmin/RoleManagement"));

export default function AppRoutes() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleSidebar = (value) => {
    if (typeof value === "boolean") {
      setSidebarOpen(value);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  const hideLayout = location.pathname === "/login" || location.pathname === "/unauthorized";

  if (loading) {
    return <div>Loading...</div>;
  }

  if (hideLayout) {
    // No layout for login and unauthorized pages
    return (
      <IonRouterOutlet>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/unauthorized" exact component={Unauthorized} />
      </IonRouterOutlet>
    );
  }

  // Determine layout based on user role
  const getLayout = () => {
    if (!user) return UserLayout;
    
    switch (user.role) {
      case 'admin':
        return AdminLayout;
      case 'superadmin':
        return SuperAdminLayout;
      case 'user':
      default:
        return UserLayout;
    }
  };

  const Layout = getLayout();

  return (
    <Layout
      dark={dark}
      toggleDark={() => setDark(!dark)}
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
    >
      <React.Suspense fallback={<div>Loading...</div>}>
        <IonRouterOutlet key={location.key}>
        <Route path="/" exact>
          <Redirect to={user ? (
            user.role === 'admin' ? '/admin/dashboard' :
            user.role === 'superadmin' ? '/superadmin/dashboard' :
            '/user/dashboard'
          ) : '/login'} />
        </Route>
        
        {/* User Routes */}
        <ProtectedRoute path="/user/dashboard" exact component={UserDashboard} requiredRole="user" />
        <ProtectedRoute path="/home" exact component={Home} requiredRole="user" />
        <ProtectedRoute path="/about" exact component={About} requiredRole="user" />
        <ProtectedRoute path="/product/:id" exact component={ProductDetail} requiredRole="user" />
        <ProtectedRoute path="/chat" exact component={ChatList} requiredRole="user" />
        <ProtectedRoute path="/chat/:conversationId" exact component={ChatDetail} requiredRole="user" />
        <ProtectedRoute path="/favorites" exact component={FavoritesList} requiredRole="user" />
        <ProtectedRoute path="/profile" exact component={UserProfile} requiredRole="user" />
        <ProtectedRoute path="/create-listing" exact component={CreateListing} requiredRole="user" />
        
        {/* Admin Routes */}
        <ProtectedRoute path="/admin/dashboard" exact component={AdminDashboard} requiredRole="admin" />
        
        {/* Super Admin Routes */}
        <ProtectedRoute path="/superadmin/dashboard" exact component={SuperAdminDashboard} requiredRole="superadmin" />
        <ProtectedRoute path="/superadmin/role-management" exact component={RoleManagement} requiredRole="superadmin" />
        
        </IonRouterOutlet>
      </React.Suspense>
    </Layout>
  );
}
