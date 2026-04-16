import type { NextApiRequest, NextApiResponse } from "next";
import { UserData } from "../../../types/types";
import { getUserByEmail } from "../../../../server/mongodb/actions/user";
import connectDb from "../../../../server/mongodb/connectDb";
import * as argon2 from "argon2";

interface VerifyApiData {
    userId? : string;
    isAdmin? : boolean;
    fullName?: string;
    message : string;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<VerifyApiData>,
) {
    if (req.method !== 'POST') {
        return res.status(405).json(
        { message: "Method not allowed" });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(500).json({ message: "Email and password are required" });
        }
    
        await connectDb();
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(500).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(500).json({ message: "Invalid email or password" });
        }

        return res.status(200).json({
            userId: user._id.toString(),
            isAdmin: user.admin,
            fullName: user.fullName,
            message: "Login successful"
        });
    } catch (e) {
        return res.status(500).json({ message: "An error occurred during login" });
    }
}