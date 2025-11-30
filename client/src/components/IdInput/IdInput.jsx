import React, { useState } from "react";
import "./style.css";

export default function IdInput() {

    const [loading, setLoading] = useState(false);

    

    return (
        <>
            <div className="input-wrapper">
                <input placeholder="Inset YouTube Video ID here..." type="text" />
                <button>
                    {
                        loading ? "Fetching..." : "Play Video"
                    }
                </button>
            </div>
        </>
    )
}