require("dotenv").config();

const winston = require("winston");
const express = require("express");
const mongoose = require("mongoose");
const NotesRoute = require("./routers/notes");
// const cors = require("cors")

const app = express();

// app.use(cors())
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
    logger.info(`connected to mongoDb Atlas`);
  })
  .catch((error) => {
    logger.error(`something went wrong`, error);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`server is running on port ${PORT}`);
});
