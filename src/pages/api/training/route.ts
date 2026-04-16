import type { NextApiRequest, NextApiResponse } from "next";
import { TrainingData } from "@/types/types";
import { getAnimal } from "../../server/mongodb/actions/animal";
import {createLog, updateLog} from "../../../../server/mongodb/actions/training";
import connectDb from "../../../../server/mongodb/connectDb";
import { isValid, isFuture} from "date-fns";

interface LogApiData{
    logData? : TrainingData;
    message : string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LogApiData>
) {
    if (req.method === 'POST') {
        try {
            if (!req.body.user || !req.body.animal || !req.body.title || !req.body.date || !req.body.description || !req.body.hours) {
                res.status(500).json({
                    message: "You must include all information to create a training log"
                });
            }
            const checkDate = (date: string | Date) => {
                if (!isValid(date)) return false;
                if (isFuture(date)) return false;
                return true;
            };

            if (!checkDate) {
                res.status(400).json({
                    message : "invalid date given"
                });
            }


            const animalId = req.body.animal;
            const user = req.body.user;
            await connectDb();
            const animalInfo = await getAnimal(animalId);
            const animalOwner = animalInfo?.owner;
            if (!animalOwner) {
                res.status(400).json({
                    message: "Failed to find animal given"
                });
            }
            if (animalOwner != user) {
                res.status(400).json({
                    message : "Animal owner and owner given are not the same"
                });
            }

            const logData = {
                user : req.body.user,
                animal : req.body.animal,
                title : req.body.title,
                date : req.body.date,
                description : req.body.description,
                hours : req.body.hours
            };

            const log = await createLog(logData)


            res.status(200).json({
                logData : logData,
                message: "Succesfully created log"
            });
        

        } catch (e) {
            res.status(500).json({
                message: "There was an issue in creating the training log"
            });
    
        }
    }
}
