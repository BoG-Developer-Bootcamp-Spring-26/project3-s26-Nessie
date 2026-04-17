import type { NextApiRequest, NextApiResponse } from "next";
import { getAllAnimals } from "../../../../../server/mongodb/actions/animal"; 
import connectDb from "../../../../../server/mongodb/connectDb";
import { AnimalData } from "@/types/types";

interface AnimalApiData {
    animals?: any[]; 
    message: string;
};

export default async function handler(
    req : NextApiRequest,
    res: NextApiResponse<AnimalApiData>
) {
    if (req.method === 'GET') {
        try{
            await connectDb();
            const animals = await getAllAnimals();

            if (!animals || animals.length === 0) {
                return res.status(500).json({
                    message: "There are no animals in the database"
                });
            }

            return res.status(200).json({
                animals: animals,
                message: "Succesfully got all animals"
            })

        } catch (e) {
            res.status(500).json({
                message: "There was an error in getting the animals"
            });
        }
    }

}