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
import {MetisMenu} from "./metisMenu";
import {mixin} from "../mixins/applyMixins";
import {Flap} from "../flap";

interface State {
  active?: string;
  accounts?: Account[];
}

@mixin(
  Flap.ReactMixin()
  //SortableMixin("root", $.extend({}, (SortableMixin as any).DefaultProps))
)
export class Sidebar extends React.Component<any, State> {

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
        <AccountDisplay {... selectionProps(account.dbid)} account={account}/>
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
      <div>
        <ListGroupItem ref="root">
          <ListGroupItem {... selectionProps("home")}><Icon name="home"/>{" " + t("sidebar.home")}</ListGroupItem>
          {accounts}
          <ListGroupItem {... selectionProps("budget")}><Icon name="area-chart"/>{" " + t("sidebar.budget")}</ListGroupItem>
          <ListGroupItem {... selectionProps("calendar")}><Icon name="calendar"/>{" " + t("sidebar.calendar")}</ListGroupItem>
        </ListGroupItem>

        <span className="pull-right" style={{marginTop: 5}}>
          <ModalTrigger modal={<AccountDialog/>}>
            <Button>
              <Icon name="plus"/>
            </Button>
          </ModalTrigger>
        </span>
      </div>
    );
  }

  onSetActive(eventKey) {
    this.setState({active: eventKey} as any);
  }
}
