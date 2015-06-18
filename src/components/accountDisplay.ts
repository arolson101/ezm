/// <reference path="../project.d.ts"/>

import {ListGroupItem} from "react-bootstrap";
import {Account} from "../models/account";

//var DragHandle = require("./dragHandle");

interface Props extends ListGroupItemAttributes {
  account: Account;
  //isEditing: boolean;
}


export class AccountDisplay extends React.Component<Props, {}> {
  render() {
    //var onClick = this.onClick;
    
/*
    if(this.props.isEditing) {
      style.cursor = "-webkit-grab";
      onClick = null;
    }
*/

    return (
      React.createElement(ListGroupItem, _.merge({bsSize: "small"}, this.props),
        this.props.account.name
      )
    );
  }
}


//export var AccountDisplay = React.createFactory(AccountDisplayClass);
