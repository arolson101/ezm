"use strict";

var Reflux = require("reflux");

var actions = Reflux.createActions([
  "addInstitution",
  "addAccount",
]);


var idServer = 1;
var items = [{id: idServer++, name:'abc'}, {id: idServer++, name: 'def'}];

module.exports = Reflux.createStore({
  listenables: actions,
  
  actions: actions,
  
  onAddInstitution: function(newInstitution) {
    console.assert(!newInstitution.id);
    newInstitution.id = idServer++;
    console.log("onAddInstitution", newInstitution);
    items.push(newInstitution);
    this.trigger(items);
  },
  
  onAddAccount: function(newAccount) {
    console.log("onAddAccount", newAccount);
  },
  
  getDefaultData: function() {
    console.log("getDefaultData");
    return items;
  }
});
