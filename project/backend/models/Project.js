import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type:String,
        required: true,
        trim: true
    },
    money_goal: {
        type: Number,
        required: true
    },
    money_raised: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true,
        enum: ['water', 'sexuality', 'nutrition']
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    milestones: [{
        description: {
            type: String,
            required: true
        },
        percentage: {
            type: Number,
            required: true
        },
    }],
    impact: {
        description: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
    }
},{
    timestamps: true
});

const Project = mongoose.model('Project', ProjectSchema);
export default Project;

