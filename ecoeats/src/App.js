import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Homepage from './Pages/homepage';
import GetStarted from './Pages/getstarted';
import Ingredients from './Pages/ingredients';
import Login from './Pages/login';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="get-started" element={<Login />} />
                    <Route path="ingredients" element={<Ingredients />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;