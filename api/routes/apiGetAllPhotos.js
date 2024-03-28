var express = require('express');
var router = express.Router();
var mongoDB = require("../db.js");
const { MongoClient } = require("mongodb");

const client = new MongoClient(mongoDB.uri);

async function getPhotos() {
  var allPhotos = [];

  try {
    await client.connect();
    const db = client.db("photos");
    const col = db.collection("photo");
    const cursor = col.find({});

    allPhotos = await cursor.toArray();
  } catch (err) {
    console.log(err.stack);
  } finally {
  }

  return allPhotos;
}

router.get('/', async function (req, res, next) {
  const allPhotos = await getPhotos();
  res.send(allPhotos);
});

module.exports = router;