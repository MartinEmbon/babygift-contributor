import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ContributorLogin.css"; // Import the CSS file

function ContributorLogin({ setIsContributorLoggedIn }) {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("https://us-central1-baby-gift-project.cloudfunctions.net/contributor-login", { accessToken })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("email", response.data.email);
          setIsContributorLoggedIn(true);
          navigate("/contribute");
        } else {
          alert("Invalid access token!");
        }
      })
      .catch((error) => console.error("Login error:", error));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Contributor Login</h2>
        <p className="login-description">Enter your access token to contribute to the wishlist.</p>
        <input
          className="login-input"
          type="text"
          placeholder="Enter Access Token"
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default ContributorLogin;
