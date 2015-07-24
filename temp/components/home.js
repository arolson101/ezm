/// <reference path="../project.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Home = (function (_super) {
    __extends(Home, _super);
    function Home() {
        _super.apply(this, arguments);
    }
    Home.prototype.render = function () {
        return (React.createElement("div", {"className": "container-fluid"}, React.createElement("div", {"className": "row"}, React.createElement("div", {"className": "col-lg-12"}, React.createElement("h1", {"className": "page-header"}, "Home")))));
    };
    Home.href = "home.html";
    return Home;
})(React.Component);
exports.Home = Home;
