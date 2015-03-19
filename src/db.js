"use strict";

var Updraft = require("updraft");


var dbName = "EasyMoney";
var Store = new Updraft.Store();


function open() {
  require("./models/account");
  
  return Store.open({name: dbName});
}


function id() {
  return { type: "int", key: true };
}

function enum_(type) {
  return { type: "enum", enum: type };
}

function text() {
  return { type: "text" };
}

function ptr(ref) {
  return { type: "ptr", ref: ref };
}

function bool() {
  return { type: "bool" };
}

module.exports = {
//  Account: store.createClass(require("./models/account").AccountDef),
  id,
  bool,
  enum_,
  text,
  ptr,
  Store,
  open,
};
