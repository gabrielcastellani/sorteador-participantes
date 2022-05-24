import Image from "next/image";

function Card({ image, name, number }) {
    return (
        <div className="w-full h-20 p-3 rounded-md border flex items-center justify-between space-x-2 cursor-pointer hover:bg-gray-50">
            <div className="h-full w-20 rounded-md flex flex-col items-center justify-center">
                <Image src={"/vieux_guitariste_aveugle.jpg"} width={100} height={100} />
            </div>
            <div className="h-full w-full">
                <p className="font-semibold text-1xl text-gray-900">#{number}</p>
                <p className="font-semibold text-2xl text-gray-900">{name}</p>
            </div>
        </div>
    );
}

export default Card;