import { useEffect, useState } from "react";
import IncidentForm from "../components/IncidentForm";
import IncidentMap from "../components/IncidentMap";
import { useAuthStore } from "../stores/auth.store";
import {
    disconnectSocket,
    subscribeToIncidentEvents,
} from "../services/socket";
import { useIncidentStore } from "../stores/incidents.store";
import IncidentFilters from "../components/IncidentsFilters";
import IncidentList from "../components/IncidentsList";

function Home() {
    const [selectedLocation, setSelectedLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const [category, setCategory] = useState("");

    const user = useAuthStore((state) => state.user);

    const logout = useAuthStore((state) => state.logout);

    const incidents = useIncidentStore((state) => state.incidents);

    const loading = useIncidentStore((state) => state.loading);

    const error = useIncidentStore((state) => state.error);

    const fetchIncidents = useIncidentStore((state) => state.fetchIncidents);

    const addIncidentFromSocket = useIncidentStore(
        (state) => state.addIncidentFromSocket,
    );

    const updateIncidentFromSocket = useIncidentStore(
        (state) => state.updateIncidentFromSocket,
    );

    const deleteIncidentFromSocket = useIncidentStore(
        (state) => state.deleteIncidentFromSocket,
    );

    useEffect(() => {
        fetchIncidents(category || undefined);
    }, [category, fetchIncidents]);

    useEffect(() => {
        const unsubscribe = subscribeToIncidentEvents({
            onCreated: addIncidentFromSocket,

            onUpdated: updateIncidentFromSocket,

            onDeleted: ({ id }) => deleteIncidentFromSocket(id),
        });

        return () => {
            unsubscribe();
            disconnectSocket();
        };
    }, [
        addIncidentFromSocket,
        updateIncidentFromSocket,
        deleteIncidentFromSocket,
    ]);

    const handleLogout = () => {
        disconnectSocket();
        logout();
    };

    const handleIncidentCreated = () => {
        setSelectedLocation(null);
    };

    return (
        <main>
            <header>
                <div>
                    <h1>Emergency Incident Map</h1>

                    {user && <p>Logged in as: {user.email}</p>}
                </div>

                <button type="button" onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <section>
                <h2>Incident Map</h2>

                <IncidentFilters value={category} onChange={setCategory} />

                {loading && <p>Loading incidents...</p>}

                {error && <p>{error}</p>}

                <IncidentMap
                    incidents={incidents}
                    onMapClick={setSelectedLocation}
                />
            </section>

            {selectedLocation && (
                <section>
                    <IncidentForm
                        location={selectedLocation}
                        onCreated={handleIncidentCreated}
                    />
                </section>
            )}

            <IncidentList incidents={incidents} />
        </main>
    );
}

export default Home;
