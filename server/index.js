const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const globalErrorHandler = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();
// connect to the database
connectDB();
const path = require("path");
const app = express();
app.use(express.json());

app.use(cors());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/account", passwordResetRoutes);
// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  //(`Server listening on port ${PORT}`);
});
