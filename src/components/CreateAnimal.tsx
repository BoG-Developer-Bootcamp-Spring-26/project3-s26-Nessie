"use client";

import { useState } from "react";

interface CreateAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onAnimalCreated: () => void;
}

export default function CreateAnimalModal({
  isOpen,
  onClose,
  userId,
  onAnimalCreated,
}: CreateAnimalModalProps) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [hoursTrained, setHoursTrained] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/animal/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          breed,
          hoursTrained: Number(hoursTrained),
          owner: userId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create animal.");
        setLoading(false);
        return;
      }

      setName("");
      setBreed("");
      setHoursTrained("");

      setLoading(false);

      onAnimalCreated();
      onClose();
    } catch (err) {
      setError("Something went wrong while creating the animal.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create New Animal
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 transition hover:text-gray-700"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              placeholder="Enter animal name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Breed
            </label>
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              placeholder="Enter breed"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Hours Trained
            </label>
            <input
              type="number"
              min="0"
              value={hoursTrained}
              onChange={(e) => setHoursTrained(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
              placeholder="Enter hours trained"
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Animal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
