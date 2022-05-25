import { NextApiRequest, NextApiResponse } from "next";
import ParticipantModel from "../../../data/models/participantModel";
import ChangeType from "../../../domain/enums/ChangeType";
import ParticipantsService from "../../../domain/services/ParticipantsService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const participantsService = new ParticipantsService();
    const participant = ParticipantModel.clone(JSON.parse(req.body));
    const response = await participantsService.processRequest(ChangeType.Add, participant);

    return res.status(200).json(response);
}