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
  return Updraft.Column.Int().Key();
}

function sortKey() {
  return Updraft.Column.Int().Default(-1);
}

function enum_(type) {
  return Updraft.Column.Enum(type);
}

function text() {
  return Updraft.Column.Text();
}

function ptr(ref) {
  return Updraft.Column.Ptr(ref);
}

function bool() {
  return Updraft.Column.Bool();
}

module.exports = {
//  Account: store.createClass(require("./models/account").AccountDef),
  id,
  sortKey,
  bool,
  enum_,
  text,
  ptr,

  Store,
  open,
  onOpen,
};
