/// <reference path="../project.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Icon = require("react-fa");
var React = require("react/addons");
var Router = require("react-router");
var Radium = require("radium");
var Link = Router.Link;
var MetisMenuItem = (function (_super) {
    __extends(MetisMenuItem, _super);
    function MetisMenuItem() {
        _super.apply(this, arguments);
    }
    MetisMenuItem.prototype.render = function () {
        var style = {};
        if (this.props.level > 0) {
            style.borderBottom = "none !important";
        }
        return (React.createElement("li", {"style": [
            (this.props.level == 0 ? MetisMenuItem.parentStyle : MetisMenuItem.childStyle),
            this.props.style
        ]}, React.createElement(Link, {"to": this.props.href || "#", "style": { paddingLeft: 15 + 22 * this.props.level }}, this.props.icon ? React.createElement(Icon, {"name": this.props.icon}) : null, this.props.icon ? " " : null, this.props.title, this.props.children ? React.createElement("span", {"className": "fa arrow"}) : null), this.props.children ? React.createElement("ul", {"className": "nav"}, this.renderChildren()) : null));
    };
    MetisMenuItem.prototype.renderChildren = function () {
        var level = this.props.level || 0;
        return React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, { level: level + 1 });
        });
    };
    MetisMenuItem.parentStyle = {
        borderBottom: {
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: "#e7e7e7"
        }
    };
    MetisMenuItem.childStyle = {
        borderBottom: {
            borderBottomWidth: 0,
            borderBottomStyle: "none",
        }
    };
    MetisMenuItem = __decorate([
        Radium, 
        __metadata('design:paramtypes', [])
    ], MetisMenuItem);
    return MetisMenuItem;
})(React.Component);
exports.MetisMenuItem = MetisMenuItem;
var MetisMenu = (function (_super) {
    __extends(MetisMenu, _super);
    function MetisMenu() {
        _super.apply(this, arguments);
    }
    MetisMenu.prototype.render = function () {
        return (React.createElement("ul", {"className": "nav", "ref": "menu", "style": { borderBottom: "1px solid #e7e7e7" }}, this.props.children));
    };
    MetisMenu.prototype.componentDidMount = function () {
        var menu = React.findDOMNode(this.refs['menu']);
        $(menu).metisMenu();
    };
    return MetisMenu;
})(React.Component);
exports.MetisMenu = MetisMenu;
