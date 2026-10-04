import Incident from "../models/incident.model.js";

export const getAllIncidents = async (category = null) => {
    if (!category) {
        return await Incident.find();
    }

    return await Incident.find({
        category,
    });
};

export const getIncidentById = async (id) => {
    return await Incident.findById(id);
};

export const createIncidentDal = async (data) => {
    return await Incident.create(data);
};

export const updateIncidentById = async (id, data) => {
    return await Incident.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteIncidentById = async (id) => {
    return await Incident.findByIdAndDelete(id);
};
