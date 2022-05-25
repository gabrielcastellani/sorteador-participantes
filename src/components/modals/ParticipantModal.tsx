import BaseModal from "./BaseModal";
import ModalHeader from "../ModalHeader";
import ParticipantModel from "../../data/models/participantModel";

function ParticipantModal({
    openModal, setOpenModal, participant, setParticipant, onClickSave
}) {
    function onSave() {
        setOpenModal(false);
        onClickSave();
    }

    return (
        <BaseModal open={openModal} setOpen={setOpenModal} onClickSave={onSave}>
            <>
                <ModalHeader
                    model={participant}
                    textWhentAdd="Novo participante"
                    textWhentUpdate="Alterar participante"
                />
                <div className="mt-3 sm:mt-0">
                    <div className="grid grid-cols-6 gap-3">
                        <div className="col-span-4">
                            <label htmlFor="participant-name" className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            <input
                                id="participant-name"
                                name="participant-name"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={participant?.name || ""}
                                onChange={({ target }) => {
                                    const changedParticipant = ParticipantModel.clone(participant);
                                    changedParticipant.name = target.value;
                                    setParticipant(changedParticipant);
                                }}
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            />
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="participant-age" className="block text-sm font-medium text-gray-700">
                                Idade
                            </label>
                            <input
                                id="participant-age"
                                name="participant-age"
                                type="text"
                                autoComplete="given-name"
                                required
                                value={participant?.age || ""}
                                onChange={({ target }) => {
                                    const changedParticipant = ParticipantModel.clone(participant);
                                    changedParticipant.age = Number(target.value);
                                    setParticipant(changedParticipant);
                                }}
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                            />
                        </div>
                    </div>
                </div>
            </>
        </BaseModal>
    );
}

export default ParticipantModal;