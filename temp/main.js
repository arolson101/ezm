///<reference path="project.d.ts"/>
require("./ezm.css");
var _a = require("ReactBootstrap"), Input = _a.Input, ListGroup = _a.ListGroup, ListGroupItem = _a.ListGroupItem, OverlayTrigger = _a.OverlayTrigger, Popover = _a.Popover, Table = _a.Table, Grid = _a.Grid, Col = _a.Col;
var t = require("./t");
var ficache = require("./ficache");
var Sidebar = require("./components/sidebar");
var db = require("./db");
var accountListData = [
    {
        name: "UWCU",
        notes: "",
        accounts: [
            {
                id: "12345",
                name: "checking",
                type: "checking",
                accountNumber: "12345"
            },
            {
                id: "12345b",
                name: "savings",
                type: "savings",
                accountNumber: "12345b"
            }
        ]
    },
    {
        name: "My CC Company",
        notes: "",
        accounts: [
            {
                id: "54321",
                name: "visa",
                type: "creditcard",
                accountNumber: "54321"
            },
        ]
    },
];
function reportError(err) {
    console.log(err);
}
function main() {
    Promise.all([
        t.init(),
        ficache.init(),
        db.open(),
    ])
        .then(main)
        .catch(reportError);
}
;
module.exports = main;
