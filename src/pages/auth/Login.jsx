import React, { useState } from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { lockClosed, mail, logoGoogle, logoFacebook, logoTwitter } from "ionicons/icons";
import "../../assets/css/component/Login.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Logging in with:", form);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      history.push("/home");
    }, 1500);
  };

  return (
    <IonPage className="login-page">
      <IonContent fullscreen>
        {/* Decorative icons - fixed position and not overlapping */}
        <IonIcon icon={lockClosed} className="decorative-icon lock" />
        <IonIcon icon={mail} className="decorative-icon mail" />
        
        <div className="login-container">
          <div className="login-card">
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  <IonIcon icon={mail} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <IonIcon icon={lockClosed} />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : 'Login'}
              </button>
            </form>
            
            <div className="text-center my-3">
              <span className="text-muted">Or continue with</span>
            </div>
            
            <div className="social-login">
              <button className="social-btn">
                <IonIcon icon={logoGoogle} size="large" />
              </button>
              <button className="social-btn">
                <IonIcon icon={logoFacebook} size="large" />
              </button>
              <button className="social-btn">
                <IonIcon icon={logoTwitter} size="large" />
              </button>
            </div>
            
            <div className="login-footer">
              <a href="/forgot-password">Forgot Password?</a>
              <a href="/register">Create Account</a>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}