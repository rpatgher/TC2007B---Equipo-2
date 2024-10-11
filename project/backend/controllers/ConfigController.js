import Config from "../models/Config.js";


// This function gets the Config
const getConfig = async (req, res) => {
    try {
        const config = await Config.findOne();
        return res.status(200).json(config);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
};

// This function updates the Donations Asignment Config Option
const updateDonationsAsignConfig = async (req, res) => {
    const option = req.body.donations_asignment;
    if (!option){
        return res.status(400).json({ msg: "Donations Asignment option is required." });
    }
    if (!["manual", "progress", "impact", "random"].includes(option)){
        return res.status(400).json({ msg: "Invalid Donations Asignment option." });
    }
    try {
        const config = await Config.findOne();
        config.donations_asignment = option;
        await config.save();
        return res.status(200).json(config);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}

const updateDonationsImpactsConfig = async (req, res) => {
    const impacts = req.body.impacts;
    if (!impacts){
        return res.status(400).json({ msg: "Impacts option is required." });
    }
    try {
        const config = await Config.findOne();
        config.impacts = impacts;
        await config.save();
        return res.status(200).json(config);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error." });
    }
}

export {
    getConfig,
    updateDonationsAsignConfig,
    updateDonationsImpactsConfig
};