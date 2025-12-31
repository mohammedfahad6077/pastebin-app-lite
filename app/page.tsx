"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttlSeconds, setTtlSeconds] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function createPaste() {
    if (!content.trim()) {
      setError("\u26A0 Please enter valid content before creating a paste.");
      setResult("");
      return;
    }

    setError("");
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: Number(ttlSeconds),
        max_views: Number(maxViews),
      }),
    });

    const data = await res.json();
    if (data.url) setResult(data.url);
    else setError(data.error || "Something went wrong.");
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fafafa",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#222" }}>Create Paste</h1>

      <textarea
        placeholder="Paste your content here..."
        rows={8}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "15px",
          fontFamily: "monospace",
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <label>Time To Live (seconds):</label>
        <input
          type="number"
          placeholder="e.g. 3600"
          style={{
            width: "100%",
            marginTop: "5px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
          value={ttlSeconds}
          onChange={(e) => setTtlSeconds(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>Maximum Views:</label>
        <input
          type="number"
          placeholder="e.g. 3"
          style={{
            width: "100%",
            marginTop: "5px",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
          value={maxViews}
          onChange={(e) => setMaxViews(e.target.value)}
        />
      </div>

      <button
        onClick={createPaste}
        style={{
          marginTop: "20px",
          width: "100%",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Create Paste
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "15px", textAlign: "center" }}>
          {error}
        </p>
      )}

      {result && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#eef5ff",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>&#x2705; Shareable URL:</strong>{" "}
          <a
            href={result}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3" }}
          >
            {result}
          </a>
        </div>
      )}
    </div>
  );
}


