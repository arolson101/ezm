'use strict';

var i18n = require("i18next-client");


module.exports = i18n.t;

module.exports.init = function () {
  return new Promise(function(resolve/*, reject*/) {
    i18n.init({
      resGetPath: 'locales/__ns__.__lng__.json'
    }, function() {
      console.log("t init");
      resolve();
    });
  });
};
