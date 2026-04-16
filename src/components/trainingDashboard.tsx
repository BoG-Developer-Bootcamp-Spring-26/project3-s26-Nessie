"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { TrainingData } from "../types/types"; 
import TrainingCard from "../components/TrainingCard";
import { Section } from "../components/SideBar";
import CreateLogModal from "./CreateTrainingLog"; 

interface TrainingDashboardProps {
  activeId: Section;
}

export default function TrainingDashboard({ activeId }: TrainingDashboardProps) {
  const { user } = useUser();
  const [logs, setLogs] = useState<TrainingData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Define fetchLogs outside useEffect so it can be passed to the modal for refreshing
  const fetchLogs = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let data;
      // Admin view vs. User view
      if (activeId === "allTraining") {
        const res = await fetch("/api/admin/training/route");
        data = await res.json();
        setLogs(data.logs || []);
      } else {
        const res = await fetch("/api/admin/training/route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user.id }),
        });
        data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.error("Error in fetching training logs: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user, activeId]);

  return (
    <div className="flex flex-col px-[5vw] pt-[5vh] w-full min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-[10px]">
        <h1 className="font-['Heebo'] font-medium text-[1.8vw] text-[#7C7171]">
          Training logs
        </h1>

        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-[0.5vw] hover:opacity-70 transition-opacity pb-[0.5vh]"
        >
          <img
            src="/images/createNewLogo.png"
            alt="Create"
            className="w-[1.4vw] h-[1.4vw] object-contain"
          />
          <span className="font-['Heebo'] font-medium text-[1.2vw] text-[#7C7171]">
            Create new
          </span>
        </button>
      </div>

      <div className="w-full border-t-[1.5px] border-[#615E5E]/40 mb-[30px]" />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="font-['Heebo'] text-gray-500">Loading logs...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-[20px] pb-10">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <TrainingCard key={index} log={log} userName={user?.fullName} />
            ))
          ) : (
            <p className="font-['Heebo'] text-gray-500 text-center mt-10">
              No training logs found. Click "Create new" to add one!
            </p>
          )}
        </div>
      )}

      {/* Logic to handle modal popup */}
      {user && (
        <CreateLogModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          userId={user.id}
          onLogCreated={fetchLogs} // Passing fetchLogs so the list refreshes after saving
        />
      )}
    </div>
  );
}