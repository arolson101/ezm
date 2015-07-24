///<reference path="project.d.ts"/>

require("./ezm.css");

//var nav = require("./navigation");
import React = require("react");
var {Input, ListGroup, ListGroupItem, OverlayTrigger, Popover, Table, Grid, Col} = require("react-bootstrap");
import * as t from "./t";
import {ficache} from "./ficache";
import {render} from "./components/app";
//import {db} from "./db";
import {Actions} from "./actions";

/*
uwcu
  checking
  savings
  auto

nationwide advantage
edvest
citibank
edward jones

fidelity
  401k
*/



function reportError(err) {
  console.log(err);
}


// force reference
require("./stores/persistentStore");

export function main() {
  Actions.startup()
  .then(Actions.open)
  .then(render);
}
