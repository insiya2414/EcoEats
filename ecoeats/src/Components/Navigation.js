import React from 'react';
import '../styles.css'; // Make sure to create this CSS file
import { HashLink as Link } from 'react-router-hash-link';


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
                        <Link to= "/#features">Features</Link>
                    </li>
                    <li>
                    <Link to= "/#how-it-works">How It Works</Link>
                    </li>
                    <li>
                        <Link to="/ingredients">Dashboard</Link>
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