import React from "react";
import "./home-view.css";

const HomeView: React.FC = () => {
    return (
        <main>
            <div className="controls-container">
                <button className="language-button">Language</button>
                <div className="sphere-container">
                    <div className="rotating-sphere"></div>
                </div>
                <button className="converse-button">Converse</button>
            </div>
            <div className="transcript-box">
                <h3>Transcript</h3>
                <p>Conversation will appear here...</p>
            </div>
        </main>
    );
};

export default HomeView;
