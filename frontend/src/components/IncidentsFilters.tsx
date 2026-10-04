import type { ChangeEvent } from "react";

interface IncidentFiltersProps {
    value: string;
    onChange: (category: string) => void;
}

function IncidentFilters({ value, onChange }: IncidentFiltersProps) {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="category-filter">Category:</label>

            <select id="category-filter" value={value} onChange={handleChange}>
                <option value="">All categories</option>

                <option value="fire">Fire</option>

                <option value="flood">Flood</option>

                <option value="accident">Accident</option>

                <option value="medical">Medical</option>

                <option value="other">Other</option>
            </select>
        </div>
    );
}

export default IncidentFilters;
