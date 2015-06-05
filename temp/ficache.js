/// <reference path="project.d.ts"/>
var filist = require("filist");
function init() {
    filist = _.sortBy(filist, function (fi) { return fi.name.toLowerCase(); });
    filist.forEach(function (fi, idx) { return fi.id = idx; });
}
exports.init = init;
function get(id) {
    return filist[id];
}
exports.get = get;
function byName() {
    return filist;
}
exports.byName = byName;
