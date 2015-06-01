"use strict";

var Db = require("./db");
var {Account, Institution} = require("./models/account");

var actions = Reflux.createActions([
  "addInstitution",
  "addAccount",
]);


var idServer = 1;
var institutions = [];
//var accounts = [{id: idServer++, name:'abc'}, {id: idServer++, name: 'def'}];
var accounts = [];

var AccountStore = Reflux.createStore({
  listenables: actions,
  
  actions: actions,
  
  onDbOpen: function() {
    return Promise.all([
      Institution.all.get().then(function(results) {
        institutions = results;
        var ids = _.pluck(results, "id");
        ids.push(0);
        idServer = _.max(ids) + 1;
      }),
      Account.all.get().then(function(results) {
        accounts = results;
      }),
    ]);
  },
  
  save: function(institution, accounts) {
    // TODO: remove accounts somehow
    institution.assignId();
    
    _.forEach(accounts, function(account) {
      account.institution = institution;
      account.assignId();
    });
    
    var toSave = [institution].concat(accounts);
    return Db.Store.save(toSave);
  },
  
  onAddInstitution: function(newInstitution) {
    console.assert(!newInstitution.id);
    newInstitution.id = idServer++;
    console.log("onAddInstitution", newInstitution);
    Db.Store.save(newInstitution);
    accounts.push(newInstitution);
    this.trigger(accounts);
  },
  
  onAddAccount: function(newAccount) {
    console.log("onAddAccount", newAccount);
  },
  
  getDefaultData: function() {
    console.log("getDefaultData");
    return accounts;
  }
});


Db.onOpen(AccountStore.onDbOpen);


module.exports = AccountStore;
