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
var react_bootstrap_1 = require("react-bootstrap");
var Radium = require("radium");
var t_1 = require("../t");
var accountStore_1 = require("../stores/accountStore");
var sortable_1 = require("../mixins/sortable");
var metisMenu_1 = require("./metisMenu");
var applyMixins_1 = require("../mixins/applyMixins");
var flap_1 = require("../flap");
var home_1 = require("./home");
var RadiumNav = Radium(react_bootstrap_1.Nav);
var Sidebar = (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar() {
        _super.call(this);
        this.state = {
            active: "home",
        };
        this.linkState(accountStore_1.accountStore, "accounts");
    }
    Sidebar.prototype.render = function () {
        var _this = this;
        var selectionProps = function (id) {
            var active = (id === _this.state.active);
            return {
                key: id,
                active: active,
                onClick: (active ? null : function () { return _this.onSetActive(id); }),
                style: { cursor: (active ? "default" : "pointer") },
            };
        };
        return (React.createElement(RadiumNav, React.__spread({"role": "navigation"}, this.props, {"style": Sidebar.style}), React.createElement("div", {"style": { paddingRight: 0, paddingLeft: 0 }}, React.createElement(metisMenu_1.MetisMenu, {"ref": "root"}, React.createElement(metisMenu_1.MetisMenuItem, {"title": t_1.t("sidebar.home"), "href": home_1.Home.href, "icon": "home"}), this.state.accounts.map(function (account) {
            return (React.createElement(metisMenu_1.MetisMenuItem, {"title": account.name, "key": account.name}));
        }), React.createElement(metisMenu_1.MetisMenuItem, {"title": t_1.t("sidebar.budget"), "icon": "area-chart"}), React.createElement(metisMenu_1.MetisMenuItem, {"title": t_1.t("sidebar.calendar"), "icon": "calendar"}), React.createElement(metisMenu_1.MetisMenuItem, {"title": "Multi-Level Dropdown", "icon": "sitemap"}, React.createElement(metisMenu_1.MetisMenuItem, {"title": "Second Level Item"}), React.createElement(metisMenu_1.MetisMenuItem, {"title": "Second Level Item"}), React.createElement(metisMenu_1.MetisMenuItem, {"title": "Third Level"}, React.createElement(metisMenu_1.MetisMenuItem, {"title": "Third Level Item"}), React.createElement(metisMenu_1.MetisMenuItem, {"title": "Third Level Item"}), React.createElement(metisMenu_1.MetisMenuItem, {"title": "Third Level Item"}), React.createElement(metisMenu_1.MetisMenuItem, {"title": "Third Level Item"})))))));
    };
    Sidebar.prototype.onSetActive = function (id) {
        this.setState({ active: id });
    };
    Sidebar.style = {
        "@media (min-width: 768px)": {
            marginLeft: -15,
            zIndex: 1,
            position: "absolute",
            width: 250,
            marginTop: 35
        }
    };
    Sidebar = __decorate([
        applyMixins_1.mixin(flap_1.Flap.ReactMixin(), sortable_1.SortableMixin("root")),
        Radium, 
        __metadata('design:paramtypes', [])
    ], Sidebar);
    return Sidebar;
})(React.Component);
exports.Sidebar = Sidebar;
