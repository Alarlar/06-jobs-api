const getAllCollections = async (req, res) => {
  res.send("get all collections");
};
const getCollection = async (req, res) => {
  res.send("get collection");
};
const createCollection = async (req, res) => {
  res.json(req.user);
};
const updateCollection = async (req, res) => {
  res.send("update collection");
};
const deleteCollection = async (req, res) => {
  res.send("delete collection");
};

module.exports = {
  getAllCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};
