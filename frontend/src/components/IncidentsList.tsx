// src/components/IncidentList.tsx

import { useState } from "react";
import type { IncidentTypes } from "../types/incident";
import { useAuthStore } from "../stores/auth.store";
import IncidentEditForm from "./IncidentEditForm";
import { useIncidentStore } from "../stores/incidents.store";

interface IncidentListProps {
    incidents: IncidentTypes[];
}

function IncidentList({ incidents }: IncidentListProps) {
    const [editingIncident, setEditingIncident] =
        useState<IncidentTypes | null>(null);

    const [deleteError, setDeleteError] = useState<string | null>(null);

    const removeIncident = useIncidentStore((state) => state.removeIncident);

    const user = useAuthStore((state) => state.user);

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this incident?",
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeleteError(null);

            await removeIncident(id);
        } catch (err) {
            setDeleteError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete incident",
            );
        }
    };

    const canModify = (incident: IncidentTypes) => {
        return user?.role === "admin" || incident.createdBy === user?.id;
    };

    return (
        <section>
            <h2>Incident List</h2>

            {deleteError && <p>{deleteError}</p>}

            {incidents.length === 0 ? (
                <p>No incidents found.</p>
            ) : (
                <ul>
                    {incidents.map((incident) => (
                        <li key={incident.id}>
                            <h3>{incident.title}</h3>

                            <p>{incident.description}</p>

                            <p>Category: {incident.category}</p>

                            <p>Status: {incident.status}</p>

                            <p>Latitude: {incident.location.lat}</p>

                            <p>Longitude: {incident.location.lng}</p>

                            <p>
                                Created:{" "}
                                {new Date(incident.createdAt).toLocaleString()}
                            </p>

                            {canModify(incident) && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingIncident(incident)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleDelete(incident.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}

                            {editingIncident?.id === incident.id && (
                                <IncidentEditForm
                                    incident={incident}
                                    onClose={() => setEditingIncident(null)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default IncidentList;
