const express = require("express");
const router = express.Router();

const {
  getAllCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
} = require("../controllers/collections");

router.route("/").post(createCollection).get(getAllCollections); // REST api, web server handling HTTP requests
router
  .route("./:id")
  .get(getCollection)
  .delete(deleteCollection)
  .patch(updateCollection);

module.exports = router;
