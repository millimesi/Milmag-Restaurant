import { React, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import NavBar from "../components/Navbar";
import "./reservations.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Reservation() {
  const [date, setDate] = useState(new Date());
  const [availableTables, setAvailbleTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [tables, setTables] = useState([]);
  const [specialRequest, setSpecialRequest] = useState("No special request");
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [previousReservations, setPreviousReservations] = useState([]);
  const [showPopover, setShowPopover] = useState(false);

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
            userId: JSON.parse(localStorage.getItem("user")).id,
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
    const userId = JSON.parse(localStorage.getItem("user")).id; // this will be accessed from frontend authentication method
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
      userId: JSON.parse(localStorage.getItem("user")).id,
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

  const togglePopover = () => {
    setShowPopover((prev) => !prev);
  };

  const handleCancelReservationInPopover = () => {
    setSelectedTable("");
    setSelectedTimeSlot("");
    setSpecialRequest("");
    setFlashMessage("");
    setDate(new Date());
    togglePopover();
  };

  const handleCancelReservation = () => {
    setSelectedTable("");
    setSelectedTimeSlot("");
    setSpecialRequest("");
    setFlashMessage("");
    setDate(new Date());
  };

  const cancleReservation = async (reservation) => {
    const request = {
      userId: JSON.parse(localStorage.getItem("user")).id,
      reservationId: reservation.id,
    };
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/reservation/cancelReservation",
        request
      );
      console.log(response.data);
      if (response.status === 200) {
        setFlashMessage("Reservation Cancelled Successfully!");
      } else {
        setFlashMessage("Failed to cancel the reservation.");
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
      <div className="reservationContainer">
        <header className="reservation">
          <h1>Reservation</h1>
          <p>Make reservation, Save your table a head!</p>
        </header>
        {/* Display Available Tables with data picker*/}
        <section className="reservation-selector">
          <h5>Tables</h5>
          <div className="tables">
            {loading ? (
              <div>Loading Tables... </div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : tables.length > 0 ? (
              tables.map((table) => (
                <div className="tableDesc" key={table.id}>
                  <img src="" alt="Table" />
                  <h5>Table {table.id}</h5>
                  <p>
                    Seating Capacity: {table.seatingCapacity} Location:{" "}
                    {table.location}
                  </p>
                </div>
              ))
            ) : (
              <li>No tables available!</li>
            )}
          </div>
          <h5>My Reservations</h5>
          {previousReservations.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Table Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {previousReservations.map((reservation, index) => (
                  <tr key={reservation.id}>
                    <td>{index + 1}</td>
                    <td>{reservation.reservationDate}</td>
                    <td>{reservation.timeSlot}</td>
                    <td>{reservation.ReservationTableId}</td>
                    <td>{reservation.status}</td>
                    <td>
                      <button onClick={() => cancleReservation(reservation)}>
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {/* popover Content */}
          {showPopover && (
            <div className="makeReservation">
              <div className="closeIcon">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={handleCancelReservationInPopover}
                  className="closePopove"
                />
              </div>
              <h5 className="popoverHead">Make New Reservation</h5>
              <div className="datePickerForm">
                <label htmlFor="date">Select Date:</label>
                <DatePicker
                  filterDate={filterDates}
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
              <div className="seeSpotsButton">
                <button onClick={handleSeeAvailavleSpots}>
                  See Avaialbles Spots
                </button>
              </div>
              {/* If availble tables exists show them make thr */}
              {availableTables.length > 0 && (
                <div className="spots">
                  <h5>
                    Available Reservation Spots on{" "}
                    {date.toLocaleDateString("en-CA")}
                  </h5>
                  {availableTables.map((table) => (
                    <div key={table.ReservationTableId}>
                      <h5>Table {table.ReservationTableId}</h5>
                      <div className="gridContainerOfSlots">
                        {table.availableTimeSlot.map((slot, index) => (
                          <div
                            className="slot"
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
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedTable && selectedTimeSlot && (
                <div>
                  <div className="specialRequestForm">
                    <label htmlFor="specialRequest">Special Request:</label>
                    <textarea
                      className="specialRequestInput"
                      id="specialRequest"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="Add any special request here..."
                    />
                  </div>
                  <div className="continueCloseButtons">
                    <button onClick={togglePopover}>Continue</button>
                    <button onClick={handleCancelReservationInPopover}>
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedTable && selectedTimeSlot && specialRequest ? (
            <div>
              <p className="reservationSummary">
                <strong>Reservation Summary: </strong>
                Date: {new Date(date).toLocaleDateString("en-CA")}, Table Number:{" "}
                {selectedTable}, Time Slot:
                {selectedTimeSlot}, Special Request: {specialRequest}
              </p>
              <div className="continueCloseButtons">
                <button onClick={handleMakeReservation}>Make Reservation</button>
                <button onClick={handleCancelReservation}>Cancel</button>
              </div>
              {flashMessage && (
                <div>
                  <p>{flashMessage}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="continueCloseButtons">
              <button onClick={togglePopover}>Make New Reservation</button>
            </div>
          )}
        </section>
            </div>
      </div>
  );
}

export default Reservation;
