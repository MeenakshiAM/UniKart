const axios = require("axios");
const MODERATION_SERVICE_URL =
  process.env.MODERATION_SERVICE_URL || "http://localhost:4003";

class ModerationService {

  async moderateContent(text) {

    try {

      const response = await axios.post(
        `${MODERATION_SERVICE_URL}/api/moderation/analyze`,
        { text }
      );

      return response.data;

    } catch (error) {

      console.error("Moderation service unavailable:", error.message);

      return {
        isAllowed: true,
        reason: null
      };

    }

  }

}

module.exports = new ModerationService();