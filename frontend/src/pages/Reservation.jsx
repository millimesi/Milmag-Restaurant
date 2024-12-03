import { React, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import NavBar from "../components/Navbar";
import "./reservations.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Reservation() {
  const [date, setDate] = useState(new Date());
  const [availableTables, setAvailbleTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [tables, setTables] = useState([]);
  const [specialRequest, setSpecialRequest] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [previousReservations, setPreviousReservations] = useState([]);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        // Get all avaialble reservations
        const response = await axios.get(
          "http://localhost:8080/api/v1/reservation/tables"
        );
        setTables(response.data.tables);

        // Get Current User reservations

        const previousReservationsRes = await axios.post(
          "http://localhost:8080/api/v1/reservation/seeMyReservations",
          {
            userId: "7406fbc7-31d3-4319-9817-68bd56af75f9",
          }
        );
        setPreviousReservations(previousReservationsRes.data);
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

  const handleSeeAvailavleSpots = async () => {
    const userId = "7406fbc7-31d3-4319-9817-68bd56af75f9"; // this will be accessed from frontend authentication method
    const formattedDate = new Date(date).toLocaleDateString("en-CA");

    const requestData = {
      userId: userId,
      reservationDate: formattedDate,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/reservation/seeAvailableSpots",
        requestData
      );
      console.log(response.data);
      setAvailbleTables(response.data);
      console.log(`AvailableTables are ${JSON.stringify(availableTables)}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleMakeReservation = async () => {
    const requestData = {
      reservationDate: new Date(date).toLocaleDateString("en-CA"),
      timeSlot: selectedTimeSlot,
      specialRequest: specialRequest || "",
      userId: "7406fbc7-31d3-4319-9817-68bd56af75f9",
      ReservationTableId: selectedTable,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/reservation/makeReservation",
        requestData
      );
      console.log(response.data);
      if (response.status === 200) {
        setFlashMessage("Reservation Successfull!");
      } else {
        setFlashMessage("Failed to make a reservation.");
      }

      // reload the page
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <NavBar />
      <header className="reservation">
        <h1>Reservation</h1>
        <p>Make reservation, Save your table a head!</p>
      </header>

      {/* Display Available Tables with data picker*/}
      <section className="reservation-selector">
        <h4>Available Tables</h4>
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
        <h4>Previous Reservations: {previousReservations.length}</h4>
        {previousReservations.length > 0 && (
          <ul>
            {previousReservations.map((reservation) => (
              <li key={reservation.id}>
                Date: {reservation.reservationDate}, Time Slot:
                {reservation.timeSlot}, Table Number:
                {reservation.ReservationTableId}, Status: {reservation.status}
              </li>
            ))}
          </ul>
        )}
        <label htmlFor="date">Select Date:</label>
        <DatePicker
          filterDate={filterDates}
          selected={date}
          onChange={(date) => setDate(date)}
        />
        <button onClick={handleSeeAvailavleSpots}>See Avaialbles Spots</button>

        {/* If availble tables exists show them make thr */}
        {availableTables.length > 0 && (
          <div>
            <h3>
              Available Reservation Spots on {date.toLocaleDateString("en-CA")}
            </h3>
            {availableTables.map((table) => (
              <div key={table.ReservationTableId}>
                <h4>TableNumber {table.ReservationTableId}</h4>
                <ul>
                  {table.availableTimeSlot.map((slot, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setSelectedTable(table.ReservationTableId);
                        setSelectedTimeSlot(slot);
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedTable === table.ReservationTableId &&
                          selectedTimeSlot === slot
                            ? "rgb(129, 22, 22)"
                            : "transparent",
                        color:
                          selectedTable === table.ReservationTableId &&
                          selectedTimeSlot === slot
                            ? "white"
                            : "black",
                      }}
                    >
                      {slot}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {selectedTable && selectedTimeSlot && (
          <div>
            <label htmlFor="specialRequest">Special Request:</label>
            <textarea
              id="specialRequest"
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
              placeholder="Add any special request here..."
            />

            <p>
              <strong>Reservation Summary:</strong>
              Date: {new Date(date).toLocaleDateString("en-CA")}, Table Number:{" "}
              {selectedTable}, Time Slot:
              {selectedTimeSlot}, Special Request: {specialRequest}
            </p>
            <button onClick={handleMakeReservation}>Make Reservation</button>
            {flashMessage && (
              <div>
                <p>{flashMessage}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Reservation;
