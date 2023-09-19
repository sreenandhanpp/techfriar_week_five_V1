const oauthClient = require("./googleAuth");


const getToken =async () =>{
    const accessToken = await oauthClient.getAccessToken();
    return accessToken
}


module.exports = getToken;