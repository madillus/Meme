const download = require('image-downloader')

const options = {
  url: 'http://someurl.com/image.jpg',
  dest: '/path/to/dest'                // will be saved to /path/to/dest/image.jpg
}

download.image(options)
  .then(({ filename }) => {
    console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
  })
  .catch((err) => console.error(err))