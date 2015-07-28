///<reference path="project.d.ts"/>
var app_1 = require("./components/app");
var actions_1 = require("./actions");
function reportError(err) {
    console.log(err);
}
function main() {
    actions_1.Actions.startup()
        .then(actions_1.Actions.open)
        .then(app_1.render);
}
exports.main = main;
