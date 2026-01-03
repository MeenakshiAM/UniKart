const { runModeration } = require("./src/services/moderation/moderationEngine");

const result = runModeration({
  targetType: "REVIEW",
  text: "You are an idiot and this product is trash",
  imageUrls: []
});

console.log("MODERATION RESULT:");
console.log(result);
