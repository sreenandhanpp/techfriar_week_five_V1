//importing modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./MongoDb/connect.js');
const cors = require('cors');
const helpers = require('./helpers/index.js');
const {resendOtpVerification,resendPhoneOtp} = require('./helpers/resendOtp.js');
const signupValidator = require('./middlewares/signupValidator.js');
const { validationResult } = require('express-validator');
const otpValidator = require('./middlewares/otpValidator.js');
const axios = require('axios');
const phoneValidator = require('./middlewares/phoneValidator.js');
const aadharValidator = require('./middlewares/aadharValidator.js');



//compiling .env file
dotenv.config();


//taking the values from .env file
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

//creating the server from express library
const app = express();

//encoding the url to make the data passed through it to a object 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//creating user route

// email otp verification routes
app.post('/signup', signupValidator, (req, res) => {
    /*doSignup function in helpers take body of the request as
     parameter and save the user data inthe data base*/
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({ error: err.array() });
    } else {
        helpers.doSignup(req.body).then((resp) => {
            helpers.sendOtpVerificationEmail(resp._id, resp.email).then(response => {
                let data = JSON.stringify(response);
                res.json({ message: "Otp sended successfully", data }).status(200);
            }).catch(err => {
                res.status(400).json({ message: err });
            })
        }).catch(err => {
            res.json({ message: "Something went wrong" }).status(400);
        })
    }
});

//verify otp

app.post('/verify-otp', otpValidator, (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({ error: err.array() });
    } else {
        helpers.VerifyOtp(req.body).then(resp => {
            res.json({ message: resp }).status(200);
        }).catch(err => {
            res.status(400).json({ message: err });
        });
    }
});

//resend otp

app.post('/resendOtp', (req, res) => {
    console.log(req.body)
    resendOtpVerification(req.body).then(resp => {
        res.json({ message: resp }).status(200);
    }).catch(err => {
        res.status(400).json({ message: err });
    })
});

app.post('/resendPhoneOtp', (req, res) => {
    console.log(req.body)
    resendPhoneOtp(req.body).then(resp => {
        res.json({ message: resp }).status(200);
    }).catch(err => {
        res.status(400).json({ message: err });
    })
})

//sms otp verification routes

app.post('/getOptphone', phoneValidator, (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({ error: err.array() });
    } else {
        helpers.CreatePhoneUser(req.body).then(resp => {
            helpers.sendPhoneOtpVerification(resp._id, resp.phone).then(response => {
                console.log(response);
                let data = JSON.stringify(response);
                res.json({ message: "Otp sended successfully", data }).status(200);
            }).catch(err => {
                res.status(400).json({ message: err });
            })
        });
    }
});

//Aadhar verification 

app.post('/aadhar', aadharValidator, (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.status(400).json({ error: err.array() });
    } else {
        res.status(200).json({ message:"Verified Successfully"});
    }
});

//function to start the server
const StartServer = (MONGODB_URL) => {

    //passing mongoDB url to database connecting function
    connectDB(MONGODB_URL);
    //make the server to listen the port  
    app.listen(PORT, () => {
        console.log(`Server started ${PORT}`)
    });
};


StartServer(MONGODB_URL);
