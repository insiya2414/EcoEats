import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <header>
      <figure className="logo">
        <img src="images/logo.png" alt="Logo" />
      </figure>
      <nav className="navbar">
        <ul>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
            <Link to="/ingredients">Your Ingredients List</Link>
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
