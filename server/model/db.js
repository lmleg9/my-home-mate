const mongoose = require('mongoose');

main()

async function main() {
  try {
    await mongoose.connect('mongodb+srv://lmleg9:75105997-Juaco@cluster0.ah5xt.mongodb.net/myhomemate?retryWrites=true&w=majority&appName=Cluster0');
    console.log('DB connected')

  } catch (error) {
    console.log('DB disconnected: ', error)

  }

}

module.exports = mongoose;

