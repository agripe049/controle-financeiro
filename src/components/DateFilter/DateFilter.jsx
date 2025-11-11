import { useState } from "react";
import "./DateFilter.css";

const DateFilter = ({ onFilter }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleFilter = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            alert("Selecione as duas datas")
            return;
        }
        onFilter(startDate, endDate);
    };

    return (
        <form className="date-filter" onSubmit={handleFilter}>
            <div>
                <label>Data inicial: </label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div>
                <label>Data final: </label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>

            <button type="submit">Filtrar</button>
        </form>
    )
};

export default DateFilter;