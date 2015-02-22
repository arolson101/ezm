"use strict";

var Updraft = require("updraft");


var dbName = "EasyMoney";
var store = new Updraft.Store();


module.exports = {
  Account: store.createClass(require("./models/account")),
  
  open: function() {
    return store.open({name: dbName});
  },
};
