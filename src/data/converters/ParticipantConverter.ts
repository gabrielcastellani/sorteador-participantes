import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import ParticipantModel from "../models/participantModel";

const converter = {
    toFirestore(participant: ParticipantModel) {
        return {
            name: participant.name,
            age: participant.age
        };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
        const data = snapshot?.data(options);
        return new ParticipantModel(snapshot?.id, data.name, data.age);
    },
};

export default converter;