import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Homepage from './Pages/homepage';
import GetStarted from './Pages/getstarted';
import Ingredients from './Pages/ingredients';
import Login from './Pages/login';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Dashboard from './Pages/Dashboard';
import ScanReceipt from './Pages/ScanReceipt'; // Ensure these are imported
import GenerateRecipes from './Pages/GenerateRecipes';
import PantryItems from './Pages/PantryItems';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="get-started" element={<Login />} />
                    <Route path="ingredients" element={<Ingredients />} />
                    <Route path="login" element={<Login />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="/scan-receipt" element={<ScanReceipt />} />
                <Route path="/generate-recipes" element={<GenerateRecipes />} />
                <Route path="/pantry-items" element={<PantryItems />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;