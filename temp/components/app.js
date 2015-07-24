/// <reference path="../project.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_bootstrap_1 = require("react-bootstrap");
var Router = require("react-router");
var DefaultRoute = Router.DefaultRoute, NotFoundRoute = Router.NotFoundRoute, Route = Router.Route, RouteHandler = Router.RouteHandler;
var sidebar_1 = require("./sidebar");
var pageContent_1 = require("./pageContent");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return (React.createElement("div", {"style": App.style}, React.createElement(react_bootstrap_1.Navbar, {"fluid": true, "brand": 'asdf', "toggleNavKey": 1}, React.createElement(sidebar_1.Sidebar, {"eventKey": 1})), React.createElement(pageContent_1.PageContent, React.__spread({}, this.state), React.createElement(RouteHandler, null))));
    };
    App.style = {
        backgroundColor: "#f8f8f8"
    };
    return App;
})(React.Component);
var Blank = (function (_super) {
    __extends(Blank, _super);
    function Blank() {
        _super.apply(this, arguments);
    }
    Blank.prototype.render = function () {
        return (React.createElement("div", {"className": "container-fluid"}, React.createElement("div", {"className": "row"}, React.createElement("div", {"className": "col-lg-12"}, React.createElement("h1", {"className": "page-header"}, "Blank")))));
    };
    return Blank;
})(React.Component);
var Blank2 = (function (_super) {
    __extends(Blank2, _super);
    function Blank2() {
        _super.apply(this, arguments);
    }
    Blank2.prototype.render = function () {
        return (React.createElement("div", {"className": "container-fluid"}, React.createElement("div", {"className": "row"}, React.createElement("div", {"className": "col-lg-12"}, React.createElement("h1", {"className": "page-header"}, "Blank2")))));
    };
    return Blank2;
})(React.Component);
var NotFound = (function (_super) {
    __extends(NotFound, _super);
    function NotFound() {
        _super.apply(this, arguments);
    }
    NotFound.prototype.render = function () {
        return (React.createElement("div", {"className": "container-fluid"}, React.createElement("div", {"className": "row"}, React.createElement("div", {"className": "col-lg-12"}, React.createElement("h1", {"className": "page-header"}, "Not Found")))));
    };
    return NotFound;
})(React.Component);
function render() {
    var Home = require("./home").Home;
    var routes = (React.createElement(Route, {"handler": App}, React.createElement(DefaultRoute, {"name": "index.html", "handler": Blank}), React.createElement(Route, {"name": "#", "handler": Blank}), React.createElement(Route, {"name": Home.href, "handler": Home}), React.createElement(Route, {"name": "flot.html", "handler": Blank}), React.createElement(Route, {"name": "charts.html", "handler": Blank}), React.createElement(Route, {"name": "morris.html", "handler": Blank}), React.createElement(Route, {"name": "tables.html", "handler": Blank}), React.createElement(Route, {"name": "forms.html", "handler": Blank}), React.createElement(Route, {"name": "panels-wells.html", "handler": Blank}), React.createElement(Route, {"name": "buttons.html", "handler": Blank}), React.createElement(Route, {"name": "notifications.html", "handler": Blank}), React.createElement(Route, {"name": "typography.html", "handler": Blank}), React.createElement(Route, {"name": "icons.html", "handler": Blank}), React.createElement(Route, {"name": "grid.html", "handler": Blank}), React.createElement(Route, {"name": "login.html", "handler": Blank}), React.createElement(NotFoundRoute, {"handler": NotFound})));
    Router.run(routes, Router.HashLocation, function (Root) {
        React.render(React.createElement(Root, null), document.body);
    });
}
exports.render = render;
