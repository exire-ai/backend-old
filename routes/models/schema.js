/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require('mongoose');
const USERS_URI = 'mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/Users?retryWrites=true&w=majority';
const PLACES_URI = 'mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/Places?retryWrites=true&w=majority';

//Connecting to the databases
const Users = mongoose.createConnection(USERS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
})
const Places = mongoose.createConnection(PLACES_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
})

// Setting up schemas for all data types
const UserSchema = require('./schema/User');
const VenueSchema = require('./schema/Venue');
const VenueReservationsSchema = require('./schema/VenueReservations');
const VenueTicketsSchema = require('./schema/VenueTickets');
const EventSchema = require('./schema/Event');

//Using certain collections within the database with their corresponding schemas
const UserModel = Users.model('Data', UserSchema, 'Data');
const VenueModel = Places.model('Venues', VenueSchema, 'Venues');
const VenueReservationModel = Places.model('VenuesReservations', VenueReservationsSchema, 'VenuesReservations');
const VenueTicketModel = Places.model('VenuesTickets', VenueTicketsSchema, 'VenuesTickets');
const EventModel = Places.model('Events', EventSchema, 'Events');

//Creating a dictionary of the datatype names and the models
const modelDict = {
  'user' : UserModel,
  'venue' : VenueModel,
  'venueReservation' : VenueReservationModel,
  'venueTicket' : VenueTicketModel,
  'event' : EventModel
}

//Exporting model dictionary to be used within endpoints
module.exports.modelDict = modelDict;
