import Project from '../models/Project.js';


const createProject = async (req, res) => {
    return res.status(200).json({ msg: "To Create a Project (Not implemented yet)." });
}

const getProjects = async (req, res) => {
    return res.status(200).json({ msg: "To Get Projects (Not implemented yet)." });
}

const getProject = async (req, res) => {
    return res.status(200).json({ msg: "To Get a Project (Not implemented yet)." });
}

const updateProject = async (req, res) => {
    return res.status(200).json({ msg: "To Update a Project (Not implemented yet)." });
}

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