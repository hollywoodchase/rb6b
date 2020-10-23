const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThirdPartyProviderSchema = new mongoose.Schema({
  provider_name: {
    type: String,
    default: null
  },
  provider_id: {
    type: String,
    default: null
  },
  provider_data: {
    type: {},
    default: null
  }
})

const AccountSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  email_is_verified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String
  },
  balance: {
    type: Number,
    required: true
  },
  withdraw: {
    type: Number
  },
  deposit: {
    type: Number
  },
  lastTrans: {
    type: Number
  },
  third_party_auth: [ThirdPartyProviderSchema],
  date: {
    type: Date,
    default: Date.now
  }
},
  { strict: false }
);

module.exports = mongoose.model('Accounts', AccountSchema);
