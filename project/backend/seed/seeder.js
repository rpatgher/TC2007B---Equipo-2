import { exit } from 'node:process';
import connectDB from "../config/db.js";
import users from "./users.js";
import User from "../models/User.js";
import Donation from "../models/Donation.js";
import Project from '../models/Project.js';

// Import dotenv
import dotenv from "dotenv";
dotenv.config();


const insertData = async () => {
    try {
        await connectDB();
        // await User.insertMany(users);
        await Promise.all(users.map(async (user) => {
            const userDB = new User({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password,
                role: user.role,
                donations: []
            });
            await userDB.save();
            if(user.donations){
                await Promise.all(user.donations.map(async (donation) => {
                    const donationDB = new Donation({
                        amount: donation.amount,
                        donor: userDB._id,
                        method: donation.method
                    });
                    await donationDB.save();
                    userDB.donations.push(donationDB);
                }));
                await userDB.save();
            }
            if(user.projects){
                await Promise.all(user.projects.map(async (project) => {
                    const projectDB = new Project({
                        name: project.name,
                        description: project.description,
                        money_goal: project.money_goal,
                        money_raised: project.money_raised,
                        creator: userDB._id,
                        type: project.type
                    });
                    await projectDB.save();
                    userDB.projects.push(projectDB);
                }));
                await userDB.save();
            }
        }));
        console.log('Data Inserted');
        exit(0);
    } catch (error) {
        console.log('Error: ' + error);
        exit(1);
    }
}

const deleteData = async () => {
    try {
        await connectDB();
        console.log('Deleting Data...');
        await User.deleteMany();
        await Donation.deleteMany();
        console.log('Data Deleted');
        exit(0);
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