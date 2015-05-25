"use strict";

var Enum = require("enum");
var hash = require("string-hash");
var t = require("../t");
var {Store, id, bool, enum_, text, ptr} = require("../db");


var AccountTypes = new Enum([
  "CHECKING",
  "SAVINGS",
  "CREDITCARD",
]);


function AccountTypes_t(val) {
  return t("AccountTypes." + val.toString());
}


var Institution = Store.createClass({
  tableName: "institutions",
  columns: {
    id: id(),
    name: text(),
    web: text(),
    address: text(),
    notes: text(),

    online: bool(),

    fid: text(),
    org: text(),
    ofx: text(),
    
    username: text(),
    password: text(),
  },
  
  constructor: function() {
    this.online = true;
  },
  
  assignId: function() {
    if(!this.id) {
      this.id = hash(Date.now().toString());
    }
  }
});


var Account = Store.createClass({
  tableName: "accounts",
  columns: {
    id: id(),
    institution: ptr(Institution),
    name: text(),
    type: enum_(AccountTypes),
    number: text(),
  },
  
  assignId: function() {
    if(!this.id) {
      console.assert(this.institution);
      console.assert(this.number);
      this.id = hash(this.institution.id + " " + this.number);
    }
  }
});



module.exports = {
  AccountTypes,
  AccountTypes_t,
  Institution,
  Account,
};