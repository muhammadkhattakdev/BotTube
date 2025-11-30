import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Video state
  const [videoId, setVideoId] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  // Chat state
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Error state
  const [error, setError] = useState(null);

  // Add a new message to the chat
  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  // Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };

  // Reset the entire app state
  const resetApp = () => {
    setVideoId("");
    setIsVideoLoaded(false);
    setMessages([]);
    setCurrentMessage("");
    setIsLoading(false);
    setError(null);
  };

  const values = {
    // Video
    videoId,
    setVideoId,
    isVideoLoaded,
    setIsVideoLoaded,
    
    // Chat
    messages,
    setMessages,
    addMessage,
    clearMessages,
    currentMessage,
    setCurrentMessage,
    
    // Loading & Error
    isLoading,
    setIsLoading,
    error,
    setError,
    
    // Actions
    resetApp,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};