import { exit } from 'node:process';
import connectDB from "../config/db.js";
import users from "./users.js";
import User from "../models/User.js";
import Donation from "../models/Donation.js";

// Import dotenv
import dotenv from "dotenv";
dotenv.config();


const insertData = async () => {
    try {
        await connectDB();
        // await User.insertMany(users);
        users.forEach(async (user) => {
            const userDB = await User.create(user);
            if(user.donations){
                await Promise.all(user.donations.map(async (donation) => {
                    await Donation.create({
                        ...donation,
                        donor: userDB._id
                    });
                }));
            }
        });
        console.log('Data Inserted');
    } catch (error) {
        console.log('Error: ' + error);
        exit(1);
    }
}

const deleteData = async () => {
    try {
        await connectDB();
        console.log('Deleting Data...');
    } catch (error) {
        console.log(error);
        exit(1);
    }
}


if(process.argv[2] === "-i"){
    insertData();
}

if(process.argv[2] === "-e"){
    deleteData();
}