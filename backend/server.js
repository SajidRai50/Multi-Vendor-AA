const dotenv = require("dotenv");

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "./backend/config/.env" });
}

const app = require("./app");
const connectDatabase = require("./dataBase/database.js");

connectDatabase();

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});