import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { loginWithGoogleCredential } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1>StreamList</h1>
      <p>Please sign in with Google to access the application.</p>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          loginWithGoogleCredential(credentialResponse);
          navigate(from, { replace: true });
        }}
        onError={() => {
          alert("Google sign-in failed. Please try again.");
        }}
      />
    </div>
  );
}