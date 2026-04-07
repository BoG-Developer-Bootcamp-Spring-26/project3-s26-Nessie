import React from "react";
import {useState, useEffect} from 'react';
import SideBar from "../components/SideBar";
import { UserProvider } from "../components/UserContext";
import {useUser} from "../components/UserContext";
import { TrainingData, AnimalData } from "@/types/types";


export default function TrainingDashboard() {

    const { user, setUser } = useUser(); 
    const [logs, setLogs] = useState<TrainingData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchLogs() {
          try {
            const res = await fetch('/api/training/route');
            if (!res.ok) {
              throw new Error('Failed to fetch logs');
            }
            const data = await res.json();
            setLogs(data);
          } catch (err) {
            console.error("Error fetching logs: ", err);
          } finally {
            setLoading(false);
          }
        }

        fetchLogs();
      });

    return (
    <div className="flex h-screen w-screen items-end bg-gray-50">
      
      <SideBar user = {user} setUser = {setUser}/>

      
      <main className="flex-1 h-full bg-white">

      </main>
      
    </div>
    )
}