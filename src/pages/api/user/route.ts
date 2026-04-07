import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "../../../types/types";
import { createUser, deleteUser, updateUser } from "../../../../server/mongodb/actions/user";
import connectDb from "../../../../server/mongodb/connectDb";
import * as argon2 from "argon2";
import { connect } from "http2";


interface UserApiData {
    userId? : string;
    fullName? : string;
    isAdmin? : boolean;
    message : string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<UserApiData>,
) {
    if (req.method === 'POST') {
        try {

            if (!req.body.fullName || !req.body.password || !req.body.email || typeof req.body.admin !== "boolean") {
                return res.status(500).json({
                    message: "New users must have a username,password, email, and whether they are an admin or not"
                });
            }
            const argon2 = require('argon2');
            const hash = await argon2.hash(req.body.password);
            const userData = {
                fullName : req.body.fullName,
                password : hash,
                email : req.body.email,
                admin : req.body.admin,
            } as UserData;

            await connectDb();
            const user = await createUser(userData);
            return res.status(200).json({
                userId: user._id.toString(),
                fullName: user.fullName,
                isAdmin: user.admin,
                message: "User creation succesful"
            });
        } catch (e) {
            return res.status(500).json({
                message: "There was an error in adding user to the database"
            });
        }
    }
}