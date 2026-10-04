import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: ["fire", "flood", "accident", "medical", "other"],
            required: true,
        },

        status: {
            type: String,
            enum: ["open", "in_progress", "closed"],
            default: "open",
        },

        location: {
            lat: {
                type: Number,
                required: true,
            },

            lng: {
                type: Number,
                required: true,
            },
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,

        toJSON: {
            transform: (doc, ret) => {
                ret.id = ret._id.toString();
                ret.createdBy = ret.createdBy.toString();

                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

const Incident = mongoose.model("Incident", incidentSchema);

export default Incident;
