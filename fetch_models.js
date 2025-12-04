const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function main() {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
    // Use a model to get the list? No, there is no direct list method on the instance easily accessible in all versions.
    // But we can use the API directly as I did in the route.

    // Let's use the fetch approach again but save to file.
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();
        const fs = require('fs');
        fs.writeFileSync('models_list.json', JSON.stringify(data, null, 2));
        console.log('Models saved to models_list.json');
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
