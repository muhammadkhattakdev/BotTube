import React from "react";
import "./style.css";

export default function BotMessage({ content, isError }) {
  return (
    <div className={`bot-message ${isError ? "error" : ""}`}>
      {content}
    </div>
  );
}