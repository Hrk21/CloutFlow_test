const express = require("express");
const rateLimitMiddleware = require("./middleware/rateLimiter");
const app = express();
app.use(express.json());
app.use(rateLimitMiddleware);
// A simple API route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "working",
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});