import { create } from "zustand";
import {
    createIncident,
    deleteIncident,
    getIncidents,
    updateIncident,
} from "../services/incident.api";
import type {
    CreateIncidentData,
    IncidentTypes,
    UpdateIncidentData,
} from "../types/incident";
import { useAuthStore } from "./auth.store";

interface IncidentStore {
    incidents: IncidentTypes[];
    loading: boolean;
    error: string | null;
    fetchIncidents: (category?: string) => Promise<void>;
    addIncident: (data: CreateIncidentData) => Promise<void>;
    editIncident: (id: string, data: UpdateIncidentData) => Promise<void>;
    removeIncident: (id: string) => Promise<void>;
    setIncidents: (incidents: IncidentTypes[]) => void;
    addIncidentFormSocket: (incident: IncidentTypes) => void;
    updateIncidentFromSocket: (incident: IncidentTypes) => void;
    deleteIncidentFromSocket: (id: string) => void;
}

export const useIncidentStore = create<IncidentStore>((set, get) => ({
    incidents: [],
    loading: false,
    error: null,
    fetchIncidents: async (category) => {
        const token = useAuthStore.getState().token;

        if (!token) {
            return;
        }

        try {
            set({
                loading: true,
                error: null,
            });

            const result = await getIncidents(token, category);

            set({
                incidents: result.data.incidents,
            });
        } catch (err) {
            set({
                error:
                    err instanceof Error
                        ? err.message
                        : "Failed to load incidents",
            });
        } finally {
            set({
                loading: false,
            });
        }
    },
    addIncident: async (data) => {
        const token = useAuthStore.getState().token;

        if (!token) {
            throw new Error("Authorization required");
        }

        await createIncident(token, data);
    },
    editIncident: async (id, data) => {
        const token = useAuthStore.getState().token;

        if (!token) {
            throw new Error("Authorization required");
        }

        await updateIncident(token, id, data);
    },
    removeIncident: async (id) => {
        const token = useAuthStore.getState().token;

        if (!token) {
            throw new Error("Authorization required");
        }

        await deleteIncident(token, id);
    },
    setIncidents: (incidents) => {
        set({ incidents });
    },
    addIncidentFormSocket: (incident) => {
        const exists = get().incidents.some((item) => item.id === incident.id);

        if (exists) {
            return;
        }

        set((state) => ({
            incidents: [...state.incidents, incident],
        }));
    },
    updateIncidentFromSocket: (incident) => {
        set((state) => ({
            incidents: state.incidents.map((item) =>
                item.id === incident.id ? incident : item,
            ),
        }));
    },
    deleteIncidentFromSocket: (id) => {
        set((state) => ({
            incidents: state.incidents.filter((item) => item.id !== id),
        }));
    },
}));
