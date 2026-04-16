import React from 'react';
import { TrainingData } from "../types/types"; // Adjust path

interface TrainingCardProps {
    log: TrainingData;
    userName?: string;
}

export default function TrainingCard({ log, userName }: TrainingCardProps) {
    const animalBreed = typeof log.animal === "object" ? log.animal?.breed : null;
    const animalName = typeof log.animal === "object" ? log.animal?.name : null;
    const subtitle = `${userName || "Unknown"}${animalBreed ? ` - ${animalBreed}` : ""}${animalName ? ` - ${animalName}` : ""}`;

    const dateObj = log.date instanceof Date ? log.date : new Date(log.date);
    const day = dateObj.getDate();
    const monthYear = dateObj.toLocaleDateString("en-US", { month: "short", year: "numeric" }).replace(" ", " - ");

    return (
        <div className="relative flex w-full h-[162px] bg-white rounded-[20px] shadow-[0px_4px_10px_rgba(0,0,0,0.15)] overflow-hidden">

            {/* Date Section */}
            <div className="w-[139px] h-full bg-[#1a1f6e] flex flex-col items-center justify-center text-center p-4 gap-0">
                <span className="font-['Oswald'] font-bold text-[48px] leading-none text-white">
                    {day}
                </span>
                <span className="font-['Oswald'] font-medium text-[16px] leading-snug text-white uppercase mt-1">
                    {monthYear}
                </span>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-center px-[28px]">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-['Heebo'] font-bold text-[24px] text-[#1a1a1a] leading-none">
                        {log.title}
                    </h3>
                    <div className="flex items-center gap-1 ml-2">
                        <span className="font-['Heebo'] font-normal text-[16px] text-[#999999]">
                            · {log.hours} hours
                        </span>
                    </div>
                </div>

                <p className="font-['Heebo'] font-normal text-[15px] text-[#999999] mt-[6px]">
                    {subtitle}
                </p>

                <p className="font-['Heebo'] font-normal text-[15px] text-black mt-[8px] line-clamp-1">
                    {log.description}
                </p>
            </div>
        </div>
    );
}