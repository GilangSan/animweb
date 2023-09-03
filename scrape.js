
const axios = require("axios")
const cheerio = require("cheerio")

let response = null
let html = null
let $ = null
let articles = null
let structuredData = null

async function home(){
  response = await axios.get("https://oploverz.red/")
  html = response.data;
  $ = cheerio.load(html);
  articles = $(".animposx")
  let hasil = []
  for (let articlee of articles) {
	structuredData = {
        url: $(articlee).find("a").attr("href"),
        title: $(articlee).find(".dataver2 .title").text(),
        eps: $(articlee).find(".data h2").text(),
        thumb: $(articlee).find("img").attr("src"),
    }
    hasil.push(structuredData)
  }
return hasil
}

async function search(query){
  response = await axios.get("https://oploverz.red/?s="+query)
  html = response.data;
  $ = cheerio.load(html);
  articles = $(".animepost");
  let hasil = []
  for (let article of articles) {
	structuredData = {
        url: $(article).find("a").attr("href"),
        title: $(article).find(".data .title").text(),
        type: $(article).find(".data .type").text(),
        rating: $(article).find(".content-thumb .score").text(),
        thumb: $(article).find(".content-thumb img").attr("src"),
    };
    hasil.push(structuredData)
}
  return hasil
}

async function info(link){
  response = await axios.get(link)
  html = response.data;
  $ = cheerio.load(html);
  articles = $(".infox");
  let hasil = null
  for (let article of articles) {
	structuredData = {
	      thumb: $(".thumb").find("img").attr("src"),
        url: $(".naveps").find(".nvs.nvsc a").attr("href"),
        title: $(article).find("h2").text(),
        sinopsis: $(article).find(".desc div").text(),
        genre: $(article).find(".genre-info a").text(),
        thumb: $(".thumb").find("img").attr("src"),
    };
    hasil = structuredData
}
  return hasil
}

async function infos(link){
  response = await axios.get(link)
  html = response.data;
  $ = cheerio.load(html);
  articles = $(".infox");
  let hasil = null
  for (let article of articles) {
	structuredData = {
	      thumb: $(".thumb").find("img").attr("src"),
        title: $(".infox").find(".title h1").text(),
        sinopsis: $(".infox").find(".desc p").text(),
        genre: $(".infox").find(".genre-info").text()
    };
    hasil = structuredData
}
  return hasil
}

async function eps(link){
  response = await axios.get(link)
  html = response.data;
  $ = cheerio.load(html);
  articles = $(".eps");
  let hasil = []
  for (let article of articles) {
	structuredData = {
        url: $(article).find("a").attr("href"),
        number: $(article).find("a").text()
    };
    hasil.push(structuredData)
}
  return hasil
}

async function down(link){
  response = await axios.get(link)
  html = response.data;
  $ = cheerio.load(html);
  articles = $("table");
  let hasil = null
  for (let articlee of articles) {
	structuredData = {
	      url: $(articlee).find("a").attr("href"),
	      quality: $(articlee).find(".quality").text()
    };
    hasil = structuredData
}
  return hasil
}

async function anj() {
let ya = await down("https://oploverz.red/mushoku-tensei-isekai-ittara-honki-dasu-s2-episode-8-subtitle-indonesia/")
console.log(ya)
}
anj()

module.exports =  { home, info, search, eps, down, infos }
