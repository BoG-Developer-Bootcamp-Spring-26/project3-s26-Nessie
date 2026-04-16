import type { NextApiRequest, NextApiResponse } from "next";
import { getAllLogs, getAnimalLogs } from "../../../../../server/mongodb/actions/training"; 
import connectDb from "../../../../../server/mongodb/connectDb";
import { TrainingData } from "@/types/types";

interface TrainingApiData{
    logs?: TrainingData[];
    message: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TrainingApiData>
) {
    if (req.method === 'GET') {
        try {
            await connectDb();
            const logs = await getAllLogs();
            if (!logs || logs.length === 0) {
                res.status(500).json({
                    message: "There are no logs to return"
                });
            }

            res.status(200).json({
                logs: logs as unknown as TrainingData[],
                message: "Succesfully retrieved all logs"
            });
            
        } catch (e) {
            res.status(500).json({
                message: "There was an error in getting the training logs"
            });
        }
    } else if (req.method === 'POST') {
        try{
            const owner = req.body.user;
            await connectDb();
            const logs = await getAnimalLogs(owner);
            if (logs.length == 0) {
                return res.status(400).json({
                    message: "there are no logs"
                })
            }

            res.status(200).json({
                logs: logs as unknown as TrainingData[],
                message: "Succesfully retrieve logs"
            });


        } catch (e) {
            res.status(500).json({
                message: "There was an error in getting the logs"
            });
        }
    }
}

