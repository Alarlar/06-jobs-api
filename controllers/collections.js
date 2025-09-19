const Collection = require("../models/Collection");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllCollections = async (req, res) => {
  res.send("get all collections");
};
const getCollection = async (req, res) => {
  res.send("get collection");
};
const createCollection = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const collection = await Collection.create(req.body);
  res.status(StatusCodes.CREATED).json({ collection });
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
