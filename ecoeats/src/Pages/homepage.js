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
    <p> <span>College students often face challenges with food waste</span> due to tight budgets,
       busy schedules, and limited cooking skills. Leftovers are frequently discarded,
        leading to increased costs and environmental impact. Our project tackles this
         problem with an AI-powered app that helps students creatively repurpose leftover
          ingredients, promoting sustainability and saving money. </p>
          
          <p>
          <span>We are a team of four Computer Science students</span> who decided to take action against food 
          waste after realizing how often we and our peers were throwing away perfectly good ingredients.
          With a shared passion for sustainability and technology, we combined our skills to develop an 
          AI-driven solution that makes it easier for students to use what they already have in their 
          kitchens. We believe that by turning leftovers into opportunities, we can make a difference 
          both for students and for the environment.
          </p>
          <p>
          <span>EcoEats</span> uses AI to suggest creative and easy-to-follow recipes based on the ingredients 
          you have at hand, helping students save money, reduce waste, and learn more about cooking
          in a fun, accessible way. Whether you’re new to cooking or simply trying to stretch your
          budget, our app is here to inspire and empower you to make the most out of your food.</p>
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

