const UserOtpSchema = require("../MongoDb/models/userModels/Otp");
const helpers = require("./index");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const resendOtpVerification = ({ id,email }) => {
    return new Promise ( async (resolve,reject)=>{
        try {  
            await UserOtpSchema.deleteOne({userId: new ObjectId(id)});
            helpers.sendOtpVerificationEmail(id,email);
            resolve("Otp sended successfully");
        } catch (error) {
            reject("Something went wrong");
        }
    })
}

module.exports = resendOtpVerification;