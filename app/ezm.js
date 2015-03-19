var ezm =
webpackJsonpezm([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	
	__webpack_require__(137);
	
	var React = __webpack_require__(2);
	//var nav = require("./navigation");
	var $__0=         __webpack_require__(9),Input=$__0.Input,ListGroup=$__0.ListGroup,ListGroupItem=$__0.ListGroupItem,OverlayTrigger=$__0.OverlayTrigger,Popover=$__0.Popover,Table=$__0.Table,Grid=$__0.Grid,Col=$__0.Col;
	var t = __webpack_require__(139);
	var ficache = __webpack_require__(140);
	var Sidebar = __webpack_require__(141);
	var db = __webpack_require__(142);
	
	/*
	uwcu
	  checking
	  savings
	  auto
	  
	nationwide advantage
	edvest
	citibank
	edward jones
	  
	fidelity
	  401k
	*/
	
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
	
	
	var Account = React.createClass({displayName: "Account",
	  render: function() {
	    var active = (this.props.selectedAccountId === this.props.account.id);
	
	    return (
	      React.createElement(OverlayTrigger, {trigger: ["hover"], placement: "right", 
	        overlay: 
	          React.createElement(Popover, {title: t(" RecentTransactions")}, 
	            React.createElement(Table, {condensed: true}, 
	              React.createElement("tr", null, React.createElement("td", null, "1/2/2015"), React.createElement("td", null, "Company"), React.createElement("td", null, "$123")), 
	              React.createElement("tr", null, React.createElement("td", null, "1/2/2015"), React.createElement("td", null, "Company"), React.createElement("td", null, "$123")), 
	              React.createElement("tr", null, React.createElement("td", null, "1/2/2015"), React.createElement("td", null, "Company"), React.createElement("td", null, "$123"))
	            )
	          )
	        }, 
	
	        React.createElement(ListGroupItem, {
	          onClick: this.props.onAccountClick, 
	          eventKey: this.props.account.id, 
	          active: active
	          }, 
	          React.createElement("span", null, 
	            React.createElement("i", {className: "fa fa-money"}), " ", this.props.account.name
	          ), 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement("small", null, "$1,234.56")
	          )
	        )
	      )
	    );
	  }
	});
	
	
	var Institution = React.createClass({displayName: "Institution",
	  getInitialState: function() {
	    return { active: '' };
	  },
	
	  render: function() {
	    var items = this.props.inst.accounts.map(function(acct) {
	      //return <ListGroupItem key={acct.name}><span>{acct.name}</span><span className="pull-right">{acct.name}</span></ListGroupItem>;
	      return (
	        React.createElement(Account, {
	          key: acct.id, 
	          account: acct, 
	          store: this.props.store, 
	          selectedAccountId: this.props.selectedAccountId, 
	          onAccountClick: this.props.onAccountClick}
	        )
	      );
	    }.bind(this));
	
	    return React.createElement(ListGroupItem, {header: this.props.inst.name}, items);
	  }
	});
	
	var AccountList = React.createClass({displayName: "AccountList",
	  getInitialState: function() {
	    return {
	      selectedAccountId: '',
	    };
	  },
	
	  render: function() {
	    var items = this.props.accounts.map(function(inst) {
	      return (
	        React.createElement(Institution, {
	          key: inst.name, 
	          inst: inst, 
	          selectedAccountId: this.state.selectedAccountId, 
	          onAccountClick: this.onAccountClick}
	        )
	      );
	    }.bind(this));
	    
	    return React.createElement(ListGroup, null, items);
	  },
	  
	  onAccountClick: function(id) {
	    this.setState({selectedAccountId: id});
	  },
	  
	  getSelectedAccountId: function() {
	    return this.state.selectedAccountId;
	  }
	});
	
	var AccountStore = __webpack_require__(143);
	var Reflux = __webpack_require__(13);
	
	var Sortable = __webpack_require__(12);
	
	var Item = React.createClass({displayName: "Item",
	  //mixins: [sortable.ItemMixin],
	  render: function() {
	    return React.createElement(ListGroupItem, null, 
	      React.createElement("span", {className: "drag-handle"}, React.createElement("i", {className: "fa fa-bars"})), " item ", this.props.item.name, 
	      React.createElement("div", {ref: "root"}, 
	        React.createElement(ListGroupItem, {onClick: this.click}, "sub1"), 
	        React.createElement(ListGroupItem, {onClick: this.click}, "sub2")
	      )
	    );
	  },
	  
	  click: function() {
	  },
	  
	  componentDidMount: function() {
	    // Set items' data, key name `items` required
	    //this.setState({ items: this.props.items });
	    this.sortable = Sortable.create(this.refs.root.getDOMNode(), {
	      //handle: ".drag-handle"
	      animation: 150,
	      ghostClass: "sortable-ghost",
	    });
	  },
	  
	  componentWillUnmount: function () {
	    this.sortable.destroy();
	  },
	  
	  onUpdate: function (/**Event*/evt) {
	    console.log("onUpdate", evt);
	    //var itemEl = evt.item;  // dragged HTMLElement
	    // + indexes from onEnd
	  },
	});
	
	var idServer = 100;
	
	var List = React.createClass({displayName: "List",
	  mixins: [
	    Reflux.connect(AccountStore, "list"),
	    React.addons.LinkedStateMixin
	  ],
	  
	  getInitialState: function() {
	    return {
	      text: 'hello',
	    };
	  },
	  
	  componentDidMount: function() {
	    // Set items' data, key name `items` required
	    //this.setState({ items: this.props.items });
	    this.sortable = Sortable.create(this.refs.root.getDOMNode(), {
	      //handle: ".drag-handle"
	      animation: 150,
	      ghostClass: "sortable-ghost", 
	    });
	  },
	  
	  componentWillUnmount: function () {
	    this.sortable.destroy();
	  },
	
	  handleValueChange: function(evt) {
	    var text = this.state.text; // because of the linkState call in render, this is the contents of the field
	    // we pressed enter, if text isn't empty we blur the field which will cause a save
	    if (evt.which === 13 && text) {
	      AccountStore.actions.addInstitution({id:idServer++, name: text});
	      this.setState({text: ''});
	      //this.refs.editInput.getDOMNode().blur();
	    }
	  },
	  
	  render: function() {
	    var items = this.props.list.map(function(item, i) {
	      return React.createElement(Item, React.__spread({key: item.id, item: item, index: i},  this.movableProps));
	    }, this);
	  
	    return (
	      React.createElement("div", null, 
	        React.createElement(ListGroupItem, {ref: "root"}, 
	          items
	        ), 
	        React.createElement(Input, {
	          type: "text", 
	          placeholder: "Enter text", 
	          valueLink: this.linkState('text'), 
	          onKeyUp: this.handleValueChange})
	      )
	    );
	  }
	});
	
	function main() {
	  if(0) {
	    React.render(
	      React.createElement(Grid, null, 
	        React.createElement(Col, {md: 4}, 
	          React.createElement(AccountList, {accounts: accountListData}), 
	          React.createElement(ListGroupItem, null, t("Budget"))
	        )
	      ),
	      document.body
	    );
	  }
	  else if(0) {
	    React.render(
	      React.createElement(List, {list: AccountStore.getDefaultData()}),
	      document.body
	    );
	  }
	  else {
	    React.render(
	      React.createElement(Grid, null, 
	        React.createElement(Col, {md: 4}, 
	          React.createElement(Sidebar, null)
	        )
	      ),
	      document.body
	    );
	  }
	}
	
	
	function reportError(err) {
	  console.log(err);
	}
	
	
	module.exports.main = function() {
	  Promise.all([
	    t.init(),
	    ficache.init(),
	    db.open(),
	  ])
	  .then(main)
	  .catch(reportError);
	};


/***/ },

/***/ 137:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(138);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(22)(content, {});
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

/***/ 138:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(89)();
	exports.push([module.id, "\n.drag-handle {\n  color: lightgray;\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n.sortable-ghost {\n  opacity: 0.4;\n}\n\n\n.example-enter {\n  opacity: 0.01;\n  transition: opacity .5s ease-in;\n}\n\n.example-enter.example-enter-active {\n  opacity: 1;\n}\n\n.example-leave {\n  opacity: 1;\n  transition: opacity .5s ease-in;\n}\n\n.example-leave.example-leave-active {\n  opacity: 0.01;\n}", ""]);

/***/ },

/***/ 139:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var i18n = __webpack_require__(7);
	
	
	module.exports = i18n.t;
	
	module.exports.init = function () {
	  return i18n.init({
	    resGetPath: 'locales/__ns__.__lng__.json'
	  });
	};


/***/ },

/***/ 140:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _ = __webpack_require__(1);
	var filist = __webpack_require__(23);
	
	function init() {
	  filist = _.sortBy(filist, function(fi)  {return fi.name.toLowerCase();});
	  _.forEach(filist, function(fi, idx) {
	    fi.id = idx;
	  });
	}
	
	function get(id) {
	  return filist[id];
	}
	
	function byName() {
	  return filist;
	}
	
	module.exports = {
	  init: init,
	  get: get,
	  byName: byName
	};


/***/ },

/***/ 141:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var $ = __webpack_require__(5);
	var React = __webpack_require__(2);
	var $__0=    __webpack_require__(9),Button=$__0.Button,ListGroupItem=$__0.ListGroupItem,ModalTrigger=$__0.ModalTrigger;
	var Icon = __webpack_require__(10);
	var Reflux = __webpack_require__(13);
	
	var t = __webpack_require__(139);
	var AccountStore = __webpack_require__(143);
	var AccountDisplay = __webpack_require__(260);
	var SortableMixin = __webpack_require__(261);
	var AccountDialog = __webpack_require__(262);
	
	
	module.exports = React.createClass({displayName: "exports",
	  mixins: [
	    Reflux.connect(AccountStore, "list"),
	    SortableMixin("root", $.extend({}, SortableMixin.DefaultProps)),
	  ],
	  
	  getInitialState: function() {
	    return {
	      active: "home",
	      accounts: AccountStore.getDefaultData(),
	    };
	  },
	
	
	  render: function() {
	    var selectionProps = function(id) {
	      var active = (id === this.state.active);
	      return {
	        key: id,
	        eventKey: id,
	        active: active,
	        onClick: (active ? null : this.onSetActive),
	        style: {cursor: (active ? "default" : "pointer")},
	      };
	    }.bind(this);
	  
	    var accounts = this.state.accounts.map(function(account) {
	      return (
	        React.createElement(AccountDisplay, React.__spread({}, 
	           selectionProps(account.id), 
	          {account: account})
	        )
	      );
	    }, this);
	    
	/*
	    var addButtonTooltip = (
	      <Tooltip>{t("sidebar.addAccountTooltip")}</Tooltip>
	    );
	*/
	    
	    return (
	      React.createElement("div", null, 
	        React.createElement(ListGroupItem, {ref: "root"}, 
	          React.createElement(ListGroupItem, React.__spread({},   selectionProps("home")), React.createElement(Icon, {name: "home"}), " ", t("sidebar.home")), 
	          accounts, 
	          React.createElement(ListGroupItem, React.__spread({},   selectionProps("budget")), React.createElement(Icon, {name: "area-chart"}), " ", t("sidebar.budget")), 
	          React.createElement(ListGroupItem, React.__spread({},   selectionProps("calendar")), React.createElement(Icon, {name: "calendar"}), " ", t("sidebar.calendar"))
	        ), 
	        React.createElement("span", {className: "pull-right", style: {marginTop: 5}}, 
	          React.createElement(ModalTrigger, {modal: React.createElement(AccountDialog, {onSave: this.onSaveNew})}, 
	            React.createElement(Button, null, React.createElement(Icon, {name: "plus"}))
	          )
	        )
	      )
	    );
	  },
	  
	  onSaveNew: function(props) {
	    AccountStore.actions.addInstitution(props);
	  },
	  
	  onSetActive: function(eventKey) {
	    this.setState({active: eventKey});
	  },
	  
	});


/***/ },

/***/ 142:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Updraft = __webpack_require__(14);
	
	
	var dbName = "EasyMoney";
	var Store = new Updraft.Store();
	
	
	function open() {
	  __webpack_require__(263);
	  
	  return Store.open({name: dbName});
	}
	
	
	function id() {
	  return { type: "int", key: true };
	}
	
	function text() {
	  return { type: "text" };
	}
	
	function ptr(ref) {
	  return { type: "ptr", ref: ref };
	}
	
	function bool() {
	  return { type: "bool" };
	}
	
	module.exports = {
	//  Account: store.createClass(require("./models/account").AccountDef),
	  id:id,
	  bool:bool,
	  text:text,
	  ptr:ptr,
	  Store:Store,
	  open:open,
	};


/***/ },

/***/ 143:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Reflux = __webpack_require__(13);
	
	var actions = Reflux.createActions([
	  "addInstitution",
	  "addAccount",
	]);
	
	
	var idServer = 1;
	var items = [{id: idServer++, name:'abc'}, {id: idServer++, name: 'def'}];
	
	module.exports = Reflux.createStore({
	  listenables: actions,
	  
	  actions: actions,
	  
	  onAddInstitution: function(newInstitution) {
	    console.assert(!newInstitution.id);
	    newInstitution.id = idServer++;
	    console.log("onAddInstitution", newInstitution);
	    items.push(newInstitution);
	    this.trigger(items);
	  },
	  
	  onAddAccount: function(newAccount) {
	    console.log("onAddAccount", newAccount);
	  },
	  
	  getDefaultData: function() {
	    console.log("getDefaultData");
	    return items;
	  }
	});


/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(8);
	var $__0=  __webpack_require__(9),ListGroupItem=$__0.ListGroupItem;
	
	//var DragHandle = require("./dragHandle");
	
	
	module.exports = React.createClass({displayName: "exports",
	  propTypes: {
	    account: React.PropTypes.object.isRequired,
	    //isEditing: React.PropTypes.bool.isRequired,
	  },
	
	  render: function() {
	    //var onClick = this.onClick;
	    
	/*
	    if(this.props.isEditing) {
	      style.cursor = "-webkit-grab";
	      onClick = null;
	    }
	*/
	
	    return (
	      React.createElement(ListGroupItem, React.__spread({},   this.props, {bsSize: "small"}), 
	        /*<DragHandle isEditing={this.props.isEditing}/>*/
	        this.props.account.name
	      )
	    );
	  },
	
	});


/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var SortableJS = __webpack_require__(12);
	
	var DefaultProps = {
	  animation: 150,
	  ghostClass: "sortable-ghost",
	};
	
	
	function SortableMixin(rootRefName, props) {
	  props = props || DefaultProps;
	  return {
	    componentDidMount: function() {
	      this._sortable = SortableJS.create(this.refs[rootRefName].getDOMNode(), props);
	    },
	
	    componentWillUnmount: function () {
	      this._sortable.destroy();
	    },
	    
	    enableSort: function(enabled) {
	      this._sortable.option("disabled", !enabled);
	    }
	  };
	}
	
	SortableMixin.DefaultProps = DefaultProps;
	
	module.exports = SortableMixin;


/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	var _ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var $__0=       __webpack_require__(9),Panel=$__0.Panel,Button=$__0.Button,Input=$__0.Input,Modal=$__0.Modal,Row=$__0.Row,Col=$__0.Col;
	var Icon = __webpack_require__(10);
	var access = __webpack_require__(3);
	var t = __webpack_require__(139);
	var ficache = __webpack_require__(140);
	var Editable = __webpack_require__(325);
	var $__1=  __webpack_require__(263),AccountTypes=$__1.AccountTypes;
	
	
	var Keys = [
	  "name",
	  "web",
	  "address",
	  "notes",
	  "institution",
	
	  "online",
	  
	  "fid",
	  "org",
	  "url",
	  
	  "username",
	  "password",
	];
	
	function ValidateNotEmpty(value) {
	  if($.trim(value) === "") {
	    return t("accountDialog.validateNotEmpty");
	  }
	}
	
	var AccountDialog = React.createClass({displayName: "AccountDialog",
	  mixins: [React.addons.LinkedStateMixin],
	
	  propTypes: {
	    id: React.PropTypes.string
	  },
	  
	  getInitialState: function() {
	    var state = {
	      accounts: [],
	      addAccountName: "",
	      addAccountNumber: "",
	      addAccountType: t("accountDialog.add.typePlaceholder"),
	    };
	    for(var key in Keys) {
	      state[key] = this.props[key];
	    }
	    if(!("online" in this.props)) {
	      state.online = true;
	    }
	    return state;
	  },
	  
	  render: function() {
	    var title = this.props.id ? t("accountDialog.editTitle") : t("accountDialog.addTitle");
	    var canSave = this.state.name ? true : false;
	    
	    var institutionOptions = _.map(ficache.byName(), function(fi) {
	      return React.createElement("option", {key: fi.id, value: fi.id}, fi.name);
	    });
	    
	    var inputClasses = {
	      labelClassName: "col-xs-2",
	      wrapperClassName: "col-xs-10",
	    };
	    
	    return (
	      React.createElement(Modal, React.__spread({},  this.props, 
	        {title: title, 
	        animation: true, 
	        "data-backdrop": "static", 
	        "data-keyboard": "false", 
	        "data-trigger": "focus"
	        }), 
	        React.createElement("div", {className: "modal-body"}, 
	          React.createElement("form", {onSubmit: this.onSubmit, className: "form-horizontal"}, 
	          
	            React.createElement(Input, {
	              ref: "institution", 
	              type: "select", 
	              label: t("accountDialog.institutionLabel"), 
	              help: t("accountDialog.institutionHelp"), 
	              defaultValue: this.props.institution, 
	              wrapperClassName: "col-xs-10", 
	              labelClassName: "col-xs-2"
	              }, 
	              React.createElement("option", null), 
	              institutionOptions
	            ), 
	
	            React.createElement("hr", null), 
	
	            React.createElement(Input, React.__spread({
	              type: "text", 
	              label: t("accountDialog.nameLabel"), 
	              help: t("accountDialog.nameHelp"), 
	              placeholder: t("accountDialog.namePlaceholder"), 
	              defaultValue: this.props.name, 
	              valueLink: this.linkState('name')}, 
	              inputClasses)
	            ), 
	
	            React.createElement(Input, React.__spread({
	              type: "text", 
	              label: t("accountDialog.webLabel"), 
	              placeholder: t("accountDialog.webPlaceholder"), 
	              defaultValue: this.props.web, 
	              valueLink: this.linkState('web')}, 
	              inputClasses)
	            ), 
	            
	            React.createElement(Input, React.__spread({
	              type: "textarea", 
	              rows: "4", 
	              label: t("accountDialog.addressLabel"), 
	              placeholder: t("accountDialog.addressPlaceholder"), 
	              defaultValue: this.props.address, 
	              valueLink: this.linkState('address')}, 
	              inputClasses)
	            ), 
	            
	            React.createElement(Input, React.__spread({
	              type: "textarea", 
	              rows: "4", 
	              label: t("accountDialog.notesLabel"), 
	              placeholder: t("accountDialog.notesPlaceholder"), 
	              defaultValue: this.props.notes, 
	              valueLink: this.linkState('notes')}, 
	              inputClasses)
	            ), 
	            
	            React.createElement("hr", null), 
	
	            React.createElement(Input, {
	              type: "checkbox", 
	              label: t("accountDialog.enableOnline"), 
	              checkedLink: this.linkState('online'), 
	              wrapperClassName: "col-xs-12"}
	            ), 
	            
	            this.renderOnlineFields(inputClasses), 
	            
	            React.createElement("hr", null), 
	            
	            React.createElement(Input, React.__spread({label: "Accounts"},  inputClasses), 
	              this.renderAccounts(), 
	              this.state.accounts.length > 0 ? React.createElement("hr", null) : null, 
	              this.renderAddAccountForm()
	            ), 
	
	            React.createElement("div", {className: "modal-footer"}, 
	              React.createElement(Button, {onClick: this.props.onRequestHide}, t("accountDialog.close")), 
	              React.createElement(Button, {bsStyle: "primary", type: "submit", disabled: !canSave}, t("accountDialog.save"))
	            )
	          )
	        )
	      )
	    );
	  },
	  
	  renderOnlineFields: function(inputClasses) {
	    if(this.state.online) {
	      return (
	        React.createElement("div", null, 
	          React.createElement(Panel, {header: t("accountDialog.ofxInfo")}, 
	            React.createElement(Input, React.__spread({
	              type: "text", 
	              label: t("accountDialog.fidLabel"), 
	              help: t("accountDialog.fidHelp"), 
	              placeholder: t("accountDialog.fidPlaceholder"), 
	              defaultValue: this.props.fid, 
	              valueLink: this.linkState('fid')}, 
	              inputClasses)
	            ), 
	
	            React.createElement(Input, React.__spread({
	              type: "text", 
	              label: t("accountDialog.orgLabel"), 
	              help: t("accountDialog.orgHelp"), 
	              placeholder: t("accountDialog.orgPlaceholder"), 
	              defaultValue: this.props.org, 
	              valueLink: this.linkState('org')}, 
	              inputClasses)
	            ), 
	
	            React.createElement(Input, React.__spread({
	              type: "text", 
	              label: t("accountDialog.ofxLabel"), 
	              help: t("accountDialog.ofxHelp"), 
	              placeholder: t("accountDialog.ofxPlaceholder"), 
	              defaultValue: this.props.url, 
	              valueLink: this.linkState('ofx')}, 
	              inputClasses)
	            )
	          ), 
	          
	          React.createElement(Panel, {header: t("accountDialog.userpassInfo")}, 
	            React.createElement(Input, React.__spread({
	              type: "text", 
	              label: t("accountDialog.usernameLabel"), 
	              help: t("accountDialog.usernameHelp"), 
	              placeholder: t("accountDialog.usernamePlaceholder"), 
	              defaultValue: this.props.username, 
	              valueLink: this.linkState('username')}, 
	              inputClasses)
	            ), 
	
	            React.createElement(Input, React.__spread({
	              type: "text", 
	              label: t("accountDialog.passwordLabel"), 
	              help: t("accountDialog.passwordHelp"), 
	              placeholder: t("accountDialog.passwordPlaceholder"), 
	              defaultValue: this.props.password, 
	              valueLink: this.linkState('password')}, 
	              inputClasses)
	            )
	          ), 
	          
	          React.createElement(Input, React.__spread({label: " "},  inputClasses), 
	            React.createElement(Row, null, 
	              React.createElement(Col, {xs: 12}, 
	                React.createElement("span", {className: "pull-right"}, 
	                  React.createElement(Button, null, t("accountDialog.getAccountList"))
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  },
	  
	  renderAccounts: function() {
	    var accountTypeOptions = AccountTypes.map(function(type) {
	      return AccountTypes.t(type);
	    });
	    return this.state.accounts.map(function(acct) {
	      var typeDisplay = AccountTypes.t(acct.type);
	      return (
	        React.createElement(Row, {key: acct.id}, 
	          React.createElement(Col, {xs: 1}, 
	            React.createElement(Button, {
	              bsStyle: "link", 
	              onClick: this.toggleVis.bind(this, acct), 
	              title: t("accountDialog.toggleVisTooltip")
	            }, 
	              React.createElement(Icon, {name: acct.visible ? "eye" : "eye-slash"})
	            )
	          ), 
	          React.createElement(Col, {xs: 2}, 
	            React.createElement(Editable, {
	              type: "select", 
	              source: accountTypeOptions, 
	              value: typeDisplay, 
	              title: t("accountDialog.add.typePlaceholder")
	            }, 
	              typeDisplay
	            )
	          ), 
	          React.createElement(Col, {xs: 3}, 
	            React.createElement(Button, {
	              bsStyle: "link", 
	              disabled: true
	            }, 
	              acct.id
	            )
	          ), 
	          React.createElement(Col, {xs: 3}, 
	            React.createElement(Editable, {
	              type: "text", 
	              title: t("accountDialog.add.namePlaceholder"), 
	              validate: ValidateNotEmpty
	            }, 
	              acct.name
	            )
	          ), 
	          React.createElement(Col, {xs: 1}, 
	            React.createElement(Button, {bsStyle: "link", onClick: ""}, "Remove")
	          )
	        )
	      );
	    }, this);
	  },
	  
	  renderAddAccountForm: function() {
	    var accountTypeOptions = AccountTypes.map(function(type) {
	      return React.createElement("option", {key: type, value: type}, AccountTypes.t(type));
	    });
	    var btnEnabled = (this.state.addAccountType !== t("accountDialog.add.typePlaceholder")) &&
	                      (this.state.addAccountId !== "") &&
	                      (this.state.addAccountName !== "");
	    return (
	      React.createElement(Row, null, 
	        React.createElement(Col, {xs: 3}, 
	          React.createElement("select", {
	            className: "form-control", 
	            valueLink: this.linkState('addAccountType')
	          }, 
	            React.createElement("option", {selection: true, disabled: true}, t("accountDialog.add.typePlaceholder")), 
	            accountTypeOptions
	          )
	        ), 
	        React.createElement(Col, {xs: 3}, 
	          React.createElement("input", {
	            type: "text", 
	            className: "form-control", 
	            valueLink: this.linkState('addAccountId'), 
	            placeholder: t("accountDialog.add.idPlaceholder")}
	          )
	        ), 
	        React.createElement(Col, {xs: 3}, 
	          React.createElement("input", {
	            type: "text", 
	            className: "form-control", 
	            valueLink: this.linkState('addAccountName'), 
	            placeholder: t("accountDialog.add.namePlaceholder")}
	          )
	        ), 
	        React.createElement(Col, {xs: 1}, 
	          React.createElement(Button, {disabled: !btnEnabled, onClick: this.addAccount}, t("accountDialog.addAccount"))
	        )
	      )
	    );
	  },
	  
	  addAccount: function() {
	    this.state.accounts.push({
	      type: this.state.addAccountType,
	      id: this.state.addAccountId,
	      name: this.state.addAccountName,
	      visible: true
	    });
	    
	    this.setState({
	      addAccountType: t("accountDialog.add.typePlaceholder"),
	      addAccountId: "",
	      addAccountName: "",
	    });
	  },
	  
	  toggleVis: function(acct) {
	    acct.visible = !acct.visible;
	    this.forceUpdate();
	  },
	  
	  componentDidMount: function() {
	    var institution = this.refs.institution.getInputDOMNode();
	    var $institution = $(institution);
	    $institution.select2({
	      placeholder: t("accountDialog.institutionPlaceholder"),
	      allowClear: true
	    });
	    $institution.data("prev", $institution.val());
	    $institution.change(this.onInstitutionChange);
	  },
	  
	  onInstitutionChange: function() {
	    var institution = this.refs.institution.getInputDOMNode();
	    var $institution = $(institution);
	
	    var prev = $institution.data("prev");
	    $institution.data("prev", $institution.val());
	    var oldfi = ficache.get(prev);
	
	    var value = institution.options[institution.selectedIndex].value;
	    var state = {institution: value};
	    var newfi = ficache.get(value);
	    
	    var initField = function(stateKey, fiProp) {
	      fiProp = fiProp || stateKey;
	      var getValue = (typeof fiProp === "function" ? fiProp : function(fi) { return access(fi, fiProp); });
	      if(!this.state[stateKey] || this.state[stateKey] === getValue(oldfi)) {
	        state[stateKey] = getValue(newfi);
	      }
	    }.bind(this);
	
	    initField("name");
	    initField("web", "profile.siteURL");
	    initField("address", function(fi) {
	      var address = "";
	      if(fi && fi.profile) {
	        if(fi.profile.address1) { address += fi.profile.address1 + "\n"; }
	        if(fi.profile.address2) { address += fi.profile.address2 + "\n"; }
	        if(fi.profile.address3) { address += fi.profile.address3 + "\n"; }
	        if(fi.profile.city)     { address += fi.profile.city + ", "; }
	        if(fi.profile.state)    { address += fi.profile.state + " "; }
	        if(fi.profile.zip)      { address += fi.profile.zip + "\n"; }
	        if(fi.profile.country)  { address += fi.profile.country; }
	      }
	      return address;
	    });
	    initField("fid");
	    initField("org");
	    initField("ofx");
	
	    this.setState(state);
	  },
	  
	  onSubmit: function() {
	    var data = {};
	    Keys.forEach(function(key) {
	      data[key] = this.state[key];
	    }, this);
	    if (this.props.id) {
	      this.props.onSave(data);
	      //this.props.onRequestHide();
	    } else {
	      this.props.onSave(data);
	      //e.preventDefault();
	    }
	  },
	});
	
	
	module.exports = AccountDialog;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var t = __webpack_require__(139);
	var $__0=      __webpack_require__(142),Store=$__0.Store,id=$__0.id,bool=$__0.bool,text=$__0.text,ptr=$__0.ptr;
	
	
	var AccountTypes = [
	  "CHECKING",
	  "SAVINGS",
	  "CREDITCARD",
	];
	
	
	AccountTypes.t = function(type) {
	  return t("AccountTypes." + type);
	};
	
	
	var Institution = Store.createClass({
	  tableName: "institutions",
	  columns: {
	    id: id(),
	    name: text(),
	    web: text(),
	    address: text(),
	    notes: text(),
	
	    online: bool(),
	
	    fid: text(),
	    org: text(),
	    ofx: text(),
	    
	    username: text(),
	    password: text(),
	  }
	});
	
	
	var Account = Store.createClass({
	  tableName: "accounts",
	  columns: {
	    id: id(),
	    institution: ptr(Institution),
	    name: text(),
	    type: text(), // AccountTypes
	    number: text(),
	  }
	});
	
	
	
	module.exports = {
	  AccountTypes:AccountTypes,
	  Institution:Institution,
	  Account:Account,
	};

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	var React = __webpack_require__(8);
	
	
	var Editable = React.createClass({displayName: "Editable",
	  render: function() {
	    return React.createElement("a", {href: "#", ref: "a", success: this.onSuccess}, this.props.children);
	  },
	  
	  componentDidMount: function() {
	    this.props.unsavedclass = null;
	    $(this.refs.a.getDOMNode()).editable(this.props);
	    $(this.refs.a.getDOMNode()).on('save', this.onSave);
	  },
	  
	  onSave: function(/*e, params*/) {
	    $(this.refs.a.getDOMNode()).removeClass('editable-unsaved');
	    if(this.props.onSave) {
	      this.props.onSave();
	    }
	  }
	});
	
	module.exports = Editable;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }

});
//# sourceMappingURL=ezm.js.map