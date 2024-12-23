import React, { useState, useRef } from "react";
import axios from "axios";
import "./home-view.css";

// 1) Browser speech recognition types
// For TypeScript, we sometimes need a “hacky” declaration for (webkit)SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

const HomeView: React.FC = () => {
    const [transcript, setTranscript] = useState("Conversation will appear here...");
    const [isListening, setIsListening] = useState(false);

    // Keep a reference to the speech recognition instance
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    // 2) On “Converse” click: start or stop listening
    const handleConverse = () => {
        if (!isListening) {
            startListening();
        } else {
            stopListening();
        }
    };

    // 3) Start recognition
    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech Recognition API not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        recognition.continuous = false;
        // If you want it to keep listening until you manually stop, set continuous = true

        recognition.onstart = () => {
            setIsListening(true);
            console.log("Speech recognition started");
        };

        recognition.onresult = async (event: SpeechRecognitionEvent) => {
            const lastResultIndex = event.results.length - 1;
            const speechResult = event.results[lastResultIndex][0].transcript;

            // If the speech result is "final", we proceed
            if (event.results[lastResultIndex].isFinal) {
                console.log("User said: ", speechResult);
                // Stop listening now that we have final speech
                stopListening();

                // Send the recognized speech to GPT
                await sendToGPT(speechResult);
            }
        };

        recognition.onerror = (err: any) => {
            console.error("Speech recognition error:", err);
            stopListening();
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
            setIsListening(false);
        };

        recognition.start();
    };

    // 4) Stop listening
    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }
        setIsListening(false);
    };

    // 5) Send recognized speech to GPT
    const sendToGPT = async (userText: string) => {
        try {
            // Append "You: ..." to transcript
            setTranscript((prev) => prev + "\n\nYou: " + userText);

            // Make request to your Express endpoint
            const { data } = await axios.post("http://localhost:4000/api/gpt-completion", {
                prompt: userText,
            });

            const gptText = data.text ?? "No response from GPT";
            // Append "AI: ..." to transcript
            setTranscript((prev) => prev + "\nAI: " + gptText);

            // Speak GPT response
            const utterance = new SpeechSynthesisUtterance(gptText);
            speechSynthesis.speak(utterance);
        } catch (error) {
            console.error("Error calling GPT endpoint:", error);
            setTranscript((prev) => prev + "\n[Error calling GPT]");
        }
    };

    return (
        <main>
            <div className="controls-container">
                <button className="language-button">Language</button>

                <div className="sphere-container">
                    <div className="rotating-sphere"></div>
                </div>

                {/* One button toggles listening on/off */}
                <button className="converse-button" onClick={handleConverse}>
                    {isListening ? "Stop Listening" : "Converse"}
                </button>
            </div>

            <div className="transcript-box">
                <h3>Transcript</h3>
                <p style={{ whiteSpace: "pre-wrap" }}>{transcript}</p>
            </div>
        </main>
    );
};

export default HomeView;
