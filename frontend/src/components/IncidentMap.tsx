import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import { Icon, type LatLng } from "leaflet";
import type { IncidentTypes } from "../types/incident";

interface IncidentMapProps {
    incidents: IncidentTypes[];
    onMapClick: (location: { lat: number; lng: number }) => void;
}

interface MapClickHandlerProps {
    onMapClick: (location: { lat: number; lng: number }) => void;
}

const incidentIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
    useMapEvents({
        click: (event: { latlng: LatLng }) => {
            onMapClick({
                lat: event.latlng.lat,
                lng: event.latlng.lng,
            });
        },
    });

    return null;
}

function IncidentMap({ incidents, onMapClick }: IncidentMapProps) {
    return (
        <MapContainer
            center={[31.7683, 35.2137]}
            zoom={10}
            style={{
                height: "600px",
                width: "100%",
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler onMapClick={onMapClick} />

            {incidents.map((incident) => (
                <Marker
                    key={incident.id}
                    position={[incident.location.lat, incident.location.lng]}
                    icon={incidentIcon}
                >
                    <Popup>
                        <div>
                            <h3>{incident.title}</h3>

                            <p>{incident.description}</p>

                            <p>Category: {incident.category}</p>

                            <p>Status: {incident.status}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default IncidentMap;
