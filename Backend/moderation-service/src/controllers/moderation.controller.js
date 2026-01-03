const moderationService = require("../services/moderation/moderationEngine.service");

exports.testModeration = async (req, res) => {
  try {
    const { targetType, text, imageUrls } = req.body;

    const result = await moderationService.runModeration({
      targetType,
      text,
      imageUrls
    });

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
