import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import "../../assets/css/component/Login.css"; // Assuming you have a CSS file for styling
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const history = useHistory();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", form);
    history.push("/home");
    // Add your auth logic here
  };

  return (
    <IonPage className="login-page">
      <IonContent fullscreen>
        <div className="login-container">
          <div className="login-card">
            <h2>Welcome Back</h2>
            <p>Please sign in to your account</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
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
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                Login
              </button>
            </form>
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
