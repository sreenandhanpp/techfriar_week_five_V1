const nodemailer = require('nodemailer')
// const getToken = require('./generateAccessToken')
const dotenv = require('dotenv');
dotenv.config();

 

// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         type:"OAuth2",
//         user:process.env.ADMIN_EMAIL,
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//         refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
//         accessToken: getToken()
//     }
// })




// module.exports = transporter;