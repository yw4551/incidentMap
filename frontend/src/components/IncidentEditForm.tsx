import React, { useState } from "react";
import type { IncidentTypes } from "../types/incident";
import { useIncidentStore } from "../stores/incidents.store";

interface IncidentEditFormProps {
    incident: IncidentTypes;
    onClose: () => void;
}

function IncidentEditForm({ incident, onClose }: IncidentEditFormProps) {
    const editIncident = useIncidentStore((state) => state.editIncident);

    const [title, setTitle] = useState(incident.title);
    const [description, setDescription] = useState(incident.description);
    const [category, setCategory] = useState<IncidentTypes["category"]>(
        incident.category,
    );
    const [status, setStatus] = useState<IncidentTypes["status"]>(
        incident.status,
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            await editIncident(incident.id, {
                title: title.trim(),
                description: description.trim(),
                category,
                status,
            });

            onClose();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to update incident",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>Edit Incident</h4>

            <div>
                <label htmlFor={`edit-title-${incident.id}`}>Title</label>

                <input
                    id={`edit-title-${incident.id}`}
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    maxLength={100}
                    required
                />
            </div>

            <div>
                <label htmlFor={`edit-description-${incident.id}`}>
                    Description
                </label>

                <textarea
                    id={`edit-description-${incident.id}`}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    maxLength={1000}
                    required
                />
            </div>

            <div>
                <label htmlFor={`edit-category-${incident.id}`}>Category</label>

                <select
                    id={`edit-category-${incident.id}`}
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target.value as IncidentTypes["category"],
                        )
                    }
                >
                    <option value="fire">Fire</option>
                    <option value="flood">Flood</option>
                    <option value="accident">Accident</option>
                    <option value="medical">Medical</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label htmlFor={`edit-status-${incident.id}`}>Status</label>

                <select
                    id={`edit-status-${incident.id}`}
                    value={status}
                    onChange={(event) =>
                        setStatus(event.target.value as IncidentTypes["status"])
                    }
                >
                    <option value="open">Open</option>
                    <option value="in_progress">In progress</option>
                    <option value="closed">Closed</option>
                </select>
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>

            <button type="button" onClick={onClose} disabled={loading}>
                Cancel
            </button>

            {error && <p>{error}</p>}
        </form>
    );
}

export default IncidentEditForm;
