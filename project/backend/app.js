import express from 'express';
import cors from 'cors';

// Database Connection
import connectDB from './config/db.js';

// Env Variables
import dotenv from 'dotenv';
dotenv.config();

// Routers Import
import authRouter from './routes/AuthRoutes.js';
import donationRouter from './routes/DonationRoutes.js';
import userRouter from './routes/UserRoutes.js';
import projectRouter from './routes/ProjectRoutes.js';

// Create Express App
const app = express();

// Run Database Connection
connectDB();

// Json Middleware for accepting json data
app.use(express.json());

// static files
app.use(express.static('public'));

// Cors Middleware
const whitelist = [process.env.FRONTEND_URL_DEV];
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.use(cors(corsOptions))


// Routing
app.use('/api/auth', authRouter);
app.use('/api/donations', donationRouter);
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);

// App Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});