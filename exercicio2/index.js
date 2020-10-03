const axios = require('axios').default;
const jsdom = require("jsdom");
const fs = require('fs');
const { JSDOM } = jsdom;

const link = "https://g1.globo.com/sp/sao-paulo/noticia/2020/10/03/estado-de-sp-atinge-1-milhao-de-casos-confirmados-da-covid-19-media-diaria-de-mortes-mantem-tendencia-de-queda.ghtml";
const fileName = 'news.god'

const fetchNews = async () => {
    const dom = await getDom();
    writeFile(dom)
}

const writeFile = (dom) => {
    fs.writeFile(`./${fileName}`, getStringToSave(dom), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Matéria salva com sucesso!");
    }); 
}

const getDom = async () => { 
    const { data } = await axios.get(link)
    return new JSDOM(data);
}

const getStringToSave = (dom) => {
    return `Título da matéria: ${getNewsTitle(dom)}\nResumo da matéria: ${getNewsSubtitle(dom)}\nData de publicação: ${getNewsDate(dom)}`
}

const getNewsTitle = (dom) => {
    const query = 'body > div.glb-grid > main > div.row.content-head.non-featured > div.title > h1';
    return performQuerySelector(dom, query)
}

const getNewsSubtitle = (dom) => {
    const query = 'body > div.glb-grid > main > div.row.content-head.non-featured > div.medium-centered.subtitle > h2';
    return performQuerySelector(dom, query)
}

const getNewsDate = (dom) => {
    const query = 'body > div.glb-grid > main > div.content__signa-share > div.content__signature > div > div > p.content-publication-data__updated > time';
    return performQuerySelector(dom, query)
}

const performQuerySelector = (dom, query) => {
    return dom.window.document.querySelector(query).innerHTML
}

fetchNews()