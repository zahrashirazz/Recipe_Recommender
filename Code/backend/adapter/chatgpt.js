const axios = require('axios');
const { OPENAI_API_KEY } = require('../config/keys');

async function completeChatMessage(ingredients, cuisine, name) {
    let sample = {
        "TranslatedRecipeName": "",
        "TranslatedInstructions": "",
        "TotalTimeInMins": 15,
        "Cuisine": "",
        "URL": "",
        "CleanedIngredients": [],
        "ImageUrl": "",
        "IngredentCount": 1,
        "Calories": 0
    };
    let userMessage = "Generate a receipe "
    if (name?.length > 0) {
        userMessage += "named " + name;
    } else {
        if (ingredients?.length > 0) {
            userMessage += " with the following ingredients : " + JSON.stringify(ingredients);
        }
        if (cuisine?.length > 0) {
            userMessage += " in cuisine: " + cuisine;
        }
    }

    userMessage += "  in the below format " + JSON.stringify(sample);
    console.log("Debug Chat GPT Message : ", userMessage);
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const requestData = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
    };

    const headers = {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
    };

    console.log("Request ", headers, requestData, apiUrl);
    return axios.post(apiUrl, requestData, { headers })
        .then(response => response.data)
        .catch(error => {
            console.log("ERROR ", JSON.stringify(error));
            throw error;
        });
}

module.exports = { completeChatMessage };
