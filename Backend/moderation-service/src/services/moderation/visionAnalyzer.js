require("dotenv").config();
const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient();

const moderateImage = async (imageUrl) => {
  try {
    const [result] = await client.safeSearchDetection({
      image: {
        source: { imageUri: imageUrl }
      }
    });

    const detections = result.safeSearchAnnotation || {};

    const {
      adult = "UNKNOWN",
      violence = "UNKNOWN",
      racy = "UNKNOWN"
    } = detections;

    const allowedLevels = ["VERY_UNLIKELY", "UNLIKELY"];

    const isAllowed =
      allowedLevels.includes(adult) &&
      allowedLevels.includes(violence) &&
      allowedLevels.includes(racy);

    return {
      isAllowed,
      imageUrl,
      details: { adult, violence, racy }
    };

  } catch (error) {
    console.error("Vision API error:", error.message);

    return {
      isAllowed: false,
      imageUrl,
      details: null,
      error: error.message
    };
  }
};

module.exports = { moderateImage };