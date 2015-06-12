/// <reference path="../project.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var factories_1 = require("../factories");
var t_1 = require("../t");
var accountStore_1 = require("../accountStore");
var accountDisplay_1 = require("./accountDisplay");
var accountDialog_1 = require("./accountDialog");
var Sidebar = (function (_super) {
    __extends(Sidebar, _super);
    function Sidebar() {
        _super.call(this);
        this.state = {
            active: "home",
            accounts: accountStore_1.AccountStore.getDefaultData(),
        };
    }
    Sidebar.prototype.render = function () {
        var selectionProps = function (id) {
            var active = (id === this.state.active);
            return {
                key: id,
                eventKey: id,
                active: active,
                onClick: (active ? null : this.onSetActive),
                style: { cursor: (active ? "default" : "pointer") },
            };
        }.bind(this);
        var accounts = this.state.accounts.map(function (account) {
            return (accountDisplay_1.AccountDisplay(_.merge(selectionProps(account.id), { account: account })));
        });
        return (React.DOM.div(null, factories_1.ListGroupItem({ ref: "root" }, factories_1.ListGroupItem(selectionProps("home"), factories_1.Icon({ name: "home" }), " ", t_1.t("sidebar.home")), accounts, factories_1.ListGroupItem(selectionProps("budget"), factories_1.Icon({ name: "area-chart" }), " ", t_1.t("sidebar.budget")), factories_1.ListGroupItem(selectionProps("calendar"), factories_1.Icon({ name: "calendar" }), " ", t_1.t("sidebar.calendar"))), React.DOM.span({ className: "pull-right", style: { marginTop: 5 } }, factories_1.ModalTrigger({ modal: accountDialog_1.AccountDialog() }, factories_1.Button(null, factories_1.Icon({ name: "plus" }))))));
    };
    Sidebar.prototype.onSetActive = function (eventKey) {
        this.setState({ active: eventKey });
    };
    return Sidebar;
})(React.Component);
exports.Sidebar = Sidebar;
