const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    STRIPE_KEY: process.env.STRIPE_KEY,
    TICKETMASTER_KEY: process.env.TICKETMASTER_KEY,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_KEY: process.env.TWILIO_KEY,
    TOKENS: process.env.TOKENS.split(' ')
};
