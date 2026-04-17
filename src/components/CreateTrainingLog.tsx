"use client";

import { useState } from "react";

interface CreateLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onLogCreated: () => void;
}

export default function CreateLogModal({
  isOpen,
  onClose,
  userId,
  onLogCreated,
}: CreateLogModalProps) {
  const [title, setTitle] = useState("");
  const [animalName, setAnimalName] = useState(""); // Changed to string for text input
  const [hoursTrained, setHoursTrained] = useState("");
  const [month, setMonth] = useState("October");
  const [date, setDate] = useState("20");
  const [year, setYear] = useState("2023");
  const [note, setNote] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/training/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          animal: animalName, // Sending the text value
          hours: Number(hoursTrained),
          date: new Date(`${month} ${date}, ${year}`),
          description: note,
          user: userId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create log.");
      }

      onLogCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title Field */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              placeholder="Title"
              required
            />
          </div>

          {/* Animal Text Field (Changed from Dropdown) */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">Select Animal</label>
            <input
              type="text"
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              placeholder="e.g. Lucy - Golden Retriever"
              required
            />
          </div>

          {/* Total hours trained */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">Total hours trained</label>
            <input
              type="number"
              value={hoursTrained}
              onChange={(e) => setHoursTrained(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              placeholder="20"
              required
            />
          </div>

          {/* Date Row */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-bold text-gray-700">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-red-500"
              >
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="w-20">
              <label className="mb-1 block text-sm font-bold text-gray-700">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-center outline-none focus:border-red-500"
              />
            </div>
            <div className="w-32">
              <label className="mb-1 block text-sm font-bold text-gray-700">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-center outline-none focus:border-red-500"
              />
            </div>
          </div>

          {/* Note Field */}
          <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="h-32 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-red-500"
              placeholder="Note"
            />
          </div>

          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-32 rounded-md border border-red-500 py-2 font-medium text-red-500 transition hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-32 rounded-md bg-red-600 py-2 font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}