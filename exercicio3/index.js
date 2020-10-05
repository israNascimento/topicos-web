const axios = require('axios').default;
const jsdom = require("jsdom");
const fs = require('fs');
const { JSDOM } = jsdom;

// Não funciona (ainda)
const link = "https://www.bet365.com/#/HO/";
const fileName = 'bet.god'

const fetchNews = async () => {
    const dom = await getDom();
    writeFile(dom)
}

const writeFile = (dom) => {
    fs.writeFile(`./${fileName}`, getStringToSave(dom), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("Bet salva com sucesso!");
    }); 
}

const getDom = async () => { 
    const { data } = await axios.get(link);
    console.log('>>> Data');
    return new JSDOM(data);
}

const getStringToSave = (dom) => {
    return `Número de eventos: ${getEvents(dom)}`
}

const getEvents = (dom) => {
    const query = 'body > div:nth-child(1)';
    return performQuerySelector(dom, query)
}

const performQuerySelector = (dom, query) => {
    return dom.window.document.querySelector(query).innerHTML
}

fetchNews()