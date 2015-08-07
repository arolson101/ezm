/// <reference path="../project.d.ts"/>

import {Button, ListGroupItem, ModalTrigger, Navbar, Nav, NavItem, DropdownButton, OverlayTrigger, Popover} from "react-bootstrap";
import Icon = require("react-fa");
var Radium: any = require("radium");

import {t} from "../t";
import {Account, AccountStore} from "../models/account";
import {Institution, InstitutionStore} from "../models/institution";
import {SortableMixin} from "../mixins/sortable";
import {AccountDialog} from "./accountDialog";
import {MetisMenu, MetisMenuItem} from "./metisMenu";
import {Flap} from "../flap";
import {Home} from "./home";
import {AccountPage} from "./accountPage";
import {BudgetPage} from "./budgetPage";


interface State {
  active?: string;
  accounts?: Account[];
  institutions?: Institution[];
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

  // Flap mixin
  linkState: <P>(store: Flap.Store<P>, state: string) => void;
  listenTo: <P>(action: Flap.Action<P>, callback: Flap.Listener<P>) => void;

  constructor() {
    super();
    this.state = {
      active: "home",
    };
    this.linkState(AccountStore, "accounts");
    this.linkState(InstitutionStore, "institutions");
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

    return (
      <RadiumNav role="navigation" {... this.props} style={Sidebar.style}>
        <div style={{paddingRight: 0, paddingLeft: 0}}>
          <MetisMenu ref="root">
              <MetisMenuItem title={t("sidebar.home")} href={Home.href} icon="home"/>
              <MetisMenuItem title={t("sidebar.budget")} icon="area-chart" href={BudgetPage.link()}/>

              {this.state.institutions.map(institution => {
                return (
                  <MetisMenuItem key={institution.dbid} title={institution.name} icon="university">
                  {this.state.accounts.filter(account => account.institution.dbid == institution.dbid)
                    .map(account =>
                      <MetisMenuItem
                        key={account.dbid}
                        href={AccountPage.link({accountId: account.dbid})}
                        title={
                          <div>
                            <i className="fa fa-credit-card"/>
                            {" " + account.name}
                            <span className="pull-right">$1234</span>
                          </div>}
                        overlay={<Popover title='Popover bottom'><strong>Holy guacamole!</strong> Check this info.</Popover>}
                      />
                    )
                  }
                  </MetisMenuItem>
                );
              })}

              <MetisMenuItem title={t("sidebar.calendar")} icon="calendar"/>

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
    );
  }

  onSetActive(id) {
    this.setState({active: id});
  }
}
