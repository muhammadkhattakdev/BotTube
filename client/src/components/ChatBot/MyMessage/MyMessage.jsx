import React from "react";
import "./style.css";

export default function MyMessage({ content }) {
  return (
    <div className="my-message">
      {content}
    </div>
  );
}