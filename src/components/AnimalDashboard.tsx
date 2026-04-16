import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { AnimalData } from "../types/types";
import AnimalCard from "../components/AnimalCard"; 

export default function AnimalDashboard() {
    const { user } = useUser(); 
    const [animalData, setAnimalData] = useState<AnimalData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchAnimals = async () => {
        if (!user) return;
        setLoading(true);
        try {
          const res = await fetch("/api/animal/verify/route", {
            method : "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({owner: user.id})
          });
          const data = await res.json();
          // Fixed fallback: must be an empty array, not an array with a string, 
          // otherwise animal.name in the card will throw an error.
          setAnimalData(data.animalsData || []);
        } catch (e) {
          console.error("Error in fetching requests: ", e);
        } finally {
          setLoading(false);
        }
      }
      fetchAnimals();
    }, [user]);
 
    return (
      <div className="flex flex-col px-[5vw] pt-[5vh] w-full min-h-screen bg-gray-50/50">        
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-6 pb-4 border-b border-gray-300">
          <h1 className="font-['Heebo'] font-medium text-2xl text-gray-600">
            Animals
          </h1>

          <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <img src="/images/createNewLogo.png" alt="Create" className="w-4 h-4 object-contain" />
            <span className="font-['Heebo'] font-medium text-sm text-gray-500">
              Create new
            </span>
          </button>
        </div>        

        {/* Animals Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="font-['Heebo'] text-gray-500">Loading animals...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pb-10">
            {animalData.length > 0 ? (
              animalData.map((animal, index) => (
                // Added a key prop for React rendering performance
                <AnimalCard animal={animal} />
              ))
            ) : (
              <p className="font-['Heebo'] text-gray-500 col-span-full text-center mt-10">
                No animals found. Click "Create new" to add one!
              </p>
            )}
          </div>
        )}
      </div>
    );
}