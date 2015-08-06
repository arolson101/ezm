/// <reference path="../project.d.ts"/>

import {Button, ListGroupItem, ModalTrigger, Navbar, Nav, NavItem, DropdownButton} from "react-bootstrap";
import reactMixin = require('react-mixin');
import Router = require("react-router");
var {DefaultRoute, NotFoundRoute, Route, RouteHandler} = Router;

import {t} from "../t";
import {Sidebar} from "./sidebar";
import {PageContent} from "./pageContent";
import {AccountPage} from "./accountPage";
import {BudgetPage} from "./budgetPage";


class App extends React.Component<any, any> {
  static style = {
    backgroundColor: "#f8f8f8"
  }

  render() {
    return (
      <div style={App.style}>
        <Navbar fluid brand={t("appBrand")} toggleNavKey={1}>
          <Sidebar eventKey={1}/>
        </Navbar>
        <PageContent {... this.state}>
          <RouteHandler/>
        </PageContent>
      </div>
    );
  }
}



class Blank extends React.Component<any, any> {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Blank</h1>
          </div>
        </div>
      </div>
    );
  }
}

class Blank2 extends React.Component<any, any> {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Blank2</h1>
          </div>
        </div>
      </div>
    );
  }
}


class NotFound extends React.Component<any, any> {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="page-header">Not Found</h1>
          </div>
        </div>
      </div>
    );
  }
}


export function render() {

    var {Home} = require("./home");


    var routes = (
      <Route handler={App}>
        <DefaultRoute name="index.html" handler={Home}/>
        <Route name="#" handler={Home}/>
        {AccountPage.route()}
        {BudgetPage.route()}
        <Route name={Home.href} handler={Home}/>
        <Route name="flot.html" handler={Blank}/>
        <Route name="charts.html" handler={Blank}/>
        <Route name="morris.html" handler={Blank}/>
        <Route name="tables.html" handler={Blank}/>
        <Route name="forms.html" handler={Blank}/>
        <Route name="panels-wells.html" handler={Blank}/>
        <Route name="buttons.html" handler={Blank}/>
        <Route name="notifications.html" handler={Blank}/>
        <Route name="typography.html" handler={Blank}/>
        <Route name="icons.html" handler={Blank}/>
        <Route name="grid.html" handler={Blank}/>
        <Route name="login.html" handler={Blank}/>
        <NotFoundRoute handler={NotFound}/>
      </Route>
    );


    Router.run(routes, Router.HashLocation, (Root: any) => {
      React.render(<Root/>, document.body);
    });
}
