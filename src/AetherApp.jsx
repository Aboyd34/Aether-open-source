import React, { useState } from "react";
import ClaudeAgent from './components/agents/ClaudeAgent';
import PerplexityAgent from './components/agents/PerplexityAgent';
import PolitAgent from './components/agents/PolitAgent';
import { generateAndStoreKeys, encryptMessage, decryptMessage, deleteKeys } from "./AetherKeyManager";
import "./index.css";

export default function AetherApp() {
  const [message, setMessage] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    await generateAndStoreKeys();
    setStatus("✅ New key pair generated and saved locally.");
  };

  const handleEncrypt = async () => {
    const result = await encryptMessage(message);
    setEncrypted(result);
    setStatus("🔒 Message encrypted.");
  };

  const handleDecrypt = async () => {
    const result = await decryptMessage(encrypted);
    setDecrypted(result);
    setStatus("🔓 Message decrypted.");
  };

  const handleDelete = () => {
    deleteKeys();
    setStatus("🗑️ Keys deleted from storage.");
  };

  const handleWorkflow = (type, payload) => {
    console.log(`Workflow triggered: ${type}`, payload);
    // You can route to ClaudeAgent, PerplexityAgent, or PolitAgent here
  };

  return (
    <div className="app">
      <h1>⚡ Aether Key Manager</h1>
      <p>{status}</p>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your secret message..."
      ></textarea>

      <div className="buttons">
        <button onClick={handleGenerate}>Generate Keys</button>
        <button onClick={handleEncrypt}>Encrypt</button>
        <button onClick={handleDecrypt}>Decrypt</button>
        <button onClick={handleDelete}>Delete Keys</button>

        {/* Workflow Agent Buttons */}
        <button onClick={() => handleWorkflow('debug', { test: message })}>
          Debug Message
        </button>
        <button onClick={() => handleWorkflow('analyze', message)}>
          Analyze Message
        </button>
        <button onClick={() => handleWorkflow('log', { type: 'push', details: { content: message } })}>
          Log Message Push
        </button>
      </div>

      {encrypted && (
        <div className="output">
          <h3>Encrypted:</h3>
          <p>{encrypted}</p>
        </div>
      )}

      {decrypted && (
        <div className="output">
          <h3>Decrypted:</h3>
          <p>{decrypted}</p>
        </div>
      )}
    </div>
  );
}