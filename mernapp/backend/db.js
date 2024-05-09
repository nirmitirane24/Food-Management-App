// db.js
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:gofood1234@cluster0.phoqvhs.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();
        
        global.food_items = data;
        global.foodCategory = catData;

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;
