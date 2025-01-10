const mongoose = require('./db')

const homesSchema = new mongoose.Schema({
  propertyCode: { type: Number, required: true }, // Unique property identifier
  thumbnail: { type: String, required: true }, // URL for the thumbnail
  numPhotos: { type: Number, default: 0 }, // Number of photos available
  price: { type: Number, required: true }, // Price of the property
  propertyType: { type: String, required: true, enum: ['chalet', 'apartment', 'house'] }, // Type of property
  operation: { type: String, required: true, enum: ['rent', 'sale'] }, // Operation type
  size: { type: Number }, // Size of the property in square meters
  exterior: { type: Boolean }, // Whether the property is exterior
  rooms: { type: Number }, // Number of rooms
  bathrooms: { type: Number }, // Number of bathrooms
  address: { type: String }, // Full address
  province: { type: String }, // Province where the property is located
  municipality: { type: String }, // Municipality of the property
  country: { type: String }, // Country code
  latitude: { type: Number }, // Latitude coordinate
  longitude: { type: Number }, // Longitude coordinate
  showAddress: { type: Boolean, default: false }, // Whether to show the address
  url: { type: String, required: true }, // URL to the property listing
  distance: { type: Number }, // Distance from a reference point (in meters)
  description: { type: String }, // Description of the property
  hasVideo: { type: Boolean, default: false }, // Whether the listing has a video
  status: { type: String, enum: ['good', 'bad'], default: 'good' }, // Status of the property
  newDevelopment: { type: Boolean, default: false }, // Whether it's a new development
  priceByArea: { type: Number }, // Price per square meter
  detailedType: {
    typology: { type: String },
    subTypology: { type: String }
  }, // Detailed type of property
  suggestedTexts: {
    subtitle: { type: String },
    title: { type: String }
  }, // Suggested title and subtitle for the listing
  hasPlan: { type: Boolean, default: false }, // Whether the listing includes a plan
  has3DTour: { type: Boolean, default: false }, // Whether the listing has a 3D tour
  has360: { type: Boolean, default: false }, // Whether the listing includes a 360° view
  hasStaging: { type: Boolean, default: false }, // Whether the listing includes staging
  superTopHighlight: { type: Boolean, default: false }, // Whether the listing is a super top highlight
  topNewDevelopment: { type: Boolean, default: false } // Whether the listing is a top new development
}, { timestamps: true });

const Homes = mongoose.model('Homes', homesSchema, 'homes');

module.exports = Homes;