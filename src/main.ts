///<reference path="project.d.ts"/>

import React = require("react");
import {render} from "./components/app";
import {Actions} from "./actions";


function reportError(err) {
  console.log(err);
}


export function main() {
  Actions.startup()
  .then(Actions.open)
  .then(render);
}
