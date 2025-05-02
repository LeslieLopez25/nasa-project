const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

const { getPagination } = require("../../services/query");

// Controller to handle GET /launches - returns a paginated lists of launches
async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query); // Extract pagination parameters from query
  const launches = await getAllLaunches(skip, limit); // Fetch launches from database
  return res.status(200).json(launches);
}

// Controller to handle POST /launches - schedules a new launch
async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  // Validate data format
  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === "Invalid Date") {
    if (isNaN(launch.launchDate)) {
      return res.status(400).json({
        error: "Invalid launch date",
      });
    }
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

// Controller to handle DELETE /launches:id - aborts a scheduled launch
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id); // Parse launch ID from URL

  const existsLaunch = await existsLaunchWithId(launchId);

  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId); // Mark launch as aborted
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }

  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
