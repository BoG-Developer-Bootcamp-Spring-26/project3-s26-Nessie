import React from 'react';
import { UserData } from "../types/types"; // Adjust path
import { useRouter } from 'next/navigation'; // Or next/router
import { UserType } from './UserContext';

export type Section = "trainingLogs" | "animals" | "allTraining" | "allAnimals" | "allUsers";

interface ButtonData {
  id: Section;
  label: string;
  iconName: string; 
}

interface SideBarProps { 
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  activeId: Section;
  setActiveId: (id: Section) => void;
}

export default function SideBar({ user, setUser, activeId, setActiveId }: SideBarProps) {
  const router = useRouter();
  
  const initial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : "?";

  const mainButtons: ButtonData[] = [
    { id: "trainingLogs", label: "Training logs", iconName: "TrainingLogo" },
    { id: "animals", label: "Animals", iconName: "AnimalsLogo" },
  ];

  const adminButtons: ButtonData[] = [
    { id: "allTraining", label: "All training", iconName: "AllTrainingLogo" },
    { id: "allAnimals", label: "All animals", iconName: "AllAnimalsLogo" },
    { id: "allUsers", label: "All users", iconName: "AllUsersLogo" },
  ];

  const handleLogout = () => {
    setUser(null);
    router.push('/'); // Route back to login
  };

  const getButtonStyle = (id: Section) => `
    w-[90%] mx-auto h-[6vh] px-[1.5vw] 
    flex items-center gap-[1vw] rounded-[15px] 
    transition-all duration-200 font-['Heebo'] 
    text-[1.3vw] whitespace-nowrap
    ${activeId === id ? "bg-[#D21312] text-white" : "text-[#565252] hover:bg-gray-200"}
  `;

  return (
    <nav className="w-[19.4vw] h-screen bg-white flex flex-col border-r border-[#C0BFBF] py-[2vh] overflow-hidden">
      
      {/* Main Section */}
      <div className="flex flex-col gap-[0.5vh]">
        {mainButtons.map((btn) => (
          <button key={btn.id} onClick={() => setActiveId(btn.id)} className={getButtonStyle(btn.id)}>
           <img 
              src={`/images/${activeId === btn.id ? 'active' : 'inactive'}${btn.iconName}.png`} 
              alt={btn.label}
              className="w-[1.6vw] h-[1.6vw] object-contain" 
            />  
            <span className={activeId === btn.id ? "font-medium" : "font-normal"}>{btn.label}</span>
          </button>
        ))}
      </div>

      <div className="w-[85%] mx-auto border-t-2 border-[#C0BFBF] my-[2vh]" />

      {/* Admin Section */}
      {user?.isAdmin && (
        <div className="flex flex-col flex-grow">
          <p className="font-['Heebo'] font-medium text-[1.1vw] text-[#565252] mb-[1.5vh] ml-[2.5vw] uppercase">
            Admin access
          </p>
          <div className="flex flex-col gap-[0.5vh]">
            {adminButtons.map((btn) => (
              <button key={btn.id} onClick={() => setActiveId(btn.id)} className={getButtonStyle(btn.id)}>
                <img 
                  src={`/images/${activeId === btn.id ? 'active' : 'inactive'}${btn.iconName}.png`} 
                  alt={btn.label}
                  className="w-[1.6vw] h-[1.6vw] object-contain" 
                />
                <span className={activeId === btn.id ? "font-medium" : "font-normal"}>{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Profile Section */}
      <div className="mt-auto">
        <div className="w-[85%] mx-auto border-t-2 border-[#C0BFBF] mb-[2vh]" />
        <div className="px-[1.5vw] flex items-center justify-between">
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[3vw] h-[3vw] bg-[#D21312] rounded-full flex items-center justify-center">
               <span className="text-white font-['Heebo'] font-bold text-[1.4vw] uppercase">
                 {initial}
               </span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Heebo'] font-bold text-[1.2vw] text-[#565252] leading-tight">
                {user?.fullName || "Guest"}
              </span>
              <span className="font-['Heebo'] font-normal text-[0.9vw] text-[#565252]">
                {user?.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="hover:opacity-60 transition-opacity">
            <img src="/images/logoutLogo.png" className="w-[1.4vw] h-[1.4vw]" alt="Logout" />
          </button>
        </div>
      </div>
    </nav>
  );
}