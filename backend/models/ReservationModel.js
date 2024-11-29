import { DataTypes } from "sequelize";
import sequelize from "../utils/dbConfig.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    reservationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeSlot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialRequest: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("confirmed", "pending", "canceled", "completed"),
      defaultValue: "confirmed",
      allowNull: false,
    },
    reservationPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // Forien Keys
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users", // name of the table to reference
        key: "id", // primary key of the referenced table
      },
    },
    ReservationTableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "ReservationTables", // name of the table to reference
        key: "id", // primary key of the referenced table
      },
    },
  },
  {
    timestamps: true, // This enables automatic createdAt and updatedAt
    tableName: "Reservations",
  }
);

export default Reservation;
