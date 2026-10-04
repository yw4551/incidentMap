import {
    getAllIncidents,
    getIncidentById,
    createIncidentDal,
    updateIncidentById,
    deleteIncidentById,
} from "../DAL/incident.dal.js";
import {
    emitIncidentCreated,
    emitIncidentDeleted,
    emitIncidentUpdated,
} from "../socket.js";

export const getIncidents = async (req, res) => {
    const { category } = req.validatedQuery;
    const incidents = await getAllIncidents(category);

    res.json({
        success: true,
        data: {
            incidents,
        },
    });
};

export const getIncident = async (req, res) => {
    const { id } = req.validatedParams;
    const incident = await getIncidentById(id);

    if (!incident) {
        const error = new Error("Incident not found");
        error.statusCode = 404;
        throw error;
    }

    res.json({
        success: true,
        data: {
            incident,
        },
    });
};

export const createIncident = async (req, res) => {
    const { id } = req.user;
    const { title, description, category, location } = req.validatedBody;

    const newIncident = {
        title,
        description,
        category,
        location,
        createdBy: id,
    };

    const incident = await createIncidentDal(newIncident);

    emitIncidentCreated(incident);

    res.status(201).json({
        success: true,
        data: {
            incident,
        },
    });
};

export const updateIncident = async (req, res) => {
    const { id } = req.validatedParams;
    const data = req.validatedBody;
    const incident = await getIncidentById(id);

    if (!incident) {
        const error = new Error("Incident not found");
        error.statusCode = 404;
        throw error;
    }

    const { role } = req.user;

    if (role !== "admin" && String(incident.createdBy) !== req.user.id) {
        const error = new Error("Authorization error");
        error.statusCode = 403;
        throw error;
    }

    const updatedIncident = await updateIncidentById(id, data);

    emitIncidentUpdated(updatedIncident);

    res.json({
        success: true,
        data: {
            incident: updatedIncident,
        },
    });
};

export const deleteIncident = async (req, res) => {
    const { id } = req.validatedParams;
    const incident = await getIncidentById(id);

    if (!incident) {
        const error = new Error("Incident not found");
        error.statusCode = 404;
        throw error;
    }

    const { role } = req.user;

    if (role !== "admin" && String(incident.createdBy) !== req.user.id) {
        const error = new Error("Authorization error");
        error.statusCode = 403;
        throw error;
    }

    await deleteIncidentById(id);

    emitIncidentDeleted({ id });

    res.json({
        success: true,
        data: {
            message: "Incident deleted successfully",
        },
    });
};
