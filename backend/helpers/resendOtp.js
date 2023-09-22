const UserOtpSchema = require("../MongoDb/models/userModels/Otp");
const helpers = require("./index");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const resendOtpVerification = ({ id,email }) => {
    return new Promise ( async (resolve,reject)=>{
        try {  
            await UserOtpSchema.deleteOne({userId: new ObjectId(id)});
            helpers.sendOtpVerificationEmail(id,email);
            resolve("Otp resended successfully");
        } catch (error) {
            reject("Something went wrong");
        }
    })
}

const resendPhoneOtp = ({id,phone}) =>{
    return new Promise ( async (resolve,reject)=>{
        try {  
            await UserOtpSchema.deleteOne({userId: new ObjectId(id)});
            helpers.sendPhoneOtpVerification(id,phone);
            resolve("Otp resended successfully");
        } catch (error) {
            reject("Something went wrong");
        }
    })
}

module.exports = {

    resendOtpVerification:resendOtpVerification,
    resendPhoneOtp:resendPhoneOtp
}