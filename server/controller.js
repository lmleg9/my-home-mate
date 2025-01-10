const Homes = require('./model/homes.model')
// // const asyncHandler = require("express-async-handler");



const getAllHomes = async function (req, res, next) {
  try {
    const homes = await Homes.find({});
    res.status(200);
    res.json(homes);

  } catch (error) {
    console.error(error)
    res.status(500)
    res.json({ message: 'Internal server Error' })

  }
}

const postOneHomes = async function (req, res, next) {
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


module.exports = {
  getAllHomes,
  postOneHomes
}