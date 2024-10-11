import mongoose from "mongoose";

const configSchema = new mongoose.Schema({
    donations_asignment: {
        type: String,
        required: true,
        enum: ["manual", "progress", "impact", "random"],
    }, 
    impacts: {
        water: {
            description: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        },
        nutrition: {
            description: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        },
        sexuality: {
            description: {
                type: String,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        }
    }
}, {
    timestamps: true
});

const Config = mongoose.model('Config', configSchema);
export default Config;