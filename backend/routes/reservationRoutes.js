import express from "express";
import {
  getAllTables,
  availableDateTime,
  makeReservation,
  seeAvailableSpots,
  seeMyReservations,
  cancelReservation,
} from "../controllers/reservationController.js";
// import { authenticate } from "../middlewares/authenticate.js";
const router = express.Router();

// router.post("/register", register); // Rout to register. POST http://localhost:8080/api/v1/users/register
router.get("/tables", getAllTables); // route to get all table. GET http://localhost:8080/api/v1/reservation/tables
router.get("/availableDateTime", availableDateTime); // route to get all table. GET http://localhost:8080/api/v1/reservation/availableDateTime
router.post("/makeReservation", makeReservation); // POST http://localhost:8080/api/v1/reservation/makeReservation
router.get("/seeAvailableSpots", seeAvailableSpots); // GET http://localhost:8080/api/v1/reservation/seeAvailableSpots
router.get("/seeMyReservations", seeMyReservations); // GET http://localhost:8080/api/v1/reservation/seeMyReservations
router.put("/cancelReservation", cancelReservation); // PUT http://localhost:8080/api/v1/reservation/seeMyReservations
// router.put("/resetPassword", resetPassword); // Routes to reset Password. You will be directed from email address. PUT http://localhost:8000/api/v1/users/resetPassword Supply newPassword, resetLink in req.body

export default router;
