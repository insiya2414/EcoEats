import React from 'react';
import '../styles.css'; // Make sure to create this CSS file
import { Link } from 'react-router-dom';


function Navigation() {
  return (
    <header>        
    <Link to="/">
          <img src="/ecoeats.png" alt="EcoEats" />
        </Link>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
          <a href="#about">About Us</a>
          </li>
        </ul>
      </nav>
      <div className="btn-container">
        <Link to="/get-started" className="btn">
          Get Started
        </Link>
      </div>
    </header>
  );
}

export default Navigation;
