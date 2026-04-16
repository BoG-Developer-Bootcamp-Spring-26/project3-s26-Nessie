import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { TrainingData } from "../types/types"; // Adjust path
import TrainingCard from "../components/TrainingCard";
import { Section } from "../components/SideBar"; 


interface TrainingDashboardProps {
  activeId: Section;
}


export default function TrainingDashboard({activeId} : TrainingDashboardProps) {
    const { user } = useUser();
    const [logs, setLogs] = useState<TrainingData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLogs = async () => {
            if (!user) return;
            setLoading(true);
            try {
                let data; 
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
                    const data = await res.json();
                    setLogs(data.logs || []);
                }

            } catch (e) {
                console.error("Error in fetching requests: ", e);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [user]);

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

            <div className="w-full border-t-[1.5px] border-[#615E5E]/40 mb-[30px]" />

            {loading ? (
                <p className="text-gray-500">Loading logs...</p>
            ) : (
                <div className="flex flex-col gap-[20px] pb-10">
                    {logs.map((log, index) => (
                        <TrainingCard key={index} log={log} userName={user?.fullName} />
                    ))}
                </div>
            )}
        </div>
    );
}