import User from '../models/User.js';
import Donation from '../models/Donation.js';
import Project from '../models/Project.js';

const getStatsAdmin = async (req, res) => {
    try{
        const currentDate = new Date();
        const startOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

        const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
        const endOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

        // ************** Donor Stats **************
        const usersThisMonth = await User.find({ createdAt: { $gte: startOfThisMonth, $lt: endOfThisMonth }, role: { $ne: 'admin' } });
        const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });;


        // ************** Project Stats **************
        const projects = await Project.aggregate([{
            $project: {
                name: 1,
                milestones: {
                    $filter: {
                        input: "$milestones",
                        as: "milestone",
                        cond: { $eq: ["$$milestone.reached", true] }
                    }
                }
            }},
            {
                $project: {
                    name: 1,
                    maxPercentage: { $max: "$milestones.percentage" }
                }
            },
            {
                $match: {
                    maxPercentage: { $lt: 100 }
                }
            },
            {
                $facet: {
                    moreThan80Projects: [
                        { $match: { maxPercentage: { $gt: 80 } } }
                    ],
                    projectsWithHighestProgress: [
                        { $sort: { maxPercentage: -1 } },
                        { $limit: 3 },
                        { $project: { name: 1, maxPercentage: 1 } }
                    ]
                }
            }
        ])
        const totalProjects = await Project.countDocuments();

        
        // ************** Donation Stats **************
        const mostRecentDonations = await Donation.find().populate('donor', 'name surname').sort({ createdAt: -1 }).limit(3);
        const donations = await Donation.aggregate([{
            $facet: {
                totalThisMonth: [{ 
                    $match: {
                    createdAt: { $gte: startOfThisMonth, $lt: endOfThisMonth }
                    }
                },{
                    $count: "total"
                }],
                totalLastMonth: [{ 
                    $match: {
                    createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth }
                    }
                },{
                    $count: "total"
                }]
            }}
        ]);
        const totalFunded = await Donation.aggregate([{
            $group: {
                _id: null,
                total: { $sum: "$amount" }
            }
        }]);
        const allDonationsThisYear = await Donation.aggregate([{
            $match: {
                // Donations this year
                createdAt: { $gte: new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate()) }
            }},
            {
                $group: {
                    _id: {
                            // Group by year and month
                        year: { $year: "$createdAt" }, 
                        month: { $month: "$createdAt" }
                    },
                    totalDonations: { $sum: "$amount" },
                    amountDonations: { $sum: 1 } 
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1 } // Ordenar los resultados por año y mes
            }
        ]);

        // ************** Response **************
        const response = {
            donations: {
                totalFunded: totalFunded[0].total,
                recentDonations: mostRecentDonations,
                thisMonth: donations[0].totalThisMonth[0]?.total || 0,
                lastMonth: donations[0].totalLastMonth[0]?.total || 0,
                thisYear: allDonationsThisYear.map(donations => {
                    return {
                        year: donations._id.year,
                        month: donations._id.month,
                        totalDonations: donations.totalDonations,
                        totalAmount: donations.amountDonations
                    }
                })
            },
            users:{
                thisMonth: usersThisMonth.length,
                total: totalUsers
            },
            projects: {
                total: totalProjects,
                moreThan80Projects: projects[0].moreThan80Projects.length || 0,
                projectWithHighestProgress: projects[0].projectsWithHighestProgress
            },
        }
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}


export {
    getStatsAdmin
}