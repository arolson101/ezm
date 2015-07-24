///<reference path="project.d.ts"/>
require("./ezm.css");
var _a = require("react-bootstrap"), Input = _a.Input, ListGroup = _a.ListGroup, ListGroupItem = _a.ListGroupItem, OverlayTrigger = _a.OverlayTrigger, Popover = _a.Popover, Table = _a.Table, Grid = _a.Grid, Col = _a.Col;
var app_1 = require("./components/app");
var actions_1 = require("./actions");
function reportError(err) {
    console.log(err);
}
require("./stores/persistentStore");
function main() {
    actions_1.Actions.startup()
        .then(actions_1.Actions.open)
        .then(app_1.render);
}
exports.main = main;
