import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import NavBar from "../components/Navbar";
import "./reservations.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Reservation() {
  const [date, setDate] = useState(new Date());
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/reservation/tables"
        );
        setTables(response.data.tables);
      } catch (error) {
        SetError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);
  // Set availble date for selection
  const filterDates = (date) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    return date >= today && date <= maxDate;
  };

  const handleSeeAvailavleSpots = () => {};
  return (
    <div>
      <NavBar />
      <header className="reservation">
        <h1>Reservation</h1>
        <p>Make reservation, Save your table a head!</p>
      </header>
      <section className="reservation-selector">
        <ul className="tables">
          {loading ? (
            <li>Loading Tables... </li>
          ) : error ? (
            <li>Error: {error}</li>
          ) : tables.length > 0 ? (
            tables.map((table) => (
              <li key={table.id}>
                Table Number: {table.id}, Seating Capacity:{" "}
                {table.seatingCapacity}, Location: {table.location}
              </li>
            ))
          ) : (
            <li>No tables available!</li>
          )}
        </ul>
        <p>Select Date</p>
        <DatePicker
          filterDate={filterDates}
          selected={date}
          onChange={(date) => setDate(date)}
        />
        <button>See Avaialbles Spots</button>
      </section>
    </div>
  );
}

export default Reservation;
