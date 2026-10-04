import type {
    DeleteIncidentResponse,
    CreateIncidentRequest,
    IncidentResponse,
    UpdateIncidentRequest,
} from "../types/api";
import type { CreateIncidentData, UpdateIncidentData } from "../types/incident";
import { apiRequest } from "./api";

export const getIncidents = async (token: string, category?: string) => {
    const query = category ? `category=${encodeURIComponent(category)}` : "";

    return apiRequest<IncidentResponse>(`/incidents${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createIncident = async (
    token: string,
    data: CreateIncidentData,
) => {
    const body: CreateIncidentRequest = data;

    return apiRequest<IncidentResponse>("/incidents", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const updateIncident = async (
    token: string,
    id: string,
    data: UpdateIncidentData,
) => {
    const body: UpdateIncidentRequest = data;

    return apiRequest<IncidentResponse>(`/incidents/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
};

export const deleteIncident = async (token: string, id: string) => {
    return apiRequest<DeleteIncidentResponse>(`/incidents/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
