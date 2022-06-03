import Image from "next/image";

function Card({ title, kategori, tag, onClick, logo}) {
    return (
        <div
            className="border-[1px] border-grey-1 rounded-xl px-6 py-5 flex flex-col gap-2 cursor-pointer hover:shadow-card transition-all duration-300 items-center"
            onClick={onClick}
        >
            <p
                className={`tag font-medium text-xs px-3 py-1 rounded-full  text-white w-fit bg-blue-semidark my-1
                `}
            >
                {kategori}
            </p>
            <p className="font-semibold text-base leading-[20px] text-elipsis-2 mb-1">{title}</p>
            <div className="flex gap-2 flex-col items-center">
                <div className="">
                <Image
                    src={logo}
                    width={80}
                    height={80}
                ></Image>
                </div>
                <p className=" text-xs ">Tags :</p>
                <p className="tag text-xs border-2 py-0.5 rounded-md px-2 font-normal text-black text-elipsis-1 border-blue-semidark">{tag}</p>
            </div>
        </div>
    );
}

export default Card;
