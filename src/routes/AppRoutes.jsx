import React, { useState, useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Home from "../pages/content/Home";
import About from "../pages/content/About";
import ProductDetail from "../pages/content/Product/ProductDetail";

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
      <IonRouterOutlet>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/product/:id" exact component={ProductDetail} />
      </IonRouterOutlet>
    </MainLayout>
  );
}
