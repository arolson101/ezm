/// <reference path="../project.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _a = Updraft.Column, Int = _a.Int, Text = _a.Text, Bool = _a.Bool, Enum = _a.Enum, Ptr = _a.Ptr;
var hash = require("string-hash");
var t_1 = require("../t");
var db_1 = require("../db");
(function (AccountType) {
    AccountType[AccountType["CHECKING"] = 0] = "CHECKING";
    AccountType[AccountType["SAVINGS"] = 1] = "SAVINGS";
    AccountType[AccountType["CREDITCARD"] = 2] = "CREDITCARD";
})(exports.AccountType || (exports.AccountType = {}));
var AccountType = exports.AccountType;
function AccountType_t(val) {
    return t_1.t("AccountTypes." + AccountType[val]);
}
exports.AccountType_t = AccountType_t;
var Institution = (function (_super) {
    __extends(Institution, _super);
    function Institution() {
        _super.call(this);
    }
    Institution.get = function (id) { throw new Error("overwritten"); };
    Institution.prototype.assignId = function () {
        if (!this.id) {
            this.id = hash(Date.now().toString());
        }
    };
    Institution.tableName = "institutions";
    Institution.columns = {
        id: db_1.Id(),
        name: Text(),
        web: Text(),
        address: Text(),
        notes: Text(),
        online: Bool().Default(true),
        fid: Text(),
        org: Text(),
        ofx: Text(),
        username: Text(),
        password: Text(),
    };
    return Institution;
})(Updraft.Instance);
exports.Institution = Institution;
db_1.Store.addClass(Institution);
var Account = (function (_super) {
    __extends(Account, _super);
    function Account() {
        _super.apply(this, arguments);
    }
    Account.get = function (id) { throw new Error("overwritten"); };
    Account.prototype.assignId = function () {
        if (!this.id) {
            console.assert(!!this.institution);
            console.assert(!!this.number);
            this.id = hash(this.institution.id + " " + this.number);
        }
    };
    Account.tableName = "accounts";
    Account.columns = {
        id: db_1.Id(),
        institution: Ptr(Institution),
        name: Text(),
        type: Enum(AccountType),
        visible: Bool().Default(true),
        number: Text(),
    };
    return Account;
})(Updraft.Instance);
exports.Account = Account;
db_1.Store.addClass(Account);
