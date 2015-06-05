"use strict";

var Db = require("./db");
var {Account, Institution} = require("./models/account");

var actions = Reflux.createActions([
  "addInstitution",
  "addAccount",
]);


var institutions = [];
var accounts = [];

var AccountStore = Reflux.createStore({
  listenables: actions,

  actions: actions,

  onDbOpen: function() {
    return Promise.all([
      Institution.all.get().then(function(results) {
        institutions = results;
      }),
      Account.all.order('sortOrder').get().then(function(results) {
        accounts = results;
      }),
    ]).then(() => this.trigger(accounts));
  },

  save: function(institution, accounts) {
    // TODO: remove accounts somehow
    institution.assignId();

    accounts.forEach(function(account, idx) {
      if(account.sortOrder == -1) {
        account.sortOrder = accounts.length + idx;
      }
      account.institution = institution;
      account.assignId();
    });

    return Db.Store.save(institution, accounts).then(this.onDbOpen);
  },

  onAddInstitution: function(newInstitution) {
    console.assert(!newInstitution.id);
    console.log("onAddInstitution", newInstitution);
    Db.Store.save(newInstitution);
    accounts.push(newInstitution);
    this.trigger(accounts);
  },

  onAddAccount: function(newAccount) {
    console.log("onAddAccount", newAccount);
  },

  getData: function() {
    return accounts;
  }
});


Db.onOpen(AccountStore.onDbOpen);


module.exports = AccountStore;
