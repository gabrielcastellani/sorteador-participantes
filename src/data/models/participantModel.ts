class ParticipantModel {
    guid: string;
    image: string;
    name: string;
    age: number;

    constructor(guid: string, name: string, age: number) {
        this.guid = guid;
        this.name = name;
        this.age = age;
    }

    static clone(participant: ParticipantModel) {
        return new ParticipantModel(
            participant.guid,
            participant.name,
            participant.age
        );
    }

    static empty() {
        return new ParticipantModel("", "", 0);
    }
}

export default ParticipantModel;