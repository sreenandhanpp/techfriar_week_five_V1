const { google } = require('googleapis')
const dotenv = require('dotenv');
dotenv.config();


const oauthClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
);

oauthClient.setCredentials({ refresh_token : process.env.GOOGLE_REFRESH_TOKEN });

module.exports = oauthClient;