const Homes = require('./model/homes.model')
const User = require('./model/users.model');
const mongoose = require("mongoose");

// // const asyncHandler = require("express-async-handler");



const getAllHomes = async function (req, res) {
  try {
    const { price, rooms, size, province, municipality } = req.query;

    // Build the filter object dynamically
    const filter = {};
    if (price) filter.price = { $lte: Number(price) }; // Max Price
    if (rooms) filter.rooms = { $gte: Number(rooms) }; // Min Rooms
    if (size) filter.size = { $gte: Number(size) }; // Min Size
    if (province) filter.province = province; // Province
    if (municipality) filter.municipality = municipality; // Zone

    const homes = await Homes.find(filter);
    res.status(200);
    res.json(homes);

  } catch (error) {
    console.error(error)
    res.status(500)
    res.json({ message: 'Internal server Error' })

  }
}

const postOneHomes = async function (req, res) {
  try {
    console.log('There was a post request');
    console.log('Request body:', req.body); // Debugging to log the incoming request data

    const {
      propertyCode,
      thumbnail,
      price,
      propertyType,
      operation,
      url,
      numPhotos,
      size,
      rooms,
      bathrooms,
      description,
      latitude,
      longitude
    } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!propertyCode) missingFields.push('propertyCode');
    if (!thumbnail) missingFields.push('thumbnail');
    if (!price) missingFields.push('price');
    if (!propertyType) missingFields.push('propertyType');
    if (!operation) missingFields.push('operation');
    if (!url) missingFields.push('url');

    if (missingFields.length > 0) {
      res.status(400).json({
        message: 'Validation error: Missing required fields',
        missingFields,
      });
      return;
    }

    // Create new home data
    const homeData = {
      propertyCode,
      thumbnail,
      price,
      propertyType,
      operation,
      url,
      numPhotos: numPhotos || 0, // Optional with default
      size,
      rooms,
      bathrooms,
      description,
      latitude,
      longitude,
    };

    // Save the new home
    const newHome = await Homes.create(homeData);

    res.status(201).json(newHome);

  } catch (error) {
    console.error('Error creating topic:', error); // Log the exact error
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Create a user profile
const createUser = async function(req, res) {
  try {
    const {
      name,
      email,
      age,
      gender,
      occupation,
      preferences,
    } = req.body;

    // Validate required fields
    if (!name || !email || !age || !gender) {
      return res.status(400).json({ message: 'Missing required fields: name, email, age, or gender' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = await User.create({
      name,
      email,
      age,
      gender,
      occupation,
      preferences,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
const getAllUsers = async function(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getFlatmatesForHome = async (req, res) => {
  try {
    const { homeId } = req.params;

    // Validate homeId
    if (!mongoose.Types.ObjectId.isValid(homeId)) {
      return res.status(400).json({ message: "Invalid Home ID" });
    }

    // Fetch home details
    const home = await Homes.findById(homeId);
    if (!home) {
      return res.status(404).json({ message: "Home not found" });
    }

    // Fetch matching flatmates based on smoker, petFriendly, and other relevant preferences
    const flatmates = await User.find({
      smoker: home.smoker || false, // Match smoker preference
      petFriendly: home.petFriendly || false, // Match pet-friendly preference
      nightOwl: home.nightOwl || false, // Match night owl preference
      cleanliness: { $gte: home.cleanliness || 0 }, // Match cleanliness level
    });

    res.status(200).json(flatmates);
  } catch (error) {
    console.error("Error fetching flatmates:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};





module.exports = {
  getAllHomes,
  postOneHomes,
  createUser,
  getAllUsers,
  getFlatmatesForHome
}