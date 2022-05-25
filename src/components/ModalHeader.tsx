import { Dialog } from '@headlessui/react';
import { PlusCircleIcon, PencilAltIcon } from '@heroicons/react/outline';

export default function ModalHeader({ model, textWhentAdd, textWhentUpdate }) {
    return (
        <div className="flex flex-row items-center space-x-6">
            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${!model.guid ? "bg-green-100" : "bg-yellow-100"} sm:mx-0 sm:h-10 sm:w-10`}>
                {!model.guid
                    ? (<PlusCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />)
                    : (<PencilAltIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />)}
            </div>
            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                {!model.guid ? textWhentAdd : textWhentUpdate}
            </Dialog.Title>
        </div>
    );
}