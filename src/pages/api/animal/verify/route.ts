    import type { NextApiRequest, NextApiResponse } from "next";
    import { AnimalData } from "@/types/types";
    import { getUser } from "../../../../../server/mongodb/actions/user";
    import { createAnimal, deleteAnimal, updateAnimal, getAnimal, getOwnerAnimal} from "@/server/mongodb/actions/animal";
    import connectDb from "../../../../../server/mongodb/connectDb";
    import mongoose from "mongoose";

    interface AnimalApiData {
        animalData? : AnimalData;
        animalsData? : AnimalData[];
        message: string;
    }

    export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse<AnimalApiData>,
    ) {
        if (req.method === 'POST') {
            try {
                const owner = req.body.owner;
                await connectDb();
                const animals = await getOwnerAnimal(owner);
                if (animals.length == 0) {
                    return res.status(500).json({
                        message: "there are no animals"
                    })
                }

                res.status(200).json({
                    animalsData: animals as unknown as AnimalData[],
                    message: "Succesfully retrieve animals"
                });

            } catch (e) {
                res.status(500).json({
                    message: "There was an error in getting the animals"
                });
            }
        }

    }