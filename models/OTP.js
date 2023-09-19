const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender')

const otpSchema = new mongoose.Schema({

    email : {
        type : String,
        trim : true,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    create_at : {
        type : Date,
        default : Date.now(),
        expires : 5*60
    }

});

const sendVerificationMail = async (email, otp)=>{
    try{

        const mailResponse = await mailSender(email, "Verification Email from BrainScript", otp);
        console.log("Email sent successfully : ", mailResponse);

    }catch(error){
        console.log("Error occured while sending the verification mail : ", error);
        throw error;
    }
}

otpSchema.pre("save", async (next)=>{
    await sendVerificationMail(this.email, this.otp);
    next();
})

module.exports = mongoose.model('OTP', otpSchema);