"use strict";

var Updraft = require("updraft");

var dbName = "EasyMoney";
var Store = new Updraft.Store();
//    Store.logSql = true;
var openCallbacks = [];

function onOpen(callback) {
  openCallbacks.push(callback);
}

function open() {
  require("./models/account");
  
  return Store.open({name: dbName})
  .then(function() {
    return Promise.all(
      _.map(openCallbacks, function(callback) { return callback(); })
    );
  })
  ;
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
  onOpen,
};
