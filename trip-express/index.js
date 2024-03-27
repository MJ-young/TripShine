const express = require("express");
const connectDB = require("./src/config/db");
const routes = require("./src/routes");
const cors = require("cors");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1200000 }, // 设置cookie的过期时间为20分钟（20 * 60 * 1000 毫秒）
  })
);
connectDB();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"], // 明确允许的头部
  })
);

app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
