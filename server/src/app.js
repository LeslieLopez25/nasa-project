const express = require("express");
cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost3000",
  })
);
app.use(express.json());
app.use(planetsRouter);

module.exports = app;
