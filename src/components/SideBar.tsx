import React, { useState } from 'react';
import {UserType} from "../components/UserContext"
import { useRouter } from 'next/navigation'; // Or 'react-router-dom' depending on your setup

type Section = "trainingLogs" | "animals" | "allTraining" | "allAnimals" | "allUsers";

interface ButtonData {
  id: Section;
  label: string;
  iconName: string; 
}


interface SideBarProps { 
  user : UserType
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

export default function SideBar({user, setUser} : SideBarProps) {
  const [activeId, setActiveId] = useState<Section>("trainingLogs");
  const router = useRouter();
  const mainButtons: ButtonData[] = [
    { id: "trainingLogs", label: "Training logs", iconName: "TrainingLogo" },
    { id: "animals", label: "Animals", iconName: "AnimalsLogo" },
  ];

  const adminButtons: ButtonData[] = [
    { id: "allTraining", label: "All training", iconName: "AllTrainingLogo" },
    { id: "allAnimals", label: "All animals", iconName: "AllAnimalsLogo" },
    { id: "allUsers", label: "All users", iconName: "AllUsersLogo" },
  ];

  const getButtonStyle = (id: Section) => `
    w-[90%] mx-auto h-[6vh] px-[1.5vw] 
    flex items-center gap-[1vw] rounded-[15px] 
    transition-all duration-200 font-['Heebo'] 
    text-[1.3vw] whitespace-nowrap
    ${activeId === id ? "bg-[#D21312] text-white" : "text-[#565252] hover:bg-gray-200"}
  `;

  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };  

  return (
    <nav className="w-[19.4vw] h-[86.6vh] bg-white flex flex-col border-r border-[#C0BFBF] py-[2vh] overflow-hidden">
      
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

      {/* Profile Section */}
      <div className="mt-auto">
        <div className="w-[85%] mx-auto border-t-2 border-[#C0BFBF] mb-[2vh]" />
        <div className="px-[1.5vw] flex items-center justify-between">
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[3vw] h-[3vw] bg-[#D21312] rounded-full flex items-center justify-center overflow-hidden">
               <img src="/images/user-avatar.png" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Heebo'] font-bold text-[1.2vw] text-[#565252] leading-tight">{user?.fullName}</span>
              <span className="font-['Heebo'] font-normal text-[0.9vw] text-[#565252]">{user?.isAdmin}</span>
            </div>
          </div>
          <button onClick = {handleLogout} className="hover:opacity-60 transition-opacity">
            <img src="/images/logoutLogo.png" className="w-[1.4vw] h-[1.4vw]" alt="Logout" />
          </button>
        </div>
      </div>
    </nav>
  );
}