var express = require('express');
var router = express.Router();
var mongoDB = require("../db.js");
const multer = require('multer');
var ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require("mongodb");
const client = new MongoClient(mongoDB.uri);

var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
const imgurToken = require('../db.js').imgurToken;
const albumId = require('../db.js').albumId;
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const uploadToImgur = async (data) => {
  var url = '';

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

  await axios(config)
    .then(function (response) {
      var res = JSON.stringify(response.data);
      console.log(res)
      url = response.data.data.link;
    })
    .catch(function (error) {
      console.log(error);
    });

  return url;
}

const insertImageToDB = async (url, tags, location) => {
  const doc = {
    url: url,
    tags: tags,
    location: location,
    kudos: 0,
  };

  await client.connect();
  const col = client.db("photos").collection("photo");

  const ret = await col.insertOne(doc);
  console.log(ret);
}

const handleUpload = async (file, tag, location) => {
  const formData = new FormData();
  formData.append('image', fs.createReadStream(file.path), file.originalname);
  formData.append('type', 'image');
  formData.append('album', albumId);

  var imgurUrl = await uploadToImgur(formData);
  if (imgurUrl !== null && imgurUrl.trim() !== "") {
    fs.unlinkSync(file.path);
    await insertImageToDB(imgurUrl, tag, location);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.array('files'), async (req, res) => {

  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).send({ message: 'No files uploaded.' });
  }

  try {
    if (files.length === 1) {
      await handleUpload(files[0], req.body.tags, req.body.locations);
    }
    else {
      await Promise.all(files.map(async (file, index) => {
        handleUpload(file, req.body.tags[index], req.body.locations[index]);
      }));
    }
    res.send({ message: 'All photos uploaded!' });
  } catch (error) {
    console.error('Error forwarding files:', error);
    files.forEach(file => {
      fs.unlinkSync(file.path);
    });
    res.status(500).send({ message: 'Error forwarding files' });
  }
});


module.exports = router;
