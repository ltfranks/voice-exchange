import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeView from "./views/home-view";
import Header from "./components/header";
import LoginView from "./views/login-view";

const App: React.FC = () => {
    return (
        <Router>
            <Header/>
            <Routes>
                {/* Define your routes */}
                <Route path="/" element={<HomeView />} />
                <Route path="/login" element={<LoginView />} />
                {/* Add other routes as needed */}
            </Routes>
        </Router>
    );
};

export default App;
