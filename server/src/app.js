const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// Mount API routes under the "/v1" base path
app.use("/v1", api);

// Fallback route for client-side routing (e.g., React Router in SPA)
// Sends back index.html for any unknown route so the frontend can handle routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public", "index.html"));
});

module.exports = app;
