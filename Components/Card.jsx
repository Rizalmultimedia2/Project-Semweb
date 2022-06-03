import { CgProfile } from "react-icons/cg";
import Image from "next/image";

function Card({ title, tag, author, onClick }) {
    return (
        <div
            className="border-[1px] border-grey-1 rounded-xl px-6 py-5 flex flex-col gap-2 cursor-pointer hover:shadow-card transition-all duration-300"
            onClick={onClick}
        >
            <p
                className={`tag font-medium text-xs px-2 py-1 rounded-full  text-white w-fit ${
                    tag == "Skripsi" ? "bg-blue-cyan" : "bg-green"
                }`}
            >
                {tag}
            </p>
            <p className="font-semibold text-base leading-[20px] text-elipsis-2">{title}</p>
            <div className="flex gap-2">
                <CgProfile size={20} className="text-blue-dark flex-shrink-0" />
                <p className="author text-sm font-light text-grey-3 text-elipsis-1">{author}</p>
            </div>
        </div>
    );
}

export default Card;
