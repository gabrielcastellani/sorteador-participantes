import ChangeType from "../enums/ChangeType";
import ParticipantsDAL from "../../data/DAL/ParticipantsDAL";
import ParticipantModel from "../../data/models/participantModel";
import IParticipantsService from "../interfaces/IParticipantsService";
import ResponseModel from "../models/ResponseModel";

class ParticipantsService implements IParticipantsService {
    _participantsDAL: ParticipantsDAL;

    constructor() {
        this._participantsDAL = new ParticipantsDAL();
    }

    async processRequest(changeType: ChangeType, data: ParticipantModel): Promise<ResponseModel<ParticipantModel>> {
        try {
            switch (changeType) {
                case ChangeType.Add:
                    await this._participantsDAL.save(data);
                    break;
                case ChangeType.Update:
                    await this._participantsDAL.update(data);
                    break;
                case ChangeType.Delete:
                    await this._participantsDAL.delete(data);
                    break;
            }

            return new ResponseModel<ParticipantModel>(changeType, data);
        } catch (error) {
            throw new Error("Error processing request!");
        }
    }

    async getAll(): Promise<ParticipantModel[]> {
        try {
            return await this._participantsDAL.getAll();
        } catch (error) {
            throw new Error("Failled fetching data", error);
        }
    }
}

export default ParticipantsService;