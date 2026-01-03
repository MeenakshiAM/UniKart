const { analyzeText } = require("./textAnalyzer");
const { analyzeImage } = require("./imageAnalyzer");

async function runModeration({ targetType, text, imageUrls }) {

  let textResult = { violation: "SAFE", score: 0 };
  let imageResult = { violation: "SAFE", score: 0 };

  if (text) {
    textResult = analyzeText(text);
  }

  if (imageUrls && imageUrls.length > 0) {
    imageResult = analyzeImage(imageUrls);
  }

  let violation = "SAFE";
  let action = "NONE";

  if (textResult.violation !== "SAFE") {
    violation = textResult.violation;
    action = "HIDE_CONTENT";
  }

  if (imageResult.violation !== "SAFE") {
    violation = imageResult.violation;
    action = "BLOCK_PRODUCT";
  }

  return {
    targetType,
    textScore: textResult.score,
    imageScore: imageResult.score,
    violation,
    action
  };
}

module.exports = { runModeration };
