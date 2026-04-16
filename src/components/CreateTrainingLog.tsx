import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../components/UserContext";

interface TrainingLogFormProps {
  onCancel?: () => void;
}

interface TrainingLogData {
  title: string;
  animalId: string;
  hours: string;
  note: string;
  month: string;
  date: string;
  year: string;
}

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function TrainingLogForm({ onCancel }: TrainingLogFormProps) {
  const router = useRouter();
  const { user } = useUser();

  const now = new Date();

  const [form, setForm] = useState<TrainingLogData>({
    title: "",
    animalId: "",
    hours: "",
    note: "",
    month: MONTHS[now.getMonth()],
    date: now.getDate().toString(),
    year: now.getFullYear().toString(),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof TrainingLogData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // validation
    if (!form.title.trim()) return setError("Title is required.");
    if (!form.animalId.trim()) return setError("Animal ID is required.");
    if (!form.hours || isNaN(Number(form.hours))) return setError("Valid hours are required.");

    setLoading(true);
    setError(null);

    try {
      const payload = {
        title: form.title,
        animalId: form.animalId,
        hours: Number(form.hours),
        description: form.note,
        owner: user?.id,
        date: <form action="" className="date"></form>,
      };

      const res = await fetch("/api/training/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to create training log.");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-[42px] px-3 bg-white border border-[#C0BFBF] rounded-[5px] " +
    "font-['Heebo'] text-[15px] text-[#565252] " +
    "focus:outline-none focus:border-[#D21312] transition-colors " +
    "placeholder:text-[#BBBBBB]";

  const labelClass =
    "block font-['Heebo'] font-medium text-[15px] text-[#1C1C1C] mb-[5px]";

  return (
    <div className="w-full h-full flex items-center justify-center px-6 py-4">
      <div className="w-full max-w-[580px]">

        {/* Heading */}
        <h1 className="font-['Heebo'] font-medium text-[1.8vw] text-[#7C7171]">
          Training logs
        </h1>
        <hr className="border-t border-[rgba(97,94,94,0.35)] mb-[14px]" />

        {/* Error */}
        {error && (
          <div className="mb-4 px-3 py-2 bg-red-50 border border-red-300 rounded-[5px] text-[13px] text-red-600">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="mb-[10px]">
          <label className={labelClass}>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass}
            placeholder="Title"
          />
        </div>

        {/* Animal ID */}
        <div className="mb-[10px]">
          <label className={labelClass}>Animal ID</label>
          <input
            type="text"
            value={form.animalId}
            onChange={(e) => handleChange("animalId", e.target.value)}
            className={inputClass}
            placeholder="Enter animal ID"
          />
        </div>

        {/* Hours */}
        <div className="mb-[10px]">
          <label className={labelClass}>Total hours trained</label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={form.hours}
            onChange={(e) => handleChange("hours", e.target.value)}
            className={inputClass}
            placeholder="0"
          />
        </div>

        {/* Date Row */}
        <div className="mb-[10px]">
          <div className="flex gap-[12px]">

            {/* Month */}
            <div className="flex-1">
              <label className={labelClass}>Month</label>
              <select
                value={form.month}
                onChange={(e) => handleChange("month", e.target.value)}
                className={inputClass + " appearance-none cursor-pointer"}
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="w-[90px]">
              <label className={labelClass}>Date</label>
              <input
                type="number"
                min={1}
                max={31}
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Year */}
            <div className="w-[130px]">
              <label className={labelClass}>Year</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => handleChange("year", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mb-[16px]">
          <label className={labelClass}>Note</label>
          <textarea
            value={form.note}
            onChange={(e) => handleChange("note", e.target.value)}
            className={
              "w-full px-3 py-2 resize-none bg-white border border-[#C0BFBF] rounded-[5px] " +
              "font-['Heebo'] text-[15px] text-[#565252] " +
              "focus:outline-none focus:border-[#D21312] transition-colors " +
              "placeholder:text-[#BBBBBB]"
            }
            rows={3}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-[12px]">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="w-[110px] h-[42px] border-2 border-[#D21312] rounded-[5px] text-[#D21312]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="w-[110px] h-[42px] bg-[#D21312] text-white rounded-[5px] disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}