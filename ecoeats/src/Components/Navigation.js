import React from 'react';
import '../styles.css'; // Make sure to create this CSS file
import { HashLink as Link } from 'react-router-hash-link';


function Navigation() {
  return (
    <header>        
    <Link to="/">
          <img src="/ecoeats.png" alt="EcoEats" />
        </Link>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/#features">Features</Link>
          </li>
          <li>
            <Link to="/#how-it-works">How It Works</Link>
          </li>
          <li>
          <Link to="/#about">About Us</Link>
          </li>
          <li>
          <Link to="/Dashboard">Dashboard</Link>
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
