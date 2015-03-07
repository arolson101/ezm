"use strict";

var t = require("../t");


var AccountTypes = [
  "CHECKING",
  "SAVINGS",
  "CREDITCARD",
];


AccountTypes.t = function(type) {
  return t("AccountTypes." + type);
};


var AccountDef = {
  tableName: "accounts",
  columns: {
    id: { type: "int", key: "true" },
    name: { type: "text" },
    url: { type: "text" },
    notes: { type: "text" },
  }
};


module.exports = {
  AccountTypes,
  AccountDef,
};