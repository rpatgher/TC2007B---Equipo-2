import Project from '../models/Project.js';

// This function creates a new project
const createProject = async (req, res) => {
    return res.status(200).json({ msg: "To Create a Project (Not implemented yet)." });
}

// This function gets all projects
const getProjects = async (req, res) => {
    return res.status(200).json({ msg: "To Get Projects (Not implemented yet)." });
}

// This function gets a project by id
const getProject = async (req, res) => {
    return res.status(200).json({ msg: "To Get a Project (Not implemented yet)." });
}

// This function updates a project
const updateProject = async (req, res) => {
    return res.status(200).json({ msg: "To Update a Project (Not implemented yet)." });
}

// This function deletes a project
const deleteProject = async (req, res) => {
    return res.status(200).json({ msg: "To Delete a Project (Not implemented yet)." });
}


export {
    createProject,
    updateProject,
    getProjects,
    getProject,
    deleteProject
}