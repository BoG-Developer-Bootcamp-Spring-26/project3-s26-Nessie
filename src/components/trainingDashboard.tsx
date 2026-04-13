import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { TrainingData } from "../types/types"; // Adjust path
import TrainingCard from "../components/TrainingCard";

export default function TrainingDashboard() {
    const { user } = useUser(); 
    const [logs, setLogs] = useState<TrainingData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchLogs() {
          try {
            const res = await fetch('/api/training/route');
            if (!res.ok) throw new Error('Failed to fetch logs');
            
            const data = await res.json();
            setLogs(data);
          } catch (err) {
            console.error("Error fetching logs: ", err);
          } finally {
            setLoading(false);
          }
        }

        fetchLogs();
    }, []); // CRITICAL FIX: Empty array prevents infinite loops

    return (
      <div className="flex flex-col px-[2.5vw] pt-[4vh] w-full min-h-full">        
        <div className="flex justify-between items-center mb-[10px]">
          <h1 className="font-['Heebo'] font-medium text-[1.8vw] text-[#7C7171]">
            Training logs
          </h1>

          <button className="flex items-center gap-[0.5vw] hover:opacity-70 transition-opacity pb-[0.5vh]">
              <img src="/images/createNewLogo.png" alt="Create" className="w-[1.4vw] h-[1.4vw] object-contain" />
            <span className="font-['Heebo'] font-medium text-[1.2vw] text-[#7C7171]">
              Create new
            </span>
          </button>
        </div>        

        <div className="w-full border-t-[1.5px] border-[#615E5E]/40 mb-[40px]" />

        {loading ? (
            <p className="text-gray-500">Loading logs...</p>
        ) : (
            <div className="flex flex-col gap-[32px] pb-10">
              {logs.map((log, index) => (
                <TrainingCard log={log} userName={user?.fullName}/>
              ))}
            </div>
        )}
      </div>
    );
}