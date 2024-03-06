const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema(
    {
        user_name : {
            type : String
        },
        first_name : {
            type : String
        },
        last_name : {
            type : String
        },
        email : {
            type : String
        },
        password : {
            type : String
        },
        role : {
            type : String
        },
        user_status : {
            type : Boolean,
            default : false
        },
        isAdmin : {
            type : Boolean,
            default : false
        },
        isStaff : {
            type : Boolean,
            default : false
        },
        isSendWelcomeMail : {
            type : Boolean,
            default : false
        },
        createdAt : {
            type : Date,
            default : new Date()
        },
        upadatedAt : {
            type : Date,
            default : new Date()
        },
        loginotp : {
            type : Number
        },
        rate : {
            type : Number
        },
        phone : {
            type : Number
        },
        emailsignature : {
            type : String
        },
        image : {
            type : String
        },
    },
    {
        collection : 'user'
    }
)

module.exports = mongoose.model('User', User);