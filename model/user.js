const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema(
    {
        user_name : {
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
    },
    {
        collection : 'user'
    }
)

module.exports = mongoose.model('User', User);