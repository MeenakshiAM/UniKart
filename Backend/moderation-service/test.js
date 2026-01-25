require("dotenv").config();
const connectDB = require("./src/config/db");
const { analyzeAndDecide } = require("./src/services/moderation/moderationEngine");

(async () => {
  await connectDB();

  const result = await analyzeAndDecide(
    "You are stupid and disgusting"
  );

  console.log(result);
  process.exit(0);
})();
