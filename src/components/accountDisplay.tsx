/// <reference path="../project.d.ts"/>

import {ListGroupItem} from "react-bootstrap";
import {Account} from "../models/account";
import React = require("react");

//var DragHandle = require("./dragHandle");

interface Props extends ListGroupItemAttributes {
  account: Account;
  //isEditing: boolean;
}


export class AccountDisplay extends React.Component<Props, any> {
  render() {
    //var onClick = this.onClick;

/*
    if(this.props.isEditing) {
      style.cursor = "-webkit-grab";
      onClick = null;
    }
*/

    return (
      <ListGroupItem bsSize="small" {... this.props}>
        {this.props.account.name}
      </ListGroupItem>
    );
  }
}
