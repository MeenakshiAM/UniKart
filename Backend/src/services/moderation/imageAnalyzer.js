function analyzeImage(imageUrls) {
  if (!imageUrls || imageUrls.length === 0) {
    return { violation: "SAFE", score: 0 };
  }

  //assume all images are safe
  return {
    violation: "SAFE",
    score: 0
  };
}

module.exports = { analyzeImage };


