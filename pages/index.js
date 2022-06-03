import { BiBookReader } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home({}) {
    const [keyword, setKeyword] = useState("");
    const Router = useRouter();

    const handleSearchChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        Router.push({ pathname: "/search", query: { keyword: keyword } });
    };

    return (
        <>
            <main className="min-h-screen relative">
                <div className="container mx-auto flex items-center justify-center flex-col py-16">
                    <BiBookReader size={60} className="text-blue-semidark" />
                    <h1 className="text-6xl font-bold mt-6">Koleksi Jurnal dan Skripsi</h1>
                    <p className="text-base text-grey-3 mt-6 max-w-[760px] text-center">
                        Temukan jurnal dan skripsi yang bisa digunakan sebagai referensi untuk tugas
                        akhir, makalah, maupun karya tulis ilmiah lainnya dengan mudah sekarang
                    </p>
                    <form onSubmit={handleSearch}>
                        <div className="flex-[3] relative">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="input mt-6 rounded-full w-[460px]"
                                value={keyword}
                                onChange={handleSearchChange}
                                placeholder="Masukkan kata kunci"
                            />
                            <div className="absolute bottom-[16px] right-4">
                                <AiOutlineSearch size={20} />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="absolute bottom-0 z-[2] flex items-center justify-center w-screen">
                    <Image alt="Journal example" src="/pic.png" width={578} height={288}></Image>
                </div>
                <div className="bg absolute bottom-0 w-screen bg-blue-light h-[120px] z-[1]"></div>
                <div className="bg absolute bottom-6 w-screen z-[3] flex justify-center">
                    <p className="bg-grey-0 text-xs py-2 px-4 rounded-full text-grey-3 font-semibold tracking-widest">
                        © 2022 RIAN FEBRIANSYAH
                    </p>
                </div>
            </main>
        </>
    );
}
