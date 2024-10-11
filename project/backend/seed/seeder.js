import { exit } from 'node:process';
import connectDB from "../config/db.js";

import data from "./data.js";
import config from "./config.js";

import User, { Admin, Donor, PhysicalDonor } from "../models/User.js";
import Config from "../models/Config.js";
import Donation from "../models/Donation.js";
import Project from '../models/Project.js';

// Import dotenv
import dotenv from "dotenv";
dotenv.config();


const insertData = async () => {
    try {
        await connectDB();
        await Config.create(config);
        console.log('Inserting Data...');
        await Promise.all(data.map(async (user) => {
            let userDB;
            if(user.role === 'admin'){
                userDB = new Admin({
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
            }else if(user.role === 'donor'){
                userDB = new Donor({
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    password: user.password,
                    role: user.role,
                });
            } else if(user.role === 'physical-donor'){
                userDB = new PhysicalDonor({
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    role: user.role,
                });
            }
            await userDB.save();
            if(user.donations){
                await Promise.all(user.donations.map(async (donation) => {
                    const donationDB = new Donation({
                        amount: donation.amount,
                        method: donation.method,
                        donor: userDB._id
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
                        type: project.type,
                        creator: userDB._id,
                        milestones: project.milestones,
                        impact: project.impact
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
        await Config.deleteMany();
        await User.deleteMany();
        await Donation.deleteMany();
        await Project.deleteMany();
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