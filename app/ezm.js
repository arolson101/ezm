var ezm =
webpackJsonpezm([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(ReactBootstrap) {///<reference path="project.d.ts"/>
	__webpack_require__(27);
	var Input = ReactBootstrap.Input, ListGroup = ReactBootstrap.ListGroup, ListGroupItem = ReactBootstrap.ListGroupItem, OverlayTrigger = ReactBootstrap.OverlayTrigger, Popover = ReactBootstrap.Popover, Table = ReactBootstrap.Table, Grid = ReactBootstrap.Grid, Col = ReactBootstrap.Col;
	var t = __webpack_require__(29);
	var ficache = __webpack_require__(30);
	var Sidebar = __webpack_require__(31);
	var db = __webpack_require__(32);
	var accountListData = [
	    {
	        name: "UWCU",
	        notes: "",
	        accounts: [
	            {
	                id: "12345",
	                name: "checking",
	                type: "checking",
	                accountNumber: "12345"
	            },
	            {
	                id: "12345b",
	                name: "savings",
	                type: "savings",
	                accountNumber: "12345b"
	            }
	        ]
	    },
	    {
	        name: "My CC Company",
	        notes: "",
	        accounts: [
	            {
	                id: "54321",
	                name: "visa",
	                type: "creditcard",
	                accountNumber: "54321"
	            },
	        ]
	    },
	];
	function reportError(err) {
	    console.log(err);
	}
	function main() {
	    Promise.all([
	        t.init(),
	        ficache.init(),
	        db.open(),
	    ])
	        .then(main)
	        .catch(reportError);
	}
	;
	module.exports = main;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(26)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/aolson/Developer/ezm/node_modules/css-loader/index.js!/Users/aolson/Developer/ezm/src/ezm.css", function() {
			var newContent = require("!!/Users/aolson/Developer/ezm/node_modules/css-loader/index.js!/Users/aolson/Developer/ezm/src/ezm.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(97)();
	exports.push([module.id, "\n.drag-handle {\n  color: lightgray;\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n.sortable-ghost {\n  opacity: 0.4;\n}\n\n\n.example-enter {\n  opacity: 0.01;\n  transition: opacity .5s ease-in;\n}\n\n.example-enter.example-enter-active {\n  opacity: 1;\n}\n\n.example-leave {\n  opacity: 1;\n  transition: opacity .5s ease-in;\n}\n\n.example-leave.example-leave-active {\n  opacity: 0.01;\n}", ""]);

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="project.d.ts"/>
	var i18n = __webpack_require__(11);
	exports.t = i18n.t;
	function init() {
	    return i18n.init({
	        resGetPath: 'locales/__ns__.__lng__.json'
	    });
	}
	exports.init = init;


/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(_) {/// <reference path="project.d.ts"/>
	var filist = __webpack_require__(25);
	function init() {
	    filist = _.sortBy(filist, function (fi) { return fi.name.toLowerCase(); });
	    filist.forEach(function (fi, idx) { return fi.id = idx; });
	}
	exports.init = init;
	function get(id) {
	    return filist[id];
	}
	exports.get = get;
	function byName() {
	    return filist;
	}
	exports.byName = byName;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(ReactBootstrap, React, _) {/// <reference path="../project.d.ts"/>
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var Button = ReactBootstrap.Button, ListGroupItem = ReactBootstrap.ListGroupItem, ModalTrigger = ReactBootstrap.ModalTrigger;
	var Icon = __webpack_require__(14);
	var t_1 = __webpack_require__(29);
	var accountStore_1 = __webpack_require__(117);
	var accountDisplay_1 = __webpack_require__(118);
	var accountDialog_1 = __webpack_require__(119);
	var SidebarClass = (function (_super) {
	    __extends(SidebarClass, _super);
	    function SidebarClass() {
	        _super.call(this);
	        this.state = {
	            active: "home",
	            accounts: accountStore_1.AccountStore.getDefaultData(),
	        };
	    }
	    SidebarClass.prototype.render = function () {
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
	        return (React.DOM.div(null, ListGroupItem({ ref: "root" }, ListGroupItem(selectionProps("home"), Icon({ name: "home" }), " ", t_1.t("sidebar.home")), accounts, ListGroupItem(selectionProps("budget"), Icon({ name: "area-chart" }), " ", t_1.t("sidebar.budget")), ListGroupItem(selectionProps("calendar"), Icon({ name: "calendar" }), " ", t_1.t("sidebar.calendar"))), React.DOM.span({ className: "pull-right", style: { marginTop: 5 } }, ModalTrigger({ modal: accountDialog_1.AccountDialog }, Button(null, Icon({ name: "plus" }))))));
	    };
	    SidebarClass.prototype.onSetActive = function (eventKey) {
	        this.setState({ active: eventKey });
	    };
	    return SidebarClass;
	})(React.Component);
	exports.SidebarClass = SidebarClass;
	exports.Sidebar = React.createFactory(SidebarClass);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(12), __webpack_require__(2)))

/***/ },

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Updraft) {/// <reference path="project.d.ts"/>
	var storeOptions = {
	    name: "EasyMoney"
	};
	exports.Store = new Updraft.Store();
	var openCallbacks = [];
	function onOpen(callback) {
	    openCallbacks.push(callback);
	}
	exports.onOpen = onOpen;
	function open() {
	    __webpack_require__(102);
	    return exports.Store.open(storeOptions)
	        .then(function () {
	        return Promise.all(openCallbacks.map(function (callback) { return callback(); }));
	    });
	}
	exports.open = open;
	function Id() {
	    return Updraft.Column.Int().Key();
	}
	exports.Id = Id;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Updraft) {/// <reference path="../project.d.ts"/>
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var _a = Updraft.Column, Int = _a.Int, Text = _a.Text, Bool = _a.Bool, Enum = _a.Enum, Ptr = _a.Ptr;
	var hash = __webpack_require__(7);
	var t_1 = __webpack_require__(29);
	var db_1 = __webpack_require__(32);
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Reflux, _) {/// <reference path='project.d.ts'/>
	var db = __webpack_require__(32);
	var account_1 = __webpack_require__(102);
	var actions = Reflux.createActions([
	    "addInstitution",
	    "addAccount",
	]);
	var idServer = 1;
	var institutions = [];
	var accounts = [];
	exports.AccountStore = Reflux.createStore({
	    listenables: actions,
	    actions: actions,
	    onDbOpen: function () {
	        return Promise.all([
	            account_1.Institution.all.get().then(function (results) {
	                institutions = results;
	                var ids = _.pluck(results, "id");
	                ids.push(0);
	                idServer = _.max(ids) + 1;
	            }),
	            account_1.Account.all.get().then(function (results) {
	                accounts = results;
	            }),
	        ]);
	    },
	    save: function (institution, accounts) {
	        institution.assignId();
	        _.forEach(accounts, function (account) {
	            account.institution = institution;
	            account.assignId();
	        });
	        return (_a = db.Store).save.apply(_a, [institution].concat(accounts));
	        var _a;
	    },
	    onAddInstitution: function (newInstitution) {
	        console.assert(!newInstitution.id);
	        newInstitution.id = idServer++;
	        console.log("onAddInstitution", newInstitution);
	        db.Store.save(newInstitution);
	        accounts.push(newInstitution);
	        this.trigger(accounts);
	    },
	    onAddAccount: function (newAccount) {
	        console.log("onAddAccount", newAccount);
	    },
	    getDefaultData: function () {
	        console.log("getDefaultData");
	        return accounts;
	    }
	});
	db.onOpen(exports.AccountStore.onDbOpen);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(2)))

/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(ReactBootstrap, React, _) {/// <reference path="../project.d.ts"/>
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var ListGroupItem = ReactBootstrap.ListGroupItem;
	var AccountDisplayClass = (function (_super) {
	    __extends(AccountDisplayClass, _super);
	    function AccountDisplayClass() {
	        _super.apply(this, arguments);
	    }
	    AccountDisplayClass.prototype.render = function () {
	        //var onClick = this.onClick;
	        return (ListGroupItem(_.merge({ bsSize: "small" }, this.props), this.props.account.name));
	    };
	    return AccountDisplayClass;
	})(React.Component);
	exports.AccountDisplayClass = AccountDisplayClass;
	exports.AccountDisplay = React.createFactory(AccountDisplayClass);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(12), __webpack_require__(2)))

/***/ },

/***/ 119:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(ReactBootstrap, $, React, _) {/// <reference path="../project.d.ts"/>
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var clone = __webpack_require__(6);
	var Panel = ReactBootstrap.Panel, Button = ReactBootstrap.Button, Input = ReactBootstrap.Input, Modal = ReactBootstrap.Modal, Row = ReactBootstrap.Row, Col = ReactBootstrap.Col;
	var Icon = __webpack_require__(14);
	var access = __webpack_require__(4);
	var t_1 = __webpack_require__(29);
	var ficache = __webpack_require__(30);
	var xeditable_1 = __webpack_require__(211);
	var account_1 = __webpack_require__(102);
	var enumEx_1 = __webpack_require__(212);
	var accountStore_1 = __webpack_require__(117);
	var Keys = [
	    "name",
	    "web",
	    "address",
	    "notes",
	    "institution",
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
	        var institutionOptions = ficache.byName().map(function (fi) {
	            var id = fi.id.toString();
	            return React.DOM.option({ key: id, value: id }, fi.name);
	        });
	        var inputClasses = {
	            labelClassName: "col-xs-2",
	            wrapperClassName: "col-xs-10",
	        };
	        return (Modal(_.merge({
	            title: title,
	            animation: true,
	            backdrop: "static",
	            keyboard: false,
	            trigger: "focus",
	        }, this.props), React.DOM.div({ className: "modal-body" }, React.DOM.form({ onSubmit: this.onSubmit, className: "form-horizontal" }, Input({
	            ref: "institution",
	            type: "select",
	            label: t_1.t("accountDialog.institutionLabel"),
	            help: t_1.t("accountDialog.institutionHelp"),
	            defaultValue: this.props.institution,
	            wrapperClassName: "col-xs-10",
	            labelClassName: "col-xs-2"
	        }, React.DOM.option(), institutionOptions), React.DOM.hr(), Input(_.merge({
	            type: "text",
	            label: t_1.t("accountDialog.nameLabel"),
	            help: t_1.t("accountDialog.nameHelp"),
	            placeholder: t_1.t("accountDialog.namePlaceholder"),
	            defaultValue: this.props.institution,
	            wrapperClassName: "col-xs-10",
	            labelClassName: "col-xs-2"
	        }, inputClasses)), Input(_.merge({
	            type: "text",
	            label: t_1.t("accountDialog.webLabel"),
	            placeholder: t_1.t("accountDialog.webPlaceholder"),
	            defaultValue: this.props.institution.web,
	        }, inputClasses)), Input(_.merge({
	            type: "textarea",
	            rows: 4,
	            label: t_1.t("accountDialog.addressLabel"),
	            placeholder: t_1.t("accountDialog.addressPlaceholder"),
	            defaultValue: this.props.institution.address,
	        }, inputClasses)), Input(_.merge({
	            type: "textarea",
	            rows: 4,
	            label: t_1.t("accountDialog.notesLabel"),
	            placeholder: t_1.t("accountDialog.notesPlaceholder"),
	            defaultValue: this.props.institution.notes,
	        }, inputClasses)), React.DOM.hr(), Input({
	            type: "checkbox",
	            label: t_1.t("accountDialog.enableOnline"),
	            wrapperClassName: "col-xs-12"
	        }), this.renderOnlineFields(inputClasses), React.DOM.hr(), Input(_.merge({ label: "Accounts" }, inputClasses), this.renderAccounts(), (this.state.accounts.length ? React.DOM.hr() : null), this.renderAddAccountForm()), React.DOM.div({ className: "modal-footer" }, Button({ onClick: this.props.onRequestHide }, t_1.t("accountDialog.close")), Button({ bsStyle: "primary", type: "submit", disabled: !canSave }, t_1.t("accountDialog.save")))))));
	    };
	    AccountDialogClass.prototype.renderOnlineFields = function (inputClasses) {
	        if (this.state.online) {
	            return (React.DOM.div(null, [
	                Panel({ header: t_1.t("accountDialog.ofxInfo") }, [
	                    Input(_.merge({
	                        type: "text",
	                        label: t_1.t("accountDialog.fidLabel"),
	                        help: t_1.t("accountDialog.fidHelp"),
	                        placeholder: t_1.t("accountDialog.fidPlaceholder"),
	                        defaultValue: this.props.institution.fid,
	                    }, inputClasses)),
	                    Input(_.merge({
	                        type: "text",
	                        label: t_1.t("accountDialog.orgLabel"),
	                        help: t_1.t("accountDialog.orgHelp"),
	                        placeholder: t_1.t("accountDialog.orgPlaceholder"),
	                        defaultValue: this.props.institution.org,
	                    }, inputClasses)),
	                    Input(_.merge({
	                        type: "text",
	                        label: t_1.t("accountDialog.ofxLabel"),
	                        help: t_1.t("accountDialog.ofxHelp"),
	                        placeholder: t_1.t("accountDialog.ofxPlaceholder"),
	                        defaultValue: this.props.institution.ofx,
	                    }, inputClasses)),
	                ]),
	                Panel({ header: t_1.t("accountDialog.userpassInfo") }, [
	                    Input(_.merge({
	                        type: "text",
	                        label: t_1.t("accountDialog.usernameLabel"),
	                        help: t_1.t("accountDialog.usernameHelp"),
	                        placeholder: t_1.t("accountDialog.usernamePlaceholder"),
	                        defaultValue: this.props.institution.username,
	                    }, inputClasses)),
	                    Input(_.merge({
	                        type: "text",
	                        label: t_1.t("accountDialog.passwordLabel"),
	                        help: t_1.t("accountDialog.passwordHelp"),
	                        placeholder: t_1.t("accountDialog.passwordPlaceholder"),
	                        defaultValue: this.props.institution.password,
	                    }, inputClasses)),
	                ]),
	                Input(_.merge({ label: " " }, inputClasses), Row(null, Col({ xs: 12 }, React.DOM.span({ className: "pull-right" }, Button(null, t_1.t("accountDialog.getAccountList")))))),
	            ]));
	        }
	    };
	    AccountDialogClass.prototype.renderAccounts = function () {
	        var _this = this;
	        var accountTypeOptions = enumEx_1.EnumEx.getValues(account_1.AccountType).map(function (type) { return account_1.AccountType_t(type); });
	        return this.state.accounts.map(function (acct) {
	            var typeDisplay = account_1.AccountType_t(acct.type);
	            return (Row({ key: acct.number }, [
	                Col({ xs: 1 }, Button({
	                    bsStyle: "link",
	                    onClick: _this.toggleVis.bind(_this, acct),
	                    title: t_1.t("accountDialog.toggleVisTooltip"),
	                }, Icon({ name: acct.visible ? "eye" : "eye-slash" }))),
	                Col({ xs: 2 }, xeditable_1.XSelect({ source: accountTypeOptions }, typeDisplay)),
	                Col({ xs: 3 }, Button({ bsStyle: "link", disabled: true }, acct.number)),
	                Col({ xs: 3 }, xeditable_1.XText({ title: t_1.t("accountDialog.add.namePlaceholder"), validate: ValidateNotEmpty }, acct.name)),
	                Col({ xs: 1 }, Button({ bsStyle: "link", onClick: null }, "Remove"))
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
	        return (Row(null, [
	            Col({ xs: 3 }, React.DOM.select({
	                className: "form-control"
	            }, accountTypeOptions)),
	            Col({ xs: 3 }, React.DOM.input({
	                type: "text",
	                className: "form-control",
	                placeholder: t_1.t("accountDialog.add.idPlaceholder")
	            })),
	            Col({ xs: 3 }, React.DOM.input({
	                type: "text",
	                className: "form-control",
	                placeholder: t_1.t("accountDialog.add.namePlaceholder")
	            })),
	            Col({ xs: 1 }, Button({ disabled: !btnEnabled, onClick: this.addAccount }, t_1.t("accountDialog.addAccount")))
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
	        var $institution = $(React.findDOMNode(this.refs["institution"]));
	        $institution.select2({
	            placeholder: t_1.t("accountDialog.institutionPlaceholder"),
	            allowClear: true
	        });
	        $institution.data("prev", $institution.val());
	        $institution.change(this.onInstitutionChange);
	    };
	    AccountDialogClass.prototype.onInstitutionChange = function () {
	        var _this = this;
	        React.DOM.select;
	        var institution = React.findDOMNode(this.refs["institution"]);
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
	        this.setState(state);
	    };
	    return AccountDialogClass;
	})(React.Component);
	exports.AccountDialogClass = AccountDialogClass;
	exports.AccountDialog = React.createFactory(AccountDialogClass);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(9), __webpack_require__(12), __webpack_require__(2)))

/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(React, $) {/// <reference path="../project.d.ts"/>
	var __extends = this.__extends || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    __.prototype = b.prototype;
	    d.prototype = new __();
	};
	var XEditableClass = (function (_super) {
	    __extends(XEditableClass, _super);
	    function XEditableClass() {
	        _super.apply(this, arguments);
	    }
	    XEditableClass.prototype.render = function () {
	        return React.DOM.a({
	            href: "#",
	            ref: "a"
	        }, this.props.children);
	    };
	    XEditableClass.prototype.componentDidMount = function () {
	        var $a = $(React.findDOMNode(this.refs["a"]));
	        this.props.unsavedclass = null;
	        $a.editable(this.props);
	        $a.on('save', this.onSave);
	    };
	    XEditableClass.prototype.onSave = function () {
	        var $a = $(React.findDOMNode(this.refs["a"]));
	        $a.removeClass('editable-unsaved');
	        if (this.props.onSave) {
	            this.props.onSave();
	        }
	    };
	    return XEditableClass;
	})(React.Component);
	var XSelectClass = (function (_super) {
	    __extends(XSelectClass, _super);
	    function XSelectClass(props) {
	        props.type = "select";
	        _super.call(this, props);
	    }
	    return XSelectClass;
	})(XEditableClass);
	exports.XSelectClass = XSelectClass;
	var XTextClass = (function (_super) {
	    __extends(XTextClass, _super);
	    function XTextClass(props) {
	        props.type = "text";
	        _super.call(this, props);
	    }
	    return XTextClass;
	})(XEditableClass);
	exports.XTextClass = XTextClass;
	exports.XSelect = React.createFactory(XSelectClass);
	exports.XText = React.createFactory(XTextClass);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(9)))

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	///<reference path="project.d.ts"/>
	var EnumEx = (function () {
	    function EnumEx() {
	    }
	    EnumEx.getNames = function (e) {
	        var a = [];
	        for (var val in e) {
	            if (isNaN(val)) {
	                a.push(val);
	            }
	        }
	        return a;
	    };
	    EnumEx.getValues = function (e) {
	        var a = [];
	        for (var val in e) {
	            if (!isNaN(val)) {
	                a.push(parseInt(val, 10));
	            }
	        }
	        return a;
	    };
	    EnumEx.map = function (e, cb) {
	        var a = [];
	        for (var val in e) {
	            if (!isNaN(val)) {
	                var value = parseInt(val, 10);
	                var name = e[val];
	                a.push(cb(name, value));
	            }
	        }
	        return a;
	    };
	    EnumEx.each = function (e, cb) {
	        for (var val in e) {
	            if (!isNaN(val)) {
	                var value = parseInt(val, 10);
	                var name = e[val];
	                cb(name, value);
	            }
	        }
	    };
	    return EnumEx;
	})();
	exports.EnumEx = EnumEx;


/***/ }

});
//# sourceMappingURL=ezm.js.map