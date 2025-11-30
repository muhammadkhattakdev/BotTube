import React from "react";
import { useAppContext } from "./context/context";
import LandingPage from "./components/LandingPage/LandingPage";
import YouTubeVideo from "./components/YouTubeVideo/YouTubeVideo";
import ChatBot from "./components/ChatBot/ChatBot";
import { Home } from "lucide-react";
import "./App.css";

function App() {
  const context = useAppContext();

  // Show landing page if no video is loaded
  if (!context.isVideoLoaded) {
    return <LandingPage />;
  }

  // Show video page with chat
  return (
    <div className="video-page-wrapper">
      {/* NAVBAR */}
      <div className="navbar-wrapper">
        <div className="navbar">
          <div className="heading" onClick={context.resetApp}>
            BotTube
          </div>
          <button
            className="btn btn-primary"
            onClick={context.resetApp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              fontSize: "14px",
            }}
          >
            <Home size={18} />
            New Video
          </button>
        </div>
      </div>

      {/* MAIN PAGE CONTENT */}
      <div className="page-content">
        <div className="left-side">
          {/* YouTube Video Component */}
          <YouTubeVideo />
        </div>

        <div className="right-side">
          {/* ChatBot Component */}
          <ChatBot />
        </div>
      </div>
    </div>
  );
}

export default App;