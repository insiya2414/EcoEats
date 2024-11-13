import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Homepage from './Pages/homepage';
import Ingredients from './Pages/ingredients';
import Login from './Pages/login';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Dashboard from './Pages/Dashboard';

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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;