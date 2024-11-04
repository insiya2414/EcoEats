import React from 'react';
import '../styles.css'; // Make sure to create this CSS file
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <div>
    <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    Eco<span>Eats</span>
                </Link>
                <ul className="nav-links">
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
                <Link to="/get-started" className="btn">
                    Get Started
                </Link>
            </div>
        </nav>
    </div>
  );
}

export default Navigation;