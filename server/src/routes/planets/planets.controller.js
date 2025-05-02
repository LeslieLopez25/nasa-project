const { getAllPlanets } = require("../../models/planets.model");

// Controller function to handle GET requests for all habitable planets
async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
};
