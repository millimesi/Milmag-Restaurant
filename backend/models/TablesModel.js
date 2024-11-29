import { DataTypes } from "sequelize";
import sequelize from "../utils/dbConfig.js";

const ReservationTable = sequelize.define(
  "ReservationTable",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Enable auto-increment
      allowNull: false,
    },
    seatingCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // This enables automatic createdAt and updatedAt
    tableName: "ReservationTables",
  }
);

export default ReservationTable;
