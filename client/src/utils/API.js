import axios from "axios";

export default {
  // Gets all Accounts
  getAccounts: function() {
    return axios.get("/api/accounts");
  },
  // Gets the account with the given id
  getAccount: function(id) {
    return axios.get("/api/accounts/" + id);
  },
  // Deletes the account with the given id
  deleteAccount: function(id) {
    return axios.delete("/api/accounts/" + id);
  },
  // Saves a account to the database
  saveAccount: function(accountData) {
    return axios.post("/api/accounts", accountData);
  }
};
