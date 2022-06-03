import { BiBookReader } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home({}) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");
  const Router = useRouter();

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    Router.push({ pathname: "/search", query: { keyword: keyword } });
  };

  const handleSearchCategory = (e) => {
    console.log(e.target.name);
    e.preventDefault();
    Router.push({
      pathname: "/search",
      query: { type: "kategory", keyword: e.target.name },
    });
  };

  return (
    <>
      <main className="min-h-screen relative">
        <div className="container mx-auto flex items-center content-center place-content-center justify-center flex-col py-16 h-screen">
          <BiBookReader size={60} className="text-blue-semidark" />
          <h1 className="text-6xl font-bold mt-6">
            Koleksi Jurnal dan Skripsi
          </h1>
          <p className="text-base text-grey-3 mt-6 max-w-[760px] text-center">
            Temukan jurnal dan skripsi yang bisa digunakan sebagai referensi
            untuk tugas akhir, makalah, maupun karya tulis ilmiah lainnya dengan
            mudah sekarang
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
            <div className=" text-center text-xs mt-2">
              Search by kategori :
            </div>
          </form>
          <div className="flex flex-col justify-items-center text-sm">
            <div className="flex justify-center p-2 ">
              <a
                onClick={handleSearchCategory}
                role="button"
                name="metaverse"
                className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2"
              >
                Metaverse
              </a>
              <a onClick={handleSearchCategory} role="button" name="NFT"
              className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2">
                NFT
              </a>
              <a onClick={handleSearchCategory} role="button" name="ekosistem"
              className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2">
                Ekosistem
              </a>
              <a onClick={handleSearchCategory} role="button" name="Keuangan"
              className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2">
                Keuangan
              </a>
              <a onClick={handleSearchCategory} role="button" name="DeFi"
              className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2">
                DeFi
              </a>
            </div>
            <div className="flex justify-center">
            <a onClick={handleSearchCategory} role="button" name="Memecoin"
            className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2">
              Memecoin
            </a>
            <a onClick={handleSearchCategory} role="button" name="Cex"
            className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2">
              Cex
            </a>
            <a onClick={handleSearchCategory} role="button" name="Dex"
            className=" border-2 bg-blue-semidark text-white rounded-full py-0.5 px-2">
              Dex
            </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
