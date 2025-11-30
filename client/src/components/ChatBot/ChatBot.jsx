import React, { useRef, useEffect, useState } from "react";
import { Bot, Send } from "lucide-react";
import { useAppContext } from "../../context/context";
import MyMessage from "./MyMessage/MyMessage";
import BotMessage from "./BotMessage/BotMessage";
import axios from "axios";
import "./style.css";

export default function ChatBot() {
  const context = useAppContext();
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [context.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || context.isLoading) return;

    const userMessage = {
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add user message to chat
    context.addMessage(userMessage);
    setInputValue("");
    context.setIsLoading(true);

    try {
      // Send request to backend
      const response = await axios.post("http://localhost:8000/api/chat/", {
        video_id: context.videoId,
        question: userMessage.content,
      });

      // Add bot response to chat
      const botMessage = {
        type: "bot",
        content: response.data.answer,
        timestamp: new Date().toISOString(),
      };

      context.addMessage(botMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage = {
        type: "bot",
        content: "Sorry, I encountered an error. Please try again or make sure the video has captions available.",
        timestamp: new Date().toISOString(),
        isError: true,
      };

      context.addMessage(errorMessage);
    } finally {
      context.setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-bot-wrapper">
      <div className="navbar">
        <Bot size={24} />
        <span>AI Assistant</span>
      </div>

      <div className="messages-wrapper">
        {context.messages.length === 0 ? (
          <div className="empty-state">
            <Bot size={64} color="var(--gray-light)" />
            <h3>Start a conversation</h3>
            <p>Ask me anything about the video!</p>
          </div>
        ) : (
          <>
            {context.messages.map((message, index) => (
              message.type === "user" ? (
                <MyMessage key={index} content={message.content} />
              ) : (
                <BotMessage
                  key={index}
                  content={message.content}
                  isError={message.isError}
                />
              )
            ))}
            {context.isLoading && (
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Ask about the video..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={context.isLoading}
        />
        <button
          className="send"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || context.isLoading}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}