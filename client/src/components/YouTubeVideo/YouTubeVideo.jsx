import React, { useState } from "react";
import { useAppContext } from "../../context/context";
import YouTube from "react-youtube";
import "./style.css";

export default function YouTubeVideo() {
  const context = useAppContext();
  const [isReady, setIsReady] = useState(false);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const onReady = (event) => {
    setIsReady(true);
    console.log("YouTube player is ready");
  };

  const onError = (error) => {
    console.error("YouTube player error:", error);
    context.setError("Failed to load video. Please check the video ID and try again.");
  };

  return (
    <div className="youtube-video-container">
      <div className="video-wrapper">
        {!isReady && (
          <div className="video-loading">
            <div className="spinner"></div>
            <p>Loading video...</p>
          </div>
        )}
        <YouTube
          videoId={context.videoId}
          opts={opts}
          onReady={onReady}
          onError={onError}
          className="youtube-player"
        />
      </div>
      
      <div className="video-info">
        <div className="video-id-badge">
          Video ID: <span>{context.videoId}</span>
        </div>
      </div>
    </div>
  );
}