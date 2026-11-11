const mongoose = require('mongoose');
const connectDb = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to the database: ${conn.connection.host}`);
  } catch (error) {
    console.log('Error connecting to the database');
  }
}

module.exports = connectDb;