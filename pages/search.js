import { useState, useEffect } from "react";
const d3 = require("d3-sparql");
import { useRouter } from "next/router";
import Card from "../Components/Card";
import Modal from "../Components/Modal";
import Image from "next/image";
import { BiSearchAlt, BiXCircle, BiBookContent } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import LoadingState from "../Components/LoadingState";

function Search({ keyword, data }) {
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState(keyword);
    const [detailData, setDetailData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState("all");

    const Router = useRouter();

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };
    const handleSelectChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSearch = (e) => {
        setIsLoading(true);
        e.preventDefault();
        Router.push({ pathname: "/search", query: { type: category, keyword: searchKeyword } });
        setIsLoading(false);
    };

    const handleClick = (data) => {
        setDetailData(data);
        setShowModal(true);
    };

    return (
        <section className="relative">
            <header className="sticky z-10 overflow-hidden top-0 py-10 bg-grey-0">
                <div className="container mx-auto flex items-center justify-center flex-col">
                    <h1 className="text-3xl font-bold">Koleksi Data Cyptocurrency</h1>
                    <form className="flex gap-4 w-full mt-6" onSubmit={handleSearch}>
                        <div className="flex-[1]">
                            <p className="text-base">Cari berdasarkan</p>
                            <div className="input overflow-hidden rounded-lg cursor-pointer p-0">
                                <select
                                    className="w-full h-full outline-none border-0 cursor-pointer input"
                                    onChange={handleSelectChange}
                                >
                                    <option value="all">Semua</option>
                                    <option value="kategori">Kategori</option>
                                    <option value="jaringan">Jaringan</option>
                                    <option value="ekosistem">Ekosistem</option>
                                    <option value="kode">Kode Perdagangan</option>
                                    <option value="tag">Tags</option>
                                    <option value="tahun">Tahun dibuat</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex-[3] relative">
                            <input
                                type="text"
                                name="search"
                                id="search"
                                className="input mt-6 rounded-lg w-full"
                                value={searchKeyword}
                                placeholder="Masukkan kata kunci"
                                onChange={handleSearchChange}
                            />
                            <div
                                className="absolute bottom-[16px] right-4 cursor-pointer"
                                onClick={handleSearch}
                            >
                                <AiOutlineSearch size={20} />
                            </div>
                        </div>
                    </form>
                </div>
            </header>
            <main className="container mx-auto py-6 min-h-[61vh] flex flex-col items-center">
                {isLoading && <LoadingState />}
                {data.length > 0 ? (
                    keyword == "" ? (
                        <div className="flex gap-2 items-center">
                            <BiBookContent size={24} className="text-blue-semidark" />
                            <h2 className="font-normal text-lg text-blue-semidark text-center">
                                Menampilkan semua koleksi data Crypto
                            </h2>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <BiSearchAlt size={24} className="text-blue-semidark" />
                            <h2 className="font-normal text-lg text-blue-semidark text-center">
                                Menampilkan hasil pencarian untuk {category} &quot;
                                <span className="font-semibold">{Router.query.keyword}</span>&quot;
                            </h2>
                        </div>
                    )
                ) : (
                    <div className="flex gap-2 items-center">
                        <BiXCircle size={24} className="text-blue-semidark" />

                        <h2 className="font-normal text-lg text-blue-semidark text-center">
                            Tidak dapat menemukan koleksi jurnal/skripsi untuk &quot;
                            <span className="font-semibold">{Router.query.keyword}</span>&quot;
                        </h2>
                    </div>
                )}

                <section className="card-container grid grid-cols-4 gap-x-3 gap-y-5 mt-6">
                    {data.map((crypto, index) => (
                        <Card
                            key={`crypto-${index}`}
                            onClick={() => handleClick(crypto)}
                            logo={"/logo/" + crypto.kode_perdagangan + ".png"}
                            kategori={crypto.kategoris}
                            tag={crypto.tags}
                            title={crypto.nama + "\t($" + crypto.kode_perdagangan + ")"}
                        ></Card>
                    ))}
                </section>

            </main>
            <footer className="w-full py-5 flex justify-center bg-blue-semidark">
                <p className=" text-xs py-1 px-4 rounded-full text-white font-semibold tracking-widest">
                
                </p>
            </footer>

            {showModal && <Modal data={detailData} handleClose={() => setShowModal(false)} />}
        </section>
    );
}

const getQuery = (word) => {
    let query;
    switch (word) {
        case "all":
            query = "o";
            break;
        case "kategori":
            query = "kategori";
            break;
        case "jaringan":
            query = "jaringan";
            break;
        case "ekosistem":
            query = "ekosistem";
            break;
        case "kode":
            query = "kode_perdagangan";
            break;
        case "tag":
            query = "tag";
            break;
        case "tahun":
            query = "tahun_dibuat";
                break;
        default:
            query = "o";
            break;
    }
    return query;
};

export async function getServerSideProps({ query }) {
    const keyword = query.keyword ? query.keyword : "";
    const type = query.type ? getQuery(query.type) : "o";

    console.log("http://localhost:3030/data/query")

    const rdfUrl = "http://localhost:3030/data/query";

    const queryRdf = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX d:  <http://learningsparql.com/ns/data#> 
        PREFIX c: <http://www.semanticweb.org/rizalherliansyahh/ontologies/2022/5/untitled-ontology-31#>
    
        SELECT DISTINCT ?nama ?alamat ?ekosistem ?jaringan ?kode_perdagangan ?tahun_dibuat ?website (GROUP_CONCAT(DISTINCT ?kategori; separator=", ") AS ?kategoris) (GROUP_CONCAT(DISTINCT ?tag; separator=", ") AS ?tags)
        WHERE { ?crypto rdf:type ?Kripto.
            ${keyword == "" ? "" : type == "o" ? "?crypto ?p ?o." : ""}
            ?crypto c:nama ?nama.
            ?crypto c:alamat ?alamat.
            ?crypto c:ekosistem ?ekosistem.
            ?crypto c:jaringan ?jaringan.
            ?crypto c:kategori ?kategori.
            ?crypto c:kode_perdagangan ?kode_perdagangan.
            ?crypto c:tags ?tag.
            ?crypto c:website ?website.
            ?crypto c:tahun_dibuat ?tahun_dibuat.
            ${keyword == "" ? "" : `FILTER (regex(str(?${type}), "${keyword}", "i"))`}}
        GROUP BY ?nama ?alamat ?ekosistem ?jaringan ?kategoris ?kode_perdagangan ?tags ?website ?tahun_dibuat 
        ${keyword == "" ? "" : type == "o" ? "?o" : ""}
`;

    const data = await d3.sparql(rdfUrl, queryRdf);

    return {
        props: {
            keyword,
            data,
        },
    };
}

export default Search;
