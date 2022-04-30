const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./server/database/connection");
const inventoryRouter = require("./server/routes/inventoryRouter");

const app = express();
dotenv.config({ path: ".env" });

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

//Middlewares
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// api router
app.use("/api/inventory", inventoryRouter);

//front-end entry
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Starting server");
});
