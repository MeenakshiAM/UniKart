const { analyzeAndDecide } = require("./src/services/moderation/moderationEngine");

(async () => {
  const result = await analyzeAndDecide(
    "You are stupid and disgusting"
  );
  console.log(result);
})();
