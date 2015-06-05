"use strict";

var Enum = require("enum");
var hash = require("string-hash");
var t = require("../t");
var {Store, id, bool, enum_, text, sortKey, ptr} = require("../db");
var Updraft = require("updraft");

var AccountType = new Enum([
  "CHECKING",
  "SAVINGS",
  "CREDITCARD",
]);


function AccountType_t(val) {
  return t("AccountType." + val.toString());
}

function Institution() { Updraft.Instance.apply(this, arguments); }
Updraft.createClass(Institution, {
  tableName: "institutions",
  columns: {
    id: id(),
    name: text(),
    web: text(),
    address: text(),
    notes: text(),

    online: bool().Default(true),

    fid: text(),
    org: text(),
    ofx: text(),

    username: text(),
    password: text(),
  },

  assignId: function() {
    if(!this.id) {
      this.id = hash(Date.now().toString());
    }
  }
});
Store.addClass(Institution);


function Account() { Updraft.Instance.apply(this, arguments); }
Updraft.createClass(Account, {
  tableName: "accounts",
  columns: {
    id: id(),
    institution: ptr(Institution),
    name: text(),
    type: enum_(AccountType),
    number: text(),
    sortOrder: sortKey(),
  },

  assignId: function() {
    if(!this.id) {
      console.assert(this.institution);
      console.assert(this.number);
      this.id = hash(this.institution.id + " " + this.number);
    }
  }
});
Store.addClass(Account);



module.exports = {
  AccountType,
  AccountType_t,
  Institution,
  Account,
};
