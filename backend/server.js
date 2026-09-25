require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const applicationRoutes = require("./routes/route");

const app = express();

app.use(express.json());
app.use("/applications", applicationRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
