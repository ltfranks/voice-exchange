import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-logo">
                <Link to="/" className="logo">
                    AI Buddy
                </Link>
            </div>
            <nav className="header-nav">
                <ul className="nav-links">
                    <li>
                        <Link to="/conversations">Conversations</Link>
                    </li>
                    <li>
                        <Link to="/progress">Progress</Link>
                    </li>
                    <li>
                        <Link to="/challenges">Challenges</Link>
                    </li>
                    <li>
                        <Link to="/topics">Topics</Link>
                    </li>
                </ul>
            </nav>
            <div className="header-login">
                <button className="login-button">Login</button>
            </div>
        </header>
    );
};

export default Header;
