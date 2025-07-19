"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [token, setToken] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [network, setNetwork] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPrice(null);

    try {
      const response = await fetch("http://localhost:4000/interpolate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.toLowerCase(), timestamp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setPrice(data.price);
    } catch (err: any) {
      setError(err.message || "Request failed");
    }
  };

  const handleSchedule = async () => {
    setError("");
    setPrice(null);

    try {
      if (!token || !timestamp) {
        setError("Token or date missing");
        return;
      }

      const isoDate = new Date(timestamp).toISOString().split("T")[0];

      const response = await fetch("http://localhost:4000/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.toLowerCase(), date: isoDate }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Schedule failed");

      alert("📅 Price fetch scheduled successfully!");
    } catch (err: any) {
      setError(err.message || "Request failed");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 flex flex-col items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:scale-105 transition"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white">
          🔍 Token Price Oracle
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              Token Address
            </label>
            <input
              type="text"
              placeholder="e.g., 0xA0b8...EB48"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              Timestamp
            </label>
            <input
              type="datetime-local"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-gray-700 dark:text-gray-300">
              Network
            </label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            >
              <option value="">Select Network</option>
              <option value="ethereum">Ethereum</option>
              <option value="polygon">Polygon</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold transition-all"
            >
              Get Interpolated Price
            </button>

            <button
              type="button"
              onClick={handleSchedule}
              className="w-full sm:w-1/2 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold transition-all"
            >
              Schedule Price Fetch
            </button>
          </div>
        </form>

        {price !== null && (
          <div className="mt-6 text-center text-lg text-green-600 dark:text-green-400 font-semibold">
            📈 Interpolated Price: <span className="font-bold">${price}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 text-center text-red-600 dark:text-red-400 font-medium">
            ❌ {error}
          </div>
        )}
      </div>
    </main>
  );
}
