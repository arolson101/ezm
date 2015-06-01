/// <reference path="../project.d.ts"/>

import {Button, Icon, ListGroupItem, ModalTrigger} from "../factories";

import {t} from "../t";
import {AccountStore} from "../accountStore";
import {AccountDisplay} from "./accountDisplay";
import {Account, Institution} from "../models/account";
//var SortableMixin = require("../mixins/sortable");
import {AccountDialog} from "./accountDialog";


interface State {
  active: string;
  accounts: Account[];
}


export class Sidebar/*Class*/ extends React.Component<{}, State> {
//  mixins: [
//    Reflux.connect(AccountStore, "list"),
//    SortableMixin("root", $.extend({}, SortableMixin.DefaultProps)),
//  ],
  
  constructor() {
    super();
    this.state = {
      active: "home",
      accounts: AccountStore.getDefaultData(),
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
        AccountDisplay(<any>_.merge(selectionProps(account.id), {account: account}))
      );
    });
    
/*
    var addButtonTooltip = (
      <Tooltip>{t("sidebar.addAccountTooltip")}</Tooltip>
    );
*/
    
    return (
      React.DOM.div(null, 
        ListGroupItem({ref: "root"},
          ListGroupItem(selectionProps("home"), Icon({name: "home"}), " ", t("sidebar.home")),
          accounts,
          ListGroupItem(selectionProps("budget"), Icon({name: "area-chart"}), " ", t("sidebar.budget")),
          ListGroupItem(selectionProps("calendar"), Icon({name: "calendar"}), " ", t("sidebar.calendar"))
        ),
        
        React.DOM.span({className: "pull-right", style: {marginTop: 5}},
          ModalTrigger({modal: AccountDialog()},
            Button(null,
              Icon({name: "plus"})
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


//export var Sidebar = React.createFactory(SidebarClass);
