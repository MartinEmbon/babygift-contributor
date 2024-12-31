import React from "react";
import "../styles/Navbar.css"; // Import the new CSS file

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        {/* Left Side */}
        <div className="navbar-left">
          <span className="navbar-language">EN</span>
          <div className="navbar-search-container">
            <input
              placeholder="Search"
              className="navbar-input"
            />
            {/* Font Awesome search icon */}
            <i className="fas fa-search search-icon"></i>
          </div>
        </div>

        {/* Center (Logo) */}
        <div className="navbar-center">
          <h1 className="navbar-logo">LAMA.</h1>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
       
          <div className="navbar-menu-item navbar-cart">
            <div className="navbar-badge">
              {/* Badge for shopping cart */}
              <span className="badge-content">4</span>
              {/* Font Awesome shopping cart icon */}
              <i className="fas fa-shopping-cart cart-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
