var express = require('express');
var router = express.Router();
var mongoDB = require("../db.js");
var ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require("mongodb");

const client = new MongoClient(mongoDB.uri);

async function pushKudo(photoId) {
  var newKudoCount = (await getCurrentKudos(photoId) + 1).toString();

  try {
    await client.connect();
    const col = client.db("photos").collection("photo");
    const oId = new ObjectId(photoId);
    const query = { _id: oId };
    const update = {
      $set: {
        _id: oId,
        kudos: newKudoCount
      }
    };
    const options = {};
    col.updateOne(query, update, options);
  } catch (err) {
    console.log(err.stack);
  } finally {
  }
  return newKudoCount;
}

async function getCurrentKudos(photoId) {
  var photo;

  try {
    await client.connect();
    const col = client.db("photos").collection("photo");
    const cursor = col.find({
      "_id": new ObjectId(photoId)
    })
      .project({
        kudos: 1,
        _id: 0
      });
    photo = await cursor.toArray();

  } catch (err) {
    console.log(err.stack);
  } finally {
  }

  return parseInt(photo[0].kudos);
}

router.post('/', async function (req, res) {
  res.send(await pushKudo(req.body.photoId));
});

module.exports = router;