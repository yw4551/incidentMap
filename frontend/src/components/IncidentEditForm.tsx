import { useState, type FormEvent } from "react";
import type { CreateIncidentData } from "../types/incident";
import { useIncidentStore } from "../stores/incidents.store";

interface IncidentFormProps {
    location: {
        lat: number;
        lng: number;
    };
    onCreated: () => void;
}

function IncidentForm({ location, onCreated }: IncidentFormProps) {
    const addIncident = useIncidentStore((state) => state.addIncident);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [category, setCategory] =
        useState<CreateIncidentData["category"]>("other");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            setLoading(true);
            setError("");

            await addIncident({
                title: title.trim(),
                description: description.trim(),
                category,
                location,
            });

            setTitle("");
            setDescription("");
            setCategory("other");

            onCreated();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to create incident",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Incident</h2>

            <div>
                <label htmlFor="title">Title</label>

                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    maxLength={100}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description</label>

                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    maxLength={1000}
                    required
                />
            </div>

            <div>
                <label htmlFor="category">Category</label>

                <select
                    id="category"
                    value={category}
                    onChange={(event) =>
                        setCategory(
                            event.target
                                .value as CreateIncidentData["category"],
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

            <p>Latitude: {location.lat}</p>

            <p>Longitude: {location.lng}</p>

            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Incident"}
            </button>

            <button type="button" onClick={onCreated} disabled={loading}>
                Cancel
            </button>

            {error && <p>{error}</p>}
        </form>
    );
}

export default IncidentForm;
