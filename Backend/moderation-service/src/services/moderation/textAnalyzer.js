// Very basic text moderation (NO AI yet)

const bannedWords = ["scam", "fraud", "sex", "fake","porn","pornography","cocaneine","drug","MDMA","heroin","marijuana"];

function analyzeText(text) {
  let score = 0;

  if (!text) {
    return { violation: "SAFE", score: 0 };
  }

  const lowerText = text.toLowerCase();

  for (let word of bannedWords) {
    if (lowerText.includes(word)) {
      score += 1;
    }
  }

  if (score > 0) {
    return {
      violation: "TEXT_VIOLATION",
      score
    };
  }

  return {
    violation: "SAFE",
    score: 0
  };
}

module.exports = { analyzeText };