import type {
    CreateIncidentData,
    IncidentTypes,
    UpdateIncidentData,
} from "./incident";
import type { UserTypes } from "./user";

export type ApiSuccess<T> = {
    success: true;
    data: T;
};

export type ApiError = {
    success: false;
    message: string;
};

export type AuthResponse = ApiSuccess<{
    user: UserTypes;
    token: string;
}>;

export type MeResponse = ApiSuccess<{ user: UserTypes }>;

export type IncidentsResponse = ApiSuccess<{
    incidents: IncidentTypes[];
}>;

export type IncidentResponse = ApiSuccess<{
    incidents: any;
    incident: IncidentTypes;
}>;

export type DeleteIncidentResponse = ApiSuccess<{
    message: string;
}>;

export type CreateIncidentRequest = CreateIncidentData;
export type UpdateIncidentRequest = UpdateIncidentData;
