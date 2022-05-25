import { useAuth } from "../context/AuthContext";
import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import NextImage from "next/image";
import { LogoutIcon } from "@heroicons/react/solid";
import Card from "../components/Card";
import ParticipantModel from "../data/models/participantModel";
import ParticipantModal from "../components/modals/ParticipantModal";

function Gerenciamento() {
    const { logout } = useAuth();
    const [openParticipantModal, setOpenParticipantModal] = useState<boolean>(false);
    const [participant, setParticipant] = useState<ParticipantModel>(ParticipantModel.empty());
    const [participants, setParticipants] = useState<ParticipantModel[]>([]);

    useEffect(() => {
        fetch("/api/participants")
            .then((res) => res.json())
            .then((data) => setParticipants(data));
    }, []);

    async function signOut(event: any) {
        try {
            event.preventDefault();

            await logout();
        } catch (error) {
            throw error;
        }
    }

    function onNewParticipant(event: any) {
        event.preventDefault();
        setParticipant(ParticipantModel.empty());
        setOpenParticipantModal(true);
    }

    async function onSaveParticipant() {
        try {
            fetch("/api/participants/add", {
                method: "POST",
                body: JSON.stringify(participant)
            })
                .then((res) => res.json())
                .then((data) => {
                    fetch("/api/participants")
                        .then((res) => res.json())
                        .then((data) => setParticipants(data));
                });

            setOpenParticipantModal(false);
            setParticipant(ParticipantModel.empty());
        } catch (error) {
            throw error;
        }
    }

    return (
        <div className="h-screen w-screen flex flex-row bg-white overflow-hidden">
            <ParticipantModal
                openModal={openParticipantModal}
                setOpenModal={setOpenParticipantModal}
                participant={participant}
                setParticipant={setParticipant}
                onClickSave={onSaveParticipant}
            />

            <div className="h-full w-1/2">
                <div className="relative z-10 bg-white w-full h-full">
                    <Popover className="h-1/5">
                        <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                            <nav className="relative flex items-center justify-between sm:h-10" aria-label="Global">
                                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                                    <div className="flex items-center justify-between w-full md:w-auto">
                                        <div className="flex items-center space-x-3">
                                            <NextImage
                                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                                src={"/avatar-murilo.jpg"}
                                                width={50}
                                                height={50}
                                            />
                                            <span className="text-base text-gray-500">
                                                Bem vindo Murilo,
                                            </span>
                                        </div>
                                        <div className="-mr-2 flex items-center md:hidden">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">Open main menu</span>
                                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-1/5">
                                    <button type="button" onClick={signOut} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md border-red-500 text-red-400 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <LogoutIcon className="h-5 w-5 text-red-500 group-hover:text-white" aria-hidden="true" />
                                        </span>
                                        Sair
                                    </button>
                                </div>
                            </nav>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="duration-150 ease-out"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Popover.Panel
                                focus
                                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                            >
                                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="px-5 pt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <NextImage
                                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                                src={"/avatar-murilo.jpg"}
                                                width={50}
                                                height={50}
                                            />
                                            <span className="text-base text-gray-500">
                                                Bem vindo Murilo,
                                            </span>
                                        </div>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                <span className="sr-only">Close main menu</span>
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                    <div className="w-auto">
                                        <button type="button" onClick={signOut} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md border-red-500 text-red-400 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <LogoutIcon className="h-5 w-5 text-red-500 group-hover:text-white" aria-hidden="true" />
                                            </span>
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </Popover>

                    <main className="h-full  mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Gerenciador de</span>{' '}
                                <span className="block text-green-600 xl:inline">SORTEIOS</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Adicione novos participantes para o sorteio ou clique para sortear os participantes!
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <button type="button" onClick={onNewParticipant}
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                                        Adicionar participante
                                    </button>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <button type="button"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 md:py-4 md:text-lg md:px-10">
                                        Realizar sorteio entre os participantes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="h-full w-1/2 bg-green-700 flex items-center justify-center">
                <div className="h-4/5 w-4/5 bg-white rounded-md shadow-md hover:shadow-lg p-3">
                    <div className="w-full flex items-center justify-between space-x-2">
                        <div className="w-full">
                            <input
                                id="search"
                                name="search"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                                placeholder="Pesquisar..."
                                onChange={({ target }) => {

                                }}
                            />
                        </div>
                        <div>
                            <button type="button"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                Pesquisar
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full space-y-2 py-2">
                        {participants?.map(participant => {
                            return (
                                <Card key={participant.guid} image={""} name={participant.name} number={1} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gerenciamento;