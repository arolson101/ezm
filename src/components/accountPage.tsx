/// <reference path="../project.d.ts"/>

import {Route, Link} from "react-router";

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
    return <h1>Account {this.props.params.accountId}</h1>;
  }
}
