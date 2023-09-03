var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
const { infos, home, search, info, eps, down } = require("./scrape")

app.engine('.html', require('ejs').__express)
app.set('view engine', 'ejs');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.get('/', async function(req, res){
    let beranda = await home()
    res.render('form', {
    pesan: beranda
  });
});
console.log(beranda)

app.post('/search', async function (req,res){
  console.log(req.body)
  let anoh = await search(req.body.search)
  console.log(anoh)
  res.render('search', {
    search: anoh,
    query: req.body.search
  })
}
)

app.post('/animes', async function (req,res){
  console.log(req.body)
  let rek = "https://oploverz.red/anime/"+req.body.anime
  let ana = await infos(rek)
  let anu = await eps(rek)
  console.log(anu)
  console.log(ana)
  ana.genre = ana.genre.replace(/([A-Z])/g, ' $1')
  res.render("animes", {
    hasil: ana,
    hesil: anu
  })
})

app.post('/stream', async function (req,res){
  console.log(req.body)
  let rek = "https://oploverz.red/"+req.body.eps
  let bem = await down(rek)
  let inpo = await info(rek)
  console.log(inpo)
  console.log(bem)
  res.render('stream', {
    hasil: bem,
    titel: inpo
  })
})

app.post('/anime', async function (req, res) {
   console.log(req.body)
   let rek = "https://oploverz.red/"+req.body.anime
   let jason = await info(rek)
   let jeson = await eps(jason.url)
   console.log(jason)
   console.log(jeson)
   jason.genre = jason.genre.replace(/([A-Z])/g, ' $1')
   res.render("anime", {
     hasil: jason,
     hesil: jeson
   })
});

async function updet(){
app.get('/', function(req, res){
let beranda = await home()
  res.render('form', {
    pesan: beranda,
  });
});
}

const appPort = 3056;

app.listen(process.env.PORT || appPort, () => {
	console.info('We are up!');
	});
