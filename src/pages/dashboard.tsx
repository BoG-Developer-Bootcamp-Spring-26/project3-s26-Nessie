import React, { useState } from 'react';
import SideBar, { Section } from "../components/SideBar";
import { useUser } from "../components/UserContext";
import TrainingDashboard from "../components/trainingDashboard";
import AnimalDashboard from "../components/AnimalDashboard";
import TitleBar from "../components/TitleBar";
import UserDashboard from "../components/UserDashboard";
import CreateTrainingLog from "../components/CreateTrainingLog";

export default function dashboard() {
    const { user, setUser } = useUser(); 
    const [activeId, setActiveId] = useState<Section>("trainingLogs");

    return ( 
        <div className="h-screen w-screen flex flex-col overflow-hidden">
            
            {/* TitleBar - fixed height, never grows */}
            <div className="shrink-0 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-10">
                <TitleBar />
            </div>

            {/* Everything below the titlebar */}
            <div className="flex flex-1 min-h-0 overflow-hidden">
                
                {/* Sidebar - stretches to fill remaining height exactly */}
                <div className="shrink-0 h-full">
                    <SideBar 
                        user={user} 
                        setUser={setUser} 
                        activeId={activeId} 
                        setActiveId={setActiveId} 
                    />
                </div>

                {/* Dashboard content - only this scrolls */}
                <div className="flex-1 h-full overflow-y-auto bg-white">
                    {activeId === "trainingLogs" && <TrainingDashboard activeId={activeId} setActiveId={setActiveId}/>}
                    {activeId === "animals" && <AnimalDashboard activeId={activeId}/>}
                    {user?.isAdmin && activeId === "allAnimals" && <AnimalDashboard activeId={activeId} />}
                    {user?.isAdmin && activeId === "allTraining" && <TrainingDashboard activeId={activeId} setActiveId={setActiveId}/>}
                    {user?.isAdmin && activeId === "allUsers" && <UserDashboard activeId={activeId}/>}
                    {user?.isAdmin && activeId === "createTraining" && <CreateTrainingLog/>}
                </div>

            </div>
        </div>
    );
}