import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/home-view";
import Header from "./components/header";

const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                {/* Define your routes */}
                <Route path="/" element={<HomeView />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
