/// <reference path="../project.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var clone = require("clone");
var React = require("react");
var factories_1 = require("../factories");
var access = require("safe-access");
var t_1 = require("../t");
var ficache = require("../ficache");
var xeditable_1 = require("./xeditable");
var account_1 = require("../models/account");
var enumEx_1 = require("../enumEx");
var accountStore_1 = require("../accountStore");
var Keys = [
    "name",
    "web",
    "address",
    "notes",
    "institution",
    "id",
    "online",
    "fid",
    "org",
    "ofx",
    "username",
    "password",
];
function ValidateNotEmpty(value) {
    if ($.trim(value) === "") {
        return t_1.t("accountDialog.validateNotEmpty");
    }
}
var AccountDialogClass = (function (_super) {
    __extends(AccountDialogClass, _super);
    function AccountDialogClass(props) {
        var _this = this;
        _super.call(this, props);
        this.onInstitutionChange = function () {
            var institution = _this.refs["institution"].getInputDOMNode();
            var $institution = $(institution);
            var prev = $institution.data("prev");
            $institution.data("prev", $institution.val());
            var oldfi = ficache.get(prev);
            var value = institution.options[institution.selectedIndex].value;
            var state = { institution: value };
            var newfi = ficache.get(value);
            var initField = function (stateKey, fiProp) {
                fiProp = fiProp || stateKey;
                var getValue = (typeof fiProp === "function" ? fiProp : function (fi) { return access(fi, fiProp); });
                if (!_this.state[stateKey] || _this.state[stateKey] === getValue(oldfi)) {
                    state[stateKey] = getValue(newfi);
                }
            };
            initField("name");
            initField("web", "profile.siteURL");
            initField("address", function (fi) {
                var address = "";
                if (fi && fi.profile) {
                    if (fi.profile.address1) {
                        address += fi.profile.address1 + "\n";
                    }
                    if (fi.profile.address2) {
                        address += fi.profile.address2 + "\n";
                    }
                    if (fi.profile.address3) {
                        address += fi.profile.address3 + "\n";
                    }
                    if (fi.profile.city) {
                        address += fi.profile.city + ", ";
                    }
                    if (fi.profile.state) {
                        address += fi.profile.state + " ";
                    }
                    if (fi.profile.zip) {
                        address += fi.profile.zip + "\n";
                    }
                    if (fi.profile.country) {
                        address += fi.profile.country;
                    }
                }
                return address;
            });
            initField("fid");
            initField("org");
            initField("ofx");
            _this.setState(state);
        };
        this.onSubmit = function () {
            var institution = new account_1.Institution();
            Keys.forEach(function (key) {
                institution[key] = _this.state[key];
            });
            var accounts = _this.state.accounts.map(function (account) { return new account_1.Account(account); });
            accountStore_1.AccountStore.save(institution, accounts);
        };
        var src = this.props.institution || new account_1.Institution();
        this.state = {
            accounts: clone(this.props.accounts) || [],
            addAccountName: "",
            addAccountNumber: 0,
            addAccountType: t_1.t("accountDialog.add.typePlaceholder"),
            name: null,
        };
        Keys.forEach(function (key) {
            return _this.state[key] = (typeof (src[key]) === "undefined" ? "" : src[key]);
        });
    }
    AccountDialogClass.prototype.render = function () {
        var title = this.props.id ? t_1.t("accountDialog.editTitle") : t_1.t("accountDialog.addTitle");
        var canSave = this.state.name ? true : false;
        var inputClasses = {
            labelClassName: "col-xs-2",
            wrapperClassName: "col-xs-10",
        };
        return (factories_1.Modal(_.merge({
            title: title,
            animation: true,
            backdrop: "static",
            keyboard: false,
            trigger: "focus",
        }, this.props), React.DOM.div({ className: "modal-body" }, React.DOM.form({ onSubmit: this.onSubmit, className: "form-horizontal" }, factories_1.Input({
            ref: "institution",
            type: "select",
            label: t_1.t("accountDialog.institutionLabel"),
            help: t_1.t("accountDialog.institutionHelp"),
            defaultValue: this.state.id,
            wrapperClassName: "col-xs-10",
            labelClassName: "col-xs-2"
        }), React.DOM.hr(), factories_1.Input(_.merge({
            type: "text",
            label: t_1.t("accountDialog.nameLabel"),
            help: t_1.t("accountDialog.nameHelp"),
            placeholder: t_1.t("accountDialog.namePlaceholder"),
            defaultValue: this.state.name,
            wrapperClassName: "col-xs-10",
            labelClassName: "col-xs-2"
        }, inputClasses)), factories_1.Input(_.merge({
            type: "text",
            label: t_1.t("accountDialog.webLabel"),
            placeholder: t_1.t("accountDialog.webPlaceholder"),
            defaultValue: this.state.web,
        }, inputClasses)), factories_1.Input(_.merge({
            type: "textarea",
            rows: 4,
            label: t_1.t("accountDialog.addressLabel"),
            placeholder: t_1.t("accountDialog.addressPlaceholder"),
            defaultValue: this.state.address,
        }, inputClasses)), factories_1.Input(_.merge({
            type: "textarea",
            rows: 4,
            label: t_1.t("accountDialog.notesLabel"),
            placeholder: t_1.t("accountDialog.notesPlaceholder"),
            defaultValue: this.state.notes,
        }, inputClasses)), React.DOM.hr(), factories_1.Input({
            type: "checkbox",
            label: t_1.t("accountDialog.enableOnline"),
            wrapperClassName: "col-xs-12"
        }), this.renderOnlineFields(inputClasses), React.DOM.hr(), factories_1.Input(_.merge({ label: "Accounts" }, inputClasses), this.renderAccounts(), (this.state.accounts.length ? React.DOM.hr() : null), this.renderAddAccountForm()), React.DOM.div({ className: "modal-footer" }, factories_1.Button({ onClick: this.props.onRequestHide }, t_1.t("accountDialog.close")), factories_1.Button({ bsStyle: "primary", type: "submit", disabled: !canSave }, t_1.t("accountDialog.save")))))));
    };
    AccountDialogClass.prototype.renderOnlineFields = function (inputClasses) {
        if (this.state.online) {
            return (React.DOM.div(null, [
                factories_1.Panel({ header: t_1.t("accountDialog.ofxInfo") }, [
                    factories_1.Input(_.merge({
                        type: "text",
                        label: t_1.t("accountDialog.fidLabel"),
                        help: t_1.t("accountDialog.fidHelp"),
                        placeholder: t_1.t("accountDialog.fidPlaceholder"),
                        defaultValue: this.state.fid,
                    }, inputClasses)),
                    factories_1.Input(_.merge({
                        type: "text",
                        label: t_1.t("accountDialog.orgLabel"),
                        help: t_1.t("accountDialog.orgHelp"),
                        placeholder: t_1.t("accountDialog.orgPlaceholder"),
                        defaultValue: this.state.org,
                    }, inputClasses)),
                    factories_1.Input(_.merge({
                        type: "text",
                        label: t_1.t("accountDialog.ofxLabel"),
                        help: t_1.t("accountDialog.ofxHelp"),
                        placeholder: t_1.t("accountDialog.ofxPlaceholder"),
                        defaultValue: this.state.ofx,
                    }, inputClasses)),
                ]),
                factories_1.Panel({ header: t_1.t("accountDialog.userpassInfo") }, [
                    factories_1.Input(_.merge({
                        type: "text",
                        label: t_1.t("accountDialog.usernameLabel"),
                        help: t_1.t("accountDialog.usernameHelp"),
                        placeholder: t_1.t("accountDialog.usernamePlaceholder"),
                        defaultValue: this.state.username,
                    }, inputClasses)),
                    factories_1.Input(_.merge({
                        type: "text",
                        label: t_1.t("accountDialog.passwordLabel"),
                        help: t_1.t("accountDialog.passwordHelp"),
                        placeholder: t_1.t("accountDialog.passwordPlaceholder"),
                        defaultValue: this.state.password,
                    }, inputClasses)),
                ]),
                factories_1.Input(_.merge({ label: " " }, inputClasses), factories_1.Row(null, factories_1.Col({ xs: 12 }, React.DOM.span({ className: "pull-right" }, factories_1.Button(null, t_1.t("accountDialog.getAccountList")))))),
            ]));
        }
    };
    AccountDialogClass.prototype.renderAccounts = function () {
        var _this = this;
        var accountTypeOptions = enumEx_1.EnumEx.getValues(account_1.AccountType).map(function (type) { return account_1.AccountType_t(type); });
        return this.state.accounts.map(function (acct) {
            var typeDisplay = account_1.AccountType_t(acct.type);
            return (factories_1.Row({ key: acct.number }, [
                factories_1.Col({ xs: 1 }, factories_1.Button({
                    bsStyle: "link",
                    onClick: _this.toggleVis.bind(_this, acct),
                    title: t_1.t("accountDialog.toggleVisTooltip"),
                }, factories_1.Icon({ name: acct.visible ? "eye" : "eye-slash" }))),
                factories_1.Col({ xs: 2 }, xeditable_1.XSelect({ source: accountTypeOptions }, typeDisplay)),
                factories_1.Col({ xs: 3 }, factories_1.Button({ bsStyle: "link", disabled: true }, acct.number)),
                factories_1.Col({ xs: 3 }, xeditable_1.XText({ title: t_1.t("accountDialog.add.namePlaceholder"), validate: ValidateNotEmpty }, acct.name)),
                factories_1.Col({ xs: 1 }, factories_1.Button({ bsStyle: "link", onClick: null }, "Remove"))
            ]));
        });
    };
    AccountDialogClass.prototype.renderAddAccountForm = function () {
        var accountTypeOptions = enumEx_1.EnumEx.map(account_1.AccountType, function (name, val) {
            return React.DOM.option({ key: name, value: name }, account_1.AccountType_t(val));
        });
        var btnEnabled = (this.state.addAccountType !== t_1.t("accountDialog.add.typePlaceholder")) &&
            (this.state.addAccountNumber !== 0) &&
            (this.state.addAccountName !== "");
        return (factories_1.Row(null, [
            factories_1.Col({ xs: 3, key: "opts" }, React.DOM.select({
                className: "form-control"
            }, accountTypeOptions)),
            factories_1.Col({ xs: 3, key: "id" }, React.DOM.input({
                type: "text",
                className: "form-control",
                placeholder: t_1.t("accountDialog.add.idPlaceholder")
            })),
            factories_1.Col({ xs: 3, key: "name" }, React.DOM.input({
                type: "text",
                className: "form-control",
                placeholder: t_1.t("accountDialog.add.namePlaceholder")
            })),
            factories_1.Col({ xs: 1, key: "add" }, factories_1.Button({ disabled: !btnEnabled, onClick: this.addAccount }, t_1.t("accountDialog.addAccount")))
        ]));
    };
    AccountDialogClass.prototype.addAccount = function () {
        this.state.accounts.push({
            type: account_1.AccountType[this.state.addAccountType],
            number: this.state.addAccountNumber,
            name: this.state.addAccountName,
            visible: true
        });
        this.setState({
            addAccountType: t_1.t("accountDialog.add.typePlaceholder"),
            addAccountNumber: 0,
            addAccountName: "",
        });
    };
    AccountDialogClass.prototype.toggleVis = function (acct) {
        acct.visible = !acct.visible;
        this.forceUpdate();
    };
    AccountDialogClass.prototype.componentDidMount = function () {
        var data = ficache.byName().map(function (fi) {
            return {
                id: fi.id.toString(),
                text: fi.name
            };
        });
        var institution = this.refs["institution"].getInputDOMNode();
        var $institution = $(institution);
        $institution.select2({
            placeholder: t_1.t("accountDialog.institutionPlaceholder"),
            allowClear: true,
            data: data
        });
        $institution.data("prev", $institution.val());
        $institution.change(this.onInstitutionChange);
    };
    return AccountDialogClass;
})(React.Component);
exports.AccountDialogClass = AccountDialogClass;
exports.AccountDialog = React.createFactory(AccountDialogClass);
