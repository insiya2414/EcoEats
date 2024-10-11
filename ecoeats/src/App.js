import React from 'react';
import './styles.css'; // Make sure to create this CSS file

function App() {
  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="logo">
            Eco<span>Eats</span>
          </a>
          <ul className="nav-links">
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#download">Download</a>
            </li>
          </ul>
          <a href="#get-started" className="btn">
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>
            Reduce Food Waste with <span>EcoEats</span>
          </h1>
          <p>
            Your personalized recipe assistant that turns leftovers into
            delicious meals.
          </p>
          <a href="#download" className="btn">
            Download App
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="feature-cards">
            <div className="card">
              <h3>Personalized Recipes</h3>
              <p>
                Get recipe suggestions tailored to the ingredients you have on
                hand.
              </p>
            </div>
            <div className="card">
              <h3>Inventory Management</h3>
              <p>Keep track of your pantry items and reduce food spoilage.</p>
            </div>
            <div className="card">
              <h3>Receipt Scanning</h3>
              <p>
                Easily input ingredients by scanning your grocery receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <ol>
            <li>
              Scan your grocery receipts or manually add leftover ingredients.
            </li>
            <li>Receive personalized recipe suggestions instantly.</li>
            <li>Enjoy your meal and reduce food waste!</li>
          </ol>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="download">
        <div className="container">
          <h2>Download EcoEats Today</h2>
          <p>Available on iOS and Android.</p>
          <a href="#" className="btn">
            Download for iOS
          </a>
          <a href="#" className="btn">
            Download for Android
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 EcoEats. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;