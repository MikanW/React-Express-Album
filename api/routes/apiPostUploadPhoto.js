var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
const imgurToken = require('../db.js').imgurToken;
const albumId = require('../db.js').albumId;



var config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.imgur.com/3/upload',
  headers: {
    'Authorization': 'BEARER ' + imgurToken,
    ...data.getHeaders()
  },
  data: data
};

const uploadToImgur = () => {
  var data = new FormData();

  data.append('image', fs.createReadStream('/Users/mikan/Downloads/IMG_9244.jpg'));
  data.append('type', 'image');
  data.append('title', 'Simple upload');
  data.append('description', 'This is a simple image upload in Imgur');
  data.append('album', albumId);

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
}
