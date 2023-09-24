const bcrypt = require('bcrypt');
const UserOtpSchema = require("../MongoDb/models/userModels/Otp");
const oauthClient = require('../utils/googleAuth');
// const { transporter } = require('../utils/creatingTranspoter');
const newUser = require('../MongoDb/models/userModels/User');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const phoneUserSchema = require('../MongoDb/models/userModels/phoneUsers');
const ObjectId = mongoose.Types.ObjectId;
const springedge = require('springedge');
const dotenv = require('dotenv');


dotenv.config();

module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            const user = new newUser({
                email: userData.email,
                isVerified: false
            });
            user.save(user).then((data) => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    },
    sendOtpVerificationEmail: (_id, email) => {
        return new Promise(async (resolve, reject) => {
            try {
                const otp = await `${Math.floor(1000 + (Math.random() * 9000))}`

                //creating transporter
                const mailOptions = {
                    from: "sreenandhanpp@gmail.com",
                    to: email,
                    subject: "Verify Your Email",
                    html: `<p>Enter <b>${otp}</b> in the app to verify your 
                            email address and complete the signup process</p>
                            <p>This code <b>expires in 1 hour</b>.</p>`
                };
                const transporter = nodemailer.createTransport({
                    service: 'gmail',

                    auth: {
                        user: process.env.USER_EMAIL,
                        pass: process.env.USER_PASS
                    }
                });
                // const transportFunc = async() => {
                //     const transporter = nodemailer.createTransport({
                //         service:"gmail",
                //         secure:false,
                //         auth:{
                //             type:"OAuth2",
                //             user:process.env.ADMIN_EMAIL,
                //             pass:"gyuhdguqdbcvuzhv",                       
                //             clientId: process.env.GOOGLE_CLIENT_ID,
                //             clientSecret:process.env.GOOGLE_CLIENT_SECRET,
                //             refreshToken:process.env.GOOGLE_REFRESH_TOKEN,
                //             accessToken: await getToken()
                //         }
                //     });
                // }
                // transportFunc();
                const hashedOtp = await bcrypt.hash(otp, 10);
                const userOtp = new UserOtpSchema({
                    userId: _id,
                    otp: hashedOtp,
                    createdAt: Date.now(),
                    expiresAt: Date.now() + 3600000
                });
                const res = await userOtp.save();
                // await transportFunc();
                await transporter.sendMail(mailOptions);
                const data = {
                    userId: res.userId,
                    email: email
                }
                resolve(data);
            } catch (error) {
                reject(error)
            }
        })
    },
    VerifyOtp: ({ id, otp }) => {
        console.log(id, otp)
        return new Promise(async (resolve, reject) => {
            const user = await UserOtpSchema.findOne({ userId: new ObjectId(id) });
            if (!user) {
                reject("User not found");
            } else {
                // console.log(isAuth);
                const { expiresAt } = user.expiresAt;
                const hashedOtp = user.otp;
                if (expiresAt < Date.now()) {
                    await UserOtpSchema.deleteOne({ userId: new ObjectId(id) });
                    reject("Code has expired. Please request again");
                } else {
                    validOtp = await bcrypt.compare(otp, hashedOtp);
                    if (!validOtp) {
                        reject("Invalid code please check your inbox");
                    } else {
                        await newUser.updateOne({ _id: new ObjectId(id) }, { isVerified: true });
                        await UserOtpSchema.deleteOne({ userId: new ObjectId(id) });
                        resolve("Account verified successfully.");
                    }
                }
            }
        })
    },
    CreatePhoneUser: ({ phone }) => {
        return new Promise(async (resolve, reject) => {
            const user = new phoneUserSchema({
                phone: phone,
                isVerified: false
            });
            user.save(user).then((data) => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        })
    },
    sendPhoneOtpVerification : (id , phone ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const otp = await `${Math.floor(1000 + (Math.random() * 9000))}`

                //sending sms uing springedge
                var params = {
                    'apikey': process.env.SPRING_EDGE_API_KEY, // API Key
                    'sender': 'SEDEMO', // Sender Name
                    'to': [
                        `${phone}`  //Moblie Number
                    ],
                    'message': `Hello ${otp}, This is a test message from spring edge`,
                    'format': 'json'
                };
            
                await springedge.messages.send(params, 5000, function (err, response) {
                    if (err) {
                        throw "something went wrong, Can't send otp right now"
                    }
                });
            


                const hashedOtp = await bcrypt.hash(otp, 10);
                const userOtp = new UserOtpSchema({
                    userId: id,
                    otp: hashedOtp,
                    createdAt: Date.now(),
                    expiresAt: Date.now() + 3600000
                });
                const res = await userOtp.save();
                // await transportFunc();
                const data = {
                    userId: res.userId,
                    phone: phone
                }
                
                resolve(data);
            } catch (error) {
                reject(error)
                console.log(error);
            }
        })
    }

}