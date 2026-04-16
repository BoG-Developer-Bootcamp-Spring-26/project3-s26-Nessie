import React, { useState } from 'react';
import SideBar, { Section } from "../components/SideBar";
import { useUser } from "../components/UserContext";
import TrainingDashboard from "../components/trainingDashboard";
import AnimalDashboard from "../components/AnimalDashboard";
import TitleBar from "../components/TitleBar";

export default function MainDashboardPage() {
    const { user, setUser } = useUser(); 
    const [activeId, setActiveId] = useState<Section>("trainingLogs");

    return ( 
        <>
        <div className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] relative z-10">
                <TitleBar />
        </div>
        <div className="flex h-screen w-screen bg-gray-50 overflow-hidden">
            
            <SideBar 
                user={user} 
                setUser={setUser} 
                activeId={activeId} 
                setActiveId={setActiveId} 
            />
            
            <div className="flex-1 h-screen overflow-y-auto bg-white">
                {/* Regular Training Logs */}
                {activeId === "trainingLogs" && <TrainingDashboard activeId={activeId}/>}
                
                {/* Regular User Animals */}
                {activeId === "animals" && (
                    <AnimalDashboard activeId={activeId}/>
                )}

                {/* Admin: All Animals View */}
                {user?.isAdmin && activeId === "allAnimals" && (
                    <AnimalDashboard activeId={activeId} />
                )}

                {/* Admin: All Training View Placeholder */}
                {user?.isAdmin && activeId === "allTraining" && (
                    <TrainingDashboard activeId = {activeId}/>
                )}
            </div>
        </div>
        </>
    );
}