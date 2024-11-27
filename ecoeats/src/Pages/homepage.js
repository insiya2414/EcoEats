import React from "react";
import '../styles.css'; // Make sure to create this CSS file

function Homepage(){
    return(
      <div>
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

{/* Define your Routes */}
{/* Default content, for the homepage */}
{/* Features Section */}
<section id="features" className="features">
<div className="feature-container">
  <h2>Features</h2>
  <h3>WASTE LESS, EAT MORE</h3>
  <h4>Transform leftovers into delicious meals!</h4>
  <div className="feature-cards">
    <div className="card">
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
  <a className="btn">
    Download for iOS
  </a>
  <a className="btn">
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
</div>
    );
}
export default Homepage;

