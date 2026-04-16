import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { TrainingData, UserData } from "../types/types"; // Adjust path
import { Section } from "../components/SideBar"; 
import UserCard from "./UserCard";


interface UserDashboadProps {
  activeId: Section;
}


export default function TrainingDashboard({activeId} : UserDashboadProps) {
    const { user } = useUser();
    const [userInfo, setUserInfo] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const res = await fetch("/api/admin/users/route");
                const data = await res.json();
                setUserInfo(data.users || []);
            }catch (e) {
                console.error("Error in fetching requests: ", e);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, [user, activeId]);

    return (
        <div className="flex flex-col px-[2.5vw] pt-[4vh] w-full min-h-full">
            <div className="flex justify-between items-center mb-[10px]">
                <h1 className="font-['Heebo'] font-medium text-[1.8vw] text-[#7C7171]">
                    All Users
                </h1>
            </div>

            <div className="w-full border-t-[1.5px] border-[#615E5E]/40 mb-[30px]" />

            {loading ? (
                <p className="text-gray-500">Loading logs...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pb-10">
                    {userInfo?.map((user, index) => (
                        <UserCard key={index} user={user} />
                    ))}
                </div>
            )}
        </div>
    );
}