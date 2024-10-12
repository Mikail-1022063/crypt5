"use client";

import React, { useState, ChangeEvent } from "react";
// @ts-ignore
import CryptoJS from "crypto-js";

const Home: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  const handleEncryption = () => {
    if (mode === "encrypt") {
      const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
      setResult(encryptedText);
    } else {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(text, key);
        const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
        setResult(decryptedText || "Invalid decryption key");
      } catch (error) {
        setResult("Decryption failed. Please check the input.");
      }
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as "encrypt" | "decrypt");
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Encrypt/Decrypt App</h1>
          <div className="mb-4">
            <label htmlFor="text" className="block font-medium text-gray-700 mb-2">Text:</label>
            <input
                id="text"
                type="text"
                value={text}
                onChange={handleTextChange}
                className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="key" className="block font-medium text-gray-700 mb-2">Key:</label>
            <input
                id="key"
                type="text"
                value={key}
                onChange={handleKeyChange}
                className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mode" className="block font-medium text-gray-700 mb-2">Mode:</label>
            <select
                id="mode"
                value={mode}
                onChange={handleModeChange}
                className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="encrypt">Encrypt</option>
              <option value="decrypt">Decrypt</option>
            </select>
          </div>
          <button
              onClick={handleEncryption}
              className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 transition duration-200"
          >
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
          {result && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-700">Result:</h3>
                <p className="text-ellipsis text-gray-900 bg-gray-100 p-3 rounded-md border border-gray-300 mt-2">{result}</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default Home;
