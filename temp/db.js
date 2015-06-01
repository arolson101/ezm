/// <reference path="project.d.ts"/>
var storeOptions = {
    name: "EasyMoney"
};
exports.Store = new Updraft.Store();
var openCallbacks = [];
function onOpen(callback) {
    openCallbacks.push(callback);
}
exports.onOpen = onOpen;
function open() {
    require("./models/account");
    return exports.Store.open(storeOptions)
        .then(function () {
        return Promise.all(openCallbacks.map(function (callback) { return callback(); }));
    });
}
exports.open = open;
function Id() {
    return Updraft.Column.Int().Key();
}
exports.Id = Id;
