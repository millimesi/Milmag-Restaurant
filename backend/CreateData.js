//  This is not a part of the program
// This for the purpose of populating the database for test purpose
import Reservation from "./models/ReservationModel.js";
import ReservationTable from "./models/TablesModel.js";
import User from "./models/userModel.js";
import sequelize from "./utils/dbConfig.js";
import bcrypt from "bcrypt";
const PasswordMillion = await bcrypt.hash("1234", 8);
const passwordMilli = await bcrypt.hash("1234", 8);

const users = [
  {
    firstName: "Million",
    lastName: "Mesi",
    email: "millionmesi1@gmail.com",
    phoneNumber: "0910120891",
    password: PasswordMillion,
    isAdmin: true,
  },
  {
    firstName: "Milli",
    lastName: "Mesi",
    email: "millimesi106@gmail.com",
    phoneNumber: "0910120891",
    password: passwordMilli,
    isAdmin: false,
  },
];

const tables = [
  {
    seatingCapacity: 4,
    location: "Indoor",
  },
  {
    seatingCapacity: 4,
    location: "Near Chef",
  },
  {
    seatingCapacity: 3,
    location: "Outdoor",
  },
  {
    seatingCapacity: 2,
    location: "Near Window",
  },
];
// Create rows
const createTables = async () => {
  await sequelize.sync({ force: true });
  console.log("Associations created successfully.");
  for (const table of tables) {
    const createdTable = await ReservationTable.create({
      seatingCapacity: table.seatingCapacity,
      location: table.location,
    });
    console.log(createdTable && "Row Insereted");
  }

  // Create the users table
  for (const user of users) {
    const userRecord = await User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: user.password,
      isAdmin: user.isAdmin,
    });
    console.log(userRecord && "user recorded!");
  }
};

createTables();
