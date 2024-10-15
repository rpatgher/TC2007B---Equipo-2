import Project from '../models/Project.js';
import Config from '../models/Config.js';
import fs from 'fs';

// This function creates a new project
const createProject = async (req, res) => {
    // Check if an image was uploaded
    const { file } = req;
    if (!file) {
        return res.status(400).json({ msg: "Please upload an image." });
    }
    // Get the project data
    const { name, description, money_goal, type, impact } = req.body;
    // Parse the milestones
    const milestones = JSON.parse(req.body.milestones);
    // Check if all fields are provided
    if (!name || !description || !money_goal || !type || !milestones || !impact) {
        // if not, delete the image that was just uploaded (in the uploadImage middleware)
        if (file) {
            fs.unlinkSync(file.path);
        }
        return res.status(400).json({ msg: "Please enter all fields." });
    }
    // Create the project
    const creator = req.user.id;
    const project = new Project({ name, description, money_goal, type, creator, milestones, impact, image: file.filename });
    try {
        // Save the project
        await project.save();
        return res.status(201).json({ msg: "Project created successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}  

// This function gets all projects
const getProjects = async (req, res) => {
    let projects;
    if(req.user.role !== 'admin') {
        projects = await Project.find()
            .sort({ createdAt: -1 })
            .select('-__v -updatedAt -creator -donations -milestones -impact -money_goal -money_raised')
            .lean();
        projects = projects.map(project => {
            const { _id } = project;
            delete project._id;
            return {
                id: _id.toString(),
                ...project
            }
        });
        return res.status(200).json(projects);
    }
    // TODO: Implement the filtering by name, email, phone, role
    const { range, sort, filter } = req.query;
    // Get the range and sort values
    const [start, end] = JSON.parse(range);
    const sortOrder = JSON.parse(sort);
    const sortBy = sortOrder[0];
    const order = sortOrder[1] === 'ASC' ? 1 : -1;
    let filterBy = '';

    projects = await Project.find(filterBy !== '' ? {
        $or: [
            { name: { $regex: filter, $options: 'i' } },
            { description: { $regex: filter, $options: 'i' } }
        ]
    } : {})
        .sort({ [sortBy]: order })
        .skip(start)
        .limit(end - start + 1)
        .select('-__v -updatedAt')
        .populate('creator', 'name surname email')
        .lean();
    projects = projects.map(project => {
        const { _id } = project;
        delete project._id;
        return {
            id: _id.toString(),
            ...project
        }
    });
    const total = await Project.countDocuments();
    res.set('Content-Range', `projects ${start}-${end}/${total}`);
    res.set('Access-Control-Expose-Headers', 'Content-Range');
    return res.status(200).json(projects);
}

// This function gets a project by id
const getProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id)
            .populate('creator', 'name surname email')
            .populate('donations', 'amount createdAt')
            .populate({
                path: 'donations',
                select: 'amount createdAt',
                populate: {
                    path: 'donor',
                    select: 'name surname email'
                }
            })
            .lean();
    if (!project) {
        return res.status(404).json({ msg: "Project not found." });
    } 
    const config = await Config.findOne();
    const { _id } = project;
    delete project._id;
    return res.status(200).json({
        id: _id.toString(),
        ...project,
        impacts: config.impacts,
        donations: project.donations.map(donation => {
            const { _id } = donation;
            delete donation._id;
            return {
                id: _id.toString(),
                ...donation
            }
        })
    });
}

// This function updates a project
const updateProject = async (req, res) => {
    const { file } = req;
    const { id } = req.params;
    const { name, description, money_goal, type, impact } = req.body;
    const milestones = JSON.parse(req.body.milestones);
    // Check if all fields are provided
    if (!name || !description || !money_goal || !type || !milestones || !impact) {
        // if not, delete the image that was just uploaded (in the uploadImage middleware)
        if (file) {
            fs.unlinkSync(file.path);
        }
        return res.status(400).json({ msg: "Please enter all fields." });
    }
    const project = await Project.findById(id);
    // Check if the project exists
    if (!project) {
        // if not, delete the image that was just uploaded (in the uploadImage middleware)
        if (file) {
            fs.unlinkSync(file.path);
        }
        return res.status(404).json({ msg: "Project not found." });
    }
    // Update the project
    project.name = name;
    project.description = description;
    project.money_goal = money_goal;
    project.type = type;
    project.milestones = milestones;
    project.impact = impact;
    // Check if a new image was uploaded
    if (file) {
        // if so, delete the old image
        try {
            fs.unlinkSync(`./public/uploads/projects/${project.image}`);
        } catch (error) {
            // delete current image
            fs.unlinkSync(file.path);
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error." });
        }
        // and save the new image reference
        project.image = file.filename;
    }
    try {
        // Save the project
        await project.save();
        return res.status(200).json({ msg: "Project updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}

// This function deletes a project
const deleteProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
        return res.status(404).json({ msg: "Project not found." });
    }
    if (project.donations.length > 0) {
        return res.status(400).json({ msg: "Cannot delete a project with donations." });
    }
    if (project.image) {
        try {
            fs.unlinkSync(`./public/uploads/projects/${project.image}`);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: "Internal Server Error." });
        }
    }
    try {
        await project.deleteOne();
        return res.status(200).json({ msg: "Project deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}


export {
    createProject,
    updateProject,
    getProjects,
    getProject,
    deleteProject
}