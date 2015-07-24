/// <reference path="../project.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var react_bootstrap_1 = require("react-bootstrap");
var React = require("react");
var AccountDisplay = (function (_super) {
    __extends(AccountDisplay, _super);
    function AccountDisplay() {
        _super.apply(this, arguments);
    }
    AccountDisplay.prototype.render = function () {
        //var onClick = this.onClick;
        return (React.createElement(react_bootstrap_1.ListGroupItem, React.__spread({"bsSize": "small"}, this.props), this.props.account.name));
    };
    return AccountDisplay;
})(React.Component);
exports.AccountDisplay = AccountDisplay;
