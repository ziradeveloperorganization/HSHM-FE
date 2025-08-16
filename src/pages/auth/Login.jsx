import React, { useState } from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { lockClosed, mail, logoGoogle, logoFacebook, logoTwitter } from "ionicons/icons";
import "../../assets/css/component/Login.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const result = await login(form);
      
      if (result.success) {
        // Redirect based on user role
        const user = result.user;
        switch (user.role) {
          case 'admin':
            history.push("/admin/dashboard");
            break;
          case 'superadmin':
            history.push("/superadmin/dashboard");
            break;
          case 'user':
          default:
            history.push("/user/dashboard");
            break;
        }
      } else {
        setError(result.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
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
            
            {error && (
              <div style={{ 
                color: 'var(--ion-color-danger)', 
                textAlign: 'center', 
                marginBottom: '16px',
                padding: '8px',
                backgroundColor: 'rgba(var(--ion-color-danger-rgb), 0.1)',
                borderRadius: '8px'
              }}>
                {error}
              </div>
            )}
            
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
            
            {/* Demo Credentials */}
            <div style={{ 
              marginTop: '20px', 
              padding: '12px', 
              backgroundColor: 'var(--ion-color-light)',
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}>
              <strong>Demo Credentials:</strong><br />
              User: john@example.com<br />
              Admin: sarah@example.com<br />
              Super Admin: admin@example.com<br />
              Password: password123 (for all)
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}