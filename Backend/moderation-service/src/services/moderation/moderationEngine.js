const analyzeText = require("./textAnalyzer");

const decideModeration = (toxicityScore) => {
  if (toxicityScore < 0.3) {
    return {
      decision: "APPROVED",
      reason: "Low toxicity detected"
    };
  }

  if (toxicityScore <= 0.7) {
    return {
      decision: "PENDING",
      reason: "Moderate toxicity, needs review"
    };
  }

  return {
    decision: "REJECTED",
    reason: "High toxicity detected"
  };
};

async function analyzeAndDecide(text) {
  const result = await analyzeText(text);

  const toxicityScore =
    result.attributeScores.TOXICITY.summaryScore.value;

  const moderationResult = decideModeration(toxicityScore);

  return {
    toxicityScore,
    ...moderationResult
  };
}

module.exports = {
  analyzeAndDecide,
  decideModeration
};
