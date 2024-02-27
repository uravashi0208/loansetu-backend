const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zeel129patel@gmail.com',
        pass: 'gehg rowt mgqw oyxt'
    }
});

module.exports = transporter;