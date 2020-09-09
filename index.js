const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs')
const request = require('request')

const mainUrl = `https://memegen.link/examples`;

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
  const urlMeme = $(".meme-img");
  const indexValue = (9);
  console.log(`Source is:\n${urlMeme[indexValue].attribs.src}`)

};
