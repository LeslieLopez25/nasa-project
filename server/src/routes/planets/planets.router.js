const express = require("express");

const planetsRouter = express.Router();

const { httpGetAllPlanets } = require("./planets.controller");

// When someone makes a GET request to this route, it calls the controller function to fetch and return planet data
planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
