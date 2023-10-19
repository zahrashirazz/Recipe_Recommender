const axios = require("axios");
const { PEXEL_API_KEY } = require("../config/keys");

const apiKey = PEXEL_API_KEY;

module.exports = {
  getPhotoForResource: async (title) => {
    const apiUrl = `https://api.pexels.com/v1/search?query=${title}&per_page=1`;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (response?.data?.photos?.length > 0) {
      return response?.data?.photos[0].src.original;
    }
    return "";
  },
};
