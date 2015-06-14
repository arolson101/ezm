/// <reference path="../project.d.ts"/>

import {Button, ListGroupItem, ModalTrigger} from "react-bootstrap";
import Icon = require("react-fa");

import {t} from "../t";
import {accountStore} from "../stores/accountStore";
import {AccountDisplay} from "./accountDisplay";
import {Account} from "../models/account";
import {Institution} from "../models/institution";
import {SortableMixin} from "../mixins/sortable";
import {AccountDialog} from "./accountDialog";
import {applyMixins} from "../mixins/applyMixins";
import {Flap} from "../flap";

interface State {
  active: string;
  accounts: Account[];
}


export class Sidebar extends React.Component<{}, State> {
//  mixins: [
//    Reflux.connect(AccountStore, "list"),
//    SortableMixin("root", $.extend({}, SortableMixin.DefaultProps)),
//  ],

  linkState: <P>(store: Flap.Store<P>, state: string) => void;
  listenTo: <P>(action: Flap.Action<P>, callback: Flap.Listener<P>) => void;

  constructor() {
    super();
    this.state = {
      active: "home",
      accounts: accountStore.getDefaultData(),
    };
  }

  render() {
    var selectionProps = function(id) {
      var active = (id === this.state.active);
      return {
        key: id,
        eventKey: id,
        active: active,
        onClick: (active ? null : this.onSetActive),
        style: {cursor: (active ? "default" : "pointer")},
      };
    }.bind(this);
  
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

applyMixins(Sidebar, [
// Reflux.connect(<Reflux.Store<any>><any>accountStore, "accounts"),
  Flap.ReactMixin(),
  SortableMixin("root", $.extend({}, (<any>SortableMixin).DefaultProps)),
]);
