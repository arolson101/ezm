/// <reference path="../project.d.ts"/>

import {Route, Link} from "react-router";
import {Account, AccountStore} from "../models/account";
import {InstitutionStore} from "../models/institution";

interface Params {
  accountId: number;
}


interface Props extends React.Props<any> {
  params: Params;
}


export class AccountPage extends React.Component<Props, any> {
  static name = "account";
  static path = "/accounts/:accountId";

  static route() {
    return <Route name={AccountPage.name} path={AccountPage.path} handler={AccountPage}/>;
  }

  static link(params: Params) {
    return AccountPage.path.replace(/:(\w+)/, function(substring: string, param: string) {
      return (param in params) ? params[param] : param;
    });
  }

  render() {
    var account = AccountStore.get(this.props.params.accountId);
    var institution = InstitutionStore.get(account.institution.dbid);

    return <h1>{institution.name + " / " + account.name}</h1>;
  }
}
