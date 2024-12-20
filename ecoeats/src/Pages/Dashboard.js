// import React from 'react';
// import './Dashboard.css';

// function Dashboard() {
//     const handleCardClick = (action) => {
//         if (action === 'scan') {
//             console.log("Navigate to Scan Receipt");
//             // Add navigation or logic for Scan Receipt
//         } else if (action === 'recipes') {
//             console.log("Navigate to Generate Recipes");
//             // Add navigation or logic for Generate Recipes
//         } else if (action === 'pantry') {
//             console.log("Navigate to Pantry Items");
//             // Add navigation or logic for Pantry Items
//         }
//     };

//     return (
//         <div className="dashboard-wrapper">
//             <div className="cards-container">
//                 <div onClick={() => handleCardClick('scan')} className="receipt_card">
//                     <h3>Scan Receipt</h3>
//                 </div>
//                 <div onClick={() => handleCardClick('recipes')} className="recipes_card">
//                     <h3>Generate Recipes</h3>
//                 </div>
//                 <div onClick={() => handleCardClick('pantry')} className="pantry_card">
//                     <h3>Go to Pantry Items</h3>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;
// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const navigate = useNavigate();

    const handleCardClick = (action) => {
        if (action === 'scan') {
            navigate('/scan-receipt');
        } else if (action === 'recipes') {
            navigate('/generate-recipes');
        } else if (action === 'pantry') {
            navigate('/pantry-items');
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div className="cards-container">
                <div onClick={() => handleCardClick('scan')} className="receipt_card">
                    <div className="card-icon"><h3>Scan Receipt</h3></div>
                </div>
                <div onClick={() => handleCardClick('recipes')} className="recipes_card">
                    <div className="card-icon"><h3>Generate Recipes</h3></div>
                </div>
                <div onClick={() => handleCardClick('pantry')} className="pantry_card">
                    <div className="card-icon"><h3>Go to Pantry Items</h3></div> 
                    
                </div>
            </div>
        </div>
    );
}    

export default Dashboard;
