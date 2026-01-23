require("dotenv").config();
const app = require("./src/app"); // ✅ correct
// const connectDB = require("./src/config/db"); // ❌ NOT needed here, already called in app.js

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Moderation Service running on port ${PORT}`);
});
