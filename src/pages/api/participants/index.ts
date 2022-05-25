import { NextApiRequest, NextApiResponse } from "next";
import ParticipantsService from "../../../domain/services/ParticipantsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const participantsService = new ParticipantsService();
    const participants = await participantsService.getAll();

    return res.status(200).json(participants);
}