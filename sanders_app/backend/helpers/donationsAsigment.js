import Project from '../models/Project.js';

const donationsAsigment = {
    impact: async (donation) => {
        const project = await Project.find({
            // make sure the project is not fully funded by checking if the money_raised is less than the money_goal
            $expr: { $lt: ["$money_raised", "$money_goal"] }
        }).sort({ impact: -1 }).limit(1);
        if (project.length === 0) {
            return donation;
        }
        donation.project = project[0]._id;
        project[0].donations.push(donation._id);
        project[0].money_raised += donation.amount;
        try{
            await project[0].save();
        } catch (error) {
            console.log(error);
        }
        return donation;
        
    },
    progress: async (donation) => {
        // Get all projects
        let projects = await Project.find({});
        // Sort projects by progress in ascending order
        projects = projects.map(project => {
            // Calculate progress for each project
            let progress = 0;
            if(project.milestones){
                const reachedMilestones = project.milestones.filter(milestone => milestone.reached);
                // Find the reached milestone with the maximum percentage
                const maxReachedMilestone = reachedMilestones.reduce((max, current) => {
                    return (current.percentage > max.percentage) ? current : max;
                }, { percentage: 0 });
                progress = maxReachedMilestone.percentage;
            }
            if(project.money_raised < project.money_goal && progress < 100){
                return {
                    ...project.toObject(),
                    progress: progress
                };
            }
            return null;
        });
        // Remove null values
        projects = projects.filter(project => project !== null);
        
        // get the project with the highest progress
        const projectWithHighestProgress = projects.sort((a, b) => a.progress - b.progress).pop();

        const project = await Project.findById(projectWithHighestProgress._id);
        donation.project = project._id;
        project.donations.push(donation._id);
        project.money_raised += donation.amount;
        try{
            await project.save();
        } catch (error) {
            console.log(error);
        }
        return donation;
    },
}


export default donationsAsigment;