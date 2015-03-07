"use strict";

var _ = require("lodash");
var filist = require("filist");

function init() {
  filist = _.sortBy(filist, fi => fi.name.toLowerCase());
  _.forEach(filist, function(fi, idx) {
    fi.id = idx;
  });
}

function get(id) {
  return filist[id];
}

function byName() {
  return filist;
}

module.exports = {
  init: init,
  get: get,
  byName: byName
};
