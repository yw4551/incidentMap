type CategoryType = "fire" | "flood" | "accident" | "medical" | "other";

type StatusType = "open" | "in_progress" | "closed";

interface LocationTypes {
    lat: number;
    lng: number;
}

export interface IncidentTypes {
    id: string;
    title: string;
    description: string;
    category: CategoryType;
    status: StatusType;
    location: LocationTypes;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateIncidentData {
    title: string;
    description: string;
    category: CategoryType;
    location: LocationTypes;
}

export interface UpdateIncidentData {
    title?: string;
    description?: string;
    category?: CategoryType;
    status?: StatusType;
    location?: LocationTypes;
}
