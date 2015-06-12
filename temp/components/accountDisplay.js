/// <reference path="../project.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var factories_1 = require("../factories");
var React = require("react");
var AccountDisplayClass = (function (_super) {
    __extends(AccountDisplayClass, _super);
    function AccountDisplayClass() {
        _super.apply(this, arguments);
    }
    AccountDisplayClass.prototype.render = function () {
        //var onClick = this.onClick;
        return (factories_1.ListGroupItem(_.merge({ bsSize: "small" }, this.props), this.props.account.name));
    };
    return AccountDisplayClass;
})(React.Component);
exports.AccountDisplayClass = AccountDisplayClass;
exports.AccountDisplay = React.createFactory(AccountDisplayClass);
