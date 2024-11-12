import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../pages/Main/Main';
import About from '../pages/About/About';
import Ranking from '../pages/Ranking/Ranking';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/ranking" element={<Ranking />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
