import React, { useState } from "react";
import { useAppContext } from "../../context/context";
import "./style.css";

export default function LandingPage() {
  const context = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  // Extract video ID from URL or return the ID itself
  const extractVideoId = (input) => {
    // Remove whitespace
    input = input.trim();

    // Pattern 1: youtube.com/watch?v=VIDEO_ID
    const standardPattern = /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/;
    const standardMatch = input.match(standardPattern);
    if (standardMatch) return standardMatch[1];

    // Pattern 2: youtu.be/VIDEO_ID
    const shortPattern = /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const shortMatch = input.match(shortPattern);
    if (shortMatch) return shortMatch[1];

    // Pattern 3: youtube.com/embed/VIDEO_ID
    const embedPattern = /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const embedMatch = input.match(embedPattern);
    if (embedMatch) return embedMatch[1];

    // Pattern 4: Direct video ID (11 characters)
    const directIdPattern = /^[a-zA-Z0-9_-]{11}$/;
    if (directIdPattern.test(input)) return input;

    return null;
  };

  const handleSubmit = () => {
    if (!inputValue) {
      setInputError("Please enter a YouTube URL or Video ID");
      return;
    }

    const videoId = extractVideoId(inputValue);

    if (!videoId) {
      setInputError("Invalid YouTube URL or Video ID. Please try again.");
      return;
    }

    setInputError("");
    context.setVideoId(videoId);
    context.setIsVideoLoaded(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logo">BotTube</div>
        <div className="tagline">
          Chat with any YouTube video using AI
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Paste YouTube URL or Video ID..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setInputError("");
            }}
            onKeyPress={handleKeyPress}
            className={`landing-input ${inputError ? "error" : ""}`}
          />
          <button onClick={handleSubmit} className="btn btn-primary landing-btn">
            Start Chatting
          </button>
        </div>

        {inputError && <div className="error-message">{inputError}</div>}

        <div className="example-text">
          Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </div>
      </div>
    </div>
  );
}