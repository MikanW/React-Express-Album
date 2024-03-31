var express = require('express');
var router = express.Router();
var mongoDB = require("../db.js");
var ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require("mongodb");
const client = new MongoClient(mongoDB.uri);

var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
const imgurToken = require('../db.js').imgurToken;
const albumId = require('../db.js').albumId;

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

const testAPI = async () => {
  var testData = new FormData();
  testData.append('image', fs.createReadStream('/Users/mikan/Downloads/IMG_9244.jpg'));
  testData.append('type', 'image');
  testData.append('album', albumId);

  var imgurUrl = await uploadToImgur(testData);
  console.log(imgurUrl);
  if (imgurUrl !== null && imgurUrl.trim() !== "") {
    await insertImageToDB(imgurUrl, "植物", "FuXin");
  }
}

