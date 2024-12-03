import React from "react";
import '../styles.css'; // Make sure to create this CSS file
import { Link } from 'react-router-dom';


function Homepage(){
    return(
      <div>
{/* Hero Section */}
<header className="hero">
<div className="container">
  <h1>Reduce</h1>
  <h1>Food Waste with</h1>
  <h1><span>EcoEats</span></h1>
  <p>
    Your personalized recipe assistant that 
  </p>
  <p>
    turns leftovers into delicious meals.
  </p>
  <Link to="/login" className="btn">
  Get Started
</Link>

</div>
</header>

<section id="features" className="features">
  <div className="feature-header">
    <h1>Features</h1>
    </div>
    <div className="feature-container">
  <p>Scan Receipt</p>
    <img src="/receipt.jpg" alt="Receipt Scanning" />
    <p>Personalized Recipe</p>
    <img src="/recipe.jpg" alt="Personalized Recipe" />
    <p>Inventory Management</p>
    <img src="/inventory.jpg" alt="Inventory Management" />
  </div>
</section>

{/* How It Works Section */}
<section id="how-it-works" className="how-it-works">
<div className="container">
  <h2>How It Works</h2>
  <ol>
    <li>Scan your grocery receipts.</li>
    <li>Receive personalized recipe suggestions instantly.</li>
    <li>Enjoy your meal and reduce food waste!</li>
  </ol>
</div>
</section>

{/* about */}
<section id="about" className="about">
<div className="container">
  <h2>About Us</h2>
  <ol>
          
          <p>
          <span>We are a team of Computer Science students</span> who decided to take action against food 
          waste after realizing how often we and our peers were throwing away perfectly good ingredients.
          With a shared passion for sustainability and technology, we combined our skills to develop a 
          solution that makes it easier for students to use items they already have in their 
          kitchens. We believe that by <span><i>turning leftovers into opportunities, we can make a difference 
          both for students and for the environment.</i></span>
          </p>
        
  </ol>
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

