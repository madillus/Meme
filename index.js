const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
const request = require('request');

const baseUrl = `https://memegen.link/`;
const mainUrl = `https://memegen.link/examples`;

const memesPath = "./memes";

/* Create folder if it does not exist. */
createFolder();

/* Check if images are already in memes folder. If not, then download them. */
axios
  .get(mainUrl)
  .then((response) => {
    dealWithData(response.data);
  })
  .catch((err) => {
    console.log(err);
  });


const dealWithData = (html) => {
  const $ = cheerio.load(html);
  const memeImages = $(".meme-img");
  for (let indexValue = 0; indexValue < 10; indexValue++) {
    const source = memeImages[indexValue].attribs.src;
    downloadImage(baseUrl + source, './memes' + '/meme' + indexValue + '.jpg', () => {});
  }
};

function createFolder() {
  if (!fs.existsSync(memesPath)) {
    fs.mkdir(memesPath, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log("New directory successfully created.")
      }
    });
  } else {
    console.log("Folder exists already");
  }
}

function downloadImage(uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
}