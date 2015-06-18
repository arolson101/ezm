/// <reference path="../project.d.ts"/>

import {Button, ListGroupItem, ModalTrigger, Navbar, Nav, NavItem, DropdownButton} from "react-bootstrap";
import Icon = require("react-fa");

import {t} from "../t";
import {accountStore} from "../stores/accountStore";
import {AccountDisplay} from "./accountDisplay";
import {Account} from "../models/account";
import {Institution} from "../models/institution";
import {SortableMixin} from "../mixins/sortable";
import {AccountDialog} from "./accountDialog";
import {mixin} from "../mixins/applyMixins";
import {Flap} from "../flap";

interface State {
  active?: string;
  accounts?: Account[];
}

@mixin(
  Flap.ReactMixin(), 
  SortableMixin("root", $.extend({}, (<any>SortableMixin).DefaultProps))
)
export class Sidebar extends React.Component<{}, State> {

  linkState: <P>(store: Flap.Store<P>, state: string) => void;
  listenTo: <P>(action: Flap.Action<P>, callback: Flap.Listener<P>) => void;

  constructor() {
    super();
    this.state = {
      active: "home",
    };
    this.linkState(accountStore, "accounts");
  }

  render() {
    var selectionProps = (id: any): ListGroupItemAttributes => {
      var active = (id === this.state.active);
      return {
        key: id,
        eventKey: id,
        active: active,
        onClick: (active ? null : () => this.onSetActive(id)),
        style: {cursor: (active ? "default" : "pointer")},
      };
    };
  
    var accounts = this.state.accounts.map((account) => {
      return (
        React.createElement(AccountDisplay, _.merge(selectionProps(account.dbid), {account: account}))
      );
    });
    
/*
    var addButtonTooltip = (
      <Tooltip>{t("sidebar.addAccountTooltip")}</Tooltip>
    );
*/

    // return (
    //   //React.createElement(Navbar, {brand: "UWCU"},
    //     React.createElement(Nav, {className: "bs-docs-sidebar"},
    //       React.createElement(NavItem, selectionProps("home"), React.createElement(Icon, {name: "home"}), " ", t("sidebar.home")),
    //       React.createElement(Nav, null,  
    //         React.createElement(NavItem, null, "UWCU"),
    //         React.createElement(Nav, null,
    //           React.createElement(NavItem, null, "child1" ),
    //           React.createElement(NavItem, null, "child2" )
    //         )
    //       )
    //         // , {title: "UWCU", navItem: true}, accounts),
          
    //       // React.createElement(NavItem, selectionProps("budget"), React.createElement(Icon, {name: "area-chart"}), " ", t("sidebar.budget")),
    //       // React.createElement(NavItem, selectionProps("calendar"), React.createElement(Icon, {name: "calendar"}), " ", t("sidebar.calendar"))
    //     ) 
    //   //)
    // );
    
    return (
      React.DOM.div(null, 
        React.createElement(ListGroupItem, {ref: "root"},
          React.createElement(ListGroupItem, selectionProps("home"), React.createElement(Icon, {name: "home"}), " ", t("sidebar.home")),
          accounts,
          React.createElement(ListGroupItem, selectionProps("budget"), React.createElement(Icon, {name: "area-chart"}), " ", t("sidebar.budget")),
          React.createElement(ListGroupItem, selectionProps("calendar"), React.createElement(Icon, {name: "calendar"}), " ", t("sidebar.calendar"))
        ),
        
        React.DOM.span({className: "pull-right", style: {marginTop: 5}},
          React.createElement(ModalTrigger, <any>{modal: React.createElement(AccountDialog)},
            React.createElement(Button, null,
              React.createElement(Icon, {name: "plus"})
            )
          )
        )
      )
    );
  }
  
  onSetActive(eventKey) {
    this.setState(<any>{active: eventKey});
  }
}
