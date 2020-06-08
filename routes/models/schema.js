/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let mongoose = require("mongoose");
const ADMINUSERS_URI =
  "mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/AdminUsers?retryWrites=true&w=majority";
const USERS_URI =
  "mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/Users?retryWrites=true&w=majority";
const PLACES_URI =
  "mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/Places?retryWrites=true&w=majority";
const PLANS_URI =
  "mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/Plans?retryWrites=true&w=majority";
const CHATS_URI =
  "mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/Chats?retryWrites=true&w=majority";
const MERCHANTS_URI =
  "mongodb+srv://exire:exire123@cluster0-w3lve.mongodb.net/Merchants?retryWrites=true&w=majority";

//Connecting to the databases
const AdminUsers = mongoose.createConnection(ADMINUSERS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});
const Users = mongoose.createConnection(USERS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});
const Places = mongoose.createConnection(PLACES_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});
const Plans = mongoose.createConnection(PLANS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});
const Chats = mongoose.createConnection(CHATS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});
const Merchants = mongoose.createConnection(MERCHANTS_URI, {
  useNewUrlParser: true,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true,
});

// Setting up schemas for all data types
const AdminUserSchema = require("./schema/AdminUser");
const UserSchema = require("./schema/User");
const VenueSchema = require("./schema/Venue");
const EventSchema = require("./schema/Event");
const NewEventSchema = require("./schema/NewEvent");
const PlanSchema = require("./schema/Plan");
const ChatSchema = require("./schema/Chat");
const MerchantSchema = require("./schema/Merchant");

//Using certain collections within the database with their corresponding schemas
const AdminUserModel = AdminUsers.model("Data", AdminUserSchema, "Data");
const UserModel = Users.model("Data", UserSchema, "Data");
const VenueModel = Places.model("Venues", VenueSchema, "Venues");
const EventModel = Places.model("Events", EventSchema, "Events");
const NewEventModel = Places.model("NewEvents", NewEventSchema, "NewEvents");
const PlanModel = Plans.model("Data", PlanSchema, "Data");
const ChatModel = Chats.model("Data", ChatSchema, "Data");
const MerchantModel = Merchants.model("Data", MerchantSchema, "Data");

//Creating a dictionary of the datatype names and the models
const modelDict = {
  adminUser: AdminUserModel,
  user: UserModel,
  venue: VenueModel,
  event: EventModel,
  newEvent: NewEventModel,
  plan: PlanModel,
  chat: ChatModel,
  merchant: MerchantModel,
};

//Exporting model dictionary to be used within endpoints
module.exports.modelDict = modelDict;
