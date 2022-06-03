const d3 = require("d3-sparql");

export async function getStaticProps(context) {
    var wikidataUrl = "http://localhost:3030/ds/query";

    var skyScrapersQuery = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX d:  <http://www.semanticweb.org/user/ontologies/2022/4/library#> 
    PREFIX person: <http://learningsparql.com/ns/person#> 

    SELECT ?judul_koleksi ?jenis ?tahun_terbit ?nama_penulis
    WHERE { ?perpus rdf:type ?Koleksi.
        ?perpus d:judul ?judul_koleksi.
        ?perpus d:jenis ?jenis.
        ?perpus d:tahun_terbit ?tahun_terbit.
        ?perpus d:ditulis ?Penulis.
        ?perpus d:koleksi_dari ?Jurusan.
        ?Penulis d:nama ?nama_penulis.
        ?Jurusan d:nama "Teknik Informatika"}
    
    `;

    const data = await d3.sparql(wikidataUrl, skyScrapersQuery);
    console.log(data);
    return {
        props: { data },
    };
}

function Test({ data }) {
    return (
        <div>
            {data.map((d) => (
                <div>{d.judul_koleksi}</div>
            ))}
        </div>
    );
}

export default Test;
