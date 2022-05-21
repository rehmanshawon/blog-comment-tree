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

const app = express();
app.use(express.json());

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/account", passwordResetRoutes);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
