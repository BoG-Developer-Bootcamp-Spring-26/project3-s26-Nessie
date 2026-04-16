import React, { useState } from 'react';
import SideBar, { Section } from "../components/SideBar";
import { useUser } from "../components/UserContext";
import TrainingDashboard from "../components/trainingDashboard";
import AnimalDashboard from "../components/AnimalDashboard";

export default function MainDashboardPage() {
    const { user, setUser } = useUser(); 
    const [activeId, setActiveId] = useState<Section>("trainingLogs");

    return ( 
        <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
            
            <SideBar 
                user={user} 
                setUser={setUser} 
                activeId={activeId} 
                setActiveId={setActiveId} 
            />
            
            <div className="flex-1 h-screen overflow-y-auto bg-white">
                {activeId === "trainingLogs" && <TrainingDashboard />}
                
                {activeId === "animals" && (
                    <AnimalDashboard/>
                )}

                {user?.isAdmin && activeId === "allTraining" && (
                     <div className="p-10 text-2xl text-gray-400">All Training View Placeholder</div>
                )}
            </div>
        </div>
    );
}