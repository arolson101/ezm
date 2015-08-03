/// <reference path="../project.d.ts"/>

import {Button, ListGroupItem, ModalTrigger, Navbar, Nav, NavItem, DropdownButton, OverlayTrigger, Popover} from "react-bootstrap";
import Icon = require("react-fa");
var Radium: any = require("radium");

import {t} from "../t";
import {accountStore} from "../stores/accountStore";
import {Account} from "../models/account";
import {Institution} from "../models/institution";
import {SortableMixin} from "../mixins/sortable";
import {AccountDialog} from "./accountDialog";
import {MetisMenu, MetisMenuItem} from "./metisMenu";
import {Flap} from "../flap";
import {Home} from "./home";

interface State {
  active?: string;
  accounts?: Account[];
}

var RadiumNav = Radium(Nav);


@SortableMixin("root")
@Flap
@Radium
export class Sidebar extends React.Component<any, State> {
  static style = {
    "@media (min-width: 768px)": {
      marginLeft: -15,
      zIndex: 1,
      position: "absolute",
      width: 250,
      marginTop: 35
    }
  }

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
        active: active,
        onClick: (active ? null : () => this.onSetActive(id)),
        style: {cursor: (active ? "default" : "pointer")},
      };
    };


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
      <RadiumNav role="navigation" {... this.props} style={Sidebar.style}>
        <div style={{paddingRight: 0, paddingLeft: 0}}>
          <MetisMenu ref="root">
              <MetisMenuItem title={t("sidebar.home")} href={Home.href} icon="home"/>

              <MetisMenuItem title="UWCU" image="http://uwcu.org/favicon.ico">
              {this.state.accounts.map((account) => {
                return (
                  <MetisMenuItem href={Home.href} title={<div><i className="fa fa-credit-card"/> {" " + account.name}<span className="pull-right">$1234</span></div>} overlay={<Popover title='Popover bottom'><strong>Holy guacamole!</strong> Check this info.</Popover>}/>
                  /*<AccountDisplay {... selectionProps(account.dbid)} account={account}/>*/
                );
              })}
              </MetisMenuItem>

              <MetisMenuItem title={t("sidebar.budget")} icon="area-chart" href="flot.html"/>
              <MetisMenuItem title={t("sidebar.calendar")} icon="calendar"/>
              <MetisMenuItem title="Multi-Level Dropdown" icon="sitemap">
                <MetisMenuItem title="Second Level Item"/>
                <MetisMenuItem title="Second Level Item"/>
                <MetisMenuItem title="Third Level">
                  <MetisMenuItem title="Third Level Item"/>
                  <MetisMenuItem title="Third Level Item"/>
                  <MetisMenuItem title="Third Level Item"/>
                  <MetisMenuItem title="Third Level Item"/>
                </MetisMenuItem>
              </MetisMenuItem>
              <span className="pull-right" style={{marginTop: 5}}>
                <ModalTrigger modal={<AccountDialog/>}>
                  <Button bsStyle="link" title={t("sidebar.addAccountTooltip")}>
                    <Icon name="plus"/>
                  </Button>
                </ModalTrigger>
              </span>
          </MetisMenu>
        </div>
      </RadiumNav>
      /*<div>
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
      </div>*/
    );
  }

  onSetActive(id) {
    this.setState({active: id});
  }
}
