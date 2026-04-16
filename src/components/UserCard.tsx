import React from "react";
import { UserData } from "@/types/types";

interface UserCardProps {
    user: UserData;
}

export default function UserCard({ user }: UserCardProps) {
    return (
        <div className="flex items-center gap-4 bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-[16px] px-5 py-4 w-full">
            {/* Avatar Circle */}
            <div className="w-[46px] h-[46px] shrink-0 bg-[#D21312] rounded-full flex items-center justify-center text-white font-bold text-[20px]">
                {user.fullName.toUpperCase().charAt(0)}
            </div>

            {/* Text */}
            <div className="flex flex-col">
                <span className="font-[Heebo] font-bold text-[18px] text-[#260101] leading-tight">
                    {user.fullName}
                </span>
                <span className="font-[Heebo] text-[14px] text-[#999999]">
                    {user.admin ? "Admin" : "User"} • Atlanta, Georgia
                </span>
            </div>
        </div>
    );
}