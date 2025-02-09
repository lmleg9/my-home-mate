const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config();

main()

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected')

  } catch (error) {
    console.log('DB disconnected: ', error)

  }

}

module.exports = mongoose;

