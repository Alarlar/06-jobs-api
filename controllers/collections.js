const Collection = require("../models/Collection");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllCollections = async (req, res) => {
  const collections = await Collection.find({
    createdBy: req.user.userId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ collections, count: collections.length });
};
const getCollection = async (req, res) => {
  const {
    user: { userId },
    params: { id: collectionId },
  } = req;

  const collection = await Collection.findOne({
    _id: collectionId,
    createdBy: userId,
  });
  if (!collection) {
    throw new NotFoundError(`No collection with id ${collectionId}`);
  }
  res.status(StatusCodes.OK).json({ collection });
};
const createCollection = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const collection = await Collection.create(req.body);
  res.status(StatusCodes.CREATED).json({ collection });
};

const updateCollection = async (req, res) => {
  const {
    body: { name, artist },
    user: { userId },
    params: { id: collectionId },
  } = req;

  if (name === "" || artist === "") {
    throw new BadRequestError("Name or Artist fields cant be empty");
  }
  const collection = await Collection.findByIdAndUpdate(
    {
      _id: collectionId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!collection) {
    throw new NotFoundError(`No collection with id ${collectionId}`);
  }
  res.status(StatusCodes.OK).json({ collection });
};
const deleteCollection = async (req, res) => {
  const {
    body: { name, artist },
    user: { userId },
    params: { id: collectionId },
  } = req;

  const collection = await Collection.findByIdAndDelete({
    _id: collectionId,
    createdBy: userId,
  });
  if (!collection) {
    throw new NotFoundError(`No collection with id ${collectionId}`);
  }
  res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
};

module.exports = {
  getAllCollections,
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
};
