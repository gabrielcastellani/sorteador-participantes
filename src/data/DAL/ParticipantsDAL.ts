import firebaseApp from "../../config/firebase";
import ParticipantModel from "../models/participantModel";
import IParticipantsDAL from "../interfaces/IParticipantsDAL";
import ParticipantConverter from "../converters/ParticipantConverter";
import {
    getFirestore,
    collection,
    deleteDoc,
    updateDoc,
    addDoc,
    doc,
    getDoc,
    getDocs
} from "firebase/firestore";

class ParticipantsDAL implements IParticipantsDAL {
    async save(data: ParticipantModel): Promise<ParticipantModel> {
        const documentReference = await addDoc(this.getCollection(), data);
        const document = await getDoc(documentReference);
        return document.data();
    }

    async update(data: ParticipantModel): Promise<ParticipantModel> {
        const participantData = doc(getFirestore(firebaseApp), "participants", data.guid);

        await updateDoc(participantData, {
            name: data.name,
            age: data.age,
        });

        return data;
    }

    async delete(data: ParticipantModel): Promise<void> {
        const participants = doc(getFirestore(firebaseApp), "participants", data.guid);
        return deleteDoc(participants);
    }

    async getAll(): Promise<ParticipantModel[]> {
        const participants = await getDocs(this.getCollection());
        return participants.docs.map(doc => doc.data());
    }

    private getCollection() {
        return collection(getFirestore(firebaseApp), "participants")
            .withConverter(ParticipantConverter);
    }
}

export default ParticipantsDAL;