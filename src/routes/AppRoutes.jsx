import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Home from "../pages/content/Home";
import About from "../pages/content/About";
import ProductDetail from "../pages/content/Product/ProductDetail";
import ChatList from "../pages/content/Chat/ChatList";
import ChatDetail from "../pages/content/Chat/ChatDetail";
import FavoritesList from "../pages/content/Favorites/FavoritesList";
import UserProfile from "../pages/content/Profile/UserProfile";
import CreateListing from "../pages/content/CreateListing/CreateListing";

export default function AppRoutes() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

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

  const hideLayout = location.pathname === "/login";

  if (hideLayout) {
    // No layout for login
    return (
      <IonRouterOutlet>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact component={Login} />
      </IonRouterOutlet>
    );
  }

  // Layout for all other routes
  return (
    <MainLayout
      dark={dark}
      toggleDark={() => setDark(!dark)}
      sidebarOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
    >
      <IonRouterOutlet key={location.key}>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/product/:id" exact component={ProductDetail} />
        <Route path="/chat" exact component={ChatList} />
        <Route path="/chat/:conversationId" exact component={ChatDetail} />
        <Route path="/favorites" exact component={FavoritesList} />
        <Route path="/profile" exact component={UserProfile} />
        <Route path="/create-listing" exact component={CreateListing} />
      </IonRouterOutlet>
    </MainLayout>
  );
}
