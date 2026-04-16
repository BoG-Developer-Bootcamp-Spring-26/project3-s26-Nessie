import React, { useState, useEffect } from "react";
import { useUser } from "../components/UserContext";
import { AnimalData } from "../types/types";
import AnimalCard from "../components/AnimalCard";
import { Section } from "../components/SideBar";
import CreateAnimal from "../components/CreateAnimal";

interface AnimalDashboardProps {
  activeId: Section;
}

export default function AnimalDashboard({ activeId }: AnimalDashboardProps) {
  const { user } = useUser();
  const [animalData, setAnimalData] = useState<AnimalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchAnimals = async () => {
    if (!user) return;
    setLoading(true);
    try {
      let data;
      if (activeId === "allAnimals") {
        const res = await fetch("/api/admin/animals/route");
        data = await res.json();
        setAnimalData(data.animals || []);
      } else {
        const res = await fetch("/api/animal/verify/route", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ owner: user.id }),
        });
        data = await res.json();
        setAnimalData(data.animalsData || []);
      }
    } catch (e) {
      console.error("Error in fetching requests: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimals();
  }, [user, activeId]);

  return (
    <div className="flex flex-col px-[5vw] pt-[5vh] w-full min-h-screen bg-gray-50/50">
      <div className="flex justify-between items-center mb-[10px]">
        <h1 className="font-['Heebo'] font-medium text-[1.8vw] text-[#7C7171]">
          Animals
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-[0.5vw] hover:opacity-70 transition-opacity pb-[0.5vh]"
        >
          <img
            src="/images/createNewLogo.png"
            alt="Create"
            className="w-[1.4vw] h-[1.4vw] object-contain"
          />
          <span className="font-['Heebo'] font-medium text-[1.2vw] text-[#7C7171]">
            Create new
          </span>
        </button>
      </div>

      <div className="w-full border-t-[1.5px] border-[#615E5E]/40 mb-[30px]" />

      {/* Animals Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="font-['Heebo'] text-gray-500">Loading animals...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pb-10">
          {animalData.length > 0 ? (
            animalData.map((animal, index) => <AnimalCard animal={animal} />)
          ) : (
            <p className="font-['Heebo'] text-gray-500 col-span-full text-center mt-10">
              No animals found. Click "Create new" to add one!
            </p>
          )}
        </div>
      )}

      {user && (
        <CreateAnimal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          userId={user.id}
          onAnimalCreated={fetchAnimals}
        />
      )}
    </div>
  );
}
