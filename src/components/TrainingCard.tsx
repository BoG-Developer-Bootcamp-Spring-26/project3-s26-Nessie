import React from 'react';
import { TrainingData } from "../types/types"; // Adjust path

interface TrainingCardProps {
    log: TrainingData;
    userName?: string;
}

export default function TrainingCard({ log, userName } : TrainingCardProps) {
    // CRITICAL FIX: Using backticks for template literals
    const subtitle = `${userName || "Unknown"} - ${log.animal?.breed || "Breed"} - ${log.animal?.name || "Name"}`;

    return (
        <div className="relative flex w-full h-[162px] bg-white rounded-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.15)] overflow-hidden">
        
        {/* Date Section */}
        <div className="w-[139px] h-full bg-[#070A52]/85 flex items-center justify-center text-center p-4">
            <span className="font-['Oswald'] font-medium text-[32px] leading-tight text-white uppercase">
            {log.date instanceof Date ? log.date.toLocaleDateString() : new Date(log.date).toLocaleDateString()}
            </span>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-center px-[20px]">
            <div className="flex items-center gap-2">
            <h3 className="font-['Heebo'] font-bold text-[28px] text-[#260101] leading-none">
                {log.title}
            </h3>
            {/* Dot and Hours */}
            <div className="flex items-center gap-1 ml-4">
                <div className="w-[5px] h-[5px] bg-[#888888] rounded-full" />
                <span className="font-['Heebo'] font-medium text-[18px] text-[#999999]">
                {log.hours} hours
                </span>
            </div>
            </div>

            <p className="font-['Heebo'] font-medium text-[18px] text-[#999999] mt-1">
            {subtitle}
            </p>
            
            <p className="font-['Heebo'] font-normal text-[18px] text-black mt-3 line-clamp-1">
            {log.description}
            </p>
        </div>

        {/* Edit Button */}
        <div className="flex items-center pr-[40px]">
            <button className="w-[60px] h-[60px] bg-[#D21312] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
            <img src="/images/pen-icon.png" alt="Edit" className="w-[24px] h-[24px] invert brightness-200" />
            </button>
        </div>
        </div>
  );
}