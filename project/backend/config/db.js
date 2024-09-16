import mongoose from "mongoose";

// Function to connect to the database
const connectDB = async () => {
    try {
        // Connect to the database by passing the database URL
        const connection = await mongoose.connect(process.env.DATABASE, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        // Log the connection URL
        const url = `${connection.connection.host}: ${connection.connection.port}`;
        console.log(`MongoDB connected to: ${url}`);
    } catch (error) {
        // Log the error message if the connection fails
        console.log(`error: ${error.message}`);
        // Exit the process if the connection fails
        process.exit(1);
    }
}

export default connectDB;