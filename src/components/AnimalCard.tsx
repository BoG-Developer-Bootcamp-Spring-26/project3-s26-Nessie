import React from 'react';
import { AnimalData } from "../types/types";
import { useUser } from "../components/UserContext"; // 1. Import the hook

interface AnimalProps {
    animal : AnimalData;
}

export default function AnimalCard({animal} : AnimalProps) {
    // 2. Grab the user state
    const { user } = useUser(); 
    
    const imageUrl = "/images/dogImage.png";
    
    // 3. Use user.fullName (with a safe fallback just in case it hasn't loaded yet)
    const ownerName = user?.fullName || "Unknown Owner";
    const initial = ownerName.charAt(0).toUpperCase();

    return (
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden font-['Heebo'] flex flex-col">
      {/* Image Section Adjusted */}
      <div 
        className="w-full h-[240px] bg-no-repeat"
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',        // Keeps the container filled
          backgroundPosition: 'top center' // Shifts the "camera" up to show the head
        }}
      />

      {/* Content Section */}
      <div className="flex px-5 py-5 gap-4 items-center">
        {/* Circle Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-[#D21312] rounded-full flex items-center justify-center">
           <span className="text-white text-xl font-bold">{initial}</span>
        </div>

        {/* Text Details */}
        <div className="flex flex-col">
          <h3 className="text-[20px] font-bold text-black tracking-tight whitespace-nowrap">
            {animal.name} - {animal.breed}
          </h3>
          
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[14px] text-gray-400">
              {ownerName}
            </span>
            
            <span className="text-[14px] text-gray-400">•</span>
            
            <span className="text-[14px] text-gray-400">
              Trained: {animal.hoursTrained} hours
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}