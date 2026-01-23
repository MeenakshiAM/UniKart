// analyze.js

const { analyzeText } = require("./textAnalyzer");
const { decideModeration } = require("./moderationEngine");

const analyzeAndDecide = async (text) => {
  const toxicityScore = await analyzeText(text);
  const decisionResult = decideModeration(toxicityScore);

  return {
    toxicityScore,
    ...decisionResult
  };
};

module.exports = {
  analyzeAndDecide
};
