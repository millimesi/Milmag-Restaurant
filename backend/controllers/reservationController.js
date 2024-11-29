import ReservationTable from "../models/TablesModel.js";
import Reservation from "../models/ReservationModel.js";
import { Op } from "sequelize";

// availableTimeSlot with two hours difference
// starting from morning 1am up to night 9pm
const timeSlots = [
  "7am-9am",
  "9am-11am",
  "11am-1pm",
  // "1pm-3pm",
  // "3pm-5pm",
  // "5pm-7pm",
  // "7pm-9pm",
];

export const getAllTables = async (req, res) => {
  try {
    const reservationTables = await ReservationTable.findAll({ raw: true });
    // console.log(reservationTables);
    return res.status(200).json({ tables: reservationTables });
  } catch (error) {
    // console.log(`Error: ${error}`);
    return res.status(500).json({ error: error.message });
  }
};

export const availableDateTime = (req, res) => {
  const reservationFutureAvailablity = 30;
  const beginningDate = new Date();
  const endDate = new Date(beginningDate);
  endDate.setDate(beginningDate.getDate() + reservationFutureAvailablity);

  // Format the dates to 'YYYY-MM-DD' format for DATEONLY
  const formattedBeginningDate = beginningDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  // availableTime object
  const availableDate = {
    beginningDate: formattedBeginningDate,
    endDate: formattedEndDate,
  };

  return res.status(200).json({
    availableDate: availableDate,
    timeSlots: timeSlots,
  });
};

export const seeAvailableSpots = async (req, res) => {
  try {
    const { user_id, reservationDate } = req.body;

    // The user_id validitiy should be checked by the authenticate mildleware

    // Validate the reservationData if its today or in the future
    const today = new Date().toISOString().split("T")[0];
    const formatedReservationDate = new Date(
      reservationDate
    ).toLocaleDateString("en-CA");

    if (formatedReservationDate < today) {
      return res.status(400).json({
        error: "The reservation date should be today or in future.",
      });
    }

    // Find the reservations in the reservationDate
    const reservations = await Reservation.findAll({
      attributes: ["ReservationTableId", "timeSlot"],
      where: { reservationDate: formatedReservationDate },
      raw: true,
    });

    console.log(reservations);

    // Get reservation tables
    const reservationTables = await ReservationTable.findAll({
      attributes: ["id"],
      raw: true,
    });

    const reservationTablesList = reservationTables.map(
      (reservationTable) => reservationTable.id
    );
    console.log(reservationTablesList);

    // Build available reservations list
    const availableReservations = reservationTablesList.map(
      (ReservationTableId) => {
        // Get all reservations for this table
        const reservedSlots = reservations
          .filter((res) => res.ReservationTableId === ReservationTableId)
          .map((res) => res.timeSlot);

        // Calculate available time slots
        const availableTimeSlot = timeSlots.filter(
          (slot) => !reservedSlots.includes(slot)
        );

        return {
          ReservationTableId,
          availableTimeSlot,
        };
      }
    );

    return res.status(200).json(availableReservations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const makeReservation = async (req, res) => {
  try {
    // the userId should be validated by the authenticate
    const {
      reservationDate,
      timeSlot,
      specialRequest,
      userId,
      ReservationTableId,
    } = req.body;

    // Validate if all fields are filled
    if (
      !(
        reservationDate &&
        timeSlot &&
        specialRequest &&
        userId &&
        ReservationTableId
      )
    ) {
      return res.status(400).json({
        error:
          "All fields(reservationDate, timeSlot, specialRequest, userId, ReservationTableId,) are compulsory",
      });
    }

    // Validate the resrvation Date
    const today = new Date().toISOString().split("T")[0];
    const formatedReservationDate = new Date(
      reservationDate
    ).toLocaleDateString("en-CA");

    if (formatedReservationDate < today) {
      return res.status(400).json({
        error: "The reservation date should be today or in future.",
      });
    }
    // validate the time slot
    if (!timeSlots.includes(timeSlot)) {
      return res.status(400).json({
        error: `Invalid time slot, your time slot should be in this list of [${timeSlots}]`,
      });
    }

    // Validate the tableId
    const table = await ReservationTable.findOne({
      where: { id: parseInt(ReservationTableId, 10) },
      raw: true, // Parse the string into the integer datatype
    });

    if (!table) {
      return res.status(400).json({
        error: `The table you requested, "${ReservationTableId}" doesn't exists`,
      });
    }

    // Check if the table is reserved on that day and time slot
    const isReserved = await Reservation.findAll({
      where: {
        reservationDate: formatedReservationDate,
        ReservationTableId: ReservationTableId,
        timeSlot: timeSlot,
      },
    }); // Returns list of all reservation or empty list

    if (isReserved.length != 0) {
      return res.status(400).json({
        error: `Sorry! The table is reserved on this day and time slot. Please try on another day or table or time slot`,
      });
    }
    // Specifiy status
    const status = "confirmed"; // this should be done bey the admin in future

    // Specify the resrvation payment
    const reservationPayment = false; // this should be made by some logic related with payment system

    const newResrvation = {
      reservationDate: formatedReservationDate,
      timeSlot: timeSlot,
      specialRequest: specialRequest,
      status: status,
      reservationPayment,
      userId: userId,
      ReservationTableId: ReservationTableId,
    };

    const createdReservation = await Reservation.create(newResrvation);
    return res.status(200).json({
      reservationId: createdReservation.id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const seeMyReservations = async (req, res) => {
  try {
    const { userId } = req.body;

    const reservationList = await Reservation.findAll({
      where: { userId: userId },
      raw: true,
    });

    return res.status(200).json(reservationList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const { userId, reservationId } = req.body;

    // Validate the existance of the reservation
    const reservation = await Reservation.findOne({
      where: {
        id: reservationId,
        status: {
          [Op.or]: ["confirmed", "pending"],
        },
      },
    });

    if (!reservation) {
      return res
        .status(400)
        .json({
          error:
            "A reservation with this id is not found or it is canceled or completed",
        });
    }

    const reservationList = await Reservation.update(
      {
        status: "canceled",
      },
      { where: { id: reservationId } }
    );

    console.log(reservationList);

    return res.status(200).json({
      message: "Reservation is successfully canceled",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
