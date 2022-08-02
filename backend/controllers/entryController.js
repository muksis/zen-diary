const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Entry = require('../models/entryModel');

// @desc   Get user entries
// @route  GET /api/entries
// @access Private
const getEntries = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const entries = await Entry.find({ user: req.user.id });

  res.status(200).json(entries);
});

// @desc   Get user entry
// @route  GET /api/entries/:id
// @access Private
const getEntry = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.status(200).json(entry);
});

// @desc   Create new entry
// @route  POST /api/entries
// @access Private
const createEntry = asyncHandler(async (req, res) => {
  const { mood, title, text } = req.body;

  if (!mood || !title || !text) {
    res.status(400);
    throw new Error('Please add mood, title and text');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const entry = await Entry.create({
    mood,
    title,
    text,
    user: req.user.id,
  });

  res.status(201).json(entry);
});

// @desc   Delete entry
// @route  DELETE /api/entries/:id
// @access Private
const deleteEntry = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const entry = await Entry.findByIdAndDelete(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // await entry.remove();

  res.status(200).json({ success: true });
});

// @desc   Update entry
// @route  PUT /api/entries/:id
// @access Private
const updateEntry = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const entry = await Entry.findById(req.params.id);

  if (!entry) {
    res.status(404);
    throw new Error('Entry not found');
  }

  if (entry.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedEntry);
});

module.exports = {
  getEntries,
  getEntry,
  createEntry,
  deleteEntry,
  updateEntry,
};
