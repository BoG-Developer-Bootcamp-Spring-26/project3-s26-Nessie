import { AnimalData } from "@/types/types";
import animal from "../models/Animal";
import mongoose from "mongoose";

export async function createAnimal(animalData: AnimalData) {
    const newAnimal = new animal(animalData);
    await newAnimal.save();
    return newAnimal;
}

export async function getAnimal(animalId: string) {
    const retrievedAnimal = await animal.findById(animalId);
    return retrievedAnimal;
}

export async function getOwnerAnimal(ownerId: string) {
    const retrievedAnimal = await animal.find({"owner": new mongoose.Types.ObjectId(ownerId)}); 
    return retrievedAnimal;
}

export async function getAllAnimals() {
    const allAnimals = await animal.find({});
    return allAnimals;
}

export async function updateAnimal(animalId: string, newData: AnimalData) {
    const updatedAnimal = await animal.findByIdAndUpdate(animalId, newData);
    return updatedAnimal;
}

export async function deleteAnimal(animalId: string) {
    await animal.findByIdAndDelete(animalId);
}