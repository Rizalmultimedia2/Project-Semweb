import Image from "next/image";

function Modal({ handleClose, data }) {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onClick={handleClose}
      >
        <div className="relative w-[520px] my-6 mx-auto max-w-3xl">
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col px-8 py-6 gap-3">
              <p
                className={`tag font-semibold text-xs px-2 py-1 rounded-full  text-white w-fit bg-blue-semidark `}
              >
                {data.kategoris}
              </p>
              <p className="font-semibold text-lg">{data.judul_koleksi}</p>
              <div className="">
                <Image src={"/logo/" + data.kode_perdagangan + ".png"} width={100} height={100}></Image>
              </div>
              <div className="grid grid-cols-3 gap-y-2 my-4">
                <p className="text-base font-semibold opacity-80 col-span-1">
                  Nama{" "}
                </p>
                <p className="text-base font-medium opacity-80 col-span-2">
                  : {data.nama}{" "}
                </p>

                <p className="text-base font-semibold opacity-80 col-span-1">
                  Kode Perdagangan{" "}
                </p>
                <p className="text-base font-medium opacity-80 col-span-2">
                  : {"$" + data.kode_perdagangan}{" "}
                </p>

                <p className="text-base font-semibold opacity-80 col-span-1">
                  Jaringan{" "}
                </p>
                <p className="text-base font-medium opacity-80 col-span-2">
                  : {data.jaringan}{" "}
                </p>

                <p className="text-base font-semibold opacity-80 col-span-1">
                  Ekosistem{" "}
                </p>
                <p className="text-base font-medium opacity-80 col-span-2">
                  : {data.ekosistem}{" "}
                </p>

                <p className="text-base font-semibold opacity-80 col-span-1">
                  Tahun dibuat{" "}
                </p>
                <p className="text-base font-medium opacity-80 col-span-2">
                  : {data.tahun_dibuat}
                </p>

                <p className="text-base font-semibold opacity-80 col-span-1">
                  Tags{" "}
                </p>
                <p className="text-base font-medium opacity-80 col-span-2">
                  : {data.tags}
                </p>
              </div>
              <div className="button h-full flex justify-center">
                <a
                  href={data.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-3 rounded-full bg-blue-semidark text-white w-fit hover:bg-blue-dark transition-all duration-300"
                >
                  Kunjungi website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default Modal;
