require("dotenv").config();

const winston = require("winston");
const express = require("express");
const mongoose = require("mongoose");
const NotesRoute = require("./routers/notes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ---------------------------------------   Winston Log Error ----------------

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
});




// -------------------------------------------  Route  ---------------
app.use("/notes", NotesRoute);

// ----------------------------------------Database Connection -----------------------

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    logger.info(`Connected to mongoDB Atlas`);
  })
  .catch((error) => {
    logger.info(`something went wrong `, error);
  });

// --------------------- PORT Conntect -------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});
