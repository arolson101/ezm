var ezm =
webpackJsonpezm([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	'use strict';
	
	
	__webpack_require__(86);
	
	var React = __webpack_require__(2);
	//var nav = require("./navigation");
	var $__0=         __webpack_require__(10),Input=$__0.Input,ListGroup=$__0.ListGroup,ListGroupItem=$__0.ListGroupItem,OverlayTrigger=$__0.OverlayTrigger,Popover=$__0.Popover,Table=$__0.Table,Grid=$__0.Grid,Col=$__0.Col;
	var t = __webpack_require__(88);
	var ficache = __webpack_require__(89);
	var Sidebar = __webpack_require__(90);
	var db = __webpack_require__(91);
	
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
	
	var AccountStore = __webpack_require__(92);
	var Reflux = __webpack_require__(3);
	
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
	
	
	module.exports.main = function() {
	  Promise.all([
	    t.init(),
	    ficache.init(),
	    db.open(),
	  ])
	  .then(main);
	};


/***/ },

/***/ 86:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(18)(content, {});
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

/***/ 87:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(70)();
	exports.push([module.id, "\n.drag-handle {\n  color: lightgray;\n  cursor: grab;\n  cursor: -webkit-grab;\n}\n\n.sortable-ghost {\n  opacity: 0.4;\n}\n\n\n.example-enter {\n  opacity: 0.01;\n  transition: opacity .5s ease-in;\n}\n\n.example-enter.example-enter-active {\n  opacity: 1;\n}\n\n.example-leave {\n  opacity: 1;\n  transition: opacity .5s ease-in;\n}\n\n.example-leave.example-leave-active {\n  opacity: 0.01;\n}", ""]);

/***/ },

/***/ 88:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var i18n = __webpack_require__(6);
	
	
	module.exports = i18n.t;
	
	module.exports.init = function () {
	  return i18n.init({
	    resGetPath: 'locales/__ns__.__lng__.json'
	  });
	};


/***/ },

/***/ 89:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _ = __webpack_require__(1);
	var filist = __webpack_require__(306);
	
	function init() {
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
	  byName: byName,
	};


/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var $ = __webpack_require__(7);
	var React = __webpack_require__(2);
	var $__0=    __webpack_require__(10),Button=$__0.Button,ListGroupItem=$__0.ListGroupItem,ModalTrigger=$__0.ModalTrigger;
	var Icon = __webpack_require__(11);
	var Reflux = __webpack_require__(3);
	
	var t = __webpack_require__(88);
	var AccountStore = __webpack_require__(92);
	var AccountDisplay = __webpack_require__(242);
	var SortableMixin = __webpack_require__(243);
	var AccountDialog = __webpack_require__(244);
	
	
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

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Updraft = __webpack_require__(13);
	
	
	var dbName = "EasyMoney";
	var store = new Updraft.Store();
	
	
	module.exports = {
	  Account: store.createClass(__webpack_require__(241)),
	  
	  open: function() {
	    return store.open({name: dbName});
	  },
	};


/***/ },

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Reflux = __webpack_require__(3);
	
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

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	  tableName: "accounts",
	  columns: {
	    id: { type: "int", key: "true" },
	    name: { type: "text" },
	    url: { type: "text" },
	    notes: { type: "text" },
	  }
	};


/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(9);
	var $__0=  __webpack_require__(10),ListGroupItem=$__0.ListGroupItem;
	
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

/***/ 243:
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

/***/ 244:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";
	
	var _ = __webpack_require__(1);
	var React = __webpack_require__(2);
	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
	var $__0=     __webpack_require__(10),Button=$__0.Button,Input=$__0.Input,Modal=$__0.Modal,Panel=$__0.Panel;
	var access = __webpack_require__(4);
	var t = __webpack_require__(88);
	var ficache = __webpack_require__(89);
	
	
	var Keys = [
	  "name",
	  "web",
	  "notes",
	  "institution",
	
	  "online",
	  
	  "fid",
	  "org",
	  "url",
	];
	
	var AccountDialog = React.createClass({displayName: "AccountDialog",
	  mixins: [React.addons.LinkedStateMixin],
	
	  propTypes: {
	    id: React.PropTypes.string
	  },
	  
	  getInitialState: function() {
	    var state = {};
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
	    
	    var onlineFields = null;
	    if(this.state.online) {
	      onlineFields = (
	        React.createElement("div", null, 
	          React.createElement(Input, {
	            type: "text", 
	            label: t("accountDialog.fidLabel"), 
	            help: t("accountDialog.fidHelp"), 
	            defaultValue: this.props.fid, 
	            valueLink: this.linkState('fid')}
	          ), 
	
	          React.createElement(Input, {
	            type: "text", 
	            label: t("accountDialog.orgLabel"), 
	            help: t("accountDialog.orgHelp"), 
	            defaultValue: this.props.org, 
	            valueLink: this.linkState('org')}
	          ), 
	
	          React.createElement(Input, {
	            type: "text", 
	            label: t("accountDialog.urlLabel"), 
	            help: t("accountDialog.urlHelp"), 
	            defaultValue: this.props.url, 
	            valueLink: this.linkState('url')}
	          )
	        )
	      );
	    }
	
	    return (
	      React.createElement(Modal, React.__spread({},  this.props, 
	        {title: title, 
	        animation: true, 
	        "data-backdrop": "static", 
	        "data-keyboard": "false", 
	        "data-trigger": "focus"
	        }), 
	        React.createElement("div", {className: "modal-body"}, 
	          React.createElement("form", {onSubmit: this.onSubmit}, 
	          
	            React.createElement(Input, {
	              ref: "institution", 
	              type: "select", 
	              label: t("accountDialog.institutionLabel"), 
	              help: t("accountDialog.institutionHelp"), 
	              defaultValue: this.props.institution
	              }, 
	              React.createElement("option", null), 
	              institutionOptions
	            ), 
	
	            React.createElement(Input, {
	              type: "text", 
	              label: t("accountDialog.nameLabel"), 
	              help: t("accountDialog.nameHelp"), 
	              defaultValue: this.props.name, 
	              valueLink: this.linkState('name')}
	            ), 
	
	            React.createElement(Input, {
	              type: "text", 
	              label: t("accountDialog.webLabel"), 
	              defaultValue: this.props.web, 
	              valueLink: this.linkState('web')}
	            ), 
	            
	            React.createElement(Input, {
	              type: "textarea", 
	              label: t("accountDialog.notesLabel"), 
	              defaultValue: this.props.notes, 
	              valueLink: this.linkState('notes')}
	            ), 
	
	
	            React.createElement(Input, {
	              type: "checkbox", 
	              label: t("accountDialog.enableOnline"), 
	              checkedLink: this.linkState('online'), 
	              wrapperClassName: "col-xs-12"}
	            ), 
	            
	            React.createElement(Panel, {key: "onlineFields"}, 
	              onlineFields
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
	  
	  componentDidMount: function() {
	    var institution = this.refs.institution.getInputDOMNode();
	    var $institution = $(institution);
	    $institution.select2();
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
	      if(!this.state[stateKey] || this.state[stateKey] === access(oldfi, fiProp)) {
	        state[stateKey] = access(newfi, fiProp);
	      }
	    }.bind(this);
	
	    initField("name");
	    initField("web", "profile.url");
	    initField("fid");
	    initField("org");
	    initField("url");
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	module.exports = [
		{
			"name": "121 Financial Credit Union",
			"fid": "000001155",
			"org": "121 Financial Credit Union",
			"ofx": "https://ppcplus.121fcu.org/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "1st Source Bank",
			"fid": "071212128",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "205 W. Jefferson",
				"address2": "Suite 404",
				"address3": null,
				"city": "South Bend",
				"state": "IN",
				"zip": "46601",
				"country": "USA",
				"email": "1stsource@1stsource.com",
				"customerServicePhone": "574-235-2250 or 1-888-258-3150",
				"technicalSupportPhone": "574-235-2250 or 1-888-258-3150",
				"fax": "574-235-2522",
				"financialInstitutionName": "1st Source Bank",
				"siteURL": "www.1stsourceonline.com"
			}
		},
		{
			"name": "5 Star Bank",
			"fid": "307087713",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "909 N. washington St",
				"address2": null,
				"address3": null,
				"city": "Alexandria",
				"state": "VA",
				"zip": "22314",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "719-574-2777",
				"technicalSupportPhone": "719-574-2777",
				"fax": null,
				"financialInstitutionName": "5 Star Bank",
				"siteURL": "www.5staronlinebanking.com"
			}
		},
		{
			"name": "AB&T National - Georgia",
			"fid": "061219694",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2815 Meredyth Drive",
				"address2": "P.O. Box 71269",
				"address3": null,
				"city": "Albany",
				"state": "GA",
				"zip": "31708",
				"country": "USA",
				"email": "support@comcapbancshares.com",
				"customerServicePhone": "229-446-6158",
				"technicalSupportPhone": "229-446-6158",
				"fax": "229-446-2274",
				"financialInstitutionName": "Albany Bank and Trust",
				"siteURL": "www.albanybankandtrust2.com"
			}
		},
		{
			"name": "ACU - America's Credit Union",
			"fid": "325180634",
			"org": "AMERICASCUDC",
			"ofx": "https://perseus.youracu.org/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "12th and Pendleton",
				"address2": "building 2201",
				"address3": null,
				"city": "Fort Lewis",
				"state": "WA",
				"zip": "98433",
				"country": "USA",
				"email": "itgroup@youracu.org",
				"customerServicePhone": "866-968-7128",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "America's Credit Union DC",
				"siteURL": null
			}
		},
		{
			"name": "ALTA Alliance Bank",
			"fid": "121144463",
			"org": "LOneNintyTwo",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1951 Webster Street",
				"address2": null,
				"address3": null,
				"city": "Oakland",
				"state": "CA",
				"zip": "94612",
				"country": "USA",
				"email": null,
				"customerServicePhone": "510-899-7500",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "ALTA Alliance Bank",
				"siteURL": null
			}
		},
		{
			"name": "APCO Employees Credit Union",
			"fid": "262087609",
			"org": "USERS",
			"ofx": "https://apcocu.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Abbott Laboratories ECU - ALEC",
			"fid": "35MXN",
			"org": "Abbott Laboratories ECU - ALEC",
			"ofx": "https://www.netit.financial-net.com/ofx/",
			"profile": {
				"address1": "401 N. RIVERSIDE DRIVE",
				"address2": null,
				"address3": null,
				"city": "GURNEE",
				"state": "IL",
				"zip": "60031",
				"country": "US",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "ABBOTT LABORATORIES EMPLOYEES CU",
				"siteURL": "https://www.netit.financial-net.com/alec"
			}
		},
		{
			"name": "Achieva Credit Union",
			"fid": "4491",
			"org": "Achieva Credit Union",
			"ofx": "https://rbserver.achievacu.com/ofx/ofx.dll",
			"profile": {
				"address1": "1499 Gulf to Bay Blvd",
				"address2": null,
				"address3": null,
				"city": "Clearwater",
				"state": "FL",
				"zip": "34653",
				"country": "USA",
				"email": "john@achievacu.com",
				"customerServicePhone": "727-431-7680",
				"technicalSupportPhone": null,
				"fax": "727-431-7420",
				"financialInstitutionName": "Achieva Credit Union",
				"siteURL": "https://rbserver.achievacu.com"
			}
		},
		{
			"name": "Adams Co-operative Bank",
			"fid": "743",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "93 Park Avenue",
				"address2": null,
				"address3": null,
				"city": "Adams",
				"state": "MA",
				"zip": "01220",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 686-3744",
				"technicalSupportPhone": "(800) 686-3744",
				"fax": null,
				"financialInstitutionName": "Adams Co-operative Bank",
				"siteURL": "http://www.adamscooperative.com"
			}
		},
		{
			"name": "Adams Community Bank - New",
			"fid": "1205",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "2 Center Street",
				"address2": null,
				"address3": null,
				"city": "Adams",
				"state": "MA",
				"zip": "01220",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-368-9080",
				"technicalSupportPhone": "800-368-9080",
				"fax": null,
				"financialInstitutionName": "Adams Community Bank",
				"siteURL": "https://www.adamscommunity.com/"
			}
		},
		{
			"name": "Addison Avenue Investment Svcs",
			"fid": "13807",
			"org": "Addison Avenue Investment Svcs",
			"ofx": "https://ofx.firsttechfed.com",
			"profile": {
				"address1": "3408 Hillview Ave",
				"address2": null,
				"address3": null,
				"city": "Palo Alto",
				"state": "CA",
				"zip": "94304",
				"country": "USA",
				"email": "email@addisonavenue.com",
				"customerServicePhone": "877.233.4766",
				"technicalSupportPhone": "877.233.4766",
				"fax": "555.555.5554",
				"financialInstitutionName": "Addison Avenue Investment Svcs",
				"siteURL": "http://www.firsttechfed.com"
			}
		},
		{
			"name": "Advantage National Bank",
			"fid": "5501",
			"org": "918",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "75 E. Turner Avenue",
				"address2": null,
				"address3": null,
				"city": "Elk Grove Village",
				"state": "IL",
				"zip": "60007",
				"country": "USA",
				"email": "info@advantagenationalbank.com",
				"customerServicePhone": "877-386-3344",
				"technicalSupportPhone": null,
				"fax": "847-357-0847",
				"financialInstitutionName": "Advantage Bank",
				"siteURL": "http://www.advantagenationalbank.com"
			}
		},
		{
			"name": "Advantis Credit Union",
			"fid": "323075097",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "P.O. BOX 14220",
				"address2": null,
				"address3": null,
				"city": "Portland",
				"state": "OR",
				"zip": "97293-0220",
				"country": "USA",
				"email": "advantiscu@advantiscu.org",
				"customerServicePhone": "503-785-2528 opt 5",
				"technicalSupportPhone": "503-785-2528 opt 5",
				"fax": "503-785-2528",
				"financialInstitutionName": "Advantis Credit Union",
				"siteURL": "www.advantiscu.org"
			}
		},
		{
			"name": "Aerospace FCU",
			"fid": "1976",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "2310 E. El Segundo Blvd.",
				"address2": null,
				"address3": null,
				"city": "El Segundo,",
				"state": "CA",
				"zip": "90245",
				"country": "USA",
				"email": "nwood@aerodcu.org",
				"customerServicePhone": "800-235-8261",
				"technicalSupportPhone": "800-235-8261",
				"fax": null,
				"financialInstitutionName": "Aerospace Federal Credit Union",
				"siteURL": "https://www.aerofcu.org"
			}
		},
		{
			"name": "Affinity Federal Credit Union",
			"fid": "221283512",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "73 Mountain View Blvd",
				"address2": null,
				"address3": null,
				"city": "Basking Ridge",
				"state": "NJ",
				"zip": "07920",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-325-0808",
				"technicalSupportPhone": "800-325-0808",
				"fax": null,
				"financialInstitutionName": "Affinity Federal Credit Union",
				"siteURL": "www.affinityfcu.org"
			}
		},
		{
			"name": "Affinity Plus FCU-New",
			"fid": "15268",
			"org": "Affinity Plus Federal Credit Uni",
			"ofx": "https://mobile.affinityplus.org/OFX/OFXServer.aspx",
			"profile": {
				"address1": "175 West Lafayette Frontage Road",
				"address2": null,
				"address3": null,
				"city": "St. Paul",
				"state": "MN",
				"zip": "55107",
				"country": "USA",
				"email": "affinityplus@affinityplus.org",
				"customerServicePhone": "800-322-7228",
				"technicalSupportPhone": "651-291-3700",
				"fax": null,
				"financialInstitutionName": "Affinity Plus FCU-New",
				"siteURL": "https://www.affinityplus.org"
			}
		},
		{
			"name": "AllSouth Federal Credit Union",
			"fid": "253279031",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "6923 North Trenholm Road",
				"address2": null,
				"address3": null,
				"city": "Columbia",
				"state": "SC",
				"zip": "29206",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "803-736-3110",
				"technicalSupportPhone": "803-736-3110",
				"fax": null,
				"financialInstitutionName": "Allsouth Federal Credit Union",
				"siteURL": "www.allsouthhb.org"
			}
		},
		{
			"name": "Allegacy Federal Credit Union",
			"fid": "253177887",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "PO Box 26043",
				"address2": null,
				"address3": null,
				"city": "Winston-Salem",
				"state": "NC",
				"zip": "27114-6043",
				"country": "USA",
				"email": "allegacy@allegacyfcu.org",
				"customerServicePhone": "336-774-3400",
				"technicalSupportPhone": "336-774-3400",
				"fax": "336-774-4115",
				"financialInstitutionName": "Allegacy Federal Credit Union",
				"siteURL": "www.allegacyfcu.org"
			}
		},
		{
			"name": "Allegheny Valley Bank of Pgh - DC",
			"fid": "1646",
			"org": "olb-3240",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "5137 Butler Street",
				"address2": null,
				"address3": null,
				"city": "Pittsburgh",
				"state": "PA",
				"zip": "15201",
				"country": "USA",
				"email": "billpay@avbpgh.com",
				"customerServicePhone": "412-632-1345",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Allegheny Valley Bank",
				"siteURL": "http://www.avbpgh.com"
			}
		},
		{
			"name": "Allied First Bank",
			"fid": "071993214",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "387 Shuman Blvd",
				"address2": "Ste 290E",
				"address3": null,
				"city": "Naperville",
				"state": "IL",
				"zip": "60563",
				"country": "USA",
				"email": "customerservice@alliedfirst.com",
				"customerServicePhone": "800-272-3286",
				"technicalSupportPhone": "800-272-3286",
				"fax": "630-328-5169",
				"financialInstitutionName": "Allied First Bank",
				"siteURL": "http://www.alliedfirst.com"
			}
		},
		{
			"name": "Allied Healthcare FCU",
			"fid": "322276868",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "455 Old Newport Blvd., Suite 100",
				"address2": null,
				"address3": null,
				"city": "Newport Beach",
				"state": "Ca",
				"zip": "92663",
				"country": "USA",
				"email": "info@ahfcu.org",
				"customerServicePhone": "888-488-9105",
				"technicalSupportPhone": "888-488-9105",
				"fax": "949-631-3699",
				"financialInstitutionName": "Allied Healthcare Federal Credi",
				"siteURL": "http://www.ahfcu.org"
			}
		},
		{
			"name": "Alpine Bank",
			"fid": "1451",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "2200 GRAND AVE",
				"address2": "GLENWOOD SPRINGS, CO  81601",
				"address3": null,
				"city": "GRAND JUNCTION",
				"state": "CO",
				"zip": "815010000",
				"country": "USA",
				"email": "onlinebanking@alpinebank.com",
				"customerServicePhone": "(970) 945-2424",
				"technicalSupportPhone": "800-551-6098",
				"fax": null,
				"financialInstitutionName": "ALPINE BANK",
				"siteURL": "http://www.alpinebank.com"
			}
		},
		{
			"name": "AltaOne Federal Credit Union",
			"fid": "322274462",
			"org": "Users, Inc.",
			"ofx": "https://msconline2.altaone.net/scripts/isaofx.dll",
			"profile": {
				"address1": "701 S. ChinaLake Blvd",
				"address2": null,
				"address3": null,
				"city": "Ridgecrest",
				"state": "CA",
				"zip": "93555",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "800-433-9727",
				"technicalSupportPhone": "760-371-7032",
				"fax": "760-371-7079",
				"financialInstitutionName": "AltaOne Federal Credit Union",
				"siteURL": "http://www.altaone.org"
			}
		},
		{
			"name": "Altana FCU",
			"fid": "2012",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "3212 Central Ave.",
				"address2": null,
				"address3": null,
				"city": "Billings",
				"state": "MT",
				"zip": "59102",
				"country": "USA",
				"email": "dsundheim@altanafcu.org",
				"customerServicePhone": "800-398-2536",
				"technicalSupportPhone": "800-398-2536",
				"fax": null,
				"financialInstitutionName": "Altana Federal Credit Union",
				"siteURL": "www.altanafcu.org"
			}
		},
		{
			"name": "Altra Federal CU",
			"fid": "54495",
			"org": "Connect",
			"ofx": "https://www.altraonline.org/altra_ofxdirect/ofxrqst.aspx",
			"profile": {
				"address1": "PO Box 433",
				"address2": null,
				"address3": null,
				"city": "La Crosse",
				"state": "WI",
				"zip": "54602",
				"country": "USA",
				"email": "info@altra.org",
				"customerServicePhone": "(608)787-4500",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Altra Federal Credit Union",
				"siteURL": "https://www.altra.org"
			}
		},
		{
			"name": "Amegy Bank of Texas - Direct",
			"fid": "SWBTX",
			"org": "292-3",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/0SWBTX.ofx",
			"profile": {
				"address1": "7730 South Union Park Ave",
				"address2": "Suite 250",
				"address3": null,
				"city": "Midvale",
				"state": "UT",
				"zip": "84047",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Amegy Bank of Texas",
				"siteURL": "http://www.amegybank.com"
			}
		},
		{
			"name": "Amegy Investments, Inc.",
			"fid": "047",
			"org": "Amegy Investments, Inc.",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "4400 Post Oak Parkway",
				"address2": null,
				"address3": null,
				"city": "Houston",
				"state": "TX",
				"zip": "77027",
				"country": "USA",
				"email": "investments@amegybank.com",
				"customerServicePhone": "712-232-2222",
				"technicalSupportPhone": "712-232-2222",
				"fax": "-",
				"financialInstitutionName": "Amegy Investments, Inc.",
				"siteURL": "http://www.amegybank.com"
			}
		},
		{
			"name": "AmeriServ Bank Business Hub",
			"fid": "C031301066",
			"org": "1361",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "216 Franklin Street",
				"address2": null,
				"address3": null,
				"city": "Johnstown",
				"state": "PA",
				"zip": "15901",
				"country": "USA",
				"email": "2",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Ameriserv Financial Bank",
				"siteURL": "www.AmeriServOnlineBank.com"
			}
		},
		{
			"name": "AmeriServ Financial Bank",
			"fid": "031301066",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "216 Franklin Street",
				"address2": null,
				"address3": null,
				"city": "Johnstown",
				"state": "PA",
				"zip": "15901",
				"country": "USA",
				"email": "onlineadmin@ameriserv.com",
				"customerServicePhone": "814-533-5300",
				"technicalSupportPhone": "814-533-5300",
				"fax": "814-533-5490",
				"financialInstitutionName": "AmeriServ Financial Bank",
				"siteURL": "www.ameriservonlinebank.com"
			}
		},
		{
			"name": "America First Credit Union",
			"fid": "54324",
			"org": "America First Credit Union",
			"ofx": "https://ofx.americafirst.com",
			"profile": {
				"address1": "PO Box 9199",
				"address2": null,
				"address3": null,
				"city": "Ogden",
				"state": "UT",
				"zip": "84409",
				"country": "USA",
				"email": "support@americafirst.com",
				"customerServicePhone": "800.999.3961",
				"technicalSupportPhone": "866.224.2158",
				"fax": "801.778.8358",
				"financialInstitutionName": "America First Credit Union",
				"siteURL": "http://www.americafirst.com"
			}
		},
		{
			"name": "American Broadcast Employees FCU",
			"fid": "2078",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "7-11 Front Street, Rockville Centre",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "New York",
				"zip": "11570",
				"country": "USA",
				"email": null,
				"customerServicePhone": "800-780-9496",
				"technicalSupportPhone": "800-780-9496",
				"fax": null,
				"financialInstitutionName": "American Broadcast Employees FCU",
				"siteURL": "http://www.abefcu.org"
			}
		},
		{
			"name": "American Century Brokerage",
			"fid": "055",
			"org": "American Century Services Corp.",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "One Pershing Plaza",
				"address2": null,
				"address3": null,
				"city": "Jersey City",
				"state": "NJ",
				"zip": "07399",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "1-888-345-2071",
				"technicalSupportPhone": "1-888-345-2071",
				"fax": "-",
				"financialInstitutionName": "American Century Brokerage",
				"siteURL": "http://www.americancentury.com"
			}
		},
		{
			"name": "American Enterprise Bank - FL",
			"fid": "10920",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "10611 DEERWOOD PARK BLVD.",
				"address2": "JACKSONVILLE, FL 32256",
				"address3": null,
				"city": "JACKSONVILLE",
				"state": "FL",
				"zip": "322560000",
				"country": "USA",
				"email": "info@aebfl.com",
				"customerServicePhone": "(904) 281-1900",
				"technicalSupportPhone": "(904)281-1900",
				"fax": null,
				"financialInstitutionName": "AMERICAN ENTERPRISE BANK",
				"siteURL": "http://www.aebfl.com"
			}
		},
		{
			"name": "American Express",
			"fid": "3101",
			"org": "AMEX",
			"ofx": "https://online.americanexpress.com/myca/ofxdl/desktop/desktopDownload.do?request_type=nl_ofxdownload",
			"profile": {
				"address1": "777 American Expressway",
				"address2": null,
				"address3": null,
				"city": "Fort Lauderdale",
				"state": "Fla.",
				"zip": "33337-0001",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-800-AXP-7500  (1-800-297-7500)",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "American Express",
				"siteURL": null
			}
		},
		{
			"name": "American Funds",
			"fid": "7779",
			"org": "INTUIT",
			"ofx": "https://ofx.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=3000518",
			"profile": {
				"address1": "816 Broadway",
				"address2": null,
				"address3": null,
				"city": "Kansas City",
				"state": "MO",
				"zip": "64105",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "AFS",
				"siteURL": null
			}
		},
		{
			"name": "American Momentum Bank",
			"fid": "14931",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "4830 W. Kennedy Blvd. Ste. 200",
				"address2": "Tampa, FL 33609",
				"address3": null,
				"city": "COLLEGE STATION",
				"state": "TX",
				"zip": "778450000",
				"country": "USA",
				"email": "onlinesupport@americanmomentumbank.com",
				"customerServicePhone": "(866) 530-2265",
				"technicalSupportPhone": "813-282-8888",
				"fax": null,
				"financialInstitutionName": "American Momentum Bank",
				"siteURL": "http://www.americanmomentumbank.com"
			}
		},
		{
			"name": "American National Bank",
			"fid": "4201",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04201.ofx",
			"profile": {
				"address1": "33 N. Lasalle",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60602",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "American National Bank",
				"siteURL": "http://www.americannationalbank.com/"
			}
		},
		{
			"name": "American National Bank TX",
			"fid": "2275",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "P O Box 40",
				"address2": "Terrell TX 75160",
				"address3": null,
				"city": "TERRELL",
				"state": "TX",
				"zip": "751600000",
				"country": "USA",
				"email": "internetadmin@anbtx.com",
				"customerServicePhone": "(800) 837-6584",
				"technicalSupportPhone": "(800)837-6584",
				"fax": null,
				"financialInstitutionName": "American Natl Bank of Texas",
				"siteURL": "http://www.anbtx.com"
			}
		},
		{
			"name": "American National Bank, FL",
			"fid": "14946",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "4301 N FEDERAL HIGHWAY",
				"address2": "OAKLAND PARK, FL 33308",
				"address3": null,
				"city": "OAKLAND PARK",
				"state": "FL",
				"zip": "333080000",
				"country": "USA",
				"email": "donotreply@americannationalbank.com",
				"customerServicePhone": "(954) 491-7788",
				"technicalSupportPhone": "954-491-7788",
				"fax": null,
				"financialInstitutionName": "AMERICAN NATIONAL BANK",
				"siteURL": "https://www.americannationalbank.com"
			}
		},
		{
			"name": "American Riviera Bank",
			"fid": "122244333",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1033 Anacapa Street",
				"address2": null,
				"address3": null,
				"city": "Santa Barbara",
				"state": "CA",
				"zip": "93101",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "805-965-5942",
				"technicalSupportPhone": "805-965-5942",
				"fax": null,
				"financialInstitutionName": "American Riviera Bank",
				"siteURL": "www.americanrivierabkonline.com"
			}
		},
		{
			"name": "American Savings Bank - Portsmouth",
			"fid": "1783",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "503 Chillicothe Street",
				"address2": null,
				"address3": null,
				"city": "Portsmouth",
				"state": "OH",
				"zip": "45662",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-877-609-3614",
				"technicalSupportPhone": "1-877-609-3614",
				"fax": null,
				"financialInstitutionName": "American Savings Bank",
				"siteURL": "http://www.asbportsmouth.com/"
			}
		},
		{
			"name": "American State Bank - TX-DL",
			"fid": "57732",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "P.O. BOX 100",
				"address2": "ARP, TX 75750",
				"address3": null,
				"city": "ARP",
				"state": "TX",
				"zip": "757500100",
				"country": "USA",
				"email": "support@asbtx.com",
				"customerServicePhone": "(903) 859-2211",
				"technicalSupportPhone": "903-859-2211",
				"fax": null,
				"financialInstitutionName": "American State Bank",
				"siteURL": "http://www.asbtx.com"
			}
		},
		{
			"name": "Ameriprise Brokerage",
			"fid": "3102",
			"org": "AMPF",
			"ofx": "https://www25.ameriprise.com/AMPFWeb/ofxdl/us/download?request_type=nl_desktopdownload",
			"profile": {
				"address1": "70400 Ameriprise Financial Ctr.",
				"address2": null,
				"address3": null,
				"city": "Minneapolis",
				"state": "MN",
				"zip": "55474",
				"country": "USA",
				"email": "broker@ampf.com",
				"customerServicePhone": "1-800-297-8800",
				"technicalSupportPhone": "1-800-297-SERV",
				"fax": null,
				"financialInstitutionName": "Ameriprise Brokerage",
				"siteURL": "http://www.ameriprise.com"
			}
		},
		{
			"name": "Ameriprise Brokerage 133 Direct",
			"fid": "13573",
			"org": "AMPF",
			"ofx": "https://www25.ameriprise.com/AMPFWeb/ofxdl/us/download?request_type=nl_desktopdownload",
			"profile": {
				"address1": "Ameriprise Brokerage",
				"address2": "70400 Financial Center",
				"address3": null,
				"city": "Minneapolis",
				"state": "MN",
				"zip": "55474",
				"country": "USA",
				"email": null,
				"customerServicePhone": "(800) 862-7919",
				"technicalSupportPhone": "(800) 862-7919",
				"fax": null,
				"financialInstitutionName": "Ameriprise Brokerage 133 Direct",
				"siteURL": "www.Ameriprise.com/investment"
			}
		},
		{
			"name": "Ameriprise MasterCard",
			"fid": "12910",
			"org": "Ameriprise MasterCard",
			"ofx": "https://ofx.ameriprise.com/AMPFWeb/ofxdl/us/download?request_type=nl_desktopdownload",
			"profile": {
				"address1": "834 Ameriprise Financial Center",
				"address2": null,
				"address3": null,
				"city": "Minneapolis",
				"state": "MN",
				"zip": "55474",
				"country": "USA",
				"email": null,
				"customerServicePhone": "(866) 483-8434",
				"technicalSupportPhone": "(800) 862-7919",
				"fax": null,
				"financialInstitutionName": "Ameriprise MasterCard",
				"siteURL": "www.Ameriprise.com/card"
			}
		},
		{
			"name": "Ameris Bank",
			"fid": "5548",
			"org": "466",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "310 First Street SE",
				"address2": null,
				"address3": null,
				"city": "Moultrie",
				"state": "GA",
				"zip": "31768",
				"country": "USA",
				"email": "ibsupport@amerisbank.com",
				"customerServicePhone": "866-818-7016",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Ameris Bank PFM",
				"siteURL": "www.amerisbank.com/"
			}
		},
		{
			"name": "Ameritrade Institutional Services",
			"fid": "AIS",
			"org": "Ameritrade Technology Group",
			"ofx": "https://ofxs.ameritrade.com/cgi-bin/apps/OFX",
			"profile": {
				"address1": "4211 So. 102nd Street",
				"address2": null,
				"address3": null,
				"city": "Omaha",
				"state": "NE",
				"zip": "68127",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Ameritrade",
				"siteURL": null
			}
		},
		{
			"name": "Anchor Bank - Washington",
			"fid": "325170628",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "100 West First Street",
				"address2": "PO Box 347",
				"address3": null,
				"city": "Aberdeen",
				"state": "WA",
				"zip": "98520",
				"country": "USA",
				"email": "mail@anhcorsb.com",
				"customerServicePhone": "360-532-6222 or 1-800-562-9744",
				"technicalSupportPhone": "360-532-6222 or 1-800-562-9744",
				"fax": "360-637-0303",
				"financialInstitutionName": "Anchor Bank - Washington",
				"siteURL": "www.anchornetbank.com"
			}
		},
		{
			"name": "Anderen Bank",
			"fid": "15891",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "3450 East Lake Road Suite #202",
				"address2": "Palm Harbor, FL  34685",
				"address3": null,
				"city": "WEST PALM BEACH",
				"state": "FL",
				"zip": "334010000",
				"country": "USA",
				"email": "customerservice@anderenbank.com",
				"customerServicePhone": "(727) 771-4655",
				"technicalSupportPhone": "727-787-4200",
				"fax": null,
				"financialInstitutionName": "Anderen Bank--deconverted",
				"siteURL": "http://www.anderenbank.com"
			}
		},
		{
			"name": "Andover Bank-RO",
			"fid": "041208719",
			"org": "PZeroFiveEight",
			"ofx": "https://ofx.secureinternetbank.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "19 Public Square",
				"address2": null,
				"address3": null,
				"city": "Andover",
				"state": "OH",
				"zip": "44003",
				"country": "USA",
				"email": "noreply@andoverbankohio.com",
				"customerServicePhone": "440-293-7605",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Andover Bank-RO",
				"siteURL": "www.andoverbankohio.com"
			}
		},
		{
			"name": "Andrews FCU",
			"fid": "57360",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "5711 Allentown Rd.",
				"address2": "Suitland, MD",
				"address3": null,
				"city": "SUITLAND",
				"state": "MD",
				"zip": "207460000",
				"country": "USA",
				"email": "memberservice@andrewsfcu.org",
				"customerServicePhone": "(301) 702-5500",
				"technicalSupportPhone": "800.487.5500",
				"fax": null,
				"financialInstitutionName": "Andrews Federal Credit Union",
				"siteURL": "https://www.andrewsfcu.org"
			}
		},
		{
			"name": "Anheuser-Busch Employees' CU",
			"fid": "6598",
			"org": "ABECU",
			"ofx": "https://ofx.onlinencr.com/scripts/serverext.dll",
			"profile": {
				"address1": "Attn: Electronic Services",
				"address2": "1001 Lynch Street",
				"address3": null,
				"city": "St. Louis",
				"state": "MO",
				"zip": "63118",
				"country": "USA",
				"email": "pccuing@abecu.org",
				"customerServicePhone": "(877) 325-2848",
				"technicalSupportPhone": "(877) 325-2848",
				"fax": "(314) 772-1730",
				"financialInstitutionName": "Anheuser-Busch Employees' CU",
				"siteURL": "http://www.abecu.org/"
			}
		},
		{
			"name": "Aon Hewitt",
			"fid": "242",
			"org": "hewitt.com",
			"ofx": "https://seven.was.hewitt.com/eftxweb/access.ofx",
			"profile": {
				"address1": "100 Half Day Road",
				"address2": "NONE",
				"address3": "NONE",
				"city": "Lincolnshire",
				"state": "IL",
				"zip": "60069",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "YOUR 401(K) PLAN",
				"technicalSupportPhone": "YOUR 401(K) PLAN",
				"fax": "YOUR 401(K) PLAN",
				"financialInstitutionName": "Hewitt Associates",
				"siteURL": "www.hewitt.com"
			}
		},
		{
			"name": "Apple FCU",
			"fid": "256078514",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "4029 Ridge Top Road",
				"address2": null,
				"address3": null,
				"city": "Fairfax",
				"state": "VA",
				"zip": "22030",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-666-7996",
				"technicalSupportPhone": "800-666-7996",
				"fax": null,
				"financialInstitutionName": "Apple FCU",
				"siteURL": "https://www.applefcu.org"
			}
		},
		{
			"name": "Apple Valley Bank and Trust",
			"fid": "1708",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "286 Maple Avenue",
				"address2": null,
				"address3": null,
				"city": "Cheshire,",
				"state": "CT",
				"zip": "06410",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(866) 628-3931",
				"technicalSupportPhone": "(866) 628-3931",
				"fax": null,
				"financialInstitutionName": "Apple Valley Bank & Trust",
				"siteURL": "www.applevalleybank.com"
			}
		},
		{
			"name": "Aquesta Bank - DC",
			"fid": "1970",
			"org": "ep5076",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "PO Box 700",
				"address2": "19510 Jetton Road",
				"address3": null,
				"city": "Cornelius",
				"state": "NC",
				"zip": "28031",
				"country": "USA",
				"email": "aquestabank@billsupport.com",
				"customerServicePhone": "855-206-4945",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Aquesta Bank",
				"siteURL": "www.aquestabank.com"
			}
		},
		{
			"name": "Arizona Bank and Trust",
			"fid": "122106015",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1331 West Southern Avenue",
				"address2": null,
				"address3": null,
				"city": "Mesa",
				"state": "AZ",
				"zip": "85203",
				"country": "USA",
				"email": "onlinebanking-ABT@arizbank.com",
				"customerServicePhone": "866-269-5900",
				"technicalSupportPhone": "866-269-5900",
				"fax": "563-589-2009",
				"financialInstitutionName": "Arizona Bank and Trust",
				"siteURL": "http://www.arizbank.com"
			}
		},
		{
			"name": "Arizona Bk & Trust Mortgage",
			"fid": "122106015",
			"org": "Customer Central",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1331 West Southern Avenue",
				"address2": null,
				"address3": null,
				"city": "Mesa",
				"state": "AZ",
				"zip": "85203",
				"country": "USA",
				"email": "onlinebanking-ABT@arizbank.com",
				"customerServicePhone": "866-269-5900",
				"technicalSupportPhone": "866-269-5900",
				"fax": "563-589-2009",
				"financialInstitutionName": "Arizona Bank and Trust",
				"siteURL": "http://www.arizbank.com"
			}
		},
		{
			"name": "Arizona Federal Credit Union",
			"fid": "322172797",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "333 N 44th Street",
				"address2": null,
				"address3": null,
				"city": "Phoenix",
				"state": "AZ",
				"zip": "85008",
				"country": "USA",
				"email": "member.services@azfcu.org",
				"customerServicePhone": "800-523-4603",
				"technicalSupportPhone": "800-523-4603",
				"fax": "602-683-1912",
				"financialInstitutionName": "Arizona FCU",
				"siteURL": "www.azfcu.org"
			}
		},
		{
			"name": "Arizona State CU",
			"fid": "322172496",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1819 W. Monroe St.",
				"address2": null,
				"address3": null,
				"city": "Phoenix",
				"state": "AZ",
				"zip": "85007",
				"country": "USA",
				"email": "virtualaccess@azstcu.org",
				"customerServicePhone": "1-800-671-1098",
				"technicalSupportPhone": "1-800-671-1098",
				"fax": "602-467-4051",
				"financialInstitutionName": "Arizona State Credit Union",
				"siteURL": "https://www.azstcu.org"
			}
		},
		{
			"name": "Athol Savings Bank",
			"fid": "211370998",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "444 Main St",
				"address2": null,
				"address3": null,
				"city": "Athol",
				"state": "MA",
				"zip": "01331-1819",
				"country": "US",
				"email": "info@atholsb.com",
				"customerServicePhone": "978-249-3200",
				"technicalSupportPhone": "978-249-3200",
				"fax": "978-249-2455",
				"financialInstitutionName": "Athol Savings Bank DC Quicken",
				"siteURL": "www.atholsb.com"
			}
		},
		{
			"name": "Atlanta Postal Credit Union - DC",
			"fid": "261171163",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3900 Crown Rd",
				"address2": null,
				"address3": null,
				"city": "Atlanta",
				"state": "GA",
				"zip": "30380",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "404-768-4126",
				"technicalSupportPhone": "404-768-4126",
				"fax": null,
				"financialInstitutionName": "Atlanta Postal Credit Union",
				"siteURL": "www.apcu.com"
			}
		},
		{
			"name": "Atlantic Capital Bank",
			"fid": "061121025",
			"org": "MSevenSixty",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "3280 Peachtree Road NW Suite 190",
				"address2": null,
				"address3": null,
				"city": "Atlanta",
				"state": "GA",
				"zip": "30305",
				"country": "USA",
				"email": null,
				"customerServicePhone": "(877) 764-2265",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Atlantic Capital Bank",
				"siteURL": "www.atlanticcapitalbank.com"
			}
		},
		{
			"name": "Atlantic City Electric Co. Emp FCU",
			"fid": "742",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "5100 Harding Highway",
				"address2": null,
				"address3": null,
				"city": "Mays Landing",
				"state": "New Jersey",
				"zip": "08330",
				"country": "USA",
				"email": "gfifer@acecefcu.org",
				"customerServicePhone": "800-485-0806",
				"technicalSupportPhone": "800-485-0806",
				"fax": null,
				"financialInstitutionName": "Atlantic City Electric Company Employees FCU",
				"siteURL": "http://www.acecefcu.org"
			}
		},
		{
			"name": "Atlantic Stewardship Bank",
			"fid": "021206582",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "630 Godwin Ave",
				"address2": null,
				"address3": null,
				"city": "Midland Park",
				"state": "NJ",
				"zip": "07432-1405",
				"country": "US",
				"email": "jchichelo@asbnow.com",
				"customerServicePhone": "(201)444-7100",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Atlantic Stewardship Bank",
				"siteURL": "www.asbnow.com"
			}
		},
		{
			"name": "Auburn University Fed Credit Union",
			"fid": "658",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1290 S. Donahue Dr",
				"address2": null,
				"address3": null,
				"city": "Aubrun",
				"state": "AL",
				"zip": "36832",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "800-785-4564",
				"technicalSupportPhone": "800-785-4564",
				"fax": null,
				"financialInstitutionName": "Auburn University Fed Credit Union",
				"siteURL": "http://www.aufcu.org/"
			}
		},
		{
			"name": "Avon Co-operative Bank",
			"fid": "1655",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1 East Main Street",
				"address2": null,
				"address3": null,
				"city": "Avon",
				"state": "MA",
				"zip": "02322",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "888-545-3249",
				"technicalSupportPhone": "888-545-3249",
				"fax": null,
				"financialInstitutionName": "Avon Co-operative",
				"siteURL": "http://www.avonco-operative.com"
			}
		},
		{
			"name": "BB&T Banking and Bill Payment",
			"fid": "BB&T",
			"org": "BB&T",
			"ofx": "https://eftx.bbt.com/eftxweb/access.ofx",
			"profile": {
				"address1": "Two BB&T Hanover TowerStreet",
				"address2": null,
				"address3": null,
				"city": "Raleigh",
				"state": "NC",
				"zip": "27626",
				"country": "USA",
				"email": "onlinesupport@bbandt.com",
				"customerServicePhone": "1-800-BBT-ONLINE",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Branch Banking & Trust",
				"siteURL": "www.bbandt.com"
			}
		},
		{
			"name": "BBCN Bank - Direct Connect",
			"fid": "122041235",
			"org": "MEightSixtyFive",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "2222 WEST OLYMPIC BLVD",
				"address2": null,
				"address3": null,
				"city": "Los Angeles",
				"state": "CA",
				"zip": "90006",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "BBCN - Center Bank CA",
				"siteURL": null
			}
		},
		{
			"name": "BMO Harris Financial Advisors, Inc",
			"fid": "032",
			"org": "BMO Harris Financial Advisors",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "111 W Monroe St",
				"address2": "18W",
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60603",
				"country": "USA",
				"email": "investmentservices@theharris.com",
				"customerServicePhone": "1-877-225-3863",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "BMO Harris Financial Advisors, Inc.",
				"siteURL": "http://www.harrisbank.com/investments"
			}
		},
		{
			"name": "BancFirst",
			"fid": "103003632",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "101 N. Broadway,Suite 200",
				"address2": null,
				"address3": null,
				"city": "Oklahoma City",
				"state": "OK",
				"zip": "73102",
				"country": "USA",
				"email": "onlinebanking@bancfirst.com",
				"customerServicePhone": "405-270-4785",
				"technicalSupportPhone": "405-270-4785",
				"fax": "405-218-4692",
				"financialInstitutionName": "BancFirst",
				"siteURL": "www.bancfirst.com"
			}
		},
		{
			"name": "BancFirst Business Online Banking",
			"fid": "C103003632",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "101 N. Broadway,Suite 200",
				"address2": null,
				"address3": null,
				"city": "Oklahoma City",
				"state": "OK",
				"zip": "73102",
				"country": "USA",
				"email": "onlinebanking@bancfirst.com",
				"customerServicePhone": "405-270-4785",
				"technicalSupportPhone": "405-270-4785",
				"fax": "405-218-4692",
				"financialInstitutionName": "BancFirst",
				"siteURL": "www.bancfirst.com"
			}
		},
		{
			"name": "BancorpSouth - Direct",
			"fid": "1001",
			"org": "BXS",
			"ofx": "https://ofx-prod.bancorpsouthonline.com/ofx/process.ofx",
			"profile": {
				"address1": "2910 West Jackson ST",
				"address2": null,
				"address3": null,
				"city": "Tupelo",
				"state": "MS",
				"zip": "38801",
				"country": "USA",
				"email": "ebanking@bxs.com",
				"customerServicePhone": "888-797-7711",
				"technicalSupportPhone": "888-797-7711",
				"fax": "662-678-7263",
				"financialInstitutionName": "BXS",
				"siteURL": "https://www.bancorpsouthonline.com"
			}
		},
		{
			"name": "Bangor Savings - Direct",
			"fid": "211274382",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "19 Maine Ave",
				"address2": null,
				"address3": null,
				"city": "Bangor",
				"state": "ME",
				"zip": "04401",
				"country": "USA",
				"email": "customercare@bangor.com",
				"customerServicePhone": "1-877-226-4671",
				"technicalSupportPhone": "1-877-226-4671",
				"fax": null,
				"financialInstitutionName": "Bangor Savings Bank Direct",
				"siteURL": "www.bangor.com"
			}
		},
		{
			"name": "Bank 1440 - IB Quicken",
			"fid": "122106251",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "14155 North 83rd Avenue",
				"address2": "Suite 117",
				"address3": null,
				"city": "Peoria",
				"state": "AZ",
				"zip": "85381",
				"country": "USA",
				"email": "ebanking@bank1440.com",
				"customerServicePhone": "623-463-1440",
				"technicalSupportPhone": "623-463-1440",
				"fax": "623-930-1440",
				"financialInstitutionName": "Bank 1440",
				"siteURL": "www.bank1440online.com"
			}
		},
		{
			"name": "Bank One",
			"fid": "5811",
			"org": "B1",
			"ofx": "https://ofx.chase.com",
			"profile": {
				"address1": "Bank One Plaza",
				"address2": "Suite IL1-0852",
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60670",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "800-482-3675",
				"technicalSupportPhone": "800-482-3675",
				"fax": null,
				"financialInstitutionName": "B1",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "Bank One (Chicago)",
			"fid": "1501",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01501.ofx",
			"profile": {
				"address1": "P. O. Box 1762",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "606909947",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "First Chicago",
				"siteURL": "http://www.bankone.com/"
			}
		},
		{
			"name": "Bank One (Michigan and Florida)",
			"fid": "6001",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06001.ofx",
			"profile": {
				"address1": "P.O. Box 7082",
				"address2": null,
				"address3": null,
				"city": "Troy",
				"state": "MI",
				"zip": "480077082",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Bank One",
				"siteURL": "http://www.bankone.com/"
			}
		},
		{
			"name": "Bank San Juans - NEW",
			"fid": "62124",
			"org": "JackHenry",
			"ofx": "https://ofx.netteller.com",
			"profile": {
				"address1": "144 E 8TH STREET",
				"address2": null,
				"address3": null,
				"city": "DURANGO",
				"state": "CO",
				"zip": "813010000",
				"country": "USA",
				"email": "support@banksanjuans.com",
				"customerServicePhone": "(970) 247-1818",
				"technicalSupportPhone": "866-618-2675",
				"fax": null,
				"financialInstitutionName": "BANK SAN JUAN, DIV GLACIER BNK",
				"siteURL": "http://www.banksanjuans.com"
			}
		},
		{
			"name": "Bank X",
			"fid": "BX122287251",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "12777 High Bluff Drive",
				"address2": "Ste 100",
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92130",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "858-350-6200",
				"technicalSupportPhone": "858-350-6200",
				"fax": null,
				"financialInstitutionName": "Bank X",
				"siteURL": "www.mybankx.com"
			}
		},
		{
			"name": "Bank at United",
			"fid": "2013",
			"org": "JackHenry",
			"ofx": "https://ofx.netteller.com",
			"profile": {
				"address1": "1645 ELLINGTON RD",
				"address2": null,
				"address3": null,
				"city": "SOUTH WINDSOR",
				"state": "CT",
				"zip": "060740000",
				"country": "USA",
				"email": "ubsupport@bankatunited.com",
				"customerServicePhone": "(866) 959-2265",
				"technicalSupportPhone": "(866)959-2265",
				"fax": null,
				"financialInstitutionName": "UNITED BANK",
				"siteURL": "https://www.bankatunited.com"
			}
		},
		{
			"name": "Bank of American Fork - Direct",
			"fid": "10446",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "33 East Main Street",
				"address2": "American Fork UT 84003",
				"address3": null,
				"city": "AMERICAN FORK",
				"state": "UT",
				"zip": "840030000",
				"country": "USA",
				"email": "customercare@bankaf.com",
				"customerServicePhone": "(801) 756-7681",
				"technicalSupportPhone": "1-800-815-2265",
				"fax": null,
				"financialInstitutionName": "Bank of American Fork",
				"siteURL": "http://www.bankaf.com"
			}
		},
		{
			"name": "Bank of Central Florida",
			"fid": "5529",
			"org": "827",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "101 South Florida Ave",
				"address2": null,
				"address3": null,
				"city": "Lakeland",
				"state": "FL",
				"zip": "33801",
				"country": "USA",
				"email": "Intelligent.eBanking@bankofcentralflorida.com",
				"customerServicePhone": "866-211-1512",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CentralFloridaBank",
				"siteURL": "www.bankofcentralflorida.com"
			}
		},
		{
			"name": "Bank of Commerce Charlotte NC- DC",
			"fid": "7213",
			"org": "fis-7213",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "100 Queens Road, Suite 100",
				"address2": null,
				"address3": null,
				"city": "Charlotte",
				"state": "NC",
				"zip": "28204",
				"country": "USA",
				"email": "bankofcommercenc@billsupport.com",
				"customerServicePhone": "1-855-444-9987",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Bank Of Commerce NC",
				"siteURL": "www.bocnc.com"
			}
		},
		{
			"name": "Bank of Dickson",
			"fid": "064108236",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "466 Highway 46 S",
				"address2": null,
				"address3": null,
				"city": "Dickson",
				"state": "TN",
				"zip": "37056",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "615-446-3732",
				"technicalSupportPhone": "615-446-3732",
				"fax": null,
				"financialInstitutionName": "Bank of Dickson",
				"siteURL": "www.bankofdickson.com"
			}
		},
		{
			"name": "Bank of Dudley",
			"fid": "061205938",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1448 Second Street",
				"address2": null,
				"address3": null,
				"city": "Dublin",
				"state": "GA",
				"zip": "31022",
				"country": "USA",
				"email": "customercare@bankofdudley.com",
				"customerServicePhone": "4782771500",
				"technicalSupportPhone": "4782771500",
				"fax": "4782771983",
				"financialInstitutionName": "Bank of Dudley",
				"siteURL": "www.bankofdudley.com"
			}
		},
		{
			"name": "Bank of George - DC",
			"fid": "7003",
			"org": "mfis-7003",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "9115 W. Russell Road",
				"address2": null,
				"address3": null,
				"city": "Las Vegas",
				"state": "NV",
				"zip": "89148",
				"country": "USA",
				"email": "bankofgeorge@billsupport.com",
				"customerServicePhone": "1-800-439-4263",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Bank Of George",
				"siteURL": "www.bankofgeorge.com"
			}
		},
		{
			"name": "Bank of Georgetown",
			"fid": "054001712",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1054 31st Street NW",
				"address2": "STE 18",
				"address3": null,
				"city": "Washington",
				"state": "DC",
				"zip": "20007",
				"country": "USA",
				"email": "tbrown@bankofgeorgetown.com",
				"customerServicePhone": "202-355-1200",
				"technicalSupportPhone": "202-355-1200",
				"fax": null,
				"financialInstitutionName": "Bank of Georgetown",
				"siteURL": "www.bankofgeorgetownonline.com"
			}
		},
		{
			"name": "Bank of Herrin - DC",
			"fid": "081203318",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "101 S Park Avenue",
				"address2": null,
				"address3": null,
				"city": "Herrin",
				"state": "IL",
				"zip": "62948",
				"country": "US",
				"email": "mymoney@bankofherrin.com",
				"customerServicePhone": "618-942-6666",
				"technicalSupportPhone": "618-942-6666",
				"fax": "618-942-3618",
				"financialInstitutionName": "Bank of Herrin",
				"siteURL": "www.bankofherrin.com"
			}
		},
		{
			"name": "Bank of Internet, USA",
			"fid": "122287251",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1277 High Bluff Derive #100",
				"address2": null,
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92191-9000",
				"country": "USA",
				"email": "secure@BofI.com",
				"customerServicePhone": "858-350-6200",
				"technicalSupportPhone": "858-350-6200",
				"fax": null,
				"financialInstitutionName": "Bank Of Internet, USA",
				"siteURL": "www.mybankinternet.com"
			}
		},
		{
			"name": "Bank of Marin - NEW",
			"fid": "5001",
			"org": "568",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "50 Madera Blvd",
				"address2": null,
				"address3": null,
				"city": "Corte Madera",
				"state": "CA",
				"zip": "94925",
				"country": "USA",
				"email": "homebanking@bankofmarin.com",
				"customerServicePhone": "888-722-1299",
				"technicalSupportPhone": "888-722-1299",
				"fax": null,
				"financialInstitutionName": "BankOfMarin",
				"siteURL": "www.bankofmarin.com"
			}
		},
		{
			"name": "Bank of Nevada-DC",
			"fid": "C122401778",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2700 W Sahara Ave",
				"address2": null,
				"address3": null,
				"city": "Las Vegas",
				"state": "NV",
				"zip": "89102",
				"country": "USA",
				"email": "CS@bankofnevada.com",
				"customerServicePhone": "(702)248-4200",
				"technicalSupportPhone": "(702)248-4200",
				"fax": "(702)248-4200",
				"financialInstitutionName": "Bank of Nevada",
				"siteURL": "https://63.172.237.113"
			}
		},
		{
			"name": "Bank of North Carolina-New",
			"fid": "59013",
			"org": "JackHenry",
			"ofx": "https://ofx.netteller.com",
			"profile": {
				"address1": "833 JULIAN AVENUE",
				"address2": null,
				"address3": null,
				"city": "THOMASVILLE",
				"state": "NC",
				"zip": "273600000",
				"country": "USA",
				"email": "ebanking@bankofnc.com",
				"customerServicePhone": "(336) 476-9200",
				"technicalSupportPhone": "(800)262-7175",
				"fax": null,
				"financialInstitutionName": "BANK OF NORTH CAROLINA",
				"siteURL": "http://www.bankofnc.com/home.php"
			}
		},
		{
			"name": "Bank of Princeton",
			"fid": "031207940",
			"org": "MSevenFourSeven",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "21 Chambers St",
				"address2": null,
				"address3": null,
				"city": "Princeton",
				"state": "NJ",
				"zip": "08542",
				"country": "USA",
				"email": null,
				"customerServicePhone": "609-921-1700",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "The Bank of Princeton",
				"siteURL": "http://www.thebankofprinceton.com/"
			}
		},
		{
			"name": "Bank of Santa Clarita",
			"fid": "122243813",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "27441 Tourney Road",
				"address2": null,
				"address3": null,
				"city": "Santa Clarita",
				"state": "CA",
				"zip": "91355",
				"country": "USA",
				"email": "customersupport@bkofsc.com",
				"customerServicePhone": "1-661-362-6000",
				"technicalSupportPhone": "1-661-362-6000",
				"fax": "1-661-799-3722",
				"financialInstitutionName": "Bank of Santa Clarita",
				"siteURL": "www.bankofsantaclarita.com"
			}
		},
		{
			"name": "Bank of Stockton - NEW",
			"fid": "1001",
			"org": "BOS",
			"ofx": "https://internetbanking.bankofstockton.com/ofx/process.ofx",
			"profile": {
				"address1": "301 East Miner Avenue",
				"address2": null,
				"address3": null,
				"city": "Stockton",
				"state": "CA",
				"zip": "95202",
				"country": "USA",
				"email": "bankofstockton@netmktg.com",
				"customerServicePhone": "1-800-941-1494",
				"technicalSupportPhone": "1-800-941-1494",
				"fax": null,
				"financialInstitutionName": "Bank of Stockton",
				"siteURL": "http://www.bankofstockton.com"
			}
		},
		{
			"name": "Bank of Tennessee - DC",
			"fid": "7169",
			"org": "fis-7169",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "301 East Center Street",
				"address2": null,
				"address3": null,
				"city": "Kingsport",
				"state": "TN",
				"zip": "37660",
				"country": "USA",
				"email": "customercare@bankoftennessee.com",
				"customerServicePhone": "866-378-9500",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Bank of Tennessee",
				"siteURL": "http://www.bankoftennessee.com"
			}
		},
		{
			"name": "Bank of the James - VA",
			"fid": "051409016",
			"org": "MEightEightSix",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "828 Main Street",
				"address2": null,
				"address3": null,
				"city": "Lynchburg",
				"state": "VA",
				"zip": "24504",
				"country": "USA",
				"email": null,
				"customerServicePhone": "434-846-2000",
				"technicalSupportPhone": "434-846-2000",
				"fax": null,
				"financialInstitutionName": "Bank of the James",
				"siteURL": "http://www.bankofthejames.com"
			}
		},
		{
			"name": "BankAtlantic",
			"fid": "267083763",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2100 W. Cypress Creek Road",
				"address2": null,
				"address3": null,
				"city": "Fort Lauderdale",
				"state": "FL",
				"zip": "33309",
				"country": "USA",
				"email": "ecustomercare@bankatlantic.com",
				"customerServicePhone": "1-888-7-DAY-BANK (1-888-732-9226",
				"technicalSupportPhone": "1-888-7-DAY-BANK (1-888-732-9226",
				"fax": null,
				"financialInstitutionName": "BankAtlantic",
				"siteURL": "www.bankatlantic.com"
			}
		},
		{
			"name": "BankBoston PC Banking",
			"fid": "1801",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01801.ofx",
			"profile": {
				"address1": "MA CPK 04-02-08",
				"address2": "P.O. Box 1924",
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "021059940",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "BankBoston",
				"siteURL": "http://www.bankboston.com/"
			}
		},
		{
			"name": "BankDirect",
			"fid": "33BAG",
			"org": "BankDirect",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "6060 N. CENTRAL EXPRESSWAY",
				"address2": "SUITE 800",
				"address3": null,
				"city": "DALLAS",
				"state": "TX",
				"zip": "75206",
				"country": "US",
				"email": null,
				"customerServicePhone": "8778392737",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "BANKDIRECT",
				"siteURL": "https://www.netit.financial-net.com/bdirect/"
			}
		},
		{
			"name": "BankFIRST FL - Direct Connect",
			"fid": "1648",
			"org": "olb-3408",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "1031 W Morse Blvd",
				"address2": null,
				"address3": null,
				"city": "Winter Park",
				"state": "FL",
				"zip": "32789",
				"country": "USA",
				"email": "bankfirst@billsupport.com",
				"customerServicePhone": "888-370-5414",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Bank First Retail",
				"siteURL": "http://www.bankfirst.com"
			}
		},
		{
			"name": "BankFinancial",
			"fid": "271972899",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "21110 S. Western Ave.",
				"address2": null,
				"address3": null,
				"city": "Olympia Fields",
				"state": "IL",
				"zip": "60461",
				"country": "USA",
				"email": "Please use Phone.",
				"customerServicePhone": "800-894-6900",
				"technicalSupportPhone": "800-894-6900",
				"fax": null,
				"financialInstitutionName": "BankFinancial",
				"siteURL": "www.bankfinancial.com"
			}
		},
		{
			"name": "BankFinancial BFS DC",
			"fid": "C271972899",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "21110 S. Western Ave.",
				"address2": null,
				"address3": null,
				"city": "Olympia Fields",
				"state": "IL",
				"zip": "60461",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-894-6900",
				"technicalSupportPhone": "800-894-6900",
				"fax": null,
				"financialInstitutionName": "BankFinancial",
				"siteURL": "www.bankfinancial.com"
			}
		},
		{
			"name": "BankPlus - Internet Banking QN",
			"fid": "065301948",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "385 A Highland Colony Parkway",
				"address2": "Suite 110",
				"address3": null,
				"city": "Ridgeland",
				"state": "MS",
				"zip": "39157",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "601-664-1786",
				"technicalSupportPhone": "601-664-1786",
				"fax": null,
				"financialInstitutionName": "BankPlus",
				"siteURL": "www.e-bankplus.net"
			}
		},
		{
			"name": "BankUnited Business Banking",
			"fid": "C267090594",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "7815 NW 148th Street",
				"address2": null,
				"address3": null,
				"city": "Miami Lakes",
				"state": "FL",
				"zip": "33016",
				"country": "USA",
				"email": "ebanking@bankunited.com",
				"customerServicePhone": "305 569 2000",
				"technicalSupportPhone": "305 569 2000",
				"fax": null,
				"financialInstitutionName": "BankUnited",
				"siteURL": "www.bankunitedonlinebanking.com"
			}
		},
		{
			"name": "BankUnited, N.A.",
			"fid": "267090594",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "7815 NW 148th Street",
				"address2": null,
				"address3": null,
				"city": "Miami Lakes",
				"state": "FL",
				"zip": "33016",
				"country": "USA",
				"email": "ebanking@bankunited.com",
				"customerServicePhone": "305-569-2000",
				"technicalSupportPhone": "305-569-2000",
				"fax": "305-698-4187",
				"financialInstitutionName": "BankUnited",
				"siteURL": "www.bankunitedonlinebanking.com"
			}
		},
		{
			"name": "Bankers Trust CR Direct Connect",
			"fid": "5541",
			"org": "187",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "221 Third Avenue SE",
				"address2": "Suite 150",
				"address3": null,
				"city": "Cedar Rapids",
				"state": "IA",
				"zip": "52401",
				"country": "USA",
				"email": "bib@bankerstrust.com",
				"customerServicePhone": "800-626-5761",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "BankersTrust Co 187 PFM",
				"siteURL": "http://www.bankerstrust.com"
			}
		},
		{
			"name": "Bankers Trust DM Direct Connect",
			"fid": "5542",
			"org": "769",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "453 7th Street",
				"address2": null,
				"address3": null,
				"city": "Des Moines",
				"state": "IA",
				"zip": "50309",
				"country": "USA",
				"email": "bib@bankerstrust.com",
				"customerServicePhone": "800-626-5761",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "BankersTrust Co 769 PFM",
				"siteURL": "http://www.bankerstrust.com"
			}
		},
		{
			"name": "Bankwell in Fairfield",
			"fid": "021114483",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2150 Post Rd",
				"address2": null,
				"address3": null,
				"city": "Fairfield",
				"state": "CT",
				"zip": "06824",
				"country": "USA",
				"email": "tbfebanking@bncfg.com",
				"customerServicePhone": "(855)767-5764",
				"technicalSupportPhone": "(855)767-5764",
				"fax": null,
				"financialInstitutionName": "The Bank of Fairfield",
				"siteURL": "www.thebankoffairfield.com"
			}
		},
		{
			"name": "Bankwell in New Canaan",
			"fid": "021113662",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "208 Elm Street",
				"address2": null,
				"address3": null,
				"city": "New Canaan",
				"state": "CT",
				"zip": "06840",
				"country": "USA",
				"email": "bncebanking@bncfg.com",
				"customerServicePhone": "(855)767-5763",
				"technicalSupportPhone": "(855)767-5763",
				"fax": null,
				"financialInstitutionName": "The Bank of New Canaan",
				"siteURL": "www.bankofnewcanaan.com"
			}
		},
		{
			"name": "Barclays",
			"fid": "069",
			"org": "Barclays Bank Plc.",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "Barclays Wealth & Investment Mgm",
				"address2": "200 Park Avenue, 4th Floor",
				"address3": null,
				"city": "MetLife Building 45th Street NY",
				"state": "NY",
				"zip": "10019",
				"country": "United States",
				"email": "-",
				"customerServicePhone": "800 392 5000",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "Barclays Bank Plc.",
				"siteURL": "-"
			}
		},
		{
			"name": "Barrington Bank & Trust",
			"fid": "5505",
			"org": "167",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "201 South Hough Street",
				"address2": null,
				"address3": null,
				"city": "Barrington",
				"state": "IL",
				"zip": "60010",
				"country": "USA",
				"email": "customer_service@barringtonbank.com",
				"customerServicePhone": "847-842-4500",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "BarringtonBank",
				"siteURL": "http://www.barringtonbank.com"
			}
		},
		{
			"name": "Bay State Savings Bank",
			"fid": "211371023",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "28 Franklin Street",
				"address2": null,
				"address3": null,
				"city": "Worcester",
				"state": "MA",
				"zip": "01608",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "508-890-9000",
				"technicalSupportPhone": "508-890-9000",
				"fax": null,
				"financialInstitutionName": "Bay State Savings Bank",
				"siteURL": "www.baystateonline.com"
			}
		},
		{
			"name": "BayPort Credit Union",
			"fid": "251481368",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3711 Huntington Ave",
				"address2": null,
				"address3": null,
				"city": "Newport News",
				"state": "VA",
				"zip": "23607",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "(757)928-8850",
				"technicalSupportPhone": "(757)928-8850",
				"fax": null,
				"financialInstitutionName": "BayPort Credit Union",
				"siteURL": "www.bayportcu.org"
			}
		},
		{
			"name": "Beach Business Bank",
			"fid": "122243774",
			"org": "MSevenFiveSeven",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1230 ROSECRANS AVENUE, SUITE 100",
				"address2": null,
				"address3": null,
				"city": "MANHATTAN BEACH",
				"state": "CA",
				"zip": "90266",
				"country": "USA",
				"email": null,
				"customerServicePhone": "310-536-2275",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Beach Business Bank",
				"siteURL": "www.beachbusinessbank.com"
			}
		},
		{
			"name": "Bellwether Community Credit Union",
			"fid": "702",
			"org": "BellwetherCCU",
			"ofx": "https://ofx.onlinencr.com/scripts/serverext.dll",
			"profile": {
				"address1": "425 DW Highway",
				"address2": null,
				"address3": null,
				"city": "Manchester",
				"state": "NH",
				"zip": "03104",
				"country": "USA",
				"email": "web24support@bccu.org",
				"customerServicePhone": "(800) 669-3381",
				"technicalSupportPhone": "(800) 669-3381",
				"fax": "(603) 645-8192",
				"financialInstitutionName": "Bellwether CCU",
				"siteURL": "http://www.bccu.org/"
			}
		},
		{
			"name": "Belmont Savings Bank",
			"fid": "211371764",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2 Leonard Street",
				"address2": null,
				"address3": null,
				"city": "Belmont",
				"state": "MA",
				"zip": "02478",
				"country": "USA",
				"email": "2",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Belmont Savings Bank",
				"siteURL": "www.belmontsavings.com"
			}
		},
		{
			"name": "Benchmark Bank - Personal",
			"fid": "111902055",
			"org": "PZeroFortyNine",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "5700 Legacy Dr, Suite 10",
				"address2": null,
				"address3": null,
				"city": "Plano",
				"state": "TX",
				"zip": "75024",
				"country": "USA",
				"email": null,
				"customerServicePhone": "972-673-4000",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Benchmark Bank",
				"siteURL": "www.benchmarkbank.com"
			}
		},
		{
			"name": "Bennington State Bank, Kansas",
			"fid": "15990",
			"org": "Automated Systems",
			"ofx": "https://onlinebanking.bsbks.com/pages/olb.ofx.1_0_3.axd",
			"profile": {
				"address1": "2130 S. Ohio",
				"address2": null,
				"address3": null,
				"city": "Salina",
				"state": "KS",
				"zip": "67401",
				"country": "USA",
				"email": "services@bsbks.com",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "The Bennington State Bank",
				"siteURL": "https://onlinebanking.bsbks.com/"
			}
		},
		{
			"name": "Berkshire Bank Direct Connect",
			"fid": "5544",
			"org": "092",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "24 North Street",
				"address2": null,
				"address3": null,
				"city": "Pittsfield",
				"state": "MA",
				"zip": "01201",
				"country": "USA",
				"email": "support@brand.com",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Berkshire Bank",
				"siteURL": "www.berkshirebank.com"
			}
		},
		{
			"name": "Bernstein Global Wealth Mgmt.",
			"fid": "0013",
			"org": "BGWM",
			"ofx": "https://ofx.bernstein.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1345 Avenue of the Americas",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10105",
				"country": "USA",
				"email": "ContactUsClient@Bernstein.com",
				"customerServicePhone": "914-993-2560",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Bernstein",
				"siteURL": "www.bernstein.com"
			}
		},
		{
			"name": "Beverly Bank & Trust",
			"fid": "5510",
			"org": "495",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "10258 S. Western Ave",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60643",
				"country": "USA",
				"email": "customer_service@thebeverlybank.com",
				"customerServicePhone": "888-886-6042",
				"technicalSupportPhone": null,
				"fax": "773-239-2270",
				"financialInstitutionName": "BeverlyBankNTrust",
				"siteURL": "http://www.thebeverlybank.com"
			}
		},
		{
			"name": "Beverly Cooperative Bank",
			"fid": "211372145",
			"org": "043T",
			"ofx": "https://ofx1.evault.ws/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "254 Cabot Street",
				"address2": null,
				"address3": null,
				"city": "Beverly",
				"state": "MA",
				"zip": "01915",
				"country": "USA",
				"email": null,
				"customerServicePhone": "(978) 922-0857",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Beverly Cooperative Bank (043T)",
				"siteURL": "http://www.beverlycoop.com/"
			}
		},
		{
			"name": "Billings Federal Credit Union",
			"fid": "2013",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "2522 4th Ave N",
				"address2": null,
				"address3": null,
				"city": "Billings",
				"state": "MT",
				"zip": "59101",
				"country": "USA",
				"email": "nharris@billingsfcu.org",
				"customerServicePhone": "800-440-0916",
				"technicalSupportPhone": "800-440-0916",
				"fax": null,
				"financialInstitutionName": "Billings Federal Credit Union",
				"siteURL": "http://www.billingsfcu.org"
			}
		},
		{
			"name": "Blueharbor Bank DirectConnect",
			"fid": "6456",
			"org": "fis-6456",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "PO Box 3546",
				"address2": "106 Corporate Park Drive",
				"address3": null,
				"city": "Mooresville",
				"state": "NC",
				"zip": "28117",
				"country": "USA",
				"email": "Customer.service@blueharborbank.com",
				"customerServicePhone": "704-662-7700",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Blueharbor Bank",
				"siteURL": "www.blueharborbank.com"
			}
		},
		{
			"name": "Boeing Employees' Credit Union",
			"fid": "3670",
			"org": "BECU",
			"ofx": "https://www.becuonlinebanking.org/scripts/serverext.dll",
			"profile": {
				"address1": "12770 Gateway Drive",
				"address2": null,
				"address3": null,
				"city": "Tukwila",
				"state": "WA",
				"zip": "98168",
				"country": "USA",
				"email": "feedback@becu.org",
				"customerServicePhone": "206-439-5700",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "BECU",
				"siteURL": "http://www.becu.org"
			}
		},
		{
			"name": "BofI Advisor",
			"fid": "122287251B",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "12777 High Bluff Dr,Ste.100",
				"address2": null,
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92130",
				"country": "USA",
				"email": "customerservice@bofiadvisor.com",
				"customerServicePhone": "858-350-0443",
				"technicalSupportPhone": "858-350-0443",
				"fax": "858-350-0443",
				"financialInstitutionName": "BofI Advisor",
				"siteURL": "www.bofiadvisor.com"
			}
		},
		{
			"name": "BofI Federal",
			"fid": "122287251A",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "12777 High Bluff Dr, Ste. 100",
				"address2": null,
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92130",
				"country": "USA",
				"email": "customerservice@AffinityPartners",
				"customerServicePhone": "877-755-6381",
				"technicalSupportPhone": "877-755-6381",
				"fax": "877-755-6381",
				"financialInstitutionName": "BofI Federal Bank",
				"siteURL": "www.mybofifederalbank.com"
			}
		},
		{
			"name": "BofI Federal Bank - DL",
			"fid": "56817",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "4350 La Jolla Village Dr",
				"address2": "San Diego, CA  92122",
				"address3": null,
				"city": "SAN DIEGO",
				"state": "CA",
				"zip": "921220000",
				"country": "USA",
				"email": "businessbanking@bofi.com",
				"customerServicePhone": "(877) 541-2634",
				"technicalSupportPhone": "(866)833-0688",
				"fax": null,
				"financialInstitutionName": "BofI Federal Bank",
				"siteURL": "http://www.bofifederalbank.com"
			}
		},
		{
			"name": "Boone Bank & Trust Co.",
			"fid": "073901097",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "716 8th St",
				"address2": null,
				"address3": null,
				"city": "Boone",
				"state": "IA",
				"zip": "50036",
				"country": "USA",
				"email": "internet-banking@boonebankiowa",
				"customerServicePhone": "515-432-6200",
				"technicalSupportPhone": "515-432-6200",
				"fax": "515-432-6210",
				"financialInstitutionName": "Boone Bank & Trust",
				"siteURL": "www.boonebankiowa.com"
			}
		},
		{
			"name": "Boone County Bank - Business",
			"fid": "760",
			"org": "081500859",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "720 East Broadway Street",
				"address2": null,
				"address3": null,
				"city": "Columbia",
				"state": "MO",
				"zip": "65201",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-8239",
				"technicalSupportPhone": "866-777-8239",
				"fax": null,
				"financialInstitutionName": "Boone County Bank - Business",
				"siteURL": "www.boonebank.com"
			}
		},
		{
			"name": "Boone County Bank - Personal",
			"fid": "160",
			"org": "081500859",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "720 East Broadway Street",
				"address2": null,
				"address3": null,
				"city": "Columbia",
				"state": "MO",
				"zip": "65201",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-749-9097",
				"technicalSupportPhone": "800-749-9097",
				"fax": null,
				"financialInstitutionName": "Boone County Bank - Personal",
				"siteURL": "www.boonebank.com"
			}
		},
		{
			"name": "BrandBank Cash Mgmt",
			"fid": "C061103276",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1255 Lakes Parkway",
				"address2": null,
				"address3": null,
				"city": "Lawrenceville",
				"state": "GA",
				"zip": "30046",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "770-963-9225",
				"technicalSupportPhone": "770-963-9225",
				"fax": null,
				"financialInstitutionName": "The Brand Banking Company",
				"siteURL": "www.thebrandbank.com"
			}
		},
		{
			"name": "Brattleboro Savings & Loan",
			"fid": "10255",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "PO Box 1010 - 221 Main Street",
				"address2": "Brattleboro, VT 05302-1010",
				"address3": null,
				"city": "BRATTLEBORO",
				"state": "VT",
				"zip": "053010000",
				"country": "USA",
				"email": "DepositOps@brattbank.com",
				"customerServicePhone": "(888) 806-6400",
				"technicalSupportPhone": "888-806-6400",
				"fax": null,
				"financialInstitutionName": "Brattleboro Savings & Loan",
				"siteURL": "https://www.rightreasons.com"
			}
		},
		{
			"name": "Bridge Bank Direct Connect",
			"fid": "5547",
			"org": "681",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "55 Almaden Blvd",
				"address2": null,
				"address3": null,
				"city": "San Jose",
				"state": "CA",
				"zip": "95113",
				"country": "USA",
				"email": "ebanking@bridgebank.com",
				"customerServicePhone": "408-556-8355",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Bridge Bank Direct Connect",
				"siteURL": "http://www.bridgebank.com"
			}
		},
		{
			"name": "Bridgehampton National Bank, NY",
			"fid": "021406667",
			"org": "MSevenTwentyThree",
			"ofx": "https://ofx1.evault.ws/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "2200 Montauk Highway",
				"address2": null,
				"address3": null,
				"city": "Bridgehampton",
				"state": "NY",
				"zip": "11978",
				"country": "USA",
				"email": null,
				"customerServicePhone": "631-537-7402",
				"technicalSupportPhone": "631-537-7402",
				"fax": null,
				"financialInstitutionName": "Bridgehampton National Bank",
				"siteURL": "https://www.bridgenb.com"
			}
		},
		{
			"name": "Brinker Capital CORE and UMA",
			"fid": "7784",
			"org": "Fidelity",
			"ofx": "https://ofx.ibgstreetscape.com:443",
			"profile": {
				"address1": "XXXXXXXXXX",
				"address2": null,
				"address3": null,
				"city": "XXXXXXXXXX",
				"state": "XX",
				"zip": "XXXXX",
				"country": "USA",
				"email": null,
				"customerServicePhone": "Contact your broker/dealer.",
				"technicalSupportPhone": "Contact your broker/dealer.",
				"fax": "Contact your broker/dealer.",
				"financialInstitutionName": "myStreetscape",
				"siteURL": null
			}
		},
		{
			"name": "Bryant Bank",
			"fid": "855",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "1550 McFarland Blvd. North",
				"address2": "Tuscaloosa, AL  35406",
				"address3": null,
				"city": "BIRMINGHAM",
				"state": "AL",
				"zip": "352090000",
				"country": "USA",
				"email": "support@bryantbank.com",
				"customerServicePhone": "(877) 827-9268",
				"technicalSupportPhone": "(205)464-4646",
				"fax": null,
				"financialInstitutionName": "Bryant Bank",
				"siteURL": "http://www.bryantbank.com"
			}
		},
		{
			"name": "Buckeye Community FCU",
			"fid": "263181779",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1825 S. Jefferson St.",
				"address2": null,
				"address3": null,
				"city": "Perry",
				"state": "FL",
				"zip": "32348",
				"country": "USA",
				"email": "directconnect@bcfcu.coop",
				"customerServicePhone": "850-223-7100",
				"technicalSupportPhone": "850-223-7100",
				"fax": "850-223-7191",
				"financialInstitutionName": "Buckeye Community FCU",
				"siteURL": "www.bcfcu.coop"
			}
		},
		{
			"name": "Bucks County Bank",
			"fid": "9681",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "200 SOUTH MAIN STREET",
				"address2": "DOYLESTOWN, PA 18901",
				"address3": null,
				"city": "DOYLESTOWN",
				"state": "PA",
				"zip": "189010000",
				"country": "USA",
				"email": "customerservice@buckscountybank.net",
				"customerServicePhone": "(215) 230-7533",
				"technicalSupportPhone": "215-230-7533",
				"fax": null,
				"financialInstitutionName": "Bucks County Bank",
				"siteURL": "http://www.buckscountybank.net"
			}
		},
		{
			"name": "CASE CU",
			"fid": "272481981",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "4316 South Pennsylvania Ave",
				"address2": null,
				"address3": null,
				"city": "Lansing",
				"state": "MI",
				"zip": "48910",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "517-393-7710",
				"technicalSupportPhone": "517-393-7710",
				"fax": null,
				"financialInstitutionName": "CASE Credit Union",
				"siteURL": "www.casecuhb.org"
			}
		},
		{
			"name": "CBFC-Quicken & QuickBooks",
			"fid": "061104929",
			"org": "PZeroFiveSix",
			"ofx": "https://ofx.secureinternetbank.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "651 Veterans Memorial Blvd",
				"address2": null,
				"address3": null,
				"city": "Cumming",
				"state": "GA",
				"zip": "30040",
				"country": "USA",
				"email": "customerservice@citizbank.com",
				"customerServicePhone": "770-886-9500",
				"technicalSupportPhone": "770-886-9500",
				"fax": null,
				"financialInstitutionName": "CBFC-Quickbooks",
				"siteURL": "http://www.citizbank.com"
			}
		},
		{
			"name": "CFBank",
			"fid": "241272118",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2923 Smith Rd",
				"address2": null,
				"address3": null,
				"city": "Fairlawn",
				"state": "OH",
				"zip": "44333",
				"country": "USA",
				"email": "info@cfbankmail.com",
				"customerServicePhone": "1-888-273-8255",
				"technicalSupportPhone": "1-888-273-8255",
				"fax": "330-666-7959",
				"financialInstitutionName": "CFBank",
				"siteURL": "http://www.cfbankonline.com"
			}
		},
		{
			"name": "CPM Federal Credit Union",
			"fid": "253279536",
			"org": "USERS, Inc.",
			"ofx": "https://cpm.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "CRI Securities LLC",
			"fid": "030",
			"org": "CRI Securities LLC",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "400 Robert Street North",
				"address2": null,
				"address3": null,
				"city": "Saint Paul",
				"state": "MN",
				"zip": "55101",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "888-237-1838",
				"technicalSupportPhone": "888-237-1838",
				"fax": "651-665-1647",
				"financialInstitutionName": "CRI Securities LLC",
				"siteURL": "http://www.northstarfinancial.com"
			}
		},
		{
			"name": "CSFB Private Client Services",
			"fid": "001",
			"org": "PCS",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "ELEVEN MADISON AVENUE",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10010",
				"country": "USA",
				"email": "pb.clientview@credit-suisse.com",
				"customerServicePhone": "1-877-355-1818",
				"technicalSupportPhone": "877-355-1818",
				"fax": "212-743-3187",
				"financialInstitutionName": "Credit Suisse Securities USA LLC",
				"siteURL": "http://www.credit-suisse.com/pbclientview"
			}
		},
		{
			"name": "CUNA Brokerage Services, Inc",
			"fid": "052",
			"org": "CUNA Brokerage Services, Inc",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "2000 Heritage Way",
				"address2": null,
				"address3": null,
				"city": "Waverly",
				"state": "IA",
				"zip": "50677",
				"country": "USA",
				"email": "ILHServiceCenter@CMG.com",
				"customerServicePhone": "800-369-2862",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "CUNA Brokerage Services, Inc.",
				"siteURL": "https://www.cunabrokerage.com/"
			}
		},
		{
			"name": "CUofTX OLB",
			"fid": "14683",
			"org": "CUofTexas",
			"ofx": "https://mbweb.cuoftexas.org/ofx/ofxserver.aspx",
			"profile": {
				"address1": "8131 LBJ FREEWAY",
				"address2": null,
				"address3": null,
				"city": "DALLAS",
				"state": "TX",
				"zip": "75251",
				"country": "USA",
				"email": "info@cubussolutions.com",
				"customerServicePhone": "925-606-8708",
				"technicalSupportPhone": "925-445-4487",
				"fax": "9254458878",
				"financialInstitutionName": "Credit Union Of Texas",
				"siteURL": "https://www.cuoftexas.org"
			}
		},
		{
			"name": "California Bank & Trust - Direct",
			"fid": "4679",
			"org": "401",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04679.ofx",
			"profile": {
				"address1": "7730 South Union Park Ave",
				"address2": "Suite 250",
				"address3": null,
				"city": "Midvale",
				"state": "UT",
				"zip": "84047",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "California Bank and Trust",
				"siteURL": "http://www.calbanktrust.com/"
			}
		},
		{
			"name": "California Credit Union",
			"fid": "322078464",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "701 N. Brand Blvd.",
				"address2": null,
				"address3": null,
				"city": "Glendale",
				"state": "CA",
				"zip": "91203",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "818-291-6700",
				"technicalSupportPhone": "818-291-6700",
				"fax": null,
				"financialInstitutionName": "California Credit Union",
				"siteURL": "www.californiacu.org"
			}
		},
		{
			"name": "California United Bank - DC",
			"fid": "5539",
			"org": "070",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "15821 Ventura Boulevard",
				"address2": "Suite 100",
				"address3": null,
				"city": "Encino",
				"state": "CA",
				"zip": "91436",
				"country": "USA",
				"email": "treasuryservices@californiaunitedbank.com",
				"customerServicePhone": "818-257-7798",
				"technicalSupportPhone": null,
				"fax": "818-257-7702",
				"financialInstitutionName": "California United Bank PFM",
				"siteURL": "https://www.californiaunitedbank.com/"
			}
		},
		{
			"name": "Call Federal Credit Union",
			"fid": "3DY11",
			"org": "Call Federal Credit Union",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "PO BOX 26603",
				"address2": null,
				"address3": null,
				"city": "RICHMOND",
				"state": "VA",
				"zip": "23261",
				"country": "US",
				"email": null,
				"customerServicePhone": "8007962328",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CALL FCU",
				"siteURL": "https://www.netit.financial-net.com/callfcu"
			}
		},
		{
			"name": "Cambridge Investment Research",
			"fid": "042",
			"org": "Cambridge Investment Research",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "1776 Pleasant Plain Rd.",
				"address2": null,
				"address3": null,
				"city": "Fairfield",
				"state": "IA",
				"zip": "52556",
				"country": "USA",
				"email": "customerservice@cir2.com",
				"customerServicePhone": "888-245-0452",
				"technicalSupportPhone": "-",
				"fax": "641-470-1289",
				"financialInstitutionName": "Cambridge Investment Research",
				"siteURL": "-"
			}
		},
		{
			"name": "Cambridge Portuguese Credit Union",
			"fid": "983",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "493 Somerville Avenue",
				"address2": null,
				"address3": null,
				"city": "Somerville",
				"state": "MA",
				"zip": "02143",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 793-1440",
				"technicalSupportPhone": "(877) 793-1440",
				"fax": null,
				"financialInstitutionName": "Naveo Credit Union",
				"siteURL": "http://www.naveo.org"
			}
		},
		{
			"name": "Cambridge Savings Bank",
			"fid": "211371120",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1374 Massachusetts Ave",
				"address2": null,
				"address3": null,
				"city": "Cambridge",
				"state": "MA",
				"zip": "02138-3083",
				"country": "USA",
				"email": "info@csb.usa.com",
				"customerServicePhone": "888-418-5626",
				"technicalSupportPhone": "888-418-5626",
				"fax": "617-441-7004",
				"financialInstitutionName": "Cambridge Savings Bank",
				"siteURL": "www.cambridgesavings.com"
			}
		},
		{
			"name": "Campus USA Credit Union",
			"fid": "263178478",
			"org": "Campus USA Credit Union",
			"ofx": "https://que.campuscu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "PO BOX 147029",
				"address2": null,
				"address3": null,
				"city": "Gainesville",
				"state": "FL",
				"zip": "32614",
				"country": "USA",
				"email": "info@campuscu.com",
				"customerServicePhone": "352-335-9090",
				"technicalSupportPhone": "352-335-9090",
				"fax": null,
				"financialInstitutionName": "CAMPUS USA Credit Union",
				"siteURL": "http://www.campuscu.com"
			}
		},
		{
			"name": "Canton Cooperative Bank",
			"fid": "1656",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": null,
				"address2": null,
				"address3": null,
				"city": null,
				"state": null,
				"zip": null,
				"country": null,
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": null,
				"siteURL": null
			}
		},
		{
			"name": "CapStar Bank",
			"fid": "5528",
			"org": "061",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "201 4th Avenue",
				"address2": "Suite 950",
				"address3": null,
				"city": "Nashville",
				"state": "TN",
				"zip": "37219",
				"country": "USA",
				"email": "customercare@capstarbank.com",
				"customerServicePhone": "1-877-258-5268",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CapStarBank",
				"siteURL": "http://www.capstarbank.com/"
			}
		},
		{
			"name": "Capital Bank (CA)",
			"fid": "17277",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "31351 RANCHO VIEJO ROAD",
				"address2": "SAN JUAN CAPISTRANO, CA 92675",
				"address3": null,
				"city": "SAN JUAN CAPISTRANO",
				"state": "CA",
				"zip": "926750000",
				"country": "USA",
				"email": "customerservice@mycapitalbank.com",
				"customerServicePhone": "(949) 489-4200",
				"technicalSupportPhone": "949-489-4200",
				"fax": null,
				"financialInstitutionName": "Capital Bank",
				"siteURL": "http://www.mycapitalbank.com"
			}
		},
		{
			"name": "Capital Bank US QN QB DC (FL)",
			"fid": "067011760",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "9350 South Dixie Highway",
				"address2": null,
				"address3": null,
				"city": "Miami",
				"state": "FL",
				"zip": "33156",
				"country": "USA",
				"email": "customerservice@capitalbank-us.c",
				"customerServicePhone": "800.308.3971",
				"technicalSupportPhone": "800.308.3971",
				"fax": null,
				"financialInstitutionName": "Capital Bank",
				"siteURL": "www.capitalbank-us.com/"
			}
		},
		{
			"name": "Capital Guardian LLC",
			"fid": "044",
			"org": "Capital Guardian LLC",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "1209 E Garrison Blvd",
				"address2": null,
				"address3": null,
				"city": "Gastonia",
				"state": "NC",
				"zip": "28054",
				"country": "USA",
				"email": "Alan.boyer@capitalguardianllc.com",
				"customerServicePhone": "704-865-2900",
				"technicalSupportPhone": "704-865-2900",
				"fax": "704-861-8835",
				"financialInstitutionName": "Capital Guardian LLC",
				"siteURL": "http://www.capitalguardianllc.com"
			}
		},
		{
			"name": "Capital One Bank-after 12-15-13",
			"fid": "1001",
			"org": "Capital One",
			"ofx": "https://ofx.capitalone.com/ofx/103/process.ofx",
			"profile": {
				"address1": "1680 Capital One Drive",
				"address2": null,
				"address3": null,
				"city": "McLean",
				"state": "VA",
				"zip": "22102-3491",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-877-442-3764",
				"technicalSupportPhone": "1-877-442-3764",
				"fax": null,
				"financialInstitutionName": "Capital One Bank",
				"siteURL": "http://www.capitalonebank.com"
			}
		},
		{
			"name": "Capitol Federal Savings - New",
			"fid": "1001",
			"org": "CAPFED",
			"ofx": "https://ofx-prod.capfed.com/ofx/process.ofx",
			"profile": {
				"address1": "P.O. Box 3505",
				"address2": null,
				"address3": null,
				"city": "Topeka",
				"state": "KS",
				"zip": "66601-3505",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "888-822-7333",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Capitol Federal Savings Bank",
				"siteURL": "http://www.capfed.com"
			}
		},
		{
			"name": "Cardinal Bank",
			"fid": "056008849",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "8270 Greensboro Drive",
				"address2": "Suite 500",
				"address3": null,
				"city": "McLean",
				"state": "VA",
				"zip": "22102",
				"country": "USA",
				"email": "cardinalonline@cardinalbank.com",
				"customerServicePhone": "703-584-3400",
				"technicalSupportPhone": "703-584-3400",
				"fax": "703-584-3800",
				"financialInstitutionName": "Cardinal Bank, NA",
				"siteURL": "www.cardinalbank.com"
			}
		},
		{
			"name": "Carrollton Bank",
			"fid": "081906013",
			"org": "MTwoZeroFour",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "315 6th street",
				"address2": null,
				"address3": null,
				"city": "Carrollton",
				"state": "IL",
				"zip": "62016",
				"country": "USA",
				"email": null,
				"customerServicePhone": "217-942-9106",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Carrollton Bank",
				"siteURL": null
			}
		},
		{
			"name": "Cedar Point Federal Credit Union",
			"fid": "255077736",
			"org": "Cedar Point Federal Credit Union",
			"ofx": "https://pcu.cpfcu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Centennial Bank",
			"fid": "1533",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "13700 E ARAPAHOE ROAD",
				"address2": "CENTENNIAL CO  80112",
				"address3": null,
				"city": "CENTENNIAL",
				"state": "CO",
				"zip": "801120000",
				"country": "USA",
				"email": "ibsmgr@centennialbanking.com",
				"customerServicePhone": "(303) 680-1600",
				"technicalSupportPhone": "(303)680-1600",
				"fax": null,
				"financialInstitutionName": "CENTENNIAL BANK",
				"siteURL": "http://www.centennialbanking.com"
			}
		},
		{
			"name": "CenterState Bank",
			"fid": "1942",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1101 First Street South",
				"address2": null,
				"address3": null,
				"city": "Winter Haven",
				"state": "FL",
				"zip": "33880",
				"country": "USA",
				"email": "estaton@centerstatebank.com",
				"customerServicePhone": "800-786-7749",
				"technicalSupportPhone": "800-786-7749",
				"fax": null,
				"financialInstitutionName": "CenterState Bank",
				"siteURL": "http://www.centerstatebank.com"
			}
		},
		{
			"name": "CenterState Bank - Business",
			"fid": "1946",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1101 First Street South",
				"address2": null,
				"address3": null,
				"city": "Winter Haven",
				"state": "FL",
				"zip": "33881",
				"country": "USA",
				"email": "jyount@centerstatebank.com",
				"customerServicePhone": "800-758-0080",
				"technicalSupportPhone": "800-758-0080",
				"fax": null,
				"financialInstitutionName": "CenterState Bank",
				"siteURL": "http://www.centerstatebank.com"
			}
		},
		{
			"name": "CenterState Bank National Assoc.",
			"fid": "1489",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "6930 Gall Blvd",
				"address2": null,
				"address3": null,
				"city": "Zephyrhills",
				"state": "FL",
				"zip": "33541",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(888) 426-2691",
				"technicalSupportPhone": "(888) 426-2691",
				"fax": null,
				"financialInstitutionName": "CenterState Bank, N.A.",
				"siteURL": "http://www.csbwestfl.com"
			}
		},
		{
			"name": "Centra Credit Union",
			"fid": "274972883",
			"org": "Centra CU",
			"ofx": "https://www.centralink.org/scripts/isaofx.dll",
			"profile": {
				"address1": "1430 National Road",
				"address2": null,
				"address3": null,
				"city": "Columbus",
				"state": "IN",
				"zip": "47201",
				"country": "USA",
				"email": null,
				"customerServicePhone": "800-232-3642",
				"technicalSupportPhone": "800-232-3642",
				"fax": null,
				"financialInstitutionName": "Centra Credit Union",
				"siteURL": "http://www.centra.org"
			}
		},
		{
			"name": "Central BOLO - Business",
			"fid": "764",
			"org": "081509070",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "3848 Highway 54",
				"address2": null,
				"address3": null,
				"city": "Osage Beach",
				"state": "MO",
				"zip": "65065",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-7921",
				"technicalSupportPhone": "866-777-7921",
				"fax": null,
				"financialInstitutionName": "Central BOLO - Business",
				"siteURL": "www.cbolobank.com"
			}
		},
		{
			"name": "Central BOLO - Personal",
			"fid": "164",
			"org": "081509070",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "3848 Highway 54",
				"address2": null,
				"address3": null,
				"city": "Osage Beach",
				"state": "MO",
				"zip": "65065",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-752-9998",
				"technicalSupportPhone": "800-752-9998",
				"fax": null,
				"financialInstitutionName": "Central BOLO - Personal",
				"siteURL": "www.cbolobank.com"
			}
		},
		{
			"name": "Central Bank & Trust",
			"fid": "52080",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P O Box 70",
				"address2": "Lander, WY  82520",
				"address3": null,
				"city": "LANDER",
				"state": "WY",
				"zip": "825200070",
				"country": "USA",
				"email": "onlinesupport@centralbanktrust.com",
				"customerServicePhone": "(307) 332-4730",
				"technicalSupportPhone": "(307)332-4730",
				"fax": null,
				"financialInstitutionName": "Central Bank & Trust",
				"siteURL": "http://www.centralbanktrust.com"
			}
		},
		{
			"name": "Central Bank MO - Business",
			"fid": "759",
			"org": "086500634",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "238 Madison Street",
				"address2": null,
				"address3": null,
				"city": "Jefferson City",
				"state": "MO",
				"zip": "65101",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-7912",
				"technicalSupportPhone": "866-777-7912",
				"fax": null,
				"financialInstitutionName": "Central Bank MO - Business",
				"siteURL": "www.centralbank.net"
			}
		},
		{
			"name": "Central Bank MO - Personal",
			"fid": "159",
			"org": "086500634",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "238 Madison Street",
				"address2": null,
				"address3": null,
				"city": "Jefferson City",
				"state": "MO",
				"zip": "65101",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-749-5344",
				"technicalSupportPhone": "800-749-5344",
				"fax": null,
				"financialInstitutionName": "Central Bank MO - Personal",
				"siteURL": "www.centralbank.net"
			}
		},
		{
			"name": "Central Bank Utah",
			"fid": "124300327",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "75 N University Avenue",
				"address2": null,
				"address3": null,
				"city": "Provo",
				"state": "UT",
				"zip": "84601",
				"country": "USA",
				"email": "online1@cbutah.com",
				"customerServicePhone": "801-655-2116",
				"technicalSupportPhone": "801-655-2116",
				"fax": "801-375-1059",
				"financialInstitutionName": "Central Bank Utah",
				"siteURL": "www.centralbankutah.com"
			}
		},
		{
			"name": "Central Bank of Audrain Co-Bus",
			"fid": "768",
			"org": "081501489",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "203 East Liberty Street",
				"address2": null,
				"address3": null,
				"city": "Mexico",
				"state": "MO",
				"zip": "65265",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-8606",
				"technicalSupportPhone": "866-777-8606",
				"fax": null,
				"financialInstitutionName": "Central Bank of Audrain Co-Bus",
				"siteURL": "https://www.centralbankac.net/"
			}
		},
		{
			"name": "Central Bank of Audrain Co-Pers",
			"fid": "168",
			"org": "081501489",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "203 East Liberty Street",
				"address2": null,
				"address3": null,
				"city": "Mexico",
				"state": "MO",
				"zip": "65265",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-755-7009",
				"technicalSupportPhone": "800-755-7009",
				"fax": null,
				"financialInstitutionName": "Central Bank of Audrain Co-Pers",
				"siteURL": "https://www.centralbankac.net/"
			}
		},
		{
			"name": "Central Bank of St. Louis - Bus",
			"fid": "762",
			"org": "081004601",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "7707 Forsyth Boulevard",
				"address2": null,
				"address3": null,
				"city": "Clayton",
				"state": "MO",
				"zip": "63105",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-8501",
				"technicalSupportPhone": "866-777-8501",
				"fax": null,
				"financialInstitutionName": "FNB of St. Louis - Business",
				"siteURL": "www.fnbstl.com"
			}
		},
		{
			"name": "Central Bank of St. Louis - Pers",
			"fid": "162",
			"org": "081004601",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "7707 Forsyth Boulevard",
				"address2": null,
				"address3": null,
				"city": "Clayton",
				"state": "MO",
				"zip": "63105",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-750-9779",
				"technicalSupportPhone": "800-750-9779",
				"fax": null,
				"financialInstitutionName": "FNB of St. Louis - Personal",
				"siteURL": "www.fnbstl.com"
			}
		},
		{
			"name": "Central Bank, KY-Consumer",
			"fid": "58113",
			"org": "CNETCB",
			"ofx": "https://ofxcnetcb.centralbank.com/ofx/ofx.ofx",
			"profile": {
				"address1": "300 West Vine Street",
				"address2": null,
				"address3": null,
				"city": "Lexington",
				"state": "KY",
				"zip": "40507",
				"country": "USA",
				"email": "centralnet@centralbank.com",
				"customerServicePhone": "800-637-6884",
				"technicalSupportPhone": "800-637-6884",
				"fax": null,
				"financialInstitutionName": "Central Bank",
				"siteURL": "https://cnetcb.centralbank.com"
			}
		},
		{
			"name": "Central Bank-Jeff.Co-KY-Consumer",
			"fid": "58116",
			"org": "CNETJC",
			"ofx": "https://ofxcnetjc.centralbank.com/ofx/ofx.ofx",
			"profile": {
				"address1": "300 West Vine Street",
				"address2": null,
				"address3": null,
				"city": "Lexington",
				"state": "KY",
				"zip": "40507",
				"country": "USA",
				"email": "centralnet@centralbank.com",
				"customerServicePhone": "800-637-6884",
				"technicalSupportPhone": "800-637-6884",
				"fax": null,
				"financialInstitutionName": "Central Bank",
				"siteURL": "https://cnetjc.centralbank.com"
			}
		},
		{
			"name": "Central Maine Federal Credit Union",
			"fid": "211287926",
			"org": "Users",
			"ofx": "https://centralmainecu.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Central Missouri Community CU",
			"fid": "4ZAGF",
			"org": "Central Missouri Community CU",
			"ofx": "https://www.netit.financial-net.com/ofx/",
			"profile": {
				"address1": "620 N. MAGUIRE ST.",
				"address2": null,
				"address3": null,
				"city": "WARRENSBURG",
				"state": "MO",
				"zip": "64093",
				"country": "US",
				"email": null,
				"customerServicePhone": "6607473311",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CENTRAL MISSOURI COMMUNITY CU",
				"siteURL": "https://www.netit.financial-net.com/cmccreditunion"
			}
		},
		{
			"name": "Central State Bank",
			"fid": "072405743",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "49 Benzie Blvd.",
				"address2": null,
				"address3": null,
				"city": "Beulah",
				"state": "MI",
				"zip": "49617",
				"country": "USA",
				"email": "contactus@icentralstatebank.com",
				"customerServicePhone": "231-882-4462",
				"technicalSupportPhone": "231-882-4462",
				"fax": "231-882-4577",
				"financialInstitutionName": "Central State Bank",
				"siteURL": "//www.icentralstatebank.com"
			}
		},
		{
			"name": "Central State Bank Muscatine IA",
			"fid": "073900742",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "301 Iowa Avenue",
				"address2": null,
				"address3": null,
				"city": "Muscatine",
				"state": "IA",
				"zip": "52761",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "563-263-3131",
				"technicalSupportPhone": "563-262-3134",
				"fax": null,
				"financialInstitutionName": "Central State Bank",
				"siteURL": "www.centralstateonline.com"
			}
		},
		{
			"name": "Central Valley Comm Bank Retail",
			"fid": "12886",
			"org": "CVCB",
			"ofx": "https://ofx.cvcb.com/ofx/ofx/ofx.ofx",
			"profile": {
				"address1": "7100 N Financial Dr Ste 101",
				"address2": null,
				"address3": null,
				"city": "Fresno",
				"state": "CA",
				"zip": "93720",
				"country": "USA",
				"email": "ebsupport@cvcb.com",
				"customerServicePhone": "800-298-1775",
				"technicalSupportPhone": "800-298-1775",
				"fax": null,
				"financialInstitutionName": "Central Valley Community Bank",
				"siteURL": "https://olb.cvcb.com"
			}
		},
		{
			"name": "Centric Bank",
			"fid": "15279",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "4320 LINGLESTOWN RD.",
				"address2": "HARRISBURG, PA 17112",
				"address3": null,
				"city": "HARRISBURG",
				"state": "PA",
				"zip": "171120000",
				"country": "USA",
				"email": "onlinebanking@centricbank.com",
				"customerServicePhone": "(717) 657-7727",
				"technicalSupportPhone": "717-657-7727",
				"fax": null,
				"financialInstitutionName": "Centric Bank",
				"siteURL": "http://www.centricbank.com"
			}
		},
		{
			"name": "Centris Federal Credit Union -new",
			"fid": "304082876",
			"org": "Users",
			"ofx": "https://www.centriscuob.org/Scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Centrue Bank - Direct Connect",
			"fid": "071901837",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "201 East Main Street",
				"address2": null,
				"address3": null,
				"city": "Streator",
				"state": "IL",
				"zip": "61364",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "815-673-3333",
				"technicalSupportPhone": "815-673-3333",
				"fax": null,
				"financialInstitutionName": "Centrue Bank",
				"siteURL": "www.centrueonlinebanking.com"
			}
		},
		{
			"name": "Centrue eBusiness",
			"fid": "C071901837",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "201 East Main Street",
				"address2": null,
				"address3": null,
				"city": "Streator",
				"state": "IL",
				"zip": "61364",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "815-673-3333",
				"technicalSupportPhone": "815-673-3333",
				"fax": null,
				"financialInstitutionName": "Centrue Bank",
				"siteURL": "www.centrueonlinebanking.com"
			}
		},
		{
			"name": "Century Bank MS - DC",
			"fid": "065303328",
			"org": "Fidelity",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "4282 Main St.",
				"address2": null,
				"address3": null,
				"city": "Lucedale",
				"state": "MS",
				"zip": "39452",
				"country": "USA",
				"email": null,
				"customerServicePhone": "601-766-4000",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Century Bank",
				"siteURL": "http://www.centurybankms.com"
			}
		},
		{
			"name": "Century Bank of Georgia - DL",
			"fid": "56439",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P O BOX 580",
				"address2": "CARTERSVILLE, GA 30120",
				"address3": null,
				"city": "CARTERSVILLE",
				"state": "GA",
				"zip": "301200000",
				"country": "USA",
				"email": "CustomerService@centurybanknet.com",
				"customerServicePhone": "(770) 387-1922",
				"technicalSupportPhone": "(770)387-1922",
				"fax": null,
				"financialInstitutionName": "CENTURY BANK OF GEORGIA",
				"siteURL": "http://www.centurybanknet.com"
			}
		},
		{
			"name": "Certus Bank",
			"fid": "053208118",
			"org": "MEightEightThree",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "2100 Rexford Road Suite 100",
				"address2": null,
				"address3": null,
				"city": "Charlotte",
				"state": "NC",
				"zip": "28211",
				"country": "USA",
				"email": null,
				"customerServicePhone": "864-414-5038",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CertusBank, NA",
				"siteURL": "www.certusbank.com"
			}
		},
		{
			"name": "Cetera Advisor Networks LLC",
			"fid": "057",
			"org": "ING Advisors Network",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "200 North Sepulveda Blvd",
				"address2": "STE 1300",
				"address3": null,
				"city": "El Segundo",
				"state": "CA",
				"zip": "90245-5672",
				"country": "USA",
				"email": "Gary.burkard@us.ing.com",
				"customerServicePhone": "310-326-3100",
				"technicalSupportPhone": "310-326-3100",
				"fax": "310-784-1186",
				"financialInstitutionName": "Cetera Advisor Networks LLC",
				"siteURL": "-"
			}
		},
		{
			"name": "Cetera Advisors LLC",
			"fid": "058",
			"org": "ING Advisors Network",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "1290 Broadway",
				"address2": null,
				"address3": null,
				"city": "Denver",
				"state": "CO",
				"zip": "80203",
				"country": "USA",
				"email": "resourcecenter@us.ing.com",
				"customerServicePhone": "800-929-3486 OPT 1",
				"technicalSupportPhone": "800-929-3486 OPT 1",
				"fax": "303-816-2002",
				"financialInstitutionName": "Cetera Advisors LLC",
				"siteURL": "-"
			}
		},
		{
			"name": "Chain Bridge Bank",
			"fid": "15150",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "1445-A Laughin Ave",
				"address2": "McLean, VA 22101",
				"address3": null,
				"city": "MCLEAN",
				"state": "VA",
				"zip": "221010000",
				"country": "USA",
				"email": "customerservice@chainbridgebank.com",
				"customerServicePhone": "(703) 748-2005",
				"technicalSupportPhone": "703-748-2005",
				"fax": null,
				"financialInstitutionName": "Chain Bridge Bank",
				"siteURL": "http://www.chainbridgebank.com"
			}
		},
		{
			"name": "Charles River Bank",
			"fid": "344",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "700 Main Street",
				"address2": null,
				"address3": null,
				"city": "Medway",
				"state": "MA",
				"zip": "02053",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 392-0284",
				"technicalSupportPhone": "(800) 392-0284",
				"fax": null,
				"financialInstitutionName": "CHARLES RIVER BANK",
				"siteURL": "http://www.charlesriverbank.com"
			}
		},
		{
			"name": "Charles River Bank- Business",
			"fid": "1244",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "700 Main Street",
				"address2": null,
				"address3": null,
				"city": "Medway",
				"state": "MA",
				"zip": "02053",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 392-0284",
				"technicalSupportPhone": "(800) 392-0284",
				"fax": null,
				"financialInstitutionName": "CHARLES RIVER BANK",
				"siteURL": "http://www.charlesriverbank.com"
			}
		},
		{
			"name": "Charles Schwab & Co., Inc.",
			"fid": "8888",
			"org": "Intuit",
			"ofx": "https://ofx.schwab.com/cgi_dev/ofx_server",
			"profile": {
				"address1": "101 Montgomery Street",
				"address2": null,
				"address3": null,
				"city": "San Francisco",
				"state": "CA",
				"zip": "94104",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Charles Schwab & Co., Inc.",
				"siteURL": "WWW.SCHWAB.COM"
			}
		},
		{
			"name": "Charles Schwab Bank, N.A.",
			"fid": "8886",
			"org": "Intuit",
			"ofx": "https://ofx.schwab.com/bankcgi_dev/ofx_server",
			"profile": {
				"address1": "101 Montgomery Street",
				"address2": null,
				"address3": null,
				"city": "San Francisco",
				"state": "CA",
				"zip": "94104",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Charles Schwab & Co., Inc.",
				"siteURL": "WWW.SCHWAB.COM"
			}
		},
		{
			"name": "Charlotte Metro Credit Union",
			"fid": "253075028",
			"org": "CMCUDC",
			"ofx": "https://mobile.cmcu.org/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "718 Central Ave",
				"address2": null,
				"address3": null,
				"city": "Charlotte",
				"state": "NC",
				"zip": "28204",
				"country": "USA",
				"email": "info@cmcu.org",
				"customerServicePhone": "704-375-0183",
				"technicalSupportPhone": "704-375-0183",
				"fax": null,
				"financialInstitutionName": "Charlotte Metro Credit Union",
				"siteURL": "https://cmcu.org"
			}
		},
		{
			"name": "Charter One",
			"fid": "4669",
			"org": "FiServ CheckFree",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04669.ofx",
			"profile": {
				"address1": "One Citizens Plaza",
				"address2": null,
				"address3": null,
				"city": "Providence",
				"state": "RI",
				"zip": "02903",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Charter One",
				"siteURL": "http://www.charterone.com"
			}
		},
		{
			"name": "Charter One - Small Business",
			"fid": "4670",
			"org": "FiServ CheckFree",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04670.ofx",
			"profile": {
				"address1": "One Citizens Plaza",
				"address2": null,
				"address3": null,
				"city": "Providence",
				"state": "RI",
				"zip": "02903",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Charter One Small Business",
				"siteURL": "http://www.charterone.com"
			}
		},
		{
			"name": "Chase",
			"fid": "10898",
			"org": "B1",
			"ofx": "https://ofx.chase.com",
			"profile": {
				"address1": "Bank One Plaza",
				"address2": "Suite IL1-0852",
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60670",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "800-482-3675",
				"technicalSupportPhone": "800-482-3675",
				"fax": null,
				"financialInstitutionName": "B1",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "Chase Investments",
			"fid": "7784",
			"org": "Fidelity",
			"ofx": "https://ofxpcs.toolkit.clearco.com",
			"profile": {
				"address1": "50 broadway",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "JPM",
				"siteURL": null
			}
		},
		{
			"name": "CheckFree Bill Pay",
			"fid": "1000",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01000.ofx",
			"profile": {
				"address1": "6000 Perimeter Dr.",
				"address2": null,
				"address3": null,
				"city": "Dublin",
				"state": "OH",
				"zip": "43017",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CheckFree Direct",
				"siteURL": "http://www.checkfree.com/"
			}
		},
		{
			"name": "Chelsea Groton Bank",
			"fid": "1087",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "904 Poquonnock Road",
				"address2": "P O Box 869",
				"address3": null,
				"city": "Groton",
				"state": "CT",
				"zip": "06340",
				"country": "USA",
				"email": "ebank@chelseagroton.com",
				"customerServicePhone": "860-448-4200",
				"technicalSupportPhone": "860-448-4200",
				"fax": null,
				"financialInstitutionName": "Chelsea Groton Bank",
				"siteURL": "http://www.chelseagroton.com"
			}
		},
		{
			"name": "Chelsea-Provident Co-op Bank",
			"fid": "1659",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "360 Broadway",
				"address2": null,
				"address3": null,
				"city": "Chelsea",
				"state": "MA",
				"zip": "02150",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(866) 416-7130",
				"technicalSupportPhone": "(866) 416-7130",
				"fax": null,
				"financialInstitutionName": "Chelsea-Provident Co-op Bank",
				"siteURL": "http://www.cpcbank.com"
			}
		},
		{
			"name": "Chemical Bank",
			"fid": "1985",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "333 E. Main Street",
				"address2": null,
				"address3": null,
				"city": "Midland",
				"state": "MI",
				"zip": "48640-0569",
				"country": "USA",
				"email": "mark.morley@chemicalbankmi.com",
				"customerServicePhone": "800-943-7386",
				"technicalSupportPhone": "800-943-7386",
				"fax": null,
				"financialInstitutionName": "Chemical Bank",
				"siteURL": "http://www.chemicalbankmi.com"
			}
		},
		{
			"name": "Chesterfield Federal Credit Union",
			"fid": "251480327",
			"org": "Chesterfield Employees FCU",
			"ofx": "https://cfcunet24.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Cheviot Savings Bank",
			"fid": "1058",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "3723 Glenmore Ave.",
				"address2": null,
				"address3": null,
				"city": "Cincinnati",
				"state": "OH",
				"zip": "45211",
				"country": "USA",
				"email": "contact@cheviotsavings.com",
				"customerServicePhone": "(513) 661-0457",
				"technicalSupportPhone": "(513) 661-0457",
				"fax": "(513) 389-0214",
				"financialInstitutionName": "Cheviot Savings Bank",
				"siteURL": "https://www.cheviotsavings.com"
			}
		},
		{
			"name": "Chevron Federal Credit Union",
			"fid": "321075947",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "P.O. Box 2069",
				"address2": null,
				"address3": null,
				"city": "Oakland",
				"state": "CA",
				"zip": "94612",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-232-8101",
				"technicalSupportPhone": "800-232-8101",
				"fax": null,
				"financialInstitutionName": "Chevron Federal Credit Union",
				"siteURL": "www.chevronfcu.org"
			}
		},
		{
			"name": "Chickasha Bank & Trust",
			"fid": "51354",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P O BOX 1307",
				"address2": "CHICKASHA  OK  73023",
				"address3": null,
				"city": "LAWTON",
				"state": "OK",
				"zip": "735010000",
				"country": "USA",
				"email": "questions@chickashabank.com",
				"customerServicePhone": "(405) 222-0550",
				"technicalSupportPhone": "(405)222-0550",
				"fax": null,
				"financialInstitutionName": "CHICKASHA BANK & TRUST",
				"siteURL": "http://www.chickashabank.com"
			}
		},
		{
			"name": "Chittenden Bank",
			"fid": "10962",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "2 BURLINGTON SQUARE",
				"address2": "BURLINGTON VT 05402",
				"address3": null,
				"city": "BURLINGTON",
				"state": "VT",
				"zip": "054020000",
				"country": "USA",
				"email": "email_alerts@chittenden.com",
				"customerServicePhone": "(800) 545-2236",
				"technicalSupportPhone": "1-800-223-7518",
				"fax": null,
				"financialInstitutionName": "CHITTENDEN BANK--deconverted",
				"siteURL": "https://www.chittenden.com"
			}
		},
		{
			"name": "Christian Community Credit Union",
			"fid": "322274831",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "101 S. Barranca Ave.",
				"address2": "255 N. Lone Hill",
				"address3": null,
				"city": "Covina",
				"state": "CA",
				"zip": "91722",
				"country": "USA",
				"email": "info@mycccu.com",
				"customerServicePhone": "1-800-347-2228",
				"technicalSupportPhone": "1-800-347-2228",
				"fax": "626-915-2031",
				"financialInstitutionName": "Christian Community Credit Union",
				"siteURL": "http://www.mycccu.com"
			}
		},
		{
			"name": "Citi Cards",
			"fid": "24909",
			"org": "Citigroup",
			"ofx": "https://www.accountonline.com/cards/svc/CitiOfxManager.do",
			"profile": {
				"address1": "8787 Baypine Road",
				"address2": null,
				"address3": null,
				"city": "Jacksonville",
				"state": "FL",
				"zip": "32256",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-800-950-5114",
				"technicalSupportPhone": "1-800-347-4934",
				"fax": null,
				"financialInstitutionName": "Citigroup",
				"siteURL": "http://www.citicards.com"
			}
		},
		{
			"name": "Citi Chairman Card",
			"fid": "26389",
			"org": "Citi",
			"ofx": "https://www.accountonline.com/cards/svc/CitiOfxManager.do",
			"profile": {
				"address1": "8787 Baypine Road",
				"address2": null,
				"address3": null,
				"city": "Jacksonville",
				"state": "FL",
				"zip": "32256",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-800-750-7453",
				"technicalSupportPhone": "1-866-422-3091",
				"fax": null,
				"financialInstitutionName": "Citigroup",
				"siteURL": "http://www.citicards.com"
			}
		},
		{
			"name": "Citi Investments",
			"fid": "063",
			"org": "Citigroup",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "1 Court Street",
				"address2": null,
				"address3": null,
				"city": "Long Island City",
				"state": "NY",
				"zip": "11120",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "Citi Support",
				"technicalSupportPhone": "-",
				"fax": "877-541-1852",
				"financialInstitutionName": "Citi Investments",
				"siteURL": "http://www.citibank.com"
			}
		},
		{
			"name": "Citi Personal Investments Int'l",
			"fid": "061",
			"org": "Citigroup",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "2 Court Square",
				"address2": null,
				"address3": null,
				"city": "Long Island City",
				"state": "NY",
				"zip": "11120",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "1-877-836-9141",
				"technicalSupportPhone": "1-877-836-9141",
				"fax": "-",
				"financialInstitutionName": "Citi Personal Investments Intl",
				"siteURL": "http://investments.citi.com/cpii"
			}
		},
		{
			"name": "Citi Personal Wealth Management",
			"fid": "060",
			"org": "Citigroup",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "2 Court Square",
				"address2": null,
				"address3": null,
				"city": "Long Island City",
				"state": "NY",
				"zip": "11120",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "877-541-1852",
				"technicalSupportPhone": "877-541-1852",
				"fax": "-",
				"financialInstitutionName": "Citi Personal Wealth Management",
				"siteURL": "http://www.investments.citi.com/pwm"
			}
		},
		{
			"name": "Citi Private Bank",
			"fid": "062",
			"org": "Citigroup",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "666 5th Avenue",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10103",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "1-800-645-4100",
				"technicalSupportPhone": "1-800-645-4100",
				"fax": "-",
				"financialInstitutionName": "Citi Private Bank",
				"siteURL": "http://www.investments.citi.com/cpb"
			}
		},
		{
			"name": "CitiBusiness Credit Cards",
			"fid": "26389",
			"org": "Citigroup",
			"ofx": "https://www.accountonline.com/cards/svc/CitiOfxManager.do",
			"profile": {
				"address1": "8787 Baypine Road",
				"address2": null,
				"address3": null,
				"city": "Jacksonville",
				"state": "FL",
				"zip": "32256",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-800-750-7453",
				"technicalSupportPhone": "1-866-422-3091",
				"fax": null,
				"financialInstitutionName": "Citigroup",
				"siteURL": "http://www.citicards.com"
			}
		},
		{
			"name": "Citibank",
			"fid": "2101",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/02101.ofx",
			"profile": {
				"address1": "500 W. Madison",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60661",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Citibank",
				"siteURL": "http://www.citibank.com/"
			}
		},
		{
			"name": "Citizens Bank & Trust Co - MO",
			"fid": "3771",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "515 WASHINGTON STREET",
				"address2": "CHILLICOTHE, MO 64601",
				"address3": null,
				"city": "CHILLICOTHE",
				"state": "MO",
				"zip": "646012245",
				"country": "USA",
				"email": "ebankhelp@ebankcbt.com",
				"customerServicePhone": "(660) 646-5500",
				"technicalSupportPhone": "1-800-634-6203",
				"fax": null,
				"financialInstitutionName": "Citizens Bank & Trust",
				"siteURL": "https://www.ebankcbt.com"
			}
		},
		{
			"name": "Citizens National Bank TX",
			"fid": "111903151",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "201 W. Main Street",
				"address2": null,
				"address3": null,
				"city": "Henderson",
				"state": "CA",
				"zip": "75653-1009",
				"country": "USA",
				"email": "n/a",
				"customerServicePhone": "877-566-2621",
				"technicalSupportPhone": "877-566-2621",
				"fax": "n/a",
				"financialInstitutionName": "Citizens National Bank",
				"siteURL": "www.cnbtexas.com"
			}
		},
		{
			"name": "Citizens and Farmers Bank",
			"fid": "051404901",
			"org": "MThreeZeroThree",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "802 Main Street",
				"address2": "P.O. Box 391",
				"address3": null,
				"city": "West Point",
				"state": "VA",
				"zip": "23181",
				"country": "USA",
				"email": null,
				"customerServicePhone": "804-843-7001",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Citizens & Farmers Bank",
				"siteURL": "https://www.cffc.com/home/home"
			}
		},
		{
			"name": "City Bank - Business",
			"fid": "767",
			"org": "081500749",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "500 West Coates Street",
				"address2": null,
				"address3": null,
				"city": "Moberly",
				"state": "MO",
				"zip": "65270",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-8604",
				"technicalSupportPhone": "866-777-8604",
				"fax": null,
				"financialInstitutionName": "City Bank - Business",
				"siteURL": "www.city-bank.com"
			}
		},
		{
			"name": "City Bank - Personal",
			"fid": "167",
			"org": "081500749",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "500 West Coates Street",
				"address2": null,
				"address3": null,
				"city": "Moberly",
				"state": "MO",
				"zip": "65270",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-755-4711",
				"technicalSupportPhone": "800-755-4711",
				"fax": null,
				"financialInstitutionName": "City Bank - Personal",
				"siteURL": "www.city-bank.com"
			}
		},
		{
			"name": "City National Bank of CA-Dir Con",
			"fid": "5010",
			"org": "309",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "400 N Roxbury Dr",
				"address2": null,
				"address3": null,
				"city": "Beverly Hills",
				"state": "CA",
				"zip": "90210",
				"country": "USA",
				"email": "onlinebanking@cnb.com",
				"customerServicePhone": "800-773-7100",
				"technicalSupportPhone": "800-773-7100",
				"fax": "213-427-5314",
				"financialInstitutionName": "City National",
				"siteURL": "www.cnb.com"
			}
		},
		{
			"name": "City National Bank of Florida",
			"fid": "066004367",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "25 W. Flagler Street",
				"address2": "MIS Dept. 7th Floor",
				"address3": null,
				"city": "Miami",
				"state": "FL",
				"zip": "33130",
				"country": "USA",
				"email": "support@citynational.com",
				"customerServicePhone": "866-262-3729",
				"technicalSupportPhone": "866-262-3729",
				"fax": "305-577-7273",
				"financialInstitutionName": "City National Bank of Florida",
				"siteURL": "www.mycitynational.com"
			}
		},
		{
			"name": "City and County CU - NEW",
			"fid": "9421",
			"org": "Connect",
			"ofx": "https://pcfirst.cccu.com/PCFirstofx/ofxrqst.aspx",
			"profile": {
				"address1": "144 11th Street East",
				"address2": null,
				"address3": null,
				"city": "St. Paul",
				"state": "MN",
				"zip": "55101-2380",
				"country": "USA",
				"email": "info@cccu.com",
				"customerServicePhone": "(651) 225-2700",
				"technicalSupportPhone": null,
				"fax": "(651) 779-9486",
				"financialInstitutionName": "City County Credit Union",
				"siteURL": "https://www.cccu.com"
			}
		},
		{
			"name": "City-County Federal Credit Union",
			"fid": "291074308",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "6010 Earle Brown Drive",
				"address2": null,
				"address3": null,
				"city": "Brooklyn Center",
				"state": "MN",
				"zip": "55430",
				"country": "USA",
				"email": "ccfcu@ccfcu.org",
				"customerServicePhone": "763-549-6606",
				"technicalSupportPhone": "763-549-6606",
				"fax": "763-549-6062",
				"financialInstitutionName": "City-County Federal Credit Union",
				"siteURL": "www.ccfcu.org"
			}
		},
		{
			"name": "Clark County Credit Union",
			"fid": "322484113",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2625 N Tenaya Way",
				"address2": null,
				"address3": null,
				"city": "Las Vegas",
				"state": "NV",
				"zip": "89133",
				"country": "USA",
				"email": "service@ccculv.com",
				"customerServicePhone": "702-228-2228",
				"technicalSupportPhone": "702-228-2228",
				"fax": null,
				"financialInstitutionName": "Clark Count Credit Union",
				"siteURL": "http://www.ccculv.org"
			}
		},
		{
			"name": "Clearview FCU",
			"fid": "243083237",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "8805 University Boulevard",
				"address2": null,
				"address3": null,
				"city": "Moon Township",
				"state": "PA",
				"zip": "15108",
				"country": "USA",
				"email": "support@clearviewfcu.org",
				"customerServicePhone": "1-800-926-0003",
				"technicalSupportPhone": "1-800-926-0003",
				"fax": "1-800-926-0003",
				"financialInstitutionName": "Clearview FCU",
				"siteURL": "www.clearviewfcuonline.org"
			}
		},
		{
			"name": "Coastal Community Bank DC",
			"fid": "125108405",
			"org": "Fidelity",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "2817 Colby Ave",
				"address2": null,
				"address3": null,
				"city": "Everett",
				"state": "WA",
				"zip": "98201",
				"country": "USA",
				"email": "customerservice@coastalbank.com",
				"customerServicePhone": "425-257-9000",
				"technicalSupportPhone": null,
				"fax": "425-257-9000",
				"financialInstitutionName": "Coastal Community Bank",
				"siteURL": "www.coastalbank.com"
			}
		},
		{
			"name": "Coastal Federal Bank",
			"fid": "11173",
			"org": "Coastal",
			"ofx": "https://ofx.onlinencr.com/scripts/serverext.dll",
			"profile": {
				"address1": "2619 Oak St.",
				"address2": null,
				"address3": null,
				"city": "Myrtle Beach",
				"state": "SC",
				"zip": "29577",
				"country": "USA",
				"email": "electronicbanking@CoastalFederal.com",
				"customerServicePhone": "1-843-205-2000",
				"technicalSupportPhone": "1-843-205-2000",
				"fax": null,
				"financialInstitutionName": "Coastal Federal Bank",
				"siteURL": "https://onlinencr.com/online/coastal/Consumer/login.asp"
			}
		},
		{
			"name": "Collegedale Credit Union",
			"fid": "35GFA",
			"org": "CollegedaleCU",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "5046 FLEMING PLAZA",
				"address2": null,
				"address3": null,
				"city": "COLLEGEDALE",
				"state": "TN",
				"zip": "37315",
				"country": "US",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "COLLEGEDALE CREDIT UNION",
				"siteURL": "https://www.netit.financial-net.com/collegedale"
			}
		},
		{
			"name": "Collins Community Credit Union",
			"fid": "33KP3",
			"org": "Collins Community Credit Union",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "1150 42ND STREET NE",
				"address2": null,
				"address3": null,
				"city": "CEDAR RAPIDS",
				"state": "IA",
				"zip": "524100500",
				"country": "US",
				"email": null,
				"customerServicePhone": "8004751150",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "COLLINS COMMUNITY CREDIT UNION",
				"siteURL": "https://www.netit.financial-net.com/collinscu"
			}
		},
		{
			"name": "Collinsville Savings Society",
			"fid": "745",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "136 Main Street",
				"address2": null,
				"address3": null,
				"city": "Collinsville",
				"state": "CT",
				"zip": "06022",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "855-275-0816",
				"technicalSupportPhone": "855-275-0816",
				"fax": null,
				"financialInstitutionName": "Collinsville Savings Society",
				"siteURL": "http://www.collinsvillesavings.com"
			}
		},
		{
			"name": "Collinsville Savings-Business",
			"fid": "875",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "136 Main Street",
				"address2": null,
				"address3": null,
				"city": "Collinsville",
				"state": "CT",
				"zip": "06022",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 647-8609",
				"technicalSupportPhone": "(800) 647-8609",
				"fax": null,
				"financialInstitutionName": "Collinsville Savings-Business",
				"siteURL": "http://www.collinsvillesavings.com"
			}
		},
		{
			"name": "Colonial Bank",
			"fid": "1046",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01046.ofx",
			"profile": {
				"address1": "One Commerce Street",
				"address2": null,
				"address3": null,
				"city": "Montgomery",
				"state": "AL",
				"zip": "36104",
				"country": "USA",
				"email": "customer_support@colonialbank.com",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Colonial Bank",
				"siteURL": "http://www.colonialbank.com"
			}
		},
		{
			"name": "Colonial Federal Savings Bank",
			"fid": "820",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "15 Beach Street",
				"address2": null,
				"address3": null,
				"city": "Quincy",
				"state": "MA",
				"zip": "02170",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800)-334-7944",
				"technicalSupportPhone": "(800)-334-7944",
				"fax": null,
				"financialInstitutionName": "Colonial Federal Savings Bank",
				"siteURL": "http://www.colonialfed.com"
			}
		},
		{
			"name": "Columbia Management",
			"fid": "18468",
			"org": "Columbia",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=80214112012010800",
			"profile": {
				"address1": "1 Financial Center",
				"address2": null,
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02111",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Columbia Management",
				"siteURL": null
			}
		},
		{
			"name": "Comercial Federal Bank",
			"fid": "4801",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04801.ofx",
			"profile": {
				"address1": "4501 Dodge Street",
				"address2": null,
				"address3": null,
				"city": "Omaha",
				"state": "NE",
				"zip": "68132",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Commercial Federal Bank",
				"siteURL": "http://www.comfedbank.com/"
			}
		},
		{
			"name": "Comerica",
			"fid": "5601",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/05601.ofx",
			"profile": {
				"address1": "3701 Hamline Road",
				"address2": "MC: 2330",
				"address3": null,
				"city": "Auburn Hills",
				"state": "MI",
				"zip": "483262330",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Comerica Bank",
				"siteURL": "http://www.comerica.com/"
			}
		},
		{
			"name": "Commerce Bank - MO, KS, IL",
			"fid": "4001",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04001.ofx",
			"profile": {
				"address1": "8000 Forsyth",
				"address2": "Mail Stop CLPCB",
				"address3": null,
				"city": "St. Louis",
				"state": "MO",
				"zip": "63105",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Commerce Bank",
				"siteURL": "http://www.commercebank.com/"
			}
		},
		{
			"name": "Community Bank - Joseph, OR",
			"fid": "13251",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "PO BOX 817",
				"address2": "JOSEPH  OR  97846",
				"address3": null,
				"city": "PENDLETON",
				"state": "OR",
				"zip": "978010000",
				"country": "USA",
				"email": "onlinesupport@communitybanknet.com",
				"customerServicePhone": "(541) 432-9050",
				"technicalSupportPhone": "1-855-273-3644",
				"fax": null,
				"financialInstitutionName": "COMMUNITY BANK",
				"siteURL": "http://www.communitybanknet.com"
			}
		},
		{
			"name": "Community Bank, N.A.",
			"fid": "11517",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "45 - 49 Court Street",
				"address2": "Canton, NY 13617",
				"address3": null,
				"city": "CANTON",
				"state": "NY",
				"zip": "136170000",
				"country": "USA",
				"email": "corpcom@communitybankna.com",
				"customerServicePhone": "(315) 386-4553",
				"technicalSupportPhone": "1-866-764-8638",
				"fax": null,
				"financialInstitutionName": "Community Bank, N.A.",
				"siteURL": "http://www.communitybankna.com"
			}
		},
		{
			"name": "Community Credit Union of FL",
			"fid": "263182037",
			"org": "Community Credit Union of FL",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1030 S US 1",
				"address2": null,
				"address3": null,
				"city": "Rockledge",
				"state": "FL",
				"zip": "32955-2716",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "321-690-2328",
				"technicalSupportPhone": "321-690-2328",
				"fax": null,
				"financialInstitutionName": "Community Credit Union Florida",
				"siteURL": "www.ccuflorida.org"
			}
		},
		{
			"name": "Community Federal Savings Bank",
			"fid": "026073008",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "89-07 Jamaica Avenue",
				"address2": null,
				"address3": null,
				"city": "Woodhaven",
				"state": "NY",
				"zip": "11421",
				"country": "USA",
				"email": "CFSBeBanking@communityfederalsav",
				"customerServicePhone": "(718)847-6333",
				"technicalSupportPhone": "(718)847-6333",
				"fax": "718-847-6444",
				"financialInstitutionName": "Community Federal Savings Bank",
				"siteURL": "www.cfsbebanking.com"
			}
		},
		{
			"name": "Community Resource Bank",
			"fid": "091917160",
			"org": "CNB",
			"ofx": "https://www.cnbinternet.com/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "1605 Heritage Drive",
				"address2": null,
				"address3": null,
				"city": "Northfield",
				"state": "MN",
				"zip": "55057",
				"country": "USA",
				"email": "crb@community-resourcebank.com",
				"customerServicePhone": "800-250-8420",
				"technicalSupportPhone": null,
				"fax": "507-645-3100",
				"financialInstitutionName": "Community Resource Bank",
				"siteURL": "https://www.community-resourcebank.com"
			}
		},
		{
			"name": "Community Savings",
			"fid": "1638",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "425 Main Street",
				"address2": null,
				"address3": null,
				"city": "Caldwell",
				"state": "OH",
				"zip": "43724",
				"country": "USA",
				"email": null,
				"customerServicePhone": "888-204-6118.",
				"technicalSupportPhone": "888-204-6118.",
				"fax": null,
				"financialInstitutionName": "Community Savings",
				"siteURL": "http://mycommunitysavings.com"
			}
		},
		{
			"name": "Community Southern Bank - DC",
			"fid": "7219",
			"org": "fis-7219",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "3340 South Florida Avenue",
				"address2": null,
				"address3": null,
				"city": "Lakeland",
				"state": "FL",
				"zip": "33803",
				"country": "USA",
				"email": "Communitysouthernbank@billsupport.com",
				"customerServicePhone": "855-590-4764",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Community Southern Bank",
				"siteURL": "http://communitysouthernbank.com"
			}
		},
		{
			"name": "Community Trust Bank - DC",
			"fid": "111102758",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3921 Elm Street",
				"address2": null,
				"address3": null,
				"city": "Choudrant",
				"state": "LA",
				"zip": "71227",
				"country": "USA",
				"email": "ctb1@ctbonline.com",
				"customerServicePhone": "318-242-7501",
				"technicalSupportPhone": "318-242-7501",
				"fax": "318-242-7560",
				"financialInstitutionName": "Community Trust Bank",
				"siteURL": "www.ctbonline.com"
			}
		},
		{
			"name": "Community Trust Credit Union",
			"fid": "271984861",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1313 Skokie Highway",
				"address2": null,
				"address3": null,
				"city": "Gurnee",
				"state": "IL",
				"zip": "60031",
				"country": "USA",
				"email": "webmail@ctcu.org",
				"customerServicePhone": "847-662-2050",
				"technicalSupportPhone": "847-662-2050",
				"fax": "847-662-1451",
				"financialInstitutionName": "Community Trust Credit Union",
				"siteURL": "http://www.ctcu.org"
			}
		},
		{
			"name": "CommunityAmerica CU Direct",
			"fid": "301081508",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "9777 Ridge Drive",
				"address2": null,
				"address3": null,
				"city": "Lenexa",
				"state": "KS",
				"zip": "66219",
				"country": "USA",
				"email": "onlinebankingservice@cacu.com",
				"customerServicePhone": "(866)272-2228",
				"technicalSupportPhone": "(866)272-2228",
				"fax": "(913)905-7007",
				"financialInstitutionName": "CommunityAmerica CU Direct",
				"siteURL": "www.cacu.com"
			}
		},
		{
			"name": "CommunityBank of Texas, N.A",
			"fid": "4716",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "5999 Delaware Street",
				"address2": "Beaumont, TX 77706",
				"address3": null,
				"city": "ORANGE",
				"state": "TX",
				"zip": "776300000",
				"country": "USA",
				"email": "obanking@communitybankoftx.com",
				"customerServicePhone": "(409) 861-7200",
				"technicalSupportPhone": "1-866-427-9306",
				"fax": null,
				"financialInstitutionName": "CommunityBank of Texas, N.A.",
				"siteURL": "http://www.communitybankoftx.com"
			}
		},
		{
			"name": "Compass Bank",
			"fid": "2201",
			"org": "Intelidata",
			"ofx": "https://www2.compassweb.com/ofxsecurity/ofx_security_server.dll",
			"profile": {
				"address1": "701 South 32nd Street",
				"address2": null,
				"address3": null,
				"city": "Birmingham",
				"state": "AL",
				"zip": "35233",
				"country": "USA",
				"email": "pcbk@compassbnk.com",
				"customerServicePhone": "1-800-273-1057",
				"technicalSupportPhone": "1-800-273-1057",
				"fax": "205-558-5397",
				"financialInstitutionName": "Compass Bank",
				"siteURL": "www.compassweb.com"
			}
		},
		{
			"name": "Compass Brokerage",
			"fid": "039",
			"org": "Compass",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "15 South 20th Street",
				"address2": "Suite 601",
				"address3": null,
				"city": "Birmingham",
				"state": "AL",
				"zip": "35233",
				"country": "USA",
				"email": "Jennifer.wilson@compassbank.com",
				"customerServicePhone": "800-239-1930",
				"technicalSupportPhone": "205-297-5636",
				"fax": "205-297-1728",
				"financialInstitutionName": "Compass Brokerage",
				"siteURL": "http://www.compassbank.com"
			}
		},
		{
			"name": "Congressional Federal Credit Union",
			"fid": "254074345",
			"org": "Users",
			"ofx": "https://onlinebanking.congressionalfcu.org/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Continental Bank",
			"fid": "1854",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "620 W Germantown Pike, STE 350",
				"address2": "Plymouth Meeting, PA 19462",
				"address3": null,
				"city": "PLYMOUTH MEETING",
				"state": "PA",
				"zip": "194620000",
				"country": "USA",
				"email": "support@thecontinentalbank.com",
				"customerServicePhone": "(800) 705-5500",
				"technicalSupportPhone": "800-705-5500",
				"fax": null,
				"financialInstitutionName": "Continental Bank",
				"siteURL": "http://www.thecontinentalbank.com"
			}
		},
		{
			"name": "Cooperative Bank (North Carolina)",
			"fid": "253171728",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "201 Market Street",
				"address2": null,
				"address3": null,
				"city": "Wilmington",
				"state": "NC",
				"zip": "28401",
				"country": "USA",
				"email": "EBANKER@COOP-BANK.NET",
				"customerServicePhone": "910-343-0181",
				"technicalSupportPhone": "910-343-0181",
				"fax": "910-251-3677",
				"financialInstitutionName": "Cooperative Bank",
				"siteURL": "www.coop-bank.com"
			}
		},
		{
			"name": "Cornerstone Community Bank - DC",
			"fid": "7204",
			"org": "fis-7204",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "6401 Lee Highway, Suite 119",
				"address2": null,
				"address3": null,
				"city": "Chattanooga",
				"state": "TN",
				"zip": "37421",
				"country": "USA",
				"email": "cscbank@billsupport.com",
				"customerServicePhone": "1-855-590-4763",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Cornerstone Community Bank",
				"siteURL": "www.cscbank.com"
			}
		},
		{
			"name": "Cornerstone National B&T Company",
			"fid": "071926155",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "One W. Northwest Highway",
				"address2": null,
				"address3": null,
				"city": "Palatine",
				"state": "IL",
				"zip": "60067",
				"country": "USA",
				"email": "dgaare@cornerstonenb.com",
				"customerServicePhone": "847-654-3038",
				"technicalSupportPhone": "847-654-3038",
				"fax": "847-654-3029",
				"financialInstitutionName": "Cornerstone National Bank",
				"siteURL": "www.cornerstonenb.com"
			}
		},
		{
			"name": "Country Club Bank",
			"fid": "5537",
			"org": "582",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "414 Nichols Road",
				"address2": null,
				"address3": null,
				"city": "Kansas City",
				"state": "MO",
				"zip": "64112",
				"country": "USA",
				"email": "contactus@countryclubbank.com",
				"customerServicePhone": "855-259-3192",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Country Club Bank PFM",
				"siteURL": "www.countryclubbank.com"
			}
		},
		{
			"name": "Countryside Federal Credit Union",
			"fid": "724",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "5720 Commons Park Drive",
				"address2": null,
				"address3": null,
				"city": "East Syracuse",
				"state": "NY",
				"zip": "13057",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 889-4531",
				"technicalSupportPhone": "(800) 889-4531",
				"fax": null,
				"financialInstitutionName": "Countryside Federal Credit Union",
				"siteURL": "http://www.countryside.org"
			}
		},
		{
			"name": "Coventry CU-DC WC",
			"fid": "211573326",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2006 Nooseneck Hill Road",
				"address2": null,
				"address3": null,
				"city": "Coventry",
				"state": "RI",
				"zip": "02816",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "401-822-8000",
				"technicalSupportPhone": "401-822-8000",
				"fax": null,
				"financialInstitutionName": "Coventry Credit Union",
				"siteURL": "www.coventrycu.org"
			}
		},
		{
			"name": "Credit Suisse Private Banking (USA) LLC",
			"fid": "001",
			"org": "Credit Suisse Securities USA LLC",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "ELEVEN MADISON AVENUE",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10010",
				"country": "USA",
				"email": "pb.clientview@credit-suisse.com",
				"customerServicePhone": "1-877-355-1818",
				"technicalSupportPhone": "877-355-1818",
				"fax": "212-743-3187",
				"financialInstitutionName": "Credit Suisse Securities USA LLC",
				"siteURL": "http://www.credit-suisse.com/pbclientview"
			}
		},
		{
			"name": "Credit Union 1",
			"fid": "1777",
			"org": "Credit Union 1",
			"ofx": "https://connect2.cu1.org/ofx/ofx.dll",
			"profile": {
				"address1": "3500 Eide Street",
				"address2": null,
				"address3": null,
				"city": "Anchorage",
				"state": "AK",
				"zip": "99503",
				"country": "USA",
				"email": "support@cu1.org",
				"customerServicePhone": "9073399485",
				"technicalSupportPhone": null,
				"fax": "9075616032",
				"financialInstitutionName": "Credit Union 1",
				"siteURL": "https://connect2.cu1.org"
			}
		},
		{
			"name": "Crest Savings Bank",
			"fid": "231271501",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3301 Pacific Ave.",
				"address2": null,
				"address3": null,
				"city": "Wildwood",
				"state": "NJ",
				"zip": "08260",
				"country": "USA",
				"email": "karen.magill@crestsavings.com",
				"customerServicePhone": "609-522-5091",
				"technicalSupportPhone": "609-522-5091",
				"fax": "609-522-7537",
				"financialInstitutionName": "Crest Savings Bank",
				"siteURL": "www.crestsavingsonline.com"
			}
		},
		{
			"name": "Crowell, Weedon & Co.",
			"fid": "7315",
			"org": "AFS",
			"ofx": "https://crowellofx.automatedfinancial.com",
			"profile": {
				"address1": "50 Broadway",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "AFS",
				"siteURL": null
			}
		},
		{
			"name": "Crystal Lake Bank & Trust",
			"fid": "5511",
			"org": "600",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "70 N. Williams Street",
				"address2": null,
				"address3": null,
				"city": "Crystal Lake",
				"state": "IL",
				"zip": "60014",
				"country": "USA",
				"email": "customer_service@crystallakebank.com",
				"customerServicePhone": "800-436-2922",
				"technicalSupportPhone": null,
				"fax": "815-479-5206",
				"financialInstitutionName": "CrystalLakeBankNTrust",
				"siteURL": "http://www.crystallakebank.com"
			}
		},
		{
			"name": "Customers Bank BB",
			"fid": "C031302971",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "99 Bridge Street",
				"address2": null,
				"address3": null,
				"city": "Phoenixville",
				"state": "PA",
				"zip": "19460",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "610-933-2000",
				"technicalSupportPhone": "610-933-2000",
				"fax": null,
				"financialInstitutionName": "Customers 1st Bank",
				"siteURL": "www.customersbankonline.com"
			}
		},
		{
			"name": "DATCU",
			"fid": "311980725",
			"org": "DATCU",
			"ofx": "https://online.datcu.coop/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "PO Box 827",
				"address2": null,
				"address3": null,
				"city": "Denton",
				"state": "TX",
				"zip": "76202",
				"country": "USA",
				"email": "ofx@datcu.org",
				"customerServicePhone": "1-866-387-8585",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "DATCU OFX",
				"siteURL": "http://www.datcu.org"
			}
		},
		{
			"name": "DCCU - DuPont Community CU - VA",
			"fid": "251483311",
			"org": "DUPONTCOMMCUVADC",
			"ofx": "https://ofx.mydccu.org/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "PO Box 1365",
				"address2": null,
				"address3": null,
				"city": "Waynesboro",
				"state": "VA",
				"zip": "22980",
				"country": "USA",
				"email": "dccu@mydccu.com",
				"customerServicePhone": "540-946-3200",
				"technicalSupportPhone": "540-946-3200",
				"fax": "540.946.3212",
				"financialInstitutionName": "DuPont Community Credit Union",
				"siteURL": "http://www.mydccu.com"
			}
		},
		{
			"name": "DWS Investments",
			"fid": "9427",
			"org": "DWS Scudder",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=718022003030417",
			"profile": {
				"address1": "P.O.Box 219151",
				"address2": null,
				"address3": null,
				"city": "Kansas City",
				"state": "MO",
				"zip": "64121",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "DWS Scudder Investments",
				"siteURL": null
			}
		},
		{
			"name": "Dade County Federal Credit Union",
			"fid": "10603",
			"org": "Dade County Federal Credit Union",
			"ofx": "https://mybranch.dcfcu.org/ofx/ofx.dll",
			"profile": {
				"address1": "1500 NW 107th Avenue",
				"address2": null,
				"address3": null,
				"city": "Miami",
				"state": "Fl",
				"zip": "33172",
				"country": "USA",
				"email": "memberservices.dcfcu.org",
				"customerServicePhone": "3054715080",
				"technicalSupportPhone": null,
				"fax": "3057189456",
				"financialInstitutionName": "Dade County Federal Credit Union",
				"siteURL": "https://dcfcu.org"
			}
		},
		{
			"name": "Damariscotta Bank & Trust Co",
			"fid": "5974",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "PO BOX 999",
				"address2": "Damariscotta ME 04543-0999",
				"address3": null,
				"city": "DAMARISCOTTA",
				"state": "ME",
				"zip": "045430999",
				"country": "USA",
				"email": "info@damariscottabank.com",
				"customerServicePhone": "(207) 563-8121",
				"technicalSupportPhone": "(207)563-8121",
				"fax": null,
				"financialInstitutionName": "Damariscotta Bank & Trust Co",
				"siteURL": "http://www.damariscottabank.com"
			}
		},
		{
			"name": "Deer Valley Credit Union",
			"fid": "10913",
			"org": "Deer Valley Credit Union",
			"ofx": "https://remotebanking.dvcu.org/ofx/ofx.dll",
			"profile": {
				"address1": "16215 N 28th Avenue",
				"address2": null,
				"address3": null,
				"city": "Phoenix",
				"state": "AZ",
				"zip": "85053",
				"country": "USA",
				"email": "info@dvcu.org",
				"customerServicePhone": "(602) 375-7300",
				"technicalSupportPhone": null,
				"fax": "(602) 375-7333",
				"financialInstitutionName": "Deer Valley Credit Union",
				"siteURL": "https://remotebanking.dvcu.org"
			}
		},
		{
			"name": "Del-One Federal Credit Union",
			"fid": "63UZA",
			"org": "Del-One Federal Credit Union",
			"ofx": "https://www.netit.financial-net.com/ofx/",
			"profile": {
				"address1": "270 BEISER BLVD",
				"address2": null,
				"address3": null,
				"city": "DOVER",
				"state": "DE",
				"zip": "19904",
				"country": "US",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "DEL-ONE FCU",
				"siteURL": "http://10.37.1.46:44300/del-one/cgi-bin/ebs"
			}
		},
		{
			"name": "Delta Community Credit Union",
			"fid": "3328",
			"org": "decu.org",
			"ofx": "https://appweb.deltacommunitycu.com/ofxroot/directtocore.asp",
			"profile": {
				"address1": "1025 Virgina Ave",
				"address2": null,
				"address3": null,
				"city": "Atlanta",
				"state": "GA",
				"zip": "30354",
				"country": "USA",
				"email": "itemp@decu.org",
				"customerServicePhone": "800 954 3060",
				"technicalSupportPhone": "800 954 3060",
				"fax": "800 954 3060",
				"financialInstitutionName": "DECU",
				"siteURL": "www.decu.org"
			}
		},
		{
			"name": "Department of Commerce FCU",
			"fid": "254074439",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "P.O. Box 14720",
				"address2": null,
				"address3": null,
				"city": "Washington",
				"state": "DC",
				"zip": "20044",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "202-482-5609",
				"technicalSupportPhone": "202-482-5609",
				"fax": null,
				"financialInstitutionName": "Department of Commerce FCU",
				"siteURL": "www.docfcu.org"
			}
		},
		{
			"name": "Desert Schools Federal CU",
			"fid": "1001",
			"org": "DSFCU",
			"ofx": "https://epal.desertschools.org/scripts/serverext.dll",
			"profile": {
				"address1": "P.O. Box 2945",
				"address2": null,
				"address3": null,
				"city": "Phoenix",
				"state": "AZ",
				"zip": "85062",
				"country": "USA",
				"email": "info@desertschools.org",
				"customerServicePhone": "800-456-9171",
				"technicalSupportPhone": "800-456-9171",
				"fax": "602-335-3186",
				"financialInstitutionName": "DSFCU",
				"siteURL": "http://www.desertschools.org"
			}
		},
		{
			"name": "Deutsche Bank Alex. Brown",
			"fid": "019",
			"org": "Deutsche Bank Securities, Inc.",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "1 South Street",
				"address2": "24th Floor",
				"address3": null,
				"city": "Baltimore",
				"state": "MD",
				"zip": "21202",
				"country": "USA",
				"email": "dbccc@db.com",
				"customerServicePhone": "800-776-7564",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "Deutsche Bank Securities, Inc.",
				"siteURL": "http://www.alexbrown.db.com"
			}
		},
		{
			"name": "Diamond Credit Union -New",
			"fid": "15058",
			"org": "Diamond Credit Union -New",
			"ofx": "https://mobile.diamondcu.com/ofx/ofxserver.aspx",
			"profile": {
				"address1": "1600 Medical Dr",
				"address2": null,
				"address3": null,
				"city": "Pottstown",
				"state": "PA",
				"zip": "19464",
				"country": "USA",
				"email": "askdiamond@diamondcu.com",
				"customerServicePhone": "610-326-5490",
				"technicalSupportPhone": "610-326-5490",
				"fax": null,
				"financialInstitutionName": "Diamond Credit Union -New",
				"siteURL": "https://diamondcu.org"
			}
		},
		{
			"name": "Discover Bank",
			"fid": "12610",
			"org": "Discover Bank",
			"ofx": "https://ofx.discovercard.com",
			"profile": {
				"address1": "2500 Lake Cook Road",
				"address2": null,
				"address3": null,
				"city": "Riverwoods",
				"state": "IL",
				"zip": "60015",
				"country": "USA",
				"email": "websupport@discoverbank.com",
				"customerServicePhone": "1-800-DISCOVER",
				"technicalSupportPhone": "1-800-DISCOVER",
				"fax": null,
				"financialInstitutionName": "Discover Bank",
				"siteURL": "http://www.discoverbank.com"
			}
		},
		{
			"name": "Discover Card",
			"fid": "7101",
			"org": "Discover Financial Services",
			"ofx": "https://ofx.discovercard.com/",
			"profile": {
				"address1": "2500 Lake Cook Road",
				"address2": null,
				"address3": null,
				"city": "Riverwoods",
				"state": "IL",
				"zip": "60015",
				"country": "USA",
				"email": "websupport@discovercard.com",
				"customerServicePhone": "1-800-DISCOVER",
				"technicalSupportPhone": "1-800-DISCOVER",
				"fax": null,
				"financialInstitutionName": "Discover Financial Services",
				"siteURL": "http://www.discovercard.com"
			}
		},
		{
			"name": "Dubuque Bank and Trust",
			"fid": "073900535",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1398 Central Avenue",
				"address2": null,
				"address3": null,
				"city": "Dubuque",
				"state": "IA",
				"zip": "52001",
				"country": "USA",
				"email": "onlinebanking-DBT@dubuquebank.co",
				"customerServicePhone": "563-584-2563",
				"technicalSupportPhone": "563-584-2563",
				"fax": "563-589-2009",
				"financialInstitutionName": "Dubuque Bank and Trust",
				"siteURL": "http://www.dubuquebank.com"
			}
		},
		{
			"name": "E*TRADE Financial",
			"fid": "1",
			"org": "mdnc",
			"ofx": "https://ofx.etrade.com/cgi-ofx/etradeofx",
			"profile": {
				"address1": "4500 Bohannon Drive",
				"address2": null,
				"address3": null,
				"city": "Menlo Park",
				"state": "CA",
				"zip": "94025",
				"country": "USA",
				"email": "service@etrade.com",
				"customerServicePhone": "1-800-786-2575",
				"technicalSupportPhone": "1-800-786-2575",
				"fax": "1-650-842-8675",
				"financialInstitutionName": "E*TRADE Financial",
				"siteURL": "http://www.etrade.com"
			}
		},
		{
			"name": "EAB",
			"fid": "6505",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06505.ofx",
			"profile": {
				"address1": "Electronic Banking Dept 2839",
				"address2": "1 EAB Plaze",
				"address3": null,
				"city": "Uniondale",
				"state": "NY",
				"zip": "11555",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "EAB",
				"siteURL": "http://www.eab.com/"
			}
		},
		{
			"name": "EDTECH Fed. CU",
			"fid": "2023",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1555 Harrison Ave",
				"address2": null,
				"address3": null,
				"city": "Butte",
				"state": "MT",
				"zip": "59701",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "EDTECH Federal Credit Union",
				"siteURL": "http://www.edtech-fcu.com/"
			}
		},
		{
			"name": "EECU-Fresno",
			"fid": "321172594",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2222 W Shaw Ave",
				"address2": null,
				"address3": null,
				"city": "Fresno",
				"state": "CA",
				"zip": "93711",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "559-437-7700",
				"technicalSupportPhone": "559-437-7700",
				"fax": null,
				"financialInstitutionName": "Educational Employees CU",
				"siteURL": "www.myeecu.org"
			}
		},
		{
			"name": "EH National Bank - OFX",
			"fid": "122243871",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "9701 Wilshire Blvd",
				"address2": null,
				"address3": null,
				"city": "Beverly Hills",
				"state": "CA",
				"zip": "90212",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "310-362-2000",
				"technicalSupportPhone": "310-362-2000",
				"fax": null,
				"financialInstitutionName": "Excel National Bank",
				"siteURL": "www.bankexcel.com"
			}
		},
		{
			"name": "EagleBank - Personal",
			"fid": "5336",
			"org": "975",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "7815 Woodmont Ave",
				"address2": null,
				"address3": null,
				"city": "Bethesda",
				"state": "MD",
				"zip": "20814",
				"country": "USA",
				"email": "onlinebanking@eaglebankcorp.com",
				"customerServicePhone": "301-628-4708",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "EagleBank PFM",
				"siteURL": "www.eaglebankcorp.com"
			}
		},
		{
			"name": "East West Bank",
			"fid": "322070381",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "415 Huntington Drive",
				"address2": null,
				"address3": null,
				"city": "Alhambra",
				"state": "CA",
				"zip": "91108",
				"country": "USA",
				"email": "hbinfo@eastwestbank.com",
				"customerServicePhone": "888-895-5650",
				"technicalSupportPhone": "888-895-5650",
				"fax": "(626) 308-4726",
				"financialInstitutionName": "East West Bank",
				"siteURL": "www.eastwestbank.com"
			}
		},
		{
			"name": "Eastern Bank",
			"fid": "6201",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06201.ofx",
			"profile": {
				"address1": "Mail Code OP16",
				"address2": "PO Box 391",
				"address3": null,
				"city": "Lynn",
				"state": "MA",
				"zip": "019039968",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Eastern Bank",
				"siteURL": "http://www.easternbank.com"
			}
		},
		{
			"name": "Eastern Federal Bank",
			"fid": "1168",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "257 Main Street",
				"address2": null,
				"address3": null,
				"city": "Norwich",
				"state": "CT",
				"zip": "06360",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "866-628-1686",
				"technicalSupportPhone": "866-628-1686",
				"fax": null,
				"financialInstitutionName": "Eastern Savings Bank",
				"siteURL": "https://www.eastern-savings.com/"
			}
		},
		{
			"name": "Eastern Federal Bank - Business",
			"fid": "1295",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "257 Main Street",
				"address2": null,
				"address3": null,
				"city": "Norwich",
				"state": "CT",
				"zip": "06360",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "800-787-6596",
				"technicalSupportPhone": "800-787-6596",
				"fax": null,
				"financialInstitutionName": "Eastern Savings Bank",
				"siteURL": "http://www.eastern-savings.com"
			}
		},
		{
			"name": "Easthampton Savings Bank Retail",
			"fid": "1084",
			"org": "esb.com",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "36 Main Street",
				"address2": null,
				"address3": null,
				"city": "Easthampton",
				"state": "MA",
				"zip": "01027",
				"country": "USA",
				"email": "test@bankesb.com",
				"customerServicePhone": "1-855-527-4111",
				"technicalSupportPhone": "1-855-527-4111",
				"fax": "1-413-529-2072",
				"financialInstitutionName": "Easthampton Savings Bank",
				"siteURL": "https://www.bankesb.com/"
			}
		},
		{
			"name": "Eastman Credit Union",
			"fid": "264279350",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "201 S. Wilcox Drive",
				"address2": "PO Box 1989",
				"address3": null,
				"city": "Kingsport",
				"state": "TN",
				"zip": "37662",
				"country": "USA",
				"email": "ecenter@ecu.org",
				"customerServicePhone": "800-999-2328",
				"technicalSupportPhone": "800-999-2328",
				"fax": null,
				"financialInstitutionName": "Eastman Credit Union",
				"siteURL": "www.eastmancu.org"
			}
		},
		{
			"name": "Educational Systems FCU",
			"fid": "255077008",
			"org": "Users, Inc.",
			"ofx": "https://onlinebanking.esfcu.org/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Edvest College Savings Plan",
			"fid": "14038",
			"org": "tiaawisconsin",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=6190800002208",
			"profile": {
				"address1": "PO Box 55189",
				"address2": null,
				"address3": null,
				"city": "BOSTON",
				"state": "MA",
				"zip": "02205-1589",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Edvest College Savings Plan",
				"siteURL": null
			}
		},
		{
			"name": "Edward Jones",
			"fid": "823",
			"org": "Edward Jones",
			"ofx": "https://ofx.edwardjones.com",
			"profile": {
				"address1": "12555 Manchester Road",
				"address2": null,
				"address3": null,
				"city": "Saint Louis",
				"state": "MO",
				"zip": "63131",
				"country": "USA",
				"email": "accountaccess@edwardjones.com",
				"customerServicePhone": "800.441.0503",
				"technicalSupportPhone": "800.441.0503",
				"fax": null,
				"financialInstitutionName": "Edward Jones",
				"siteURL": "https://www.edwardjones.com"
			}
		},
		{
			"name": "Edwards Federal Credit Union",
			"fid": "322270770",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "10SouthMuroc",
				"address2": null,
				"address3": null,
				"city": "Edwards",
				"state": "CA",
				"zip": "93524",
				"country": "USA",
				"email": "ememberservice@edwardsfcu.org",
				"customerServicePhone": "661-952-5945",
				"technicalSupportPhone": "661-952-5945",
				"fax": "661-258-7244",
				"financialInstitutionName": "EdwardsFederalCreditUnion",
				"siteURL": "www.edwardsfcu.org"
			}
		},
		{
			"name": "El Paso Area Teachers Credit Union",
			"fid": "1409",
			"org": "Elpaso OLB",
			"ofx": "https://mobile.tfcu.coop/OFX/OFXServer.aspx",
			"profile": {
				"address1": "12020 Rojas Drive",
				"address2": null,
				"address3": null,
				"city": "El Paso",
				"state": "TX",
				"zip": "79936",
				"country": "USA",
				"email": "cumail@tfcu.coop",
				"customerServicePhone": "915-843-8328",
				"technicalSupportPhone": "915-843-8328",
				"fax": "915-843-8328",
				"financialInstitutionName": "EL PASO AREA TEACHERS",
				"siteURL": "http://www.tfcu.coop/"
			}
		},
		{
			"name": "Elevations Credit Union IB WC-DC",
			"fid": "307074580",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "Po Box 9004",
				"address2": null,
				"address3": null,
				"city": "Boulder",
				"state": "CO",
				"zip": "80301",
				"country": "USA",
				"email": "ecuservice@elevationscu.com",
				"customerServicePhone": "303-443-4672",
				"technicalSupportPhone": "303-443-4672",
				"fax": "303.441.2961",
				"financialInstitutionName": "Elevations Credit Union",
				"siteURL": "www.elevationscu.com"
			}
		},
		{
			"name": "Embark Credit Union",
			"fid": "2016",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "P.O. Box 2649",
				"address2": null,
				"address3": null,
				"city": "Great Falls",
				"state": "MT",
				"zip": "59403",
				"country": "USA",
				"email": "donna@gfteachersfcu.com",
				"customerServicePhone": "800-779-0467",
				"technicalSupportPhone": "800-779-0467",
				"fax": null,
				"financialInstitutionName": "Embark Credit Union",
				"siteURL": "https://www.embarkcu.com"
			}
		},
		{
			"name": "Empire Bank - Business",
			"fid": "761",
			"org": "086518477",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1800 South Glenstone",
				"address2": null,
				"address3": null,
				"city": "Springfield",
				"state": "MO",
				"zip": "65804",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-3856",
				"technicalSupportPhone": "866-777-3856",
				"fax": null,
				"financialInstitutionName": "Empire Bank - Business",
				"siteURL": "http://www.empirebank.com/"
			}
		},
		{
			"name": "Empire Bank - Personal",
			"fid": "161",
			"org": "086518477",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1800 South Glenstone",
				"address2": null,
				"address3": null,
				"city": "Springfield",
				"state": "MO",
				"zip": "65804",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-750-1503",
				"technicalSupportPhone": "800-750-1503",
				"fax": null,
				"financialInstitutionName": "Empire Bank - Personal",
				"siteURL": "http://www.empirebank.com/"
			}
		},
		{
			"name": "Empire NB IB",
			"fid": "021414426",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1707 Veterans Highway",
				"address2": null,
				"address3": null,
				"city": "Islandia",
				"state": "NY",
				"zip": "11749",
				"country": "USA",
				"email": "2",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Empire National Bank",
				"siteURL": "www.empirenbonline.com"
			}
		},
		{
			"name": "Energy Credit Union",
			"fid": "1815",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "156 Spring St.",
				"address2": null,
				"address3": null,
				"city": "West Roxbury",
				"state": "MA",
				"zip": "02132",
				"country": "USA",
				"email": "mariep@energycreditunion.org",
				"customerServicePhone": "877-303-9668",
				"technicalSupportPhone": "877-303-9668",
				"fax": null,
				"financialInstitutionName": "Energy Credit Union",
				"siteURL": "http://www.energycreditunion.org"
			}
		},
		{
			"name": "Enterprise Bank NA",
			"fid": "104000469",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "12800 W Center Rd",
				"address2": null,
				"address3": null,
				"city": "Omaha",
				"state": "NE",
				"zip": "68144",
				"country": "USA",
				"email": "enterprisebank@enterprisebk.com",
				"customerServicePhone": "402-330-0200",
				"technicalSupportPhone": "402-330-0200",
				"fax": "402-330-9227",
				"financialInstitutionName": "Enterprise Bank NA",
				"siteURL": "www.enterpriseebank.com"
			}
		},
		{
			"name": "Equitable Co-operative Bank",
			"fid": "898",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "87 Oxford Street",
				"address2": null,
				"address3": null,
				"city": "Lynn",
				"state": "MA",
				"zip": "01901",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 441-2811",
				"technicalSupportPhone": "(877) 441-2811",
				"fax": null,
				"financialInstitutionName": "Equitable Co-operative Bank",
				"siteURL": "http://www.equitablebank.com"
			}
		},
		{
			"name": "Essex Financial Services, Inc.",
			"fid": "049",
			"org": "Essex Financial Services, Inc.",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "176 Westbrook Road",
				"address2": "P.O. Box 999",
				"address3": null,
				"city": "Essex",
				"state": "CT",
				"zip": "06426",
				"country": "USA",
				"email": "m.orourke@essexfinancialservices.com",
				"customerServicePhone": "860-767-4300 ext. 170",
				"technicalSupportPhone": "860-767-4300 ext. 170",
				"fax": "860-767-4310",
				"financialInstitutionName": "Essex Financial Services, Inc.",
				"siteURL": "http://www.essexfinancialservices.com"
			}
		},
		{
			"name": "Essex Savings Bank",
			"fid": "1008",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "P. O Box 950",
				"address2": "35 Plains Road",
				"address3": null,
				"city": "Essex",
				"state": "CT",
				"zip": "06426",
				"country": "USA",
				"email": "essexsavings@essexsavings.com",
				"customerServicePhone": "877-377-3922",
				"technicalSupportPhone": "877-377-3922",
				"fax": "860-767-4901",
				"financialInstitutionName": "Essex Savings Bank",
				"siteURL": "https://www.essexsavings.com"
			}
		},
		{
			"name": "Everett Co-op Bank - Business",
			"fid": "878",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "419 Broadway",
				"address2": null,
				"address3": null,
				"city": "Everett",
				"state": "MA",
				"zip": "02149",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "800-647-8765",
				"technicalSupportPhone": "800-647-8765",
				"fax": null,
				"financialInstitutionName": "Everett Co-op Bank - Business",
				"siteURL": "http://www.everettbank.com"
			}
		},
		{
			"name": "Everett Co-operative Bank",
			"fid": "877",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "419 Broadway",
				"address2": null,
				"address3": null,
				"city": "Everett",
				"state": "MA",
				"zip": "02149",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "800-647-8590",
				"technicalSupportPhone": "800-647-8590",
				"fax": null,
				"financialInstitutionName": "Everett Co-operative Bank",
				"siteURL": "http://www.everettbank.com"
			}
		},
		{
			"name": "Exchange Bank - Santa Rosa, CA",
			"fid": "121101985",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "440 Aviation Blvd",
				"address2": null,
				"address3": null,
				"city": "Santa Rosa",
				"state": "CA",
				"zip": "95403",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "707-524-3000",
				"technicalSupportPhone": "707-524-3000",
				"fax": null,
				"financialInstitutionName": "Exchange Bank",
				"siteURL": "www.exchangebnkonline.com"
			}
		},
		{
			"name": "FAA Credit Union",
			"fid": "114",
			"org": "FAA Credit Union",
			"ofx": "https://flightline.faaecu.org/ofx/ofx.dll",
			"profile": {
				"address1": "P.O. Box 26406",
				"address2": null,
				"address3": null,
				"city": "Oklahoma City",
				"state": "OK",
				"zip": "73126",
				"country": "USA",
				"email": "info@faaecu.org",
				"customerServicePhone": "405-682-1990",
				"technicalSupportPhone": null,
				"fax": "405-703-2570",
				"financialInstitutionName": "FAA Credit Union",
				"siteURL": "https://flightline.faaecu.org"
			}
		},
		{
			"name": "FAA Credit Union -New",
			"fid": "58956",
			"org": "FAA Credit Union -New",
			"ofx": "https://mb.faaecu.org/OFX/OFXServer.aspx",
			"profile": {
				"address1": "10201 S. Western Ave",
				"address2": null,
				"address3": null,
				"city": "Oklahoma City",
				"state": "OK",
				"zip": "73139",
				"country": "USA",
				"email": "info@faaecu.org",
				"customerServicePhone": "405-682-1990",
				"technicalSupportPhone": "405-682-1990",
				"fax": "4057032579",
				"financialInstitutionName": "FAA Credit Union",
				"siteURL": "https://www.faaecu.org"
			}
		},
		{
			"name": "Fairfield County Bank Connect24",
			"fid": "51948",
			"org": "FCBank",
			"ofx": "https://ofx.onlinencr.com/scripts/serverext.dll",
			"profile": {
				"address1": "150 Danbury Road",
				"address2": null,
				"address3": null,
				"city": "Ridgefield",
				"state": "CT",
				"zip": "06877",
				"country": "USA",
				"email": "connect24support@fcbankcorp.com",
				"customerServicePhone": "203-431-7431",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Fairfield County Bank",
				"siteURL": "https://www.fairfieldcountybank.com"
			}
		},
		{
			"name": "Fairfield S&L Assoc of Lancaster",
			"fid": "690",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "111 E. Main St.",
				"address2": null,
				"address3": null,
				"city": "Lancaster",
				"state": "OH",
				"zip": "43130",
				"country": "USA",
				"email": "Baughman@fairfieldfederal.com",
				"customerServicePhone": "866-737-6733",
				"technicalSupportPhone": "866-737-6733",
				"fax": null,
				"financialInstitutionName": "Fairfield Federal Savings & Loan",
				"siteURL": "http://www.fairfieldfederal.com"
			}
		},
		{
			"name": "Farmers & Merchants Bank - Direct",
			"fid": "075910921",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "123 W Huron St",
				"address2": null,
				"address3": null,
				"city": "Berlin",
				"state": "WI",
				"zip": "54923",
				"country": "USA",
				"email": "OnlineSupport@fmberlin.com",
				"customerServicePhone": "(920)361-5005",
				"technicalSupportPhone": "(920)361-5005",
				"fax": "(920)361-0500",
				"financialInstitutionName": "Farmers & Merchant Bank Berlin",
				"siteURL": "www.fmberlin.com"
			}
		},
		{
			"name": "Farmers Insurance Group FCU",
			"fid": "10465",
			"org": "FIGFCU",
			"ofx": "https://pctied.figfcu.org/OFX/OFX.dll",
			"profile": {
				"address1": "4680 Wilshire Blvd.",
				"address2": "P.O. Box 36911",
				"address3": null,
				"city": "Los Angeles",
				"state": "CA",
				"zip": "90036-0911",
				"country": "USA",
				"email": "QuickenEnquiries@figfcu.com",
				"customerServicePhone": "800-877-2345",
				"technicalSupportPhone": null,
				"fax": "323-930-3467",
				"financialInstitutionName": "Farmers Insurance Credit Union",
				"siteURL": "http://www.figfcu.com"
			}
		},
		{
			"name": "Farmers and Miners Bank - Virginia",
			"fid": "2080",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "41526 West Morgan Avenue",
				"address2": null,
				"address3": null,
				"city": "Pennington Gap,",
				"state": "VA",
				"zip": "24277",
				"country": "USA",
				"email": "Robert@farmersandminersbank.com",
				"customerServicePhone": "877-632-9220",
				"technicalSupportPhone": "877-632-9220",
				"fax": null,
				"financialInstitutionName": "Farmers and Miners Bank",
				"siteURL": "https://www.farmersandminersbank.com"
			}
		},
		{
			"name": "FedChoice FCU",
			"fid": "254074785",
			"org": "FEDCHOICE",
			"ofx": "https://mb.fedchoice.org/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "10001 Willowdale Rd.",
				"address2": null,
				"address3": null,
				"city": "Lanham",
				"state": "MD",
				"zip": "20706",
				"country": "USA",
				"email": "financialadvisorycenter@fedchoice.org",
				"customerServicePhone": "301 699 6151",
				"technicalSupportPhone": "301 699 6900",
				"fax": null,
				"financialInstitutionName": "FedChoice FCU Q",
				"siteURL": "www.fedchoice.org"
			}
		},
		{
			"name": "Fergus Federal CU",
			"fid": "2015",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "8615 W Frazier Ln,",
				"address2": null,
				"address3": null,
				"city": "Wichita,",
				"state": "KS",
				"zip": "67212",
				"country": "USA",
				"email": null,
				"customerServicePhone": "800-783-8485",
				"technicalSupportPhone": "800-783-8485",
				"fax": null,
				"financialInstitutionName": "Fergus Federal Credit Union",
				"siteURL": "http://ferguscountyfcu.com/"
			}
		},
		{
			"name": "Fidelity Bank - MA",
			"fid": "211370707",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "9 Leominster Connector",
				"address2": null,
				"address3": null,
				"city": "Leominster",
				"state": "MA",
				"zip": "01453",
				"country": "USA",
				"email": "info@fidelitybankonline.com",
				"customerServicePhone": "1-800-581-5363",
				"technicalSupportPhone": "1-800-581-5363",
				"fax": null,
				"financialInstitutionName": "Fidelity Bank",
				"siteURL": "www.fidelitybankonline.com"
			}
		},
		{
			"name": "Fidelity Bank Wichita Direct",
			"fid": "4225",
			"org": "di-4225",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "100 East English St",
				"address2": null,
				"address3": null,
				"city": "Wichita",
				"state": "KS",
				"zip": "67202",
				"country": "USA",
				"email": "onlinebanking@fidelitybank.com",
				"customerServicePhone": "800-658-1637",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Fidelity Bank",
				"siteURL": "http://www.fidelitybank.com/"
			}
		},
		{
			"name": "Fidelity Bank, MI",
			"fid": "11114",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "22290 MICHIGAN AVE",
				"address2": "DEARBORN  MI  48124",
				"address3": null,
				"city": "COLUMBUS",
				"state": "OH",
				"zip": "432190000",
				"country": "USA",
				"email": "support@fidbank.com",
				"customerServicePhone": "(313) 274-1000",
				"technicalSupportPhone": "(313)274-1000",
				"fax": null,
				"financialInstitutionName": "FIDELITY BANK--Deconverted",
				"siteURL": "http://www.fidbank.com"
			}
		},
		{
			"name": "Fidelity Investments",
			"fid": "7776",
			"org": "fidelity.com",
			"ofx": "https://ofx.fidelity.com/ftgw/OFX/clients/download",
			"profile": {
				"address1": "Fidelity Brokerage Services, Inc",
				"address2": "82 Devonshire Street",
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "2109",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-800-544-7931",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Fidelity Distributors Corp.",
				"siteURL": "http://www.fidelity.com"
			}
		},
		{
			"name": "Fidelity NetBenefits",
			"fid": "8288",
			"org": "nbofx.fidelity.com",
			"ofx": "https://nbofx.fidelity.com/netbenefits/ofx/download",
			"profile": {
				"address1": "Fidelity Investments",
				"address2": "P.O. Box 55017",
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02205",
				"country": "USA",
				"email": null,
				"customerServicePhone": "800-581-5800",
				"technicalSupportPhone": "800-581-5800",
				"fax": null,
				"financialInstitutionName": "Fidelity NetBenefits",
				"siteURL": "http://www.401k.com"
			}
		},
		{
			"name": "Fieldpoint Private",
			"fid": "021172784",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "100 Field Point Road",
				"address2": null,
				"address3": null,
				"city": "Greenwich",
				"state": "CT",
				"zip": "06830",
				"country": "US",
				"email": "2",
				"customerServicePhone": "(203)413-9300",
				"technicalSupportPhone": "(203)413-9300",
				"fax": "(203)413-9396",
				"financialInstitutionName": "Fieldpoint Private Bank & Trust",
				"siteURL": "www.fieldpointbanking.com"
			}
		},
		{
			"name": "Fifth Third Bank - NEW",
			"fid": "5829",
			"org": "Fifth Third Bank",
			"ofx": "https://banking.53.com/ofx/OFXServlet",
			"profile": {
				"address1": "Madisonville Operations Center",
				"address2": "MD 1MOC3A",
				"address3": null,
				"city": "Cincinnati",
				"state": "OH",
				"zip": "45263",
				"country": "USA",
				"email": "53_GeneralInquiries@53.com",
				"customerServicePhone": "800-972-3030",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "53bank",
				"siteURL": "http://www.53.com/"
			}
		},
		{
			"name": "Fifth Third Investment and Trust",
			"fid": "13774",
			"org": "Fifth Third Bank",
			"ofx": "https://trust-ofx.53.com/eftxweb/access.ofx",
			"profile": {
				"address1": "Madisonville Operations Center",
				"address2": "MD 1MOC3A",
				"address3": null,
				"city": "Cincinnati",
				"state": "OH",
				"zip": "45263",
				"country": "USA",
				"email": "53_GeneralInquiries@53.com",
				"customerServicePhone": "800-972-3030",
				"technicalSupportPhone": "800-972-3030",
				"fax": "800-972-3030",
				"financialInstitutionName": "Fifth Third Bank",
				"siteURL": "http://www.53.com/"
			}
		},
		{
			"name": "Finance Center FCU",
			"fid": "274073876",
			"org": "Finance Center FCU",
			"ofx": "https://sec.fcfcu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Financial Network Investment Corp",
			"fid": "057",
			"org": "ING Advisors Network",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "200 North Sepulveda Blvd",
				"address2": "STE 1300",
				"address3": null,
				"city": "El Segundo",
				"state": "CA",
				"zip": "90245-5672",
				"country": "USA",
				"email": "Gary.burkard@us.ing.com",
				"customerServicePhone": "310-326-3100",
				"technicalSupportPhone": "310-326-3100",
				"fax": "310-784-1186",
				"financialInstitutionName": "Cetera Advisor Networks LLC",
				"siteURL": "-"
			}
		},
		{
			"name": "FineMark National Bank & Trust",
			"fid": "5516",
			"org": "829",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "12995 S. Cleveland Ave Ste 145",
				"address2": null,
				"address3": null,
				"city": "Ft. Myers",
				"state": "FL",
				"zip": "33907",
				"country": "USA",
				"email": "clientservice@finemarkbank.com",
				"customerServicePhone": "877-461-5901",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "FinemarkNationalBNTPFM",
				"siteURL": "www.finemarkbank.com"
			}
		},
		{
			"name": "First American Bank-OK",
			"fid": "20070",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "570 24th Ave NW",
				"address2": "Norman, OK 73069",
				"address3": null,
				"city": "NORMAN",
				"state": "OK",
				"zip": "730690000",
				"country": "USA",
				"email": "customerservice@bankfab.com",
				"customerServicePhone": "405-579-7000",
				"technicalSupportPhone": "405.579.7000",
				"fax": null,
				"financialInstitutionName": "First American Bank",
				"siteURL": "http://www.bankfab.com/"
			}
		},
		{
			"name": "First American State Bank",
			"fid": "1764",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "8390 EAST CRESCENT PARKWAY",
				"address2": "GREENWOOD VILLAGE, CO  80111",
				"address3": null,
				"city": "GREENWOOD VILLAGE",
				"state": "CO",
				"zip": "801110000",
				"country": "USA",
				"email": "info@fasbank.com",
				"customerServicePhone": "(303) 694-6464",
				"technicalSupportPhone": "(303)694-6464",
				"fax": null,
				"financialInstitutionName": "First American State Bank",
				"siteURL": "http://www.fasbank.com"
			}
		},
		{
			"name": "First Arkansas Bank & Trust",
			"fid": "1581",
			"org": "olb-s8i",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "600 West Main Street",
				"address2": null,
				"address3": null,
				"city": "Jacksonville",
				"state": "AR",
				"zip": "72076",
				"country": "USA",
				"email": "accountservices@firstarkansasbank.com",
				"customerServicePhone": "1-501-982-4511",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "First Arkansas Bank and Trust",
				"siteURL": "https://www.firstarkansasbank.com/index.html"
			}
		},
		{
			"name": "First Citizens",
			"fid": "1849",
			"org": "First Citizens",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01849.ofx",
			"profile": {
				"address1": "P.O. Box 29",
				"address2": null,
				"address3": null,
				"city": "Columbia",
				"state": "SC",
				"zip": "29202",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "First Citizens South Carolina",
				"siteURL": "www.firstcitizensonline.com"
			}
		},
		{
			"name": "First Citizens Bank, NC, VA, WV",
			"fid": "5013",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/05013.ofx",
			"profile": {
				"address1": "100 E. Tyron",
				"address2": null,
				"address3": null,
				"city": "Raleigh",
				"state": "NC",
				"zip": "27603",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "First Citizens Bank No. Carolina",
				"siteURL": "http://www.firstcitizens.com/"
			}
		},
		{
			"name": "First Command Bank",
			"fid": "2088",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1 Firstcomm Plaza",
				"address2": null,
				"address3": null,
				"city": "Ft. Worth",
				"state": "TX",
				"zip": "76109",
				"country": "USA",
				"email": "fcbcustcare@firstcommandbank.com",
				"customerServicePhone": "888-763-7600",
				"technicalSupportPhone": "888-763-7600",
				"fax": null,
				"financialInstitutionName": "First Command Bank",
				"siteURL": "http://www.firstcommandbank.com"
			}
		},
		{
			"name": "First Command Financial Planning",
			"fid": "064",
			"org": "First Command Financial Planning",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "1 FirstComm Plaza",
				"address2": null,
				"address3": null,
				"city": "Fort Worth",
				"state": "Texas",
				"zip": "76135",
				"country": "USA",
				"email": "clientservices@firstcommand.com",
				"customerServicePhone": "800-443-2104",
				"technicalSupportPhone": "800-443-2104",
				"fax": "-",
				"financialInstitutionName": "First Command Financial Planning",
				"siteURL": "http://www.firstcommand.com"
			}
		},
		{
			"name": "First Commonwealth Bank - PA",
			"fid": "12160",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "601 Philadelphia Street",
				"address2": "Indiana PA 15701",
				"address3": null,
				"city": "INDIANA",
				"state": "PA",
				"zip": "157010400",
				"country": "USA",
				"email": "cbc@fcbanking.com",
				"customerServicePhone": "(800) 711-2265",
				"technicalSupportPhone": "1-800-711-BANK",
				"fax": null,
				"financialInstitutionName": "FCB",
				"siteURL": "http://www.fcbanking.com/"
			}
		},
		{
			"name": "First Community Credit Union",
			"fid": "281081877",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "17151 Chesterfield Airport Road",
				"address2": null,
				"address3": null,
				"city": "Chesterfield",
				"state": "MO",
				"zip": "63005",
				"country": "US",
				"email": "support@firstcommunity.com",
				"customerServicePhone": "800-767-8880 x1372",
				"technicalSupportPhone": "800-767-8880 x1372",
				"fax": "636-256-9088",
				"financialInstitutionName": "First Community Credit Union",
				"siteURL": "www.firstcommunity.com"
			}
		},
		{
			"name": "First County Bank - CT",
			"fid": "63",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "117 Prospect Street",
				"address2": null,
				"address3": null,
				"city": "Stamford",
				"state": "CT",
				"zip": "06901",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "203-462-4400",
				"technicalSupportPhone": "203-462-4400",
				"fax": null,
				"financialInstitutionName": "First County Bank - CT",
				"siteURL": "http://www.firstcounty.com"
			}
		},
		{
			"name": "First Federal S & L of Delta",
			"fid": "241270903",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "404 Main Street",
				"address2": null,
				"address3": null,
				"city": "Delta",
				"state": "OH",
				"zip": "43515",
				"country": "USA",
				"email": "ibankapps@firstfeddelta.com",
				"customerServicePhone": "419-822-3131",
				"technicalSupportPhone": "419-822-3131",
				"fax": "419-822-5691",
				"financialInstitutionName": "First Federal S & L of Delta",
				"siteURL": "http://www.firstfeddelta.com"
			}
		},
		{
			"name": "First Independent Bank (Reno, NV)",
			"fid": "C121202062",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2700 W Sahara Ave",
				"address2": null,
				"address3": null,
				"city": "Las Vegas",
				"state": "NV",
				"zip": "89102",
				"country": "USA",
				"email": "CS@bankofnevada.com",
				"customerServicePhone": "702-248-4200",
				"technicalSupportPhone": "702-248-4200",
				"fax": "null",
				"financialInstitutionName": "First Indep. Bank of Nevada",
				"siteURL": null
			}
		},
		{
			"name": "First Internet Bank of Indiana",
			"fid": "074014187",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "7820 Innovation Boulevard",
				"address2": "Suite 210",
				"address3": null,
				"city": "Indianapolis",
				"state": "IN",
				"zip": "46278",
				"country": "USA",
				"email": "newaccounts@firstib.com",
				"customerServicePhone": "(888) 873-3424",
				"technicalSupportPhone": "(888) 873-3424",
				"fax": "(888) 644-8678",
				"financialInstitutionName": "First Internet Bank of Indiana",
				"siteURL": "www.firstib.com"
			}
		},
		{
			"name": "First Interstate Bank",
			"fid": "092901683",
			"org": "FIB",
			"ofx": "https://ofx.firstinterstatebank.com/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "401 North 31st Street",
				"address2": null,
				"address3": null,
				"city": "Billings",
				"state": "MT",
				"zip": "59116",
				"country": "USA",
				"email": "pcbank@fib.com",
				"customerServicePhone": "888-752-3332",
				"technicalSupportPhone": "888-752-3332",
				"fax": null,
				"financialInstitutionName": "First Interstate Bank",
				"siteURL": "www.FirstInterstateBank.com"
			}
		},
		{
			"name": "First National Bank Ames-Ankeny",
			"fid": "073902274",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "405 5th Street",
				"address2": null,
				"address3": null,
				"city": "Ames",
				"state": "IA",
				"zip": "50010",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "515-232-5561",
				"technicalSupportPhone": "515-232-5561",
				"fax": null,
				"financialInstitutionName": "First Natl Bank-Ames Natl Corp",
				"siteURL": "www.fnbames.com"
			}
		},
		{
			"name": "First National Bank of Central Tx",
			"fid": "7373",
			"org": "mfis-7373",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "1835 N. Valley Mills Dr.",
				"address2": null,
				"address3": null,
				"city": "Waco",
				"state": "TX",
				"zip": "76710",
				"country": "USA",
				"email": "customerservice@fnbct.com",
				"customerServicePhone": "254-772-9330",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "First Natl Bank of Central Texas",
				"siteURL": "www.fnbct.com"
			}
		},
		{
			"name": "First National Bank of Pandora",
			"fid": "1824",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "102 East Main Street",
				"address2": null,
				"address3": null,
				"city": "Pandora",
				"state": "OH",
				"zip": "45877",
				"country": "USA",
				"email": "dshaneyfelt@e-fnb.com;vrossman@e-fnb.com",
				"customerServicePhone": "800-227-7940",
				"technicalSupportPhone": "800-227-7940",
				"fax": null,
				"financialInstitutionName": "First National Bank",
				"siteURL": "http://www.e-fnb.com"
			}
		},
		{
			"name": "First Reliance Bank",
			"fid": "2042",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "2170 West Palmetto St.",
				"address2": "Florence, SC   29501",
				"address3": null,
				"city": "FLORENCE",
				"state": "SC",
				"zip": "295010000",
				"country": "USA",
				"email": "support@firstreliance.com",
				"customerServicePhone": "(843) 674-3275",
				"technicalSupportPhone": "1-888-543-5510",
				"fax": null,
				"financialInstitutionName": "First Reliance Bank",
				"siteURL": "http://www.firstreliance.com"
			}
		},
		{
			"name": "First Republic Bank",
			"fid": "321081669",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "111 Pine Street",
				"address2": null,
				"address3": null,
				"city": "San Francisco",
				"state": "CA",
				"zip": "94111",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "888-372-4891",
				"technicalSupportPhone": "888-372-4891",
				"fax": null,
				"financialInstitutionName": "First Republic Bank",
				"siteURL": "www.firstrepublic.com"
			}
		},
		{
			"name": "First Republic Securities Company",
			"fid": "010",
			"org": "First Republic Bank",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "111 Pine Street",
				"address2": null,
				"address3": null,
				"city": "San Francisco",
				"state": "CA",
				"zip": "94111",
				"country": "USA",
				"email": "securities@firstrepublic.com",
				"customerServicePhone": "877-348-5576",
				"technicalSupportPhone": "877-348-5576",
				"fax": "888-258-6188",
				"financialInstitutionName": "First Republic Securities",
				"siteURL": "http://www.firstrepublic.com"
			}
		},
		{
			"name": "First Security Investment",
			"fid": "6510",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06510.ofx",
			"profile": {
				"address1": "600 5th Avenue",
				"address2": "9th floor",
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10020",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Reich & Tang",
				"siteURL": null
			}
		},
		{
			"name": "First Service Federal Credit Union",
			"fid": "1022",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "100 Main Street",
				"address2": "Groveport, OH 43125",
				"address3": null,
				"city": "GROVEPORT",
				"state": "OH",
				"zip": "431250000",
				"country": "USA",
				"email": "support@firstcu.com",
				"customerServicePhone": "(614) 920-6309",
				"technicalSupportPhone": "614-920-6309",
				"fax": null,
				"financialInstitutionName": "First Service FCU",
				"siteURL": null
			}
		},
		{
			"name": "First Southern Bancorp",
			"fid": "042102403",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "99 Lancaster Street",
				"address2": null,
				"address3": null,
				"city": "Stanford",
				"state": "KY",
				"zip": "40484",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "219-464-4864",
				"technicalSupportPhone": "219-464-4864",
				"fax": null,
				"financialInstitutionName": "First Southern Bancorp",
				"siteURL": "www.fsnbhb.com"
			}
		},
		{
			"name": "First State Bank of Blakely",
			"fid": "32463",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "2213 South Main St",
				"address2": "Blakely, GA  39823",
				"address3": null,
				"city": "BLAKELY",
				"state": "GA",
				"zip": "398230000",
				"country": "USA",
				"email": "netteller@fsbanks.com",
				"customerServicePhone": "229-723-3711",
				"technicalSupportPhone": "(866)491-9841",
				"fax": null,
				"financialInstitutionName": "First State Bank of Blakely",
				"siteURL": "http://www.fsbanks.com"
			}
		},
		{
			"name": "First State Bank of Central Texas",
			"fid": "12663",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P O Box 6136",
				"address2": "Temple TX 76503",
				"address3": null,
				"city": "TEMPLE",
				"state": "TX",
				"zip": "765036136",
				"country": "USA",
				"email": "webservice@fsbcentex.com",
				"customerServicePhone": "(254) 771-5550",
				"technicalSupportPhone": "254-899-6601",
				"fax": null,
				"financialInstitutionName": "First State Bank Central Texas",
				"siteURL": "http://www.fsbcentex.com"
			}
		},
		{
			"name": "First Tech Federal Credit Union",
			"fid": "3169",
			"org": "First Tech Federal Credit Union",
			"ofx": "https://ofx.firsttechfed.com",
			"profile": {
				"address1": "3408 Hillview Ave",
				"address2": null,
				"address3": null,
				"city": "Palo Alto",
				"state": "CA",
				"zip": "94304",
				"country": "USA",
				"email": "email@firsttechfed.com",
				"customerServicePhone": "877.233.4766",
				"technicalSupportPhone": "877.233.4766",
				"fax": "555.555.5554",
				"financialInstitutionName": "First Tech Federal Credit Union",
				"siteURL": "https://www.firsttechfed.com"
			}
		},
		{
			"name": "First Trust Bank of Illinois-new",
			"fid": "071925826",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "275 East Court Street",
				"address2": null,
				"address3": null,
				"city": "Kankakee",
				"state": "IL",
				"zip": "60901",
				"country": "USA",
				"email": "customerservice@firsttrustbankil",
				"customerServicePhone": "(815)929-4001 Ext 233",
				"technicalSupportPhone": "(815)929-4001 Ext 233",
				"fax": "(815)929-4036",
				"financialInstitutionName": "First Trust Bank of Illinois",
				"siteURL": "www.tempfirsttrustbankil.com"
			}
		},
		{
			"name": "First USA",
			"fid": "3450",
			"org": "B1",
			"ofx": "https://ofx.chase.com",
			"profile": {
				"address1": "Bank One Plaza",
				"address2": "Suite IL1-0852",
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60670",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "800-482-3675",
				"technicalSupportPhone": "800-482-3675",
				"fax": null,
				"financialInstitutionName": "B1",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "First Virginia Community - DC",
			"fid": "6127",
			"org": "fis-6127",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "11325 Random Hills Road",
				"address2": "Suite  240",
				"address3": null,
				"city": "Fairfax",
				"state": "VA",
				"zip": "22030",
				"country": "USA",
				"email": "online@fvcbank.com",
				"customerServicePhone": "703-656-7285",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "First Virginia Community",
				"siteURL": "www.fvcbank.com"
			}
		},
		{
			"name": "FirstBank of Colorado",
			"fid": "FirstBank",
			"org": "FBDC",
			"ofx": "https://www.efirstbankpfm.com/ofx/OFXServlet",
			"profile": {
				"address1": "12345 W Colfax Ave.",
				"address2": null,
				"address3": null,
				"city": "Lakewood",
				"state": "CO",
				"zip": "80215",
				"country": "USA",
				"email": "banking@efirstbank.com",
				"customerServicePhone": "303-232-5522 or 800-964-3444",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "FirstBank of Colorado",
				"siteURL": "http://www.efirstbank.com"
			}
		},
		{
			"name": "Firstar",
			"fid": "1255",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01255.ofx",
			"profile": {
				"address1": "77 East Wisconsin Avenue",
				"address2": null,
				"address3": null,
				"city": "Milwaukee",
				"state": "WI",
				"zip": "53202",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Firstar Bank Corporation",
				"siteURL": "http://firstar.com"
			}
		},
		{
			"name": "FivePoint Credit Union",
			"fid": "313187571",
			"org": "MY CREDIT UNION",
			"ofx": "https://tfcu-nfuse01.texacocommunity.org/internetconnector/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Flagstar Bank",
			"fid": "272471852",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "301 W. Michigan Ave",
				"address2": null,
				"address3": null,
				"city": "Jackson",
				"state": "MI",
				"zip": "49201",
				"country": "USA",
				"email": "bank@flagstar.com",
				"customerServicePhone": "800-642-0039",
				"technicalSupportPhone": "800-642-0039",
				"fax": "517-817-1190",
				"financialInstitutionName": "Flagstar Bank",
				"siteURL": "www.flagstar.com"
			}
		},
		{
			"name": "Flint Community Bank",
			"fid": "20181",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P.O. Box 70878",
				"address2": "ALBANY, GA 31708",
				"address3": null,
				"city": "ALBANY",
				"state": "GA",
				"zip": "317210000",
				"country": "USA",
				"email": "info@flintcommunitybank.com",
				"customerServicePhone": "(229) 903-1400",
				"technicalSupportPhone": "(229)903-1400",
				"fax": null,
				"financialInstitutionName": "Flint Community Bank       FAL",
				"siteURL": "http://www.flintcommunitybank.com"
			}
		},
		{
			"name": "Florence Savings Bank - Business",
			"fid": "1896",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "eBanking Department",
				"address2": null,
				"address3": null,
				"city": "Florence",
				"state": "MA",
				"zip": "01062-0700",
				"country": "USA",
				"email": "Theresa.Yarrows@florencesavings.com",
				"customerServicePhone": "866-628-4092",
				"technicalSupportPhone": "866-628-4092",
				"fax": null,
				"financialInstitutionName": "Florence Savings Bank",
				"siteURL": "http://www.florencesavings.com"
			}
		},
		{
			"name": "Florence Savings Bank - Personal",
			"fid": "476",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "85 Main Street",
				"address2": null,
				"address3": null,
				"city": "Florence",
				"state": "MA",
				"zip": "01062",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 632-9099",
				"technicalSupportPhone": "(877) 632-9099",
				"fax": null,
				"financialInstitutionName": "Florence Savings Bank",
				"siteURL": "http://www.florencebank.com"
			}
		},
		{
			"name": "Florida Bank",
			"fid": "7455",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "201 N. Franklin St. Suite 100",
				"address2": "Tampa, FL  33602",
				"address3": null,
				"city": "TAMPA",
				"state": "FL",
				"zip": "336140000",
				"country": "USA",
				"email": "onlinebanking@flbank.com",
				"customerServicePhone": "(813) 569-7500",
				"technicalSupportPhone": "813.405.2540",
				"fax": null,
				"financialInstitutionName": "Florida Bank",
				"siteURL": "http://www.flbank.com"
			}
		},
		{
			"name": "Florida State University CU",
			"fid": "263182545",
			"org": "Users, Inc.",
			"ofx": "https://fsucuebranch.org/scripts/isaofx.dll",
			"profile": {
				"address1": "1612 Captial Circle NE",
				"address2": null,
				"address3": null,
				"city": "Tallahassee",
				"state": "FL",
				"zip": "32308",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "FSU Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "FloridaCentral CU",
			"fid": "12550",
			"org": "Connect",
			"ofx": "https://banking.floridacentralcu.com/internetbankingOFX/Ofxrqst.aspx",
			"profile": {
				"address1": "3333 Henderson Blvd",
				"address2": null,
				"address3": null,
				"city": "Tampa",
				"state": "FL",
				"zip": "33609",
				"country": "USA",
				"email": "info@floridacentralcu.com",
				"customerServicePhone": "1-800-8528-3330",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Florida Central Credit Union",
				"siteURL": "https://www.floridacentralcu.com/home/home"
			}
		},
		{
			"name": "Fort Sill Federal Credit Union",
			"fid": "303184856",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "4116 Thomas Road",
				"address2": null,
				"address3": null,
				"city": "Fort Sill",
				"state": "OK",
				"zip": "73503",
				"country": "USA",
				"email": "webmaster@ftsillfcu.com",
				"customerServicePhone": "(580) 353-2124",
				"technicalSupportPhone": "(580) 353-2124",
				"fax": null,
				"financialInstitutionName": "Fort Sill Federal Credit Union",
				"siteURL": "www.fsfcu.com"
			}
		},
		{
			"name": "Fort Worth Community CU - QK",
			"fid": "311981672",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1905 Forest Ridge Rd.",
				"address2": null,
				"address3": null,
				"city": "Bedford",
				"state": "TX",
				"zip": "76095",
				"country": "USA",
				"email": "ftwccu@ftwccu.org",
				"customerServicePhone": "817-835-5000",
				"technicalSupportPhone": "817-835-5000",
				"fax": "817-835-5235",
				"financialInstitutionName": "Ft Worth Community Credit Union",
				"siteURL": "www.ftwccu.org"
			}
		},
		{
			"name": "Founders Bank & Trust",
			"fid": "1759",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "5200 CASCADE RD. SE",
				"address2": "GRAND RAPIDS, MI  49546",
				"address3": null,
				"city": "GRAND RAPIDS",
				"state": "MI",
				"zip": "495011828",
				"country": "USA",
				"email": "support@foundersbt.com",
				"customerServicePhone": "(616) 956-9030",
				"technicalSupportPhone": "(616)956-9030",
				"fax": null,
				"financialInstitutionName": "FOUNDERS BANK & TRUST",
				"siteURL": "http://foundersbt.com"
			}
		},
		{
			"name": "Franklin Templeton Bank & Trust",
			"fid": "121135346",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2302 S. Presidents Dr, Suite F",
				"address2": "FTB&T Online Box 17406",
				"address3": null,
				"city": "Salt Lake City",
				"state": "UT",
				"zip": "84120",
				"country": "USA",
				"email": "ftbanksupport@frk.com",
				"customerServicePhone": "1-877-664-4286",
				"technicalSupportPhone": "1-877-664-4286",
				"fax": null,
				"financialInstitutionName": "Franklin Templeton Bank & Trust",
				"siteURL": "http://www.ftbank.com"
			}
		},
		{
			"name": "Franklin Templeton Investments",
			"fid": "9444",
			"org": "franklintempleton.com",
			"ofx": "https://ofx.franklintempleton.com/eftxweb/access.ofx",
			"profile": {
				"address1": "P.O. Box 997152",
				"address2": null,
				"address3": null,
				"city": "Sacramento",
				"state": "CA",
				"zip": "95670-7313",
				"country": "USA",
				"email": "shareholderservices@frk.com",
				"customerServicePhone": "1-800-632-2301",
				"technicalSupportPhone": "1-800-632-2301",
				"fax": null,
				"financialInstitutionName": "Franklin Templeton Investments",
				"siteURL": "www.franklintempleton.com"
			}
		},
		{
			"name": "Freedom Credit Union",
			"fid": "1482",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1796 Main Street",
				"address2": "P.O. Box 3009",
				"address3": null,
				"city": "Springfield",
				"state": "MA",
				"zip": "01101",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 746-0981",
				"technicalSupportPhone": "(877) 746-0981",
				"fax": null,
				"financialInstitutionName": "Freedom Credit Union",
				"siteURL": "http://www.freedom.coop"
			}
		},
		{
			"name": "Freedom Security Bank",
			"fid": "073909992",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "140 Holiday Road",
				"address2": null,
				"address3": null,
				"city": "Coralville",
				"state": "IA",
				"zip": "52241",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "319-688-9005",
				"technicalSupportPhone": "319-688-9005",
				"fax": null,
				"financialInstitutionName": "Freedom Security Bank",
				"siteURL": "www.fs-bankonline.com"
			}
		},
		{
			"name": "Fremont Bank Direct Connect",
			"fid": "121107882",
			"org": "MSevenThreeOne",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "25151 Clawiter Rd.",
				"address2": null,
				"address3": null,
				"city": "Hayward",
				"state": "CA",
				"zip": "94545",
				"country": "USA",
				"email": null,
				"customerServicePhone": "510-723-5519",
				"technicalSupportPhone": "510-723-5519",
				"fax": null,
				"financialInstitutionName": "Fremont Bank",
				"siteURL": "www.fremontbank.com"
			}
		},
		{
			"name": "Fulton Bank",
			"fid": "031301422",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "One Penn Squarer",
				"address2": null,
				"address3": null,
				"city": "Lancaster",
				"state": "PA",
				"zip": "17602",
				"country": "USA",
				"email": "customerservice@fultonbank.com",
				"customerServicePhone": "800.385.8664",
				"technicalSupportPhone": "800.385.8664",
				"fax": "717.569.6316",
				"financialInstitutionName": "Fulton Bank",
				"siteURL": "www.fultonbank.com"
			}
		},
		{
			"name": "Fulton Bank NJ",
			"fid": "031207636",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1100 Old Broadway",
				"address2": null,
				"address3": null,
				"city": "Woodbury",
				"state": "NJ",
				"zip": "08096",
				"country": "USA",
				"email": "customerservice@fultonbanknj.com",
				"customerServicePhone": "1-855-900-3265",
				"technicalSupportPhone": "1-855-900-3265",
				"fax": "856-468-8351",
				"financialInstitutionName": "Fulton Bank of New Jersey",
				"siteURL": "www.fultonbanknj.com"
			}
		},
		{
			"name": "GFA Federal Credit Union",
			"fid": "1029",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "229 Parker Street",
				"address2": "P.O. Box 468",
				"address3": null,
				"city": "Gardner",
				"state": "MA",
				"zip": "01440-3703",
				"country": "USA",
				"email": "gfa@gfafcu.com",
				"customerServicePhone": "(978) 632-2542",
				"technicalSupportPhone": "(978) 632-2542",
				"fax": null,
				"financialInstitutionName": "GFA Federal Credit Union",
				"siteURL": "http://www.gfafcu.com"
			}
		},
		{
			"name": "Galena State Bank and Trust",
			"fid": "071108698",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "971 Gear Street",
				"address2": null,
				"address3": null,
				"city": "Galena",
				"state": "IL",
				"zip": "61036",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "815-777-0663",
				"technicalSupportPhone": "815-777-0663",
				"fax": null,
				"financialInstitutionName": "Galena State Bank & Trust Co.",
				"siteURL": "www.galenastateonline.com"
			}
		},
		{
			"name": "Georgia Bank and Trust",
			"fid": "2055",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "PO Box 15367",
				"address2": "Augusta GA 30919-5367",
				"address3": null,
				"city": "MARTINEZ",
				"state": "GA",
				"zip": "309070000",
				"country": "USA",
				"email": "online@georgiabankandtrust.com",
				"customerServicePhone": "(706) 738-6990",
				"technicalSupportPhone": "(706)738-6990",
				"fax": null,
				"financialInstitutionName": "Georgia Bank and Trust",
				"siteURL": "http://www.georgiabankandtrust.com"
			}
		},
		{
			"name": "Georgia Commerce Bank",
			"fid": "061020317",
			"org": "MEightFiveNine",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "3625 Cumberland Blvd bldg 2",
				"address2": null,
				"address3": null,
				"city": "Atlanta",
				"state": "GA",
				"zip": "30339",
				"country": "USA",
				"email": null,
				"customerServicePhone": "678-631-1240",
				"technicalSupportPhone": "678-631-1242",
				"fax": null,
				"financialInstitutionName": "Georgia Commerce Bank",
				"siteURL": "http://www.gacommercebank.com/"
			}
		},
		{
			"name": "Georgia Primary Bank",
			"fid": "061021060",
			"org": "MEightTwoEight",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "3880 Roswell Rd",
				"address2": null,
				"address3": null,
				"city": "Atlanta",
				"state": "GA",
				"zip": "30342",
				"country": "USA",
				"email": null,
				"customerServicePhone": "404-231-4100",
				"technicalSupportPhone": "404-231-4100",
				"fax": null,
				"financialInstitutionName": "Georgia Primary Bank",
				"siteURL": "http://www.georgiaprimarybank.com"
			}
		},
		{
			"name": "German American Bank - Direct",
			"fid": "083904563",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "711 Main Street",
				"address2": null,
				"address3": null,
				"city": "Jasper",
				"state": "IN",
				"zip": "47546",
				"country": "USA",
				"email": "ContactCenter@germanamerican.com",
				"customerServicePhone": "(812)482-1314",
				"technicalSupportPhone": "(812)482-1314",
				"fax": "(812)482-0758",
				"financialInstitutionName": "German American - Direct",
				"siteURL": "www.germanamerican.com"
			}
		},
		{
			"name": "Gibraltar Bank, FSB",
			"fid": "1322",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "55 Alhambra Plaza",
				"address2": "Coral Gables, FL 33134",
				"address3": null,
				"city": "CORAL GABLES",
				"state": "FL",
				"zip": "331340000",
				"country": "USA",
				"email": "clientservice@gibraltarprivate.com",
				"customerServicePhone": "(305) 476-1982",
				"technicalSupportPhone": "1-877-202-4690",
				"fax": null,
				"financialInstitutionName": "Gibraltar Private Bank & Trust",
				"siteURL": "http://www.gibraltarprivate.com/index.html"
			}
		},
		{
			"name": "Gold Canyon Bank",
			"fid": "5532",
			"org": "043",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "6641 Kings Ranch Road",
				"address2": null,
				"address3": null,
				"city": "Gold Canyon",
				"state": "AZ",
				"zip": "85218",
				"country": "USA",
				"email": "Internetbanking@goldcanyonbank.com",
				"customerServicePhone": "888-217-1267",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "GoldCanyonBankPFM",
				"siteURL": "http://www.goldcanyonbank.com"
			}
		},
		{
			"name": "Golden Plains CU - Direct",
			"fid": "301178181",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1714 E Kansas Ave",
				"address2": null,
				"address3": null,
				"city": "Garden City",
				"state": "KS",
				"zip": "67846",
				"country": "USA",
				"email": "gponline@gpcu.org",
				"customerServicePhone": "620-275-2151",
				"technicalSupportPhone": "620-275-2151",
				"fax": "620-275-4702",
				"financialInstitutionName": "Golden Plains CU",
				"siteURL": "www.gpcu.org"
			}
		},
		{
			"name": "Goldman Sachs",
			"fid": "1234",
			"org": "gs.com",
			"ofx": "https://portfolio-ofx.gs.com:446/ofx/ofx.eftx",
			"profile": {
				"address1": "One Liberty Plaza, 33th Floor",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": "help@gs.com",
				"customerServicePhone": "(212)344-2000",
				"technicalSupportPhone": "(212)344-2000",
				"fax": "(212)344-2700",
				"financialInstitutionName": "Goldman Sachs",
				"siteURL": "www.gs.com"
			}
		},
		{
			"name": "Granite Mountain Bank-Direct",
			"fid": "092905210",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "139 East Broadway",
				"address2": null,
				"address3": null,
				"city": "Philipsburg",
				"state": "MT",
				"zip": "59858",
				"country": "USA",
				"email": "bankhelp@granitemountainbank.com",
				"customerServicePhone": "406-859-3241",
				"technicalSupportPhone": "406-533-0600",
				"fax": "406-859-3632",
				"financialInstitutionName": "Flint Creek Valley Bank",
				"siteURL": "www.granitemountainbank.com"
			}
		},
		{
			"name": "Great Florida Bank",
			"fid": "066015576",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "15050 NW 79th Ct",
				"address2": null,
				"address3": null,
				"city": "Miami Lakes",
				"state": "FL",
				"zip": "33016",
				"country": "USA",
				"email": "onlinebanking@greatfloridabank.c",
				"customerServicePhone": "1-866-322-5042",
				"technicalSupportPhone": "1-866-322-5042",
				"fax": null,
				"financialInstitutionName": "Great Florida Bank",
				"siteURL": "www.greatfloridabank.com"
			}
		},
		{
			"name": "Green Bank, N.A.",
			"fid": "18084",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "4000 GREENBRIAR ST.",
				"address2": "HOUSTON, TX 77098",
				"address3": null,
				"city": "HOUSTON",
				"state": "TX",
				"zip": "770920000",
				"country": "USA",
				"email": "electronicbanking@greenbank.com",
				"customerServicePhone": "(713) 275-8200",
				"technicalSupportPhone": "800-994-0640",
				"fax": null,
				"financialInstitutionName": "GREEN BANK, N.A.",
				"siteURL": "http://www.greenbank.com"
			}
		},
		{
			"name": "GreenChoice Bank",
			"fid": "271971528",
			"org": "MEightSixtySix",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "5225 W 25TH STREET",
				"address2": null,
				"address3": null,
				"city": "CICERO",
				"state": "IL",
				"zip": "60804",
				"country": "USA",
				"email": null,
				"customerServicePhone": "708-656-0100",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "GreenChoice Bank",
				"siteURL": "http://www.greenchoicebank.com"
			}
		},
		{
			"name": "Greenfield Co-operative Bank",
			"fid": "1102",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "PO Box 1345",
				"address2": null,
				"address3": null,
				"city": "Greenfield",
				"state": "MA",
				"zip": "01302-1345",
				"country": "USA",
				"email": "contactus@greenfieldcoopbank.com",
				"customerServicePhone": "413-772-0293",
				"technicalSupportPhone": "413-772-0293",
				"fax": null,
				"financialInstitutionName": "Greenfield Co-operative Bank",
				"siteURL": "https://www.greenfieldcoopbank.com/"
			}
		},
		{
			"name": "Gulf Coast Community Bank",
			"fid": "5526",
			"org": "090",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "40 North Palafox St",
				"address2": null,
				"address3": null,
				"city": "Pensacola",
				"state": "FL",
				"zip": "32502",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "GulfCoastCommunityBank",
				"siteURL": "http://www.mygulfbank.com"
			}
		},
		{
			"name": "GulfShore Bank",
			"fid": "14922",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "401 S FLORIDA AVE SUITE 100",
				"address2": "TAMPA FL 33602",
				"address3": null,
				"city": "TAMPA",
				"state": "FL",
				"zip": "336020000",
				"country": "USA",
				"email": "onlinebanking@gulfshorebank.com",
				"customerServicePhone": "(813) 418-3100",
				"technicalSupportPhone": "813-418-3100",
				"fax": null,
				"financialInstitutionName": "GULFSHORE BANK",
				"siteURL": "https://www.netteller.com/gulfshorebank"
			}
		},
		{
			"name": "HFS Federal Credit Union",
			"fid": "321378660",
			"org": "Credit Union",
			"ofx": "https://hfsfcu.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "HVFCU Direct",
			"fid": "221979363",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "159 Barnegat Road",
				"address2": null,
				"address3": null,
				"city": "Poughkeepsie",
				"state": "NY",
				"zip": "12601",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "845-463-3011",
				"technicalSupportPhone": "845-463-3011",
				"fax": null,
				"financialInstitutionName": "Hudson Valley FCU",
				"siteURL": "www.hvfcuonline.org"
			}
		},
		{
			"name": "Hampton Roads Bankshares",
			"fid": "051405188",
			"org": "MSevenNineteen",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1145 North Road Street",
				"address2": null,
				"address3": null,
				"city": "Elizabeth City",
				"state": "NC",
				"zip": "27909",
				"country": "USA",
				"email": null,
				"customerServicePhone": "252-334-1511",
				"technicalSupportPhone": "252-334-1511",
				"fax": null,
				"financialInstitutionName": "Gateway Bank & Trust",
				"siteURL": "http://www.gatewaybankandtrust.com"
			}
		},
		{
			"name": "Harbor Funds",
			"fid": "20280",
			"org": "harbor",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=6070017011417",
			"profile": {
				"address1": "111 S. Wacker Drive",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60608",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Harbor Funds",
				"siteURL": null
			}
		},
		{
			"name": "HarborOne Bank - NEW",
			"fid": "1089",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "770 Oak Street",
				"address2": null,
				"address3": null,
				"city": "Brockton",
				"state": "MA",
				"zip": "02301",
				"country": "USA",
				"email": "customerservice@harborone.com",
				"customerServicePhone": "800-244-7592",
				"technicalSupportPhone": "800-244-7592",
				"fax": "508-521-2668",
				"financialInstitutionName": "HarborOne Bank",
				"siteURL": "WWW.HARBORONE.COM"
			}
		},
		{
			"name": "Harrington Bank",
			"fid": "252",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "5925 FARRINGTON ROAD",
				"address2": "CHAPEL HILL, NC 27517",
				"address3": null,
				"city": "THOMASVILLE",
				"state": "NC",
				"zip": "273600000",
				"country": "USA",
				"email": "info@harringtonbank.com",
				"customerServicePhone": "(919) 945-7800",
				"technicalSupportPhone": "(919)945-7813",
				"fax": null,
				"financialInstitutionName": "HARRINGTON BANK",
				"siteURL": "http://www.harringtonbank.com"
			}
		},
		{
			"name": "Harris Investor Services, Inc",
			"fid": "032",
			"org": "Harris Investor Services",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "111 W Monroe St",
				"address2": "18W",
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60603",
				"country": "USA",
				"email": "investmentservices@theharris.com",
				"customerServicePhone": "1-877-225-3863",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "BMO Harris Financial Advisors, Inc.",
				"siteURL": "http://www.harrisbank.com/investments"
			}
		},
		{
			"name": "Haverhill Bank - New",
			"fid": "1021",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "180 Merrimack Street",
				"address2": "P.O. Box 1656",
				"address3": null,
				"city": "Haverhill",
				"state": "MA",
				"zip": "01830",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-686-2831",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Haverhill Bank",
				"siteURL": "http://www.haverhillbank.com"
			}
		},
		{
			"name": "Heartland National Bank",
			"fid": "2322",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "320 US 27 NORTH",
				"address2": "SEBRING FL  33870",
				"address3": null,
				"city": "SEBRING",
				"state": "FL",
				"zip": "338700000",
				"country": "USA",
				"email": "bank@heartlandnb.com",
				"customerServicePhone": "(863) 386-1300",
				"technicalSupportPhone": "863.386.1300",
				"fax": null,
				"financialInstitutionName": "Heartland National Bank",
				"siteURL": "http://www.heartlandnb.com"
			}
		},
		{
			"name": "Herald National Bank -IB",
			"fid": "026014588",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "623 5th Avenue 12th Floor",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10022",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-498-3173",
				"technicalSupportPhone": "800-498-3173",
				"fax": null,
				"financialInstitutionName": "Herald National Bank",
				"siteURL": "www.heraldnb.com"
			}
		},
		{
			"name": "Heritage Bank - KY",
			"fid": "757",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "2700 Fort Campbell Blvd",
				"address2": null,
				"address3": null,
				"city": "Hopkinsville",
				"state": "KY",
				"zip": "42240",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 758-3532",
				"technicalSupportPhone": "(800) 758-3532",
				"fax": null,
				"financialInstitutionName": "Heritage Bank - KY",
				"siteURL": "http://www.bankwithheritage.com"
			}
		},
		{
			"name": "Hinsdale Bank & Trust",
			"fid": "5507",
			"org": "289",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "25 East First Street",
				"address2": null,
				"address3": null,
				"city": "Hinsdale",
				"state": "IL",
				"zip": "60521",
				"country": "USA",
				"email": "customer_service@hinsdalebank.com",
				"customerServicePhone": "866-224-2859",
				"technicalSupportPhone": null,
				"fax": "630-655-8008",
				"financialInstitutionName": "HinsdaleBank",
				"siteURL": "http://www.hinsdalebank.com"
			}
		},
		{
			"name": "Home Federal Bank Corp Ky - TN",
			"fid": "242170426",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1602 Cumberland Avenue",
				"address2": null,
				"address3": null,
				"city": "Middlesboro",
				"state": "KY",
				"zip": "40965",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "606-248-1095",
				"technicalSupportPhone": "606-248-1095",
				"fax": null,
				"financialInstitutionName": "Home Federal Bank",
				"siteURL": "www.homefederalonlinebank.com"
			}
		},
		{
			"name": "Horizon Credit Union",
			"fid": "325182506",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "13224 E Mansfield Ave Suite 300",
				"address2": null,
				"address3": null,
				"city": "Spokane Valley",
				"state": "WA",
				"zip": "99216",
				"country": "USA",
				"email": "hzcu@hzcu.org",
				"customerServicePhone": "800-852-5316",
				"technicalSupportPhone": "800-852-5316",
				"fax": "NA",
				"financialInstitutionName": "Horizon Credit Union",
				"siteURL": "www.hzcu.org"
			}
		},
		{
			"name": "Huntington National Bank",
			"fid": "3701",
			"org": "huntington",
			"ofx": "https://ofx.huntington.com/Ofx/process.ofx",
			"profile": {
				"address1": "41 S. High St",
				"address2": null,
				"address3": null,
				"city": "Columbus",
				"state": "OH",
				"zip": "43612",
				"country": "USA",
				"email": "support@huntington.com",
				"customerServicePhone": "1-877-932-BANK (2265)",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Huntington",
				"siteURL": "https://onlinebanking.huntington.com"
			}
		},
		{
			"name": "IBM Southeast EFCU -New",
			"fid": "59019",
			"org": "IBM Southeast EFCU -New",
			"ofx": "https://mobilebanking.ibmsecu.org/ofx/ofxserver.aspx",
			"profile": {
				"address1": "790 Park of Commerce Blvd",
				"address2": null,
				"address3": null,
				"city": "Boca Raton",
				"state": "FL",
				"zip": "33487",
				"country": "USA",
				"email": "serviceplus@ibmse.org",
				"customerServicePhone": "800-873-5100",
				"technicalSupportPhone": "800-873-5100",
				"fax": null,
				"financialInstitutionName": "IBM Southeast EFCU -New",
				"siteURL": "https://www.ibmsecu.org"
			}
		},
		{
			"name": "ING Financial Partners",
			"fid": "056",
			"org": "ING Advisors Network",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "909 Locust Street",
				"address2": null,
				"address3": null,
				"city": "Des Moines",
				"state": "IA",
				"zip": "503009-2899",
				"country": "USA",
				"email": "Lance.presley@us.ing.com",
				"customerServicePhone": "800-356-2906",
				"technicalSupportPhone": "800-356-2906",
				"fax": "515-698-3315",
				"financialInstitutionName": "ING Financial Partners",
				"siteURL": "-"
			}
		},
		{
			"name": "INTRUST Bank",
			"fid": "5012",
			"org": "784",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "105 North Main Street",
				"address2": null,
				"address3": null,
				"city": "Wichita",
				"state": "KS",
				"zip": "67202",
				"country": "USA",
				"email": "intrust@intrustbank.com",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": "316-383-1340",
				"financialInstitutionName": "IntrustBank",
				"siteURL": "www.intrustbank.com"
			}
		},
		{
			"name": "IU Credit Union",
			"fid": "274972744",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "P.O. Box 368",
				"address2": null,
				"address3": null,
				"city": "Bloomington",
				"state": "IN",
				"zip": "47402",
				"country": "USA",
				"email": "memberservice@iucu.org",
				"customerServicePhone": "812-855-7823",
				"technicalSupportPhone": "812-855-7823",
				"fax": "(812)856-4214",
				"financialInstitutionName": "Indiana University Credit Union",
				"siteURL": "www.iucu.org"
			}
		},
		{
			"name": "InTouch Credit Union",
			"fid": "003U1",
			"org": "InTouch Credit Union",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "5640 DEMOCRACY DRIVE",
				"address2": null,
				"address3": null,
				"city": "PLANO",
				"state": "TX",
				"zip": "7502400",
				"country": "US",
				"email": null,
				"customerServicePhone": "80033733285",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "INTOUCH CREDIT UNION",
				"siteURL": "https://www.netit.financial-net.com/itcu"
			}
		},
		{
			"name": "Independent Bank, TN",
			"fid": "084008426",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "5050 Poplar ave",
				"address2": "ste. 109",
				"address3": null,
				"city": "Memphis",
				"state": "TN",
				"zip": "38111",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "901-844-0350",
				"technicalSupportPhone": "901-844-0350",
				"fax": null,
				"financialInstitutionName": "Independent Bank",
				"siteURL": "www.i-bankonlinehb.com"
			}
		},
		{
			"name": "Insight CU",
			"fid": "10764",
			"org": "Insight Credit Union",
			"ofx": "https://secure.insightcreditunion.com/ofx/ofx.dll",
			"profile": {
				"address1": "480 S Keller Rd",
				"address2": null,
				"address3": null,
				"city": "Orlando",
				"state": "FL",
				"zip": "32810",
				"country": "USA",
				"email": "moneycoach@insightcreditunion.com",
				"customerServicePhone": "407-426-6000",
				"technicalSupportPhone": null,
				"fax": "407-426-6035",
				"financialInstitutionName": "Insight Credit Union",
				"siteURL": "https://insightcreditunion.com"
			}
		},
		{
			"name": "Institution for Savings - NEW",
			"fid": "59466",
			"org": "JackHenry",
			"ofx": "https://ofx.netteller.com",
			"profile": {
				"address1": "93 STATE ST",
				"address2": null,
				"address3": null,
				"city": "NEWBURYPORT",
				"state": "MA",
				"zip": "019506620",
				"country": "USA",
				"email": "info@institutionforsavings.com",
				"customerServicePhone": "(978) 462-3106",
				"technicalSupportPhone": "978-462-3106",
				"fax": null,
				"financialInstitutionName": "Institution for Savings",
				"siteURL": "https://www.institutionforsavings.com"
			}
		},
		{
			"name": "International Bank of Commerce",
			"fid": "1001",
			"org": "IBC",
			"ofx": "https://ibcbankonline2.ibc.com/scripts/serverext.dll",
			"profile": {
				"address1": "1200 San Bernardo",
				"address2": null,
				"address3": null,
				"city": "Laredo",
				"state": "TX",
				"zip": "78040",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "210-518-2571",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "IBC",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "Invesco",
			"fid": "1214",
			"org": "Invesco",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=3000812",
			"profile": {
				"address1": "11 Greenway Plaze Suite 100",
				"address2": null,
				"address3": null,
				"city": "Houston",
				"state": "TX",
				"zip": "77046",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "AIM Investments",
				"siteURL": null
			}
		},
		{
			"name": "IronStone Bank - Direct Connect",
			"fid": "5012",
			"org": "first Citizens BancShares",
			"ofx": "https://www.pyramid.cfree.com/fip/genesis/prod/05012.ofx",
			"profile": {
				"address1": "100 E. Tyron  DAC-52",
				"address2": null,
				"address3": null,
				"city": "Raleigh",
				"state": "NC",
				"zip": "27603",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "IronStone Bank",
				"siteURL": "http://www.ironstonebank.com/"
			}
		},
		{
			"name": "J.P. Morgan Clearing Corp.",
			"fid": "7315",
			"org": "GCS",
			"ofx": "https://ofxgcs.toolkit.clearco.com",
			"profile": {
				"address1": "50 broadway",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "JPM",
				"siteURL": null
			}
		},
		{
			"name": "J.P. Morgan Private Banking",
			"fid": "0417",
			"org": "jpmorgan.com",
			"ofx": "https://ofx.jpmorgan.com/jpmredirector",
			"profile": {
				"address1": "522 5th Ave",
				"address2": "null",
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10036",
				"country": "USA",
				"email": "jpmorgan2@jpmorgan.com",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "jpmorgan.com",
				"siteURL": "http://localhost:9080/ofx/JPMWebRedirector"
			}
		},
		{
			"name": "J.P. Morgan Retirement Plan Services",
			"fid": "6313",
			"org": "JPMORGAN",
			"ofx": "https://ofx.retireonline.com/eftxweb/access.ofx",
			"profile": {
				"address1": "9300 Ward Parkway",
				"address2": null,
				"address3": null,
				"city": "Kansas City",
				"state": "MO",
				"zip": "64114",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "1-800-345-2345",
				"technicalSupportPhone": "1-800-345-2345",
				"fax": "1-816-673-4015",
				"financialInstitutionName": "JPMorgan RetirementPlanServices",
				"siteURL": "http://www.retireonline.com"
			}
		},
		{
			"name": "J.P. Morgan Securities",
			"fid": "7315",
			"org": "PCS",
			"ofx": "https://ofxpcs.toolkit.clearco.com",
			"profile": {
				"address1": "50 broadway",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "JPM",
				"siteURL": null
			}
		},
		{
			"name": "JPMorgan Chase Bank",
			"fid": "1601",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/prod/01601.ofx",
			"profile": {
				"address1": "300 Jericho Quadrangle",
				"address2": null,
				"address3": null,
				"city": "Jericho",
				"state": "NY",
				"zip": "11753",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Chase Manhattan Bank",
				"siteURL": "http://www.chasebank.com/"
			}
		},
		{
			"name": "JSC FCU Direct Connect - Online",
			"fid": "10491",
			"org": "JSC Federal Credit Union",
			"ofx": "https://starpclegacy.jscfcu.org/ofx/ofx.dll",
			"profile": {
				"address1": "1330 Gemini",
				"address2": null,
				"address3": null,
				"city": "Houston",
				"state": "TX",
				"zip": "77058",
				"country": "USA",
				"email": "webhelp@jscfcu.org",
				"customerServicePhone": "281-488-7070",
				"technicalSupportPhone": null,
				"fax": "281-488-7070",
				"financialInstitutionName": "JSC Federal Credit Union",
				"siteURL": "http://www.jscfcu.org"
			}
		},
		{
			"name": "Jacksonville Bank - Direct Connect",
			"fid": "5533",
			"org": "471",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "100 North Laura Street",
				"address2": null,
				"address3": null,
				"city": "Jacksonville",
				"state": "FL",
				"zip": "32202",
				"country": "USA",
				"email": "customerservice@jaxbank.com",
				"customerServicePhone": "877-7MY-JAXB",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "JacksonvillePFM",
				"siteURL": "http://www.jaxbank.com"
			}
		},
		{
			"name": "Janney Montgomery Scott LLC",
			"fid": "11326",
			"org": "AFS",
			"ofx": "https://jmsofx.automatedfinancial.com",
			"profile": {
				"address1": "50 Broadway",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "AFS",
				"siteURL": null
			}
		},
		{
			"name": "Janus",
			"fid": "6115",
			"org": "janus",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=50900132018",
			"profile": {
				"address1": "P.O. Box 173375",
				"address2": null,
				"address3": null,
				"city": "Denver",
				"state": "CO",
				"zip": "80217",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Janus",
				"siteURL": null
			}
		},
		{
			"name": "Jefferies & Company-Wealth Mgmt",
			"fid": "059",
			"org": "Jefferies and Company, Inc.",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "520 Madison Avenue",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10022",
				"country": "USA",
				"email": "cschiffer@jefferies.com",
				"customerServicePhone": "800-727-0544",
				"technicalSupportPhone": "800-727-0544",
				"fax": "-",
				"financialInstitutionName": "Jefferies & Company, Inc.",
				"siteURL": "http://www.jefferies.com"
			}
		},
		{
			"name": "Jefferson Bank & Trust Co.",
			"fid": "54639",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "2301 MARKET STREET",
				"address2": "SAINT LOUIS, MO  63103",
				"address3": null,
				"city": "ST. LOUIS",
				"state": "MO",
				"zip": "631030000",
				"country": "USA",
				"email": "customer.service@jbt-stl.com",
				"customerServicePhone": "(314) 621-0100",
				"technicalSupportPhone": "314-621-0100",
				"fax": null,
				"financialInstitutionName": "JEFFERSON BANK & TRUST COMPANY",
				"siteURL": "http://www.jbt-stl.com"
			}
		},
		{
			"name": "Jefferson Bank - Business",
			"fid": "763",
			"org": "086501578",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "700 Southwest Boulevard",
				"address2": null,
				"address3": null,
				"city": "Jefferson City",
				"state": "MO",
				"zip": "65101",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-7914",
				"technicalSupportPhone": "866-777-7914",
				"fax": null,
				"financialInstitutionName": "Jefferson Bank - Business",
				"siteURL": "www.jefferson-bank.com"
			}
		},
		{
			"name": "Jefferson Bank - Personal",
			"fid": "163",
			"org": "086501578",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "700 Southwest Boulevard",
				"address2": null,
				"address3": null,
				"city": "Jefferson City",
				"state": "MO",
				"zip": "65101",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-749-8072",
				"technicalSupportPhone": "800-749-8072",
				"fax": null,
				"financialInstitutionName": "Jefferson Bank - Personal",
				"siteURL": "www.jefferson-bank.com"
			}
		},
		{
			"name": "Jefferson Bank of Florida",
			"fid": "5525",
			"org": "222",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "3711 Tampa Road #101",
				"address2": null,
				"address3": null,
				"city": "Oldsmar",
				"state": "FL",
				"zip": "34677",
				"country": "USA",
				"email": "ebanking@jeffersonbankfl.com",
				"customerServicePhone": "877-203-6715",
				"technicalSupportPhone": null,
				"fax": "727-781-6600",
				"financialInstitutionName": "JeffersonBank",
				"siteURL": "www.jeffersonbankfl.com"
			}
		},
		{
			"name": "Jefferson Security Bank",
			"fid": "16227",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P.O. BOX 35",
				"address2": "SHEPHERDSTOWN WV 25443-0035",
				"address3": null,
				"city": "SHEPHERDSTOWN",
				"state": "WV",
				"zip": "254430035",
				"country": "USA",
				"email": "jsb@jeffersonsecuritybank.com",
				"customerServicePhone": "(304) 876-9000",
				"technicalSupportPhone": "304-876-9030",
				"fax": null,
				"financialInstitutionName": "JEFFERSON SECURITY BANK",
				"siteURL": "http://www.jeffersonsecuritybank.com"
			}
		},
		{
			"name": "Jewett City Savings Bank",
			"fid": "592",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "P.O. Box 335",
				"address2": null,
				"address3": null,
				"city": "Jewett City",
				"state": "CT",
				"zip": "06351-0335",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "1-877-864-5189",
				"technicalSupportPhone": "1-877-864-5189",
				"fax": null,
				"financialInstitutionName": "Jewett City Savings Bank",
				"siteURL": "http://www.jcsbank.com/"
			}
		},
		{
			"name": "Johns Hopkins Federal Credit Union",
			"fid": "252076235",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2027 E Monument St",
				"address2": null,
				"address3": null,
				"city": "Baltimore",
				"state": "MD",
				"zip": "21287",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "410-534-4500",
				"technicalSupportPhone": "410- 534-4500",
				"fax": null,
				"financialInstitutionName": "Johns Hopkins FCU",
				"siteURL": "www.jhfcu.org"
			}
		},
		{
			"name": "Johnson Bank",
			"fid": "075911852",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "555 Main Street",
				"address2": "Suite 090",
				"address3": null,
				"city": "Racine",
				"state": "WI",
				"zip": "53403",
				"country": "USA",
				"email": "jcsc@johnsonbank.com",
				"customerServicePhone": "888-769-3796",
				"technicalSupportPhone": "888-769-3796",
				"fax": "262-619-2252",
				"financialInstitutionName": "Johnson Bank",
				"siteURL": "http://www.johnsonbank.com"
			}
		},
		{
			"name": "KEMBA Financial CU - Direct",
			"fid": "244077556",
			"org": "KEMBA",
			"ofx": "https://ofx.kemba.org/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "555 Officenter Place",
				"address2": null,
				"address3": null,
				"city": "Gahanna",
				"state": "OH",
				"zip": "43230",
				"country": "USA",
				"email": "service@kemba.org",
				"customerServicePhone": "800-282-6420",
				"technicalSupportPhone": "614-235-2395",
				"fax": null,
				"financialInstitutionName": "KEMBA Financial CU Direct",
				"siteURL": "www.kemba.org"
			}
		},
		{
			"name": "KMS Financial Services, Inc.",
			"fid": "031",
			"org": "KMS Financial Services, Inc.",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "2001 Sixth Avenue,Suite 2801",
				"address2": null,
				"address3": null,
				"city": "Seattle",
				"state": "WA",
				"zip": "98121",
				"country": "USA",
				"email": "service@kms.com",
				"customerServicePhone": "206-441-2885",
				"technicalSupportPhone": "206-441-2885",
				"fax": "206-448-4764",
				"financialInstitutionName": "KMS Financial Services, Inc.",
				"siteURL": "http://www.kmsfinancial.com"
			}
		},
		{
			"name": "KUE Federal Credit Union",
			"fid": "3XVNH",
			"org": "KUE Federal Credit Union",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "ONE QUALITY ST.",
				"address2": null,
				"address3": null,
				"city": "LEXINGTON",
				"state": "KY",
				"zip": "40507",
				"country": "US",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "KUE FEDERAL CREDIT UNION",
				"siteURL": "https://www.netit.financial-net.com/kuefcu"
			}
		},
		{
			"name": "Kansas State Bank-DL",
			"fid": "57177",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P O Box 69",
				"address2": "Manhattan KS 66505-0069",
				"address3": null,
				"city": "MANHATTAN",
				"state": "KS",
				"zip": "665020000",
				"country": "USA",
				"email": "clientcare@ksstatebank.com",
				"customerServicePhone": "(785) 587-4000",
				"technicalSupportPhone": "800-588-6805",
				"fax": null,
				"financialInstitutionName": "KS StateBank",
				"siteURL": "http://www.ksstatebank.com"
			}
		},
		{
			"name": "Kearny County Bank",
			"fid": "101106625",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "211 N Main Street",
				"address2": null,
				"address3": null,
				"city": "Lakin",
				"state": "KS",
				"zip": "67860",
				"country": "USA",
				"email": "kcblarkin@kearnycountybank.com",
				"customerServicePhone": "620-355-6222",
				"technicalSupportPhone": "620-355-6222",
				"fax": "620-355-6050",
				"financialInstitutionName": "Kearny Cunty Bank",
				"siteURL": "www.kearnycountybank.com"
			}
		},
		{
			"name": "Kemba Credit Union, Inc.",
			"fid": "11807",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "1045 W 8th St",
				"address2": "Cincinnati,OH 45203-1205",
				"address3": null,
				"city": "WEST CHESTER",
				"state": "OH",
				"zip": "450690000",
				"country": "USA",
				"email": "ryonb@kembacu.org",
				"customerServicePhone": "(513) 762-5070",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Kemba Credit Union",
				"siteURL": null
			}
		},
		{
			"name": "Kennebunk Savings Direct Cash Mgmt",
			"fid": "211274502",
			"org": "KSBCORP",
			"ofx": "https://ofx.kennebunksavings.com/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "5 Fletcher Street",
				"address2": null,
				"address3": null,
				"city": "Kennebunk",
				"state": "ME",
				"zip": "04043",
				"country": "USA",
				"email": "customercare@kennebunksavings.com",
				"customerServicePhone": "800-339-6573",
				"technicalSupportPhone": "800-339-6573",
				"fax": null,
				"financialInstitutionName": "Kennebunk Savings eCorp",
				"siteURL": "kennebunksavings.com"
			}
		},
		{
			"name": "Kennebunk Savings-Direct Connect",
			"fid": "211274502",
			"org": "KSB",
			"ofx": "https://ofx.kennebunksavings.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "5 Fletcher Street",
				"address2": null,
				"address3": null,
				"city": "Kennebunk",
				"state": "ME",
				"zip": "04043",
				"country": "USA",
				"email": "customercare@kennebunksavings.com",
				"customerServicePhone": "800-339-6573",
				"technicalSupportPhone": "800-339-6573",
				"fax": null,
				"financialInstitutionName": "Kennebunk Savings",
				"siteURL": "kennebunksavings.com"
			}
		},
		{
			"name": "Key",
			"fid": "5901",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/05901.ofx",
			"profile": {
				"address1": "333 North Summit Street",
				"address2": "11th Floor",
				"address3": null,
				"city": "Toledo",
				"state": "OH",
				"zip": "43604",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Key Bank",
				"siteURL": "http://www.keybank.com"
			}
		},
		{
			"name": "KeyPoint Credit Union",
			"fid": "321180515",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2805 Bowers Avenue",
				"address2": null,
				"address3": null,
				"city": "Santa Clara",
				"state": "CA",
				"zip": "95051",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "(408)731-4100",
				"technicalSupportPhone": "(408) 731-4100",
				"fax": null,
				"financialInstitutionName": "KeyPoint Credit Union",
				"siteURL": "www.keypointcu-secure.com"
			}
		},
		{
			"name": "Keys Federal Credit Union",
			"fid": "1778",
			"org": "Keys Federal Credit Union",
			"ofx": "https://keysfcuonline.keysfcu.org/ofx/ofx.dll",
			"profile": {
				"address1": "553 Peary Court Road",
				"address2": null,
				"address3": null,
				"city": "Key West",
				"state": "FL",
				"zip": "33040",
				"country": "USA",
				"email": "systems@keysfcu.org",
				"customerServicePhone": "305 2946622",
				"technicalSupportPhone": null,
				"fax": "305 2936051",
				"financialInstitutionName": "Keys Federal Credit Union",
				"siteURL": "https://keysfcuonline.keysfcu.org"
			}
		},
		{
			"name": "Keystone Bank",
			"fid": "16338",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "2394 EAST UNIVERSITY DRIVE",
				"address2": "AUBURN, AL 36830",
				"address3": null,
				"city": "AUBURN",
				"state": "AL",
				"zip": "368300000",
				"country": "USA",
				"email": "Angelamoulton@keystonebank.us",
				"customerServicePhone": "(334) 466-2210",
				"technicalSupportPhone": "334-466-2210",
				"fax": null,
				"financialInstitutionName": "KEYSTONE BANK              AUB",
				"siteURL": "http://www.keystonebank.us"
			}
		},
		{
			"name": "Kinecta Federal Credit Union",
			"fid": "322278073",
			"org": "KINECTA",
			"ofx": "https://ofx.kinecta.org/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1440 Rosecrans Avenue",
				"address2": null,
				"address3": null,
				"city": "Manhattan Beach",
				"state": "CA",
				"zip": "90266",
				"country": "USA",
				"email": "ofxsupport@kinecta.org",
				"customerServicePhone": "800-854-9846",
				"technicalSupportPhone": "800-854-9846",
				"fax": null,
				"financialInstitutionName": "Kinecta Federal Credit Union",
				"siteURL": "http://www.kinecta.org"
			}
		},
		{
			"name": "Kirtland Federal Credit Union",
			"fid": "307070050",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "6440 Gibson Blvd SE",
				"address2": null,
				"address3": null,
				"city": "Albuquerque",
				"state": "NM",
				"zip": "87108",
				"country": "USA",
				"email": "membersv@kirtlandfcu.org",
				"customerServicePhone": "(505)254-4369",
				"technicalSupportPhone": "(505)254-4369",
				"fax": "(505)254-4389",
				"financialInstitutionName": "Kirtland FCU",
				"siteURL": "www.kirtlandfcu.org"
			}
		},
		{
			"name": "Kitsap Community FCU",
			"fid": "325180223",
			"org": "Kitsap Community Federal Credit",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "155 Washington Ave",
				"address2": null,
				"address3": null,
				"city": "Bremerton",
				"state": "WA",
				"zip": "98337",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-422-5852",
				"technicalSupportPhone": "800-422-5852",
				"fax": null,
				"financialInstitutionName": "Kitsap Credit Union",
				"siteURL": "www.kitsapcuhb.org"
			}
		},
		{
			"name": "KleinBank Direct",
			"fid": "091915654",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "611 Rose Drive",
				"address2": null,
				"address3": null,
				"city": "Big Lake",
				"state": "MN",
				"zip": "55309",
				"country": "USA",
				"email": "onlinecs@kleinbank.com",
				"customerServicePhone": "888-553-4648",
				"technicalSupportPhone": "888-553-4648",
				"fax": "952-556-8551",
				"financialInstitutionName": "KleinBank",
				"siteURL": "www.kleinbank.com"
			}
		},
		{
			"name": "Knoxville TVA Emp CU",
			"fid": "57864",
			"org": "Connect",
			"ofx": "https://olb.tvacreditunion.com/OFXDirect/OFXRqst.aspx",
			"profile": {
				"address1": "PO BOX 15994",
				"address2": null,
				"address3": null,
				"city": "Knoxville",
				"state": "TN",
				"zip": "37901",
				"country": "USA",
				"email": null,
				"customerServicePhone": "8004675427",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "KTVA",
				"siteURL": "www.tvacreditunion.com"
			}
		},
		{
			"name": "L.A. Police Federal Credit Union",
			"fid": "322078493",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "16150 Sherman Way",
				"address2": null,
				"address3": null,
				"city": "Van Nuys",
				"state": "CA",
				"zip": "91406",
				"country": "USA",
				"email": "directconnect@lapfcu.org",
				"customerServicePhone": "877-MY-LAPFCU (877-695-2732)",
				"technicalSupportPhone": "877-MY-LAPFCU (877-695-2732)",
				"fax": "818-781-8506",
				"financialInstitutionName": "L.A. Police Federal Credit Union",
				"siteURL": "www.lapfcu.org"
			}
		},
		{
			"name": "LBS Financial Credit Union",
			"fid": "322276855",
			"org": "USERS",
			"ofx": "https://www.lbsfcu.org/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "LBS Financial Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "LaSalle Bank N.A.",
			"fid": "6501",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06501.ofx",
			"profile": {
				"address1": "135 S. LaSalle Street",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60603",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "LaSalle Bank NA.",
				"siteURL": "http://www.lasallebanks.com/"
			}
		},
		{
			"name": "Lake Community Bank - MN",
			"fid": "091008299",
			"org": "MZeroTwoEight",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1964 West Wayzata Blvd",
				"address2": null,
				"address3": null,
				"city": "Long Lake",
				"state": "MN",
				"zip": "55356",
				"country": "USA",
				"email": null,
				"customerServicePhone": "952-473-7347",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Lake Community Bank",
				"siteURL": "www.lcbankmn.com"
			}
		},
		{
			"name": "Lake Trust Credit Union",
			"fid": "495",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "660 Plaza Drive",
				"address2": "Suite 2155",
				"address3": null,
				"city": "Detroit",
				"state": "MI",
				"zip": "48226",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 314-1580",
				"technicalSupportPhone": "(877) 314-1580",
				"fax": null,
				"financialInstitutionName": "Lake Trust Credit Union",
				"siteURL": "http://www.laketrust.org/"
			}
		},
		{
			"name": "Las Colinas Federal CU",
			"fid": "311080573",
			"org": "USERS",
			"ofx": "https://lascolinasfcu.online-cu.com/scripts/isaofx.dll/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Liberty Bank - CT",
			"fid": "211170282",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "315 Main St.",
				"address2": null,
				"address3": null,
				"city": "Middletown",
				"state": "CT",
				"zip": "06457",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "1-888-570-0773",
				"technicalSupportPhone": "1-888-570-0773",
				"fax": "860-704-2132",
				"financialInstitutionName": "Liberty Bank",
				"siteURL": "www.liberty-bank.com"
			}
		},
		{
			"name": "Libertyville Bank & Trust",
			"fid": "5504",
			"org": "158",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "507 N. Milwaukee Ave",
				"address2": null,
				"address3": null,
				"city": "Libertyville",
				"state": "IL",
				"zip": "60048",
				"country": "USA",
				"email": "customer_service@libertyville.com",
				"customerServicePhone": "866-564-7330",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "LibertyvilleBank",
				"siteURL": "http://www.libertyvillebank.com"
			}
		},
		{
			"name": "Local Government Federal CU",
			"fid": "1001",
			"org": "SECU",
			"ofx": "https://onlineaccess.ncsecu.org/lgfcuofx/lgfcu.ofx",
			"profile": {
				"address1": "900 Wade Avenue",
				"address2": null,
				"address3": null,
				"city": "Raleigh",
				"state": "NC",
				"zip": "27603",
				"country": "USA",
				"email": "service@ncsecu.org",
				"customerServicePhone": "8887328562",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "SECU",
				"siteURL": "http://www.ncsecu.org"
			}
		},
		{
			"name": "Los Alamos National Bank",
			"fid": "107001012",
			"org": "LANB",
			"ofx": "https://ofx.lanb.com/ofx/ofxrelay.dll",
			"profile": {
				"address1": "1200 Trinity Drive",
				"address2": null,
				"address3": null,
				"city": "Los Alamos",
				"state": "NM",
				"zip": "87544",
				"country": "USA",
				"email": "lanb@lanb.com",
				"customerServicePhone": "5056625171",
				"technicalSupportPhone": "5056620239",
				"fax": "5056620239",
				"financialInstitutionName": "Los Alamos National Bank",
				"siteURL": "WWW.LANB.COM"
			}
		},
		{
			"name": "Los Angeles Federal Credit Union",
			"fid": "322078370",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "300 S. Glendale Ave.",
				"address2": null,
				"address3": null,
				"city": "Glendale",
				"state": "CA",
				"zip": "91205",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "818-242-8640",
				"technicalSupportPhone": "818-242-8640",
				"fax": null,
				"financialInstitutionName": "Los Angeles Federal Credit Union",
				"siteURL": "www.lafcu.org"
			}
		},
		{
			"name": "Los Angeles Fireman's Credit Union",
			"fid": "322078341",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1520 W Colorado Blvd",
				"address2": null,
				"address3": null,
				"city": "Pasadena",
				"state": "CA",
				"zip": "91105",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "323-254-1700",
				"technicalSupportPhone": "323-254-1700",
				"fax": null,
				"financialInstitutionName": "Los Angeles Firemens CU",
				"siteURL": "www.lafirecu.org"
			}
		},
		{
			"name": "M&T Bank",
			"fid": "1001",
			"org": "MandT",
			"ofx": "https://DirectConnectOFX.MTB.COM/ofx/process.ofx",
			"profile": {
				"address1": "One MandT Plaza",
				"address2": null,
				"address3": null,
				"city": "Buffalo",
				"state": "NY",
				"zip": "14203",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "866-791-0663",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "M and T Bank",
				"siteURL": "http://www.mtb.com"
			}
		},
		{
			"name": "M&T Securities, Inc.",
			"fid": "028",
			"org": "MandT Bank Corporation",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "2875 Union Rd.",
				"address2": null,
				"address3": null,
				"city": "Cheektowaga",
				"state": "NY",
				"zip": "14227",
				"country": "USA",
				"email": "InvestmentsWeb@mandtbank.com",
				"customerServicePhone": "800-724-7788 Mon-Fri 8:30-5:00",
				"technicalSupportPhone": "-",
				"fax": "570-321-6893",
				"financialInstitutionName": "M&T Securities, Inc.",
				"siteURL": "http://www.mandtbank.com/personal/invest/"
			}
		},
		{
			"name": "MainSource Bank",
			"fid": "074903308",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "201 North Broadway",
				"address2": null,
				"address3": null,
				"city": "Greensburg",
				"state": "IN",
				"zip": "47240",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-713-6083",
				"technicalSupportPhone": "800-713-6083",
				"fax": "812-662-7962",
				"financialInstitutionName": "MainSource Bank",
				"siteURL": "www.mainsourcebank.com"
			}
		},
		{
			"name": "Marquette Banks",
			"fid": "1301",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01301.ofx",
			"profile": {
				"address1": "P.O. Box 1000",
				"address2": null,
				"address3": null,
				"city": "Minneapolis",
				"state": "MN",
				"zip": "554801000",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Marquette Bank",
				"siteURL": "http://www.marquette.com/"
			}
		},
		{
			"name": "Meadows Bank",
			"fid": "17217",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "8912 Spanish Ridge Ave Ste 100",
				"address2": "Las Vegas NV  89148",
				"address3": null,
				"city": "LAS VEGAS",
				"state": "NV",
				"zip": "891480000",
				"country": "USA",
				"email": "hereforyou@meadowsbank.com",
				"customerServicePhone": "(702) 471-2265",
				"technicalSupportPhone": "702.471.BANK(2265)",
				"fax": null,
				"financialInstitutionName": "Meadows Bank",
				"siteURL": "http://www.meadowsbank.com"
			}
		},
		{
			"name": "Mechanics Bank CA",
			"fid": "121102036",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "725 Alfred Nobel Drive",
				"address2": null,
				"address3": null,
				"city": "Hercules",
				"state": "CA",
				"zip": "94547",
				"country": "USA",
				"email": "Info@mechanicsbank.com",
				"customerServicePhone": "877-265-6324",
				"technicalSupportPhone": "877-265-6324",
				"fax": null,
				"financialInstitutionName": "Mechanics Bank",
				"siteURL": "www.mechanicsbank.com"
			}
		},
		{
			"name": "Mechanics' Savings Bank- Auburn,ME",
			"fid": "211272766",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "30 Belgrade Ave",
				"address2": "Suite D",
				"address3": null,
				"city": "Auburn",
				"state": "ME",
				"zip": "04210",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "207-786-5700",
				"technicalSupportPhone": "207-786-5700",
				"fax": null,
				"financialInstitutionName": "Mechanics Savings Bank",
				"siteURL": "www.mechanicssavings.com"
			}
		},
		{
			"name": "Mellon Bank",
			"fid": "1226",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01226.ofx",
			"profile": {
				"address1": "2 Mellon Bank Center 153-0520",
				"address2": null,
				"address3": null,
				"city": "Pittsburgh",
				"state": "PA",
				"zip": "152590001",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Mellon Bank",
				"siteURL": "http://www.mellon.com/"
			}
		},
		{
			"name": "Member One FCU",
			"fid": "251482833",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "202 4th Street NE",
				"address2": null,
				"address3": null,
				"city": "Roanoke",
				"state": "VA",
				"zip": "24016",
				"country": "USA",
				"email": "online@memberonefcu.com",
				"customerServicePhone": "800-666-8811",
				"technicalSupportPhone": "800-666-8811",
				"fax": "540-982-7532",
				"financialInstitutionName": "Member One Federal Credit Union",
				"siteURL": "www.memberonefcu.com"
			}
		},
		{
			"name": "Merchants Bank - VT",
			"fid": "011600020",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "275 Kennedy Drive",
				"address2": null,
				"address3": null,
				"city": "South Burlington",
				"state": "VT",
				"zip": "05403",
				"country": "USA",
				"email": "custserv@mbvt.com",
				"customerServicePhone": "1-800-322-5222",
				"technicalSupportPhone": "1-800-322-5222",
				"fax": "802-865-1943",
				"financialInstitutionName": "Merchants Bank",
				"siteURL": "www.mbvt.com"
			}
		},
		{
			"name": "Merck Sharpe & Dohme FCU",
			"fid": "231386645",
			"org": "Users",
			"ofx": "https://msdfcu.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Meritrust Credit Union",
			"fid": "301180292",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "8710 East 32nd Street North",
				"address2": null,
				"address3": null,
				"city": "Wichita",
				"state": "KS",
				"zip": "67226",
				"country": "USA",
				"email": "memberservices@meritrustcu.org",
				"customerServicePhone": "316-683-1199 or 800-342-9278",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Meritrust Credit Union",
				"siteURL": "www.meritrustcu.org"
			}
		},
		{
			"name": "Merrill Lynch Investments",
			"fid": "5550",
			"org": "Merrill Lynch & Co., Inc.",
			"ofx": "https://taxcert.mlol.ml.com/eftxweb/access.ofx",
			"profile": {
				"address1": "55 Broad Street",
				"address2": "2nd Floor",
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": "support@joineei.com",
				"customerServicePhone": "212 344 2000",
				"technicalSupportPhone": "212 344 2000",
				"fax": "212 344 2000",
				"financialInstitutionName": "Merrill Lynch",
				"siteURL": "www.joineei.com"
			}
		},
		{
			"name": "Merrill Lynch Online Payment",
			"fid": "7301",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/07301.ofx",
			"profile": {
				"address1": "3 Independence Way",
				"address2": null,
				"address3": null,
				"city": "Princeton",
				"state": "NJ",
				"zip": "08540",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Merrill Lynch",
				"siteURL": "http://www.mlol.ml.com/"
			}
		},
		{
			"name": "MetLife Securities",
			"fid": "020",
			"org": "MetLife Securities",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "200 Park Avenue",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10166",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "MetLife Securities",
				"siteURL": "http://metlife.com"
			}
		},
		{
			"name": "Metcalf Bank - Business",
			"fid": "769",
			"org": "101201892",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "609 North 291 Highway",
				"address2": null,
				"address3": null,
				"city": "Lee�s Summit",
				"state": "MO",
				"zip": "64086",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-8101",
				"technicalSupportPhone": "866-777-8101",
				"fax": null,
				"financialInstitutionName": "Metcalf Bank - Business",
				"siteURL": "www.metcalfbank.com"
			}
		},
		{
			"name": "Metcalf Bank - Personal",
			"fid": "823",
			"org": "101201892",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "609 North 291 Highway",
				"address2": null,
				"address3": null,
				"city": "Lee's Summit",
				"state": "MO",
				"zip": "64086",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-753-6272",
				"technicalSupportPhone": "800-753-6272",
				"fax": null,
				"financialInstitutionName": "Metcalf Bank - Personal",
				"siteURL": "www.metcalfbank.com"
			}
		},
		{
			"name": "Methuen Cooperative Bank",
			"fid": "1739",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": null,
				"address2": null,
				"address3": null,
				"city": null,
				"state": null,
				"zip": null,
				"country": null,
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": null,
				"siteURL": null
			}
		},
		{
			"name": "Metro Bank PA",
			"fid": "9970",
			"org": "MTRO",
			"ofx": "https://ofx.mymetrobank.com/ofx/ofx.ofx",
			"profile": {
				"address1": "3801 Paxton St",
				"address2": null,
				"address3": null,
				"city": "Harrisburg",
				"state": "PA",
				"zip": "17111",
				"country": "USA",
				"email": "customerservice@mymetrobank.com",
				"customerServicePhone": "800-204-0541",
				"technicalSupportPhone": "800-204-0541",
				"fax": null,
				"financialInstitutionName": "Metro Bank",
				"siteURL": "https://online.mymetrobank.com"
			}
		},
		{
			"name": "Metro Health Services FCU",
			"fid": "304083396",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "14517 F Street",
				"address2": "Stp 211",
				"address3": null,
				"city": "Omaha",
				"state": "NE",
				"zip": "68137",
				"country": "USA",
				"email": "WebMaster@metrofcu.org",
				"customerServicePhone": "1-800-301-8549",
				"technicalSupportPhone": "1-800-301-8549",
				"fax": "1-402-551-8359",
				"financialInstitutionName": "Metro Health Services FCU",
				"siteURL": "www.onlinemetrofcu.org"
			}
		},
		{
			"name": "Michigan Educational CU - NEW",
			"fid": "58188",
			"org": "MECU",
			"ofx": "https://ofx.michedcu.org/ofx/ofx.ofx",
			"profile": {
				"address1": "9200 Haggerty Road",
				"address2": null,
				"address3": null,
				"city": "Pymouth",
				"state": "MI",
				"zip": "48170",
				"country": "USA",
				"email": "general@michedcu.org",
				"customerServicePhone": "888-261-3355",
				"technicalSupportPhone": "888-261-3355",
				"fax": null,
				"financialInstitutionName": "Michigan Educational Credit Unio",
				"siteURL": "https://online.michedcu.org"
			}
		},
		{
			"name": "Michigan National",
			"fid": "1101",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01101.ofx",
			"profile": {
				"address1": "P.O. Box 30084",
				"address2": null,
				"address3": null,
				"city": "Lansing",
				"state": "MI",
				"zip": "489099782",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "LaSalle Midwest Bank NA",
				"siteURL": "http://www.michigannational.com/"
			}
		},
		{
			"name": "Mid Hudson Valley FCU",
			"fid": "221976243",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "PO Box 1429",
				"address2": null,
				"address3": null,
				"city": "Kingston",
				"state": "NY",
				"zip": "12402",
				"country": "USA",
				"email": "contactus@mhvfcu.com",
				"customerServicePhone": "800-451-8373",
				"technicalSupportPhone": "800-451-8373",
				"fax": "845-336-4448",
				"financialInstitutionName": "Mid-Hudson Valley FCU",
				"siteURL": "www.mhvfcu.com"
			}
		},
		{
			"name": "Middleburg Bank",
			"fid": "056006786",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "111 W Washington St",
				"address2": null,
				"address3": null,
				"city": "Middleburg",
				"state": "VA",
				"zip": "20117",
				"country": "USA",
				"email": "support@middleburgbank.com",
				"customerServicePhone": "703-777-6327",
				"technicalSupportPhone": "703-777-6327",
				"fax": "703-737-3426",
				"financialInstitutionName": "Middleburg Bank",
				"siteURL": "www.middleburgbank.com"
			}
		},
		{
			"name": "Midland States Bank IB",
			"fid": "081204540",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1901 South 4th Street",
				"address2": "Suite 203",
				"address3": null,
				"city": "Effingham",
				"state": "IL",
				"zip": "62401",
				"country": "USA",
				"email": "service@midlandstatesbank.com",
				"customerServicePhone": "888-226-5892",
				"technicalSupportPhone": "217-342-2141",
				"fax": "217-540-1801",
				"financialInstitutionName": "Midland States Bank",
				"siteURL": "www.midlandstatesbank.com"
			}
		},
		{
			"name": "Mission Federal Credit Union",
			"fid": "1001",
			"org": "MISSION",
			"ofx": "https://missionlink.missionfcu.org/scripts/serverext.dll",
			"profile": {
				"address1": "5785 Oberlin Drive",
				"address2": null,
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92121",
				"country": "USA",
				"email": "missionmail@missionfcu.org",
				"customerServicePhone": "800-500-6358",
				"technicalSupportPhone": "619-546-2181",
				"fax": "619-535-0680",
				"financialInstitutionName": "Mission Federal Credit Union",
				"siteURL": "http://www.missionfcu.org"
			}
		},
		{
			"name": "Missoula Federal Credit Union",
			"fid": "5097",
			"org": "Missoula Federal Credit Union",
			"ofx": "https://secure.missoulafcu.org/ofx/ofx.dll",
			"profile": {
				"address1": "3600 Brooks St",
				"address2": null,
				"address3": null,
				"city": "Missoula",
				"state": "MT",
				"zip": "59801",
				"country": "USA",
				"email": "memberservice@missoulafcu.org",
				"customerServicePhone": "(406)523-3300",
				"technicalSupportPhone": null,
				"fax": "(406)523-3535",
				"financialInstitutionName": "Missoula Federal Credit Union",
				"siteURL": "https://secure.missoulafcu.org"
			}
		},
		{
			"name": "Monterey CU - Internet Banking",
			"fid": "2059",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "PO Box 3288",
				"address2": null,
				"address3": null,
				"city": "Monterey,",
				"state": "CA",
				"zip": "93942",
				"country": "USA",
				"email": null,
				"customerServicePhone": "877-277-8108",
				"technicalSupportPhone": "877-277-8108",
				"fax": null,
				"financialInstitutionName": "Monterey Credit Union",
				"siteURL": "https://secure.montereycu.com"
			}
		},
		{
			"name": "Morgan Stanley - Cash Management",
			"fid": "14137",
			"org": "msdw.com",
			"ofx": "https://ofx.morganstanleyclientserv.com/ofx/QuickenWin.ofx",
			"profile": {
				"address1": "1 New York Plaza",
				"address2": "11th Floor",
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": "Alvaro.Mesa@ms.com",
				"customerServicePhone": "(800) 531-1596",
				"technicalSupportPhone": "(800) 531-1596",
				"fax": null,
				"financialInstitutionName": "Morgan Stanley",
				"siteURL": "www.morganstanleyclientserv.com"
			}
		},
		{
			"name": "Morgan Stanley Wealth Management",
			"fid": "1235",
			"org": "msdw.com",
			"ofx": "https://ofx.morganstanleyclientserv.com/ofx/QuickenWinProfile.ofx",
			"profile": {
				"address1": "1 New York Plaza",
				"address2": "11th Floor",
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": "clientservfeedback@morganstanley",
				"customerServicePhone": "(800) 531-1596",
				"technicalSupportPhone": "(800) 531-1596",
				"fax": null,
				"financialInstitutionName": "Morgan Stanley",
				"siteURL": "www.morganstanleyclientserv.com"
			}
		},
		{
			"name": "Mountain America CU - Direct",
			"fid": "324079555",
			"org": "MACU",
			"ofx": "https://m.macu.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "7181 S Campus View Dr",
				"address2": null,
				"address3": null,
				"city": "West Jordan",
				"state": "UT",
				"zip": "84084",
				"country": "USA",
				"email": "macumail@macu.com",
				"customerServicePhone": "800-748-4302",
				"technicalSupportPhone": "1-800-748-4302",
				"fax": null,
				"financialInstitutionName": "Mountain America CU DC",
				"siteURL": "https://www.macu.com"
			}
		},
		{
			"name": "Mountain West Bank, NA--Montana",
			"fid": "707",
			"org": "MWB",
			"ofx": "https://ofx.onlinencr.com/scripts/serverext.dll",
			"profile": {
				"address1": "1225 Cedar Street",
				"address2": null,
				"address3": null,
				"city": "Helena",
				"state": "MT",
				"zip": "59604",
				"country": "USA",
				"email": "bank@mtnwestbank.com",
				"customerServicePhone": "406-449-2265",
				"technicalSupportPhone": "406-449-2265",
				"fax": "406-449-0903",
				"financialInstitutionName": "Mountain West Bank",
				"siteURL": "http://www.mtnwestbank.com/"
			}
		},
		{
			"name": "Mutual Bank",
			"fid": "88",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "P.O. Box 150",
				"address2": null,
				"address3": null,
				"city": "Whitman",
				"state": "MA",
				"zip": "02382",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 686-2809",
				"technicalSupportPhone": "(800) 686-2809",
				"fax": null,
				"financialInstitutionName": "Mutual Bank",
				"siteURL": "http://www.MyMutualBank.com"
			}
		},
		{
			"name": "NASA FCU - Direct Connect",
			"fid": "255077833",
			"org": "NASAFCUDC",
			"ofx": "https://ofx.nasafcu.com/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "500 Prince Georges Blvd",
				"address2": null,
				"address3": null,
				"city": "Upper Marlboro",
				"state": "MD",
				"zip": "20774",
				"country": "USA",
				"email": "support@nasafcu.com",
				"customerServicePhone": "301-249-1800",
				"technicalSupportPhone": "301-249-1800",
				"fax": null,
				"financialInstitutionName": "NASA FCU - Direct Connect",
				"siteURL": "https://www.nasafcu.com/"
			}
		},
		{
			"name": "NEXT Financial Group, Inc",
			"fid": "038",
			"org": "NEXT Holdings, Inc",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "2500 Wilcrest Drive Suite 620",
				"address2": null,
				"address3": null,
				"city": "Houston",
				"state": "TX",
				"zip": "77042",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "Contact your Representative",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "NEXT Financial Group, Inc",
				"siteURL": "http://www.nextfinancial.com"
			}
		},
		{
			"name": "NIH Federal Credit Union",
			"fid": "255076944",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "111 Rockville Pike",
				"address2": "Suite 500",
				"address3": null,
				"city": "Rockville",
				"state": "MD",
				"zip": "20850",
				"country": "USA",
				"email": "2",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "NIH Federal Credit Union",
				"siteURL": "www.nihfcu.org"
			}
		},
		{
			"name": "NMIS, LLC",
			"fid": "027",
			"org": "NWM",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "Suite 300",
				"address2": "611 E. Wisconsin Ave.",
				"address3": null,
				"city": "Milwaukee",
				"state": "WI",
				"zip": "53202",
				"country": "USA",
				"email": "nmisappsupport@northwesternmutual.com",
				"customerServicePhone": "1-866-664-7737",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "NMIS, LLC",
				"siteURL": "http://www.nmisinvestments.com"
			}
		},
		{
			"name": "Nassau Educators FCU Quicken",
			"fid": "221480807",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1000 Corporate Dr.",
				"address2": null,
				"address3": null,
				"city": "Westbury",
				"state": "NY",
				"zip": "11590",
				"country": "USA",
				"email": "info@nassaued.org",
				"customerServicePhone": "516-561-0030",
				"technicalSupportPhone": "516-561-0030",
				"fax": null,
				"financialInstitutionName": "Nassau Educators FCU",
				"siteURL": "www.nassaued.org"
			}
		},
		{
			"name": "Nassau Financial FCU",
			"fid": "1000",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1325 Franklin Ave Plaza Ste 500",
				"address2": null,
				"address3": null,
				"city": "Garden City",
				"state": "NY",
				"zip": "11530",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "800-749-5721",
				"technicalSupportPhone": "800-749-5721",
				"fax": null,
				"financialInstitutionName": "Nassau Financial FCU",
				"siteURL": "http://www.ncfcu.org"
			}
		},
		{
			"name": "National Bank of Arizona",
			"fid": "4677",
			"org": "294-3",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04677.ofx",
			"profile": {
				"address1": "7730 South Union Park Ave",
				"address2": "Suite 250",
				"address3": null,
				"city": "Midvale",
				"state": "UT",
				"zip": "84047",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "National Bank of Arizona",
				"siteURL": "https://www.nbarizona.com/"
			}
		},
		{
			"name": "National Penn Bank",
			"fid": "6301",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06301.ofx",
			"profile": {
				"address1": "P.O. Box 547",
				"address2": null,
				"address3": null,
				"city": "Boyertown",
				"state": "PA",
				"zip": "19512",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "National Penn Bank",
				"siteURL": "http://www.natpennbank.com"
			}
		},
		{
			"name": "Nationwide Federal Credit Union",
			"fid": "00FWQ",
			"org": "Nationwide FCU",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "ONE NATIONWIDE PLAZA",
				"address2": null,
				"address3": null,
				"city": "COLUMBUS",
				"state": "OH",
				"zip": "43215",
				"country": "US",
				"email": null,
				"customerServicePhone": "8003367219",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "NATIONWIDE BANK",
				"siteURL": "https://www.netit.financial-net.com/nfcu"
			}
		},
		{
			"name": "Navigant Credit Union",
			"fid": "211589828",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1005 Douglas Pike",
				"address2": null,
				"address3": null,
				"city": "Smithfield",
				"state": "RI",
				"zip": "02917-1206",
				"country": "USA",
				"email": "info@navigantcu.org",
				"customerServicePhone": "401-233-4700",
				"technicalSupportPhone": "401-233-4700",
				"fax": "401-233-4715",
				"financialInstitutionName": "Navigant Credit Union",
				"siteURL": "www.navigantcu.org"
			}
		},
		{
			"name": "Navy Army Community Credit Union",
			"fid": "314978543",
			"org": "USERS",
			"ofx": "https://mybranch.navyarmyCCU.com/scripts/isaofx.dll",
			"profile": {
				"address1": "5725 Spohn Drive",
				"address2": null,
				"address3": null,
				"city": "Corpus Christi",
				"state": "TX",
				"zip": "78414",
				"country": "USA",
				"email": "general@navyarmyccu.com",
				"customerServicePhone": "361-986-4500",
				"technicalSupportPhone": "800-622-3631",
				"fax": "361-986-8050",
				"financialInstitutionName": "Navy Army Community Credit Union",
				"siteURL": "http://www.navyarmyccu.com"
			}
		},
		{
			"name": "Needham Bank - DC",
			"fid": "211373539",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1063 Great Plain Avenue",
				"address2": null,
				"address3": null,
				"city": "Needham",
				"state": "MA",
				"zip": "02492",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "781-474-5443",
				"technicalSupportPhone": "781-474-5443",
				"fax": null,
				"financialInstitutionName": "Needham Bank",
				"siteURL": "www.needhambankbizedge.com"
			}
		},
		{
			"name": "Net Bank",
			"fid": "122287251N",
			"org": "Intuit Financial Services",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "12777 High Bluff Dr, Ste.100",
				"address2": null,
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92130",
				"country": "USA",
				"email": "customerservice@netbank.com",
				"customerServicePhone": "866-759-7661",
				"technicalSupportPhone": "866-759-7661",
				"fax": "858-350-0443",
				"financialInstitutionName": "NetBank",
				"siteURL": "www.NetBankOnlineBanking.com"
			}
		},
		{
			"name": "NetExchange Client",
			"fid": "053",
			"org": "NXC",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "One Pershing Plaza",
				"address2": null,
				"address3": null,
				"city": "Jersey City",
				"state": "NJ",
				"zip": "07399",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "NetExchange Client",
				"siteURL": "http://www.netxclient.com"
			}
		},
		{
			"name": "NetXInvestor",
			"fid": "053",
			"org": "NXC",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "One Pershing Plaza",
				"address2": null,
				"address3": null,
				"city": "Jersey City",
				"state": "NJ",
				"zip": "07399",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "NetExchange Client",
				"siteURL": "http://www.netxclient.com"
			}
		},
		{
			"name": "Nevada State Bank - Direct",
			"fid": "4680",
			"org": "295-3",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04680.ofx",
			"profile": {
				"address1": "7730 South Union Park Ave",
				"address2": "Suite 250",
				"address3": null,
				"city": "Midvale",
				"state": "UT",
				"zip": "84047",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Nevada State Bank",
				"siteURL": "https://www.nsbank.com/"
			}
		},
		{
			"name": "New England FCU",
			"fid": "211691127",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "141 Harvest Ln",
				"address2": "PO BOX 527",
				"address3": null,
				"city": "Williston",
				"state": "VT",
				"zip": "05495-7331",
				"country": "USA",
				"email": "online@nefcu.com",
				"customerServicePhone": "(802)879-8790",
				"technicalSupportPhone": "(802)879-8790",
				"fax": "(802)879-8769",
				"financialInstitutionName": "New England FCU",
				"siteURL": "www.nefcumc.com"
			}
		},
		{
			"name": "New England Securities",
			"fid": "021",
			"org": "New England Securities",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "501 Boylston Street",
				"address2": null,
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02117",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "New England Securities",
				"siteURL": "http://nefn.com"
			}
		},
		{
			"name": "New Mexico Bank and Trust",
			"fid": "107006541",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "320 Gold SW",
				"address2": "Suite 100",
				"address3": null,
				"city": "Albuquerque",
				"state": "NM",
				"zip": "87102",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "505-830-8100",
				"technicalSupportPhone": "505-830-8100",
				"fax": null,
				"financialInstitutionName": "New Mexico Bank & Trust",
				"siteURL": "www.nmbtonline.com"
			}
		},
		{
			"name": "New Peoples Bank–Personal Accounts",
			"fid": "051408897",
			"org": "NPB",
			"ofx": "https://ofx.newpeoplesbank.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "67 Commerce Drive � PO Box 1810",
				"address2": null,
				"address3": null,
				"city": "Honaker",
				"state": "VA",
				"zip": "24260",
				"country": "USA",
				"email": "webmaster@newpeoplesbank.com",
				"customerServicePhone": "866 337 9011",
				"technicalSupportPhone": "866 337 9011",
				"fax": null,
				"financialInstitutionName": "New Peoples Bank",
				"siteURL": "www.newpeoplesbank.com"
			}
		},
		{
			"name": "New Traditions Bank",
			"fid": "063116588",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "600 Wilkinson Street",
				"address2": null,
				"address3": null,
				"city": "Orlando",
				"state": "FL",
				"zip": "32803",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "407-740-7800",
				"technicalSupportPhone": "407-740-7800",
				"fax": null,
				"financialInstitutionName": "New Traditions National Bank",
				"siteURL": "www.ntbank.net"
			}
		},
		{
			"name": "New Tripoli Bank",
			"fid": "1615",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "6748 Madison Street",
				"address2": null,
				"address3": null,
				"city": "New Tripoli",
				"state": "PA",
				"zip": "18066",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 864-5426",
				"technicalSupportPhone": "(877) 864-5426",
				"fax": null,
				"financialInstitutionName": "New Tripoli Bank - new",
				"siteURL": "http://www.newtripolibank.net"
			}
		},
		{
			"name": "New Tripoli Bank SB",
			"fid": "1622",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "6748 Madison Street, P.O. Box 468",
				"address2": null,
				"address3": null,
				"city": "New Tripoli",
				"state": "PA",
				"zip": "18066",
				"country": "US",
				"email": "sbarton@newtripolibank.net",
				"customerServicePhone": "877-202-5385, DNIS 1540",
				"technicalSupportPhone": "610-395-8834",
				"fax": null,
				"financialInstitutionName": "New Tripoli Bank",
				"siteURL": "www.newtripolibank.net"
			}
		},
		{
			"name": "Newburyport 5Cents Sv Bank",
			"fid": "211371502",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "63 State Street",
				"address2": null,
				"address3": null,
				"city": "Newburyport",
				"state": "MA",
				"zip": "01950",
				"country": "USA",
				"email": "ebank@newburyportbank.com",
				"customerServicePhone": "978-462-3136",
				"technicalSupportPhone": "978-462-3136",
				"fax": "978-462-9672",
				"financialInstitutionName": "Newburyport Five Cents Sv Bank",
				"siteURL": "www.newburyportbank.com"
			}
		},
		{
			"name": "NewportFed",
			"fid": "698",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "100 Bellevue Ave",
				"address2": null,
				"address3": null,
				"city": "Newport",
				"state": "RI",
				"zip": "02840",
				"country": "USA",
				"email": "TEWM@NewportFederal.com",
				"customerServicePhone": "866-737-6734",
				"technicalSupportPhone": "866-737-6734",
				"fax": null,
				"financialInstitutionName": "NewportFed",
				"siteURL": "http://www.newportfederal.com"
			}
		},
		{
			"name": "Newtown Savings Bank",
			"fid": "2259",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "39 Main Street",
				"address2": "Newtown, CT 06470",
				"address3": null,
				"city": "NEWTOWN",
				"state": "CT",
				"zip": "064700000",
				"country": "USA",
				"email": "onlinebank@nsbonline.com",
				"customerServicePhone": "(800) 461-0672",
				"technicalSupportPhone": "800.461.0672",
				"fax": null,
				"financialInstitutionName": "Newtown Savings Bank",
				"siteURL": "http://www.nsbonline.com/"
			}
		},
		{
			"name": "North Carolina Bank and Trust",
			"fid": "053200983",
			"org": "MZeroOneZeroNCBT",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "PO BOX 1287",
				"address2": null,
				"address3": null,
				"city": "PO BOX 1287",
				"state": "NC",
				"zip": "29116",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-877-277-2185",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "North Carolina Bank & Trust",
				"siteURL": "http://www.ncbtonline.com"
			}
		},
		{
			"name": "North Community Bank",
			"fid": "1001",
			"org": "MBG",
			"ofx": "https://personal.netbankerplus.com/ofxnorthcommunitybank/process.ofx",
			"profile": {
				"address1": "3639 N Broadway",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60613",
				"country": "USA",
				"email": "nbsupport@northcommunitybank.com",
				"customerServicePhone": "773-244-7000",
				"technicalSupportPhone": null,
				"fax": "773-244-7075",
				"financialInstitutionName": "North Community Bank",
				"siteURL": "http://www.northcommunitybank.com/"
			}
		},
		{
			"name": "NorthCountry FCU",
			"fid": "211691004",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "69 Swift St",
				"address2": "Ste 100",
				"address3": null,
				"city": "S. Burlington",
				"state": "VT",
				"zip": "05403",
				"country": "USA",
				"email": "memberservices@northcountry.org",
				"customerServicePhone": "800-660-3258",
				"technicalSupportPhone": "800-660-3258",
				"fax": null,
				"financialInstitutionName": "NorthCountry FCU",
				"siteURL": "www.northcountry.org"
			}
		},
		{
			"name": "Northbrook Bank & Trust",
			"fid": "5513",
			"org": "870",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "1100 Waukegan Road",
				"address2": null,
				"address3": null,
				"city": "Northbrook",
				"state": "IL",
				"zip": "60062",
				"country": "USA",
				"email": "customer_service@northbrookbank.com",
				"customerServicePhone": "877-243-7361",
				"technicalSupportPhone": null,
				"fax": "847-853-5786",
				"financialInstitutionName": "NortbrookBankNTrust",
				"siteURL": "http://www.northbrookbank.com"
			}
		},
		{
			"name": "Northern Trust - Banking",
			"fid": "05642",
			"org": "Northern Trust",
			"ofx": "https://ofx.ntrs.com/nta/ofxservlet",
			"profile": {
				"address1": "50 South LaSalle Street",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60675",
				"country": "USA",
				"email": "www.northerntrust.com",
				"customerServicePhone": "888-635-5350",
				"technicalSupportPhone": "888-635-5350",
				"fax": null,
				"financialInstitutionName": "The Northern Trust",
				"siteURL": "https://web-xp1-ofx.ntrs.com/ofx/ofxservlet"
			}
		},
		{
			"name": "Northern Trust - Investments",
			"fid": "05641",
			"org": "Northern Trust",
			"ofx": "https://ofx.ntrs.com/nta/ofxservlet?accounttypegroup=INV",
			"profile": {
				"address1": "50 South LaSalle Street",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60675",
				"country": "USA",
				"email": "www.northerntrust.com",
				"customerServicePhone": "888-635-5350",
				"technicalSupportPhone": "888-635-5350",
				"fax": null,
				"financialInstitutionName": "The Northern Trust",
				"siteURL": "https://web-xp1-ofx.ntrs.com/ofx/ofxservlet"
			}
		},
		{
			"name": "Northstar Bank of Texas",
			"fid": "111904817",
			"org": "MEightZeroFive",
			"ofx": "https://ofx1.evault.ws/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "400 N Carroll Blvd",
				"address2": null,
				"address3": null,
				"city": "Denton",
				"state": "TX",
				"zip": "76201",
				"country": "USA",
				"email": null,
				"customerServicePhone": "(940) 565-5177",
				"technicalSupportPhone": "(940) 383-6233",
				"fax": null,
				"financialInstitutionName": "Northstar Bank of Texas",
				"siteURL": "http://www.nstarbank.com"
			}
		},
		{
			"name": "Northwest Savings Bank",
			"fid": "243374218",
			"org": "Northwest Savings Bank",
			"ofx": "https://myofx.secure-banking.com/fi1456/ofx/ofx",
			"profile": {
				"address1": "800 State Street",
				"address2": null,
				"address3": null,
				"city": "Erie",
				"state": "PA",
				"zip": "16501",
				"country": "USA",
				"email": "onlinesupport@nwbcorp.com",
				"customerServicePhone": "8883456296",
				"technicalSupportPhone": "8883456296",
				"fax": "6164063602",
				"financialInstitutionName": "Northwest Savings Bank",
				"siteURL": "http://www.northwestsavingsbank.com"
			}
		},
		{
			"name": "Northwestern Mutual Credit Union",
			"fid": "5MQD7",
			"org": "Northwestern Mutual Credit Union",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "720 E WISCONSIN AVE",
				"address2": "Room S345",
				"address3": null,
				"city": "MILWAUKEE",
				"state": "WI",
				"zip": "53202",
				"country": "US",
				"email": null,
				"customerServicePhone": "4146653423",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "NORTHWESTERN MUTUAL CU",
				"siteURL": "https://www.netit.financial-net.com/northwesternmutual/"
			}
		},
		{
			"name": "Norwest",
			"fid": "4601",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04601.ofx",
			"profile": {
				"address1": "420 Montgomery Street",
				"address2": null,
				"address3": null,
				"city": "San Francisco",
				"state": "CA",
				"zip": "94104",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Wells Fargo",
				"siteURL": "http://www.wellsfargo.com/"
			}
		},
		{
			"name": "Notre Dame Federal Credit Union",
			"fid": "271291596",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "P.O. Box 7878",
				"address2": null,
				"address3": null,
				"city": "Notre Dame",
				"state": "IN",
				"zip": "46556",
				"country": "USA",
				"email": "eservices@ndfcu.org",
				"customerServicePhone": "574-239-6611",
				"technicalSupportPhone": "574-239-6611",
				"fax": "574-232-0167",
				"financialInstitutionName": "Notre Dame Federal Credit Union",
				"siteURL": "www.ndfcu.org"
			}
		},
		{
			"name": "ONB Bank - Business",
			"fid": "753",
			"org": "103912723",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "8908 South Yale",
				"address2": "Suite 100",
				"address3": null,
				"city": "Tulsa",
				"state": "OK",
				"zip": "74137",
				"country": "USA",
				"email": "customer_service@onbbank.com",
				"customerServicePhone": "918-477-7400",
				"technicalSupportPhone": "866-777-4375",
				"fax": null,
				"financialInstitutionName": "ONB Bank - Business",
				"siteURL": "http://www.onbbank.com"
			}
		},
		{
			"name": "ONB Bank - Personal",
			"fid": "1257",
			"org": "103912723",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "8908 South Yale",
				"address2": "Suite 100",
				"address3": null,
				"city": "Tulsa",
				"state": "OK",
				"zip": "74137",
				"country": "USA",
				"email": "customer_service@onbbank.com",
				"customerServicePhone": "918-477-7400",
				"technicalSupportPhone": "877-755-7490",
				"fax": null,
				"financialInstitutionName": "ONB Bank - Personal",
				"siteURL": "http://www.onbbank.com"
			}
		},
		{
			"name": "Ocean City Home Bank - Quicken",
			"fid": "231271080",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1001 Asbury Avenue",
				"address2": null,
				"address3": null,
				"city": "Ocean CIty",
				"state": "NJ",
				"zip": "08226-3329",
				"country": "USA",
				"email": "cservice@ochome.com",
				"customerServicePhone": "609-927-7722",
				"technicalSupportPhone": "609-927-7722",
				"fax": null,
				"financialInstitutionName": "Ocean City Home Bank",
				"siteURL": "http://www.ochome.com"
			}
		},
		{
			"name": "Ocean Communities FCU",
			"fid": "1800",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "4795 Meadow Wood Lane, Suite 300",
				"address2": null,
				"address3": null,
				"city": "Chantilly",
				"state": "VA",
				"zip": "20151",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800)442-2715",
				"technicalSupportPhone": "(800)442-2715",
				"fax": null,
				"financialInstitutionName": "Online Resources Bank",
				"siteURL": "https://www.onlinebank.com"
			}
		},
		{
			"name": "OceanFirst Bank",
			"fid": "231270353",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "975 Hooper Avenue",
				"address2": null,
				"address3": null,
				"city": "Toms River",
				"state": "NJ",
				"zip": "08753",
				"country": "USA",
				"email": "application@oceanfirst.com",
				"customerServicePhone": "732-240-4500 x7710",
				"technicalSupportPhone": "732-240-4500 x7710",
				"fax": "732-341-2579",
				"financialInstitutionName": "OceanFirst Bank",
				"siteURL": "www.oceanfirst.com"
			}
		},
		{
			"name": "Old National",
			"fid": "914",
			"org": "ONB",
			"ofx": "https://www.ofx.oldnational.com/ofxpreprocess.asp",
			"profile": {
				"address1": "420 Main Street",
				"address2": null,
				"address3": null,
				"city": "Evansville",
				"state": "IN",
				"zip": "47708",
				"country": "USA",
				"email": "eftservices@oldnational.com",
				"customerServicePhone": "800-844-1720",
				"technicalSupportPhone": "800-844-1720",
				"fax": "812-465-0625",
				"financialInstitutionName": "Old National Bank",
				"siteURL": "http://www.oldnational.com"
			}
		},
		{
			"name": "Old Plank Trail Community Bank",
			"fid": "5500",
			"org": "924",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "352 Maple Street",
				"address2": null,
				"address3": null,
				"city": "New Lenox",
				"state": "IL",
				"zip": "60451",
				"country": "USA",
				"email": "customer_service@oldplanktrailbank.com",
				"customerServicePhone": "877-810-2324",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Old Plank Trail",
				"siteURL": "http://www.oldplanktrailbank.com"
			}
		},
		{
			"name": "Old Town Bank - DC",
			"fid": "1721",
			"org": "mfis - 1721",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "2045 South Main Street",
				"address2": null,
				"address3": null,
				"city": "Waynesville",
				"state": "NC",
				"zip": "28786",
				"country": "USA",
				"email": "oldtownbank@billsupport.com",
				"customerServicePhone": "1-866-305-9032",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Old Town Bank",
				"siteURL": "www.oldtownbanking.com"
			}
		},
		{
			"name": "OmniAmerican Bank",
			"fid": "311981533",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "PO Box 150099",
				"address2": null,
				"address3": null,
				"city": "Fort Worth",
				"state": "TX",
				"zip": "76108",
				"country": "USA",
				"email": "E.Services@omniamerican.com",
				"customerServicePhone": "(866)670-6664",
				"technicalSupportPhone": "(866)670-6664",
				"fax": "(817)421-4276",
				"financialInstitutionName": "OmniAmerican Bank",
				"siteURL": "www.omniamerican.com"
			}
		},
		{
			"name": "One Nevada CU - DC",
			"fid": "10888",
			"org": "PSI",
			"ofx": "https://ssl8.onenevada.org/OFXDirect/OFXRqst.aspx",
			"profile": {
				"address1": "2645 South Mojave",
				"address2": null,
				"address3": null,
				"city": "Las Vegas",
				"state": "NV",
				"zip": "98121",
				"country": "USA",
				"email": "oncusupport@onenevada.org",
				"customerServicePhone": "(701) 457-1000",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "One Nevada Credit Union",
				"siteURL": "https://ssl8.onenevada.org/silverlink/login.asp"
			}
		},
		{
			"name": "Oppenheimer & Co. Inc.",
			"fid": "125",
			"org": "Oppenheimer",
			"ofx": "https://ofx.opco.com/eftxweb/access.ofx",
			"profile": {
				"address1": "125 Broad Street",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": "support@opco.com",
				"customerServicePhone": "1-800-555-1212",
				"technicalSupportPhone": "1-800-555-1212",
				"fax": "212-555-1212",
				"financialInstitutionName": "Oppenheimer",
				"siteURL": "http://www.opco.com"
			}
		},
		{
			"name": "OppenheimerFunds, Inc",
			"fid": "6726",
			"org": "oppenheimerfunds.com",
			"ofx": "https://webofx.oppenheimerfunds.com/eftxweb/access.ofx",
			"profile": {
				"address1": "Two World Financial Center",
				"address2": "225 Liberty Street",
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "102811008",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "1-888-470-0862",
				"technicalSupportPhone": null,
				"fax": "1-303-768-1500",
				"financialInstitutionName": "Oppenheimer Funds",
				"siteURL": "www.oppenheimerfunds.com"
			}
		},
		{
			"name": "OptionsXpress, Inc",
			"fid": "1",
			"org": "optionxpress.com",
			"ofx": "https://ofx.optionsxpress.com/cgi-bin/ox.exe",
			"profile": {
				"address1": "P. O. Box 2197",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "Il",
				"zip": "60690-2197",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "optionsXpress, Inc.",
				"siteURL": null
			}
		},
		{
			"name": "Oregon College Savings Plan",
			"fid": "51498",
			"org": "tiaaoregon",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=b1908000027141704061413",
			"profile": {
				"address1": "PO Box 55914",
				"address2": null,
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02205-5914",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Oregon College Savings Plan",
				"siteURL": null
			}
		},
		{
			"name": "Oregon Community Credit Union",
			"fid": "2077",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "PO Box 77002",
				"address2": null,
				"address3": null,
				"city": "Eugene",
				"state": "OR",
				"zip": "97401-0146",
				"country": "USA",
				"email": "mpenn@OregonCommunityCU.org",
				"customerServicePhone": "800-365-1111",
				"technicalSupportPhone": "800-365-1111",
				"fax": null,
				"financialInstitutionName": "Oregon Community Credit Union",
				"siteURL": "http://www.OregonCommunityCU.org"
			}
		},
		{
			"name": "Ozark Mountain Bank - Business",
			"fid": "766",
			"org": "081518375",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "400 South Business 65",
				"address2": null,
				"address3": null,
				"city": "Branson",
				"state": "MO",
				"zip": "65616",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "866-777-7915",
				"technicalSupportPhone": "866-777-7915",
				"fax": null,
				"financialInstitutionName": "Ozark Mountain Bank - Business",
				"siteURL": "www.ozkmtnbank.com"
			}
		},
		{
			"name": "Ozark Mountain Bank - Personal",
			"fid": "166",
			"org": "081518375",
			"ofx": "https://ofx.centralbancompany.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "400 South Business 65",
				"address2": null,
				"address3": null,
				"city": "Branson",
				"state": "MO",
				"zip": "65616",
				"country": "USA",
				"email": "twilla_duvall@centralbank.net",
				"customerServicePhone": "800-752-3495",
				"technicalSupportPhone": "800-752-3495",
				"fax": null,
				"financialInstitutionName": "Ozark Mountain Bank - Personal",
				"siteURL": "http://www.ozkmtnbank.com/"
			}
		},
		{
			"name": "PNC Bank",
			"fid": "4501",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04501.ofx",
			"profile": {
				"address1": "P.O. Box 339",
				"address2": null,
				"address3": null,
				"city": "Pittsburgh",
				"state": "PA",
				"zip": "152309736",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "PNC Bank",
				"siteURL": "http://www.pncbank.com/"
			}
		},
		{
			"name": "PSECU-new",
			"fid": "231381116",
			"org": "PENNSTATEEMPLOYEES",
			"ofx": "https://directconnect.psecu.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1 Credit Union Pl",
				"address2": null,
				"address3": null,
				"city": "Harrisburg",
				"state": "PA",
				"zip": "17110",
				"country": "USA",
				"email": "PSECU@psecu.com",
				"customerServicePhone": "800-237-7328",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "PSECU",
				"siteURL": null
			}
		},
		{
			"name": "Pacific Capital Bank, N.A.",
			"fid": "5524",
			"org": "pfm-l3g",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "P. O. Box 60839",
				"address2": null,
				"address3": null,
				"city": "Santa Barbara",
				"state": "CA",
				"zip": "93160",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-888-400-7228",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "PacificCapitalBank",
				"siteURL": "http://www.pcbancorp.com"
			}
		},
		{
			"name": "Park View Federal Credit Union",
			"fid": "13972",
			"org": "Connect",
			"ofx": "https://moneyview.pvfcu.org/ofxdirect/ofxrqst.aspx",
			"profile": {
				"address1": "1675 Virginia Avenue",
				"address2": null,
				"address3": null,
				"city": "Harrisonburg",
				"state": "VA",
				"zip": "22802",
				"country": "USA",
				"email": null,
				"customerServicePhone": "5404346444",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Park View Federal Credit Union",
				"siteURL": null
			}
		},
		{
			"name": "Partners Federal Credit Union",
			"fid": "2097",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "100 N 1st Street, Suite 400",
				"address2": null,
				"address3": null,
				"city": "Burbank",
				"state": "CA",
				"zip": "91502",
				"country": "USA",
				"email": "pfcu.ecommerce.qa@partnersfcu.org",
				"customerServicePhone": "800-948-6677",
				"technicalSupportPhone": "800-948-6677",
				"fax": null,
				"financialInstitutionName": "Partners Federal Credit Union",
				"siteURL": "https://partnersfcu.org/"
			}
		},
		{
			"name": "Patelco CU",
			"fid": "2000",
			"org": "Patelco Credit Union",
			"ofx": "https://ofx.patelco.org",
			"profile": {
				"address1": "156 Second Street",
				"address2": null,
				"address3": null,
				"city": "San Francisco",
				"state": "CA",
				"zip": "94105",
				"country": "USA",
				"email": "patelco@patelco.org",
				"customerServicePhone": "415-442-6200",
				"technicalSupportPhone": "800-358-8228",
				"fax": "415-442-7139",
				"financialInstitutionName": "Patelco Credit Union",
				"siteURL": "http://www.patelco.org"
			}
		},
		{
			"name": "Path2College 529 Plan",
			"fid": "52902",
			"org": "tiaaga",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=719080000270600",
			"profile": {
				"address1": "PO Box 105307",
				"address2": null,
				"address3": null,
				"city": "Atlanta",
				"state": "GA",
				"zip": "30348-5307",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Path2College 529 Plan",
				"siteURL": null
			}
		},
		{
			"name": "People's Credit Union - RI",
			"fid": "1017",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "858 West Main Road",
				"address2": null,
				"address3": null,
				"city": "Middletown",
				"state": "RI",
				"zip": "02842",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "1-800-498-8930",
				"technicalSupportPhone": "1-800-498-8930",
				"fax": null,
				"financialInstitutionName": "People's Credit Union",
				"siteURL": "http://www.peoplescu.com/"
			}
		},
		{
			"name": "People's United Bank - CT",
			"fid": "5534",
			"org": "136",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "850 Main St, 11th Floor",
				"address2": null,
				"address3": null,
				"city": "Bridgeport",
				"state": "CT",
				"zip": "06604",
				"country": "USA",
				"email": "custserv@peoples.com",
				"customerServicePhone": "203-338-7171",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Peoples United Bank",
				"siteURL": "www.peoples.com"
			}
		},
		{
			"name": "PeoplesBank - Holyoke MA - Business",
			"fid": "450",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "330 Whitney Avenue",
				"address2": null,
				"address3": null,
				"city": "Holyoke",
				"state": "MA",
				"zip": "01040",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "877-314-1578",
				"technicalSupportPhone": "877-314-1578",
				"fax": null,
				"financialInstitutionName": "PeoplesBank",
				"siteURL": "http://www.bankatpeoples.com"
			}
		},
		{
			"name": "Pershing Advisor Solutions",
			"fid": "015",
			"org": "IMS",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "One Pershing Plaza",
				"address2": null,
				"address3": null,
				"city": "Jersey City",
				"state": "NJ",
				"zip": "07399",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "Pershing Advisor Solutions",
				"siteURL": "http://www.netxinvestor.com"
			}
		},
		{
			"name": "Picatinny Federal Credit Union",
			"fid": "221275216",
			"org": "Users",
			"ofx": "https://personalfinance.picacreditunion.com/scripts/isaofx.dll",
			"profile": {
				"address1": "100 Mineral Springs Drive",
				"address2": null,
				"address3": null,
				"city": "Dover",
				"state": "NJ",
				"zip": "07801",
				"country": "USA",
				"email": "homebanking@picacreditunion.com",
				"customerServicePhone": "973-361-5225",
				"technicalSupportPhone": "973-361-5225",
				"fax": "973-361-8850",
				"financialInstitutionName": "Picatinny Federal Credit Union",
				"siteURL": "http://www.picacreditunion.com"
			}
		},
		{
			"name": "Pinnacle Bank of South Carolina",
			"fid": "4104",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P.O. BOX 6508",
				"address2": "GREENVILLE SC 29606",
				"address3": null,
				"city": "GREENVILLE",
				"state": "SC",
				"zip": "296070000",
				"country": "USA",
				"email": "nettellerservicegroup@pinnaclebanksc.com",
				"customerServicePhone": "(864) 233-6915",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "PINNACLE BANK OF SC",
				"siteURL": "http://www.pinnaclebanksc.com"
			}
		},
		{
			"name": "Pinnacle Federal Credit Union",
			"fid": "815",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "135 Raritan Center Parkway",
				"address2": null,
				"address3": null,
				"city": "Edison",
				"state": "NJ",
				"zip": "08837",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(866) 270-3619",
				"technicalSupportPhone": "(866) 270-3619",
				"fax": null,
				"financialInstitutionName": "Pinnacle Federal Credit Union",
				"siteURL": "http://www.pinnaclefcu.com"
			}
		},
		{
			"name": "Pioneer Credit Union",
			"fid": "275977777",
			"org": "VIFI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "825 Morris Avenue",
				"address2": null,
				"address3": null,
				"city": "Green Bay",
				"state": "WI",
				"zip": "54304",
				"country": "USA",
				"email": "CUHome@pioneercu.org",
				"customerServicePhone": "920-494-2828",
				"technicalSupportPhone": "920-494-2828",
				"fax": null,
				"financialInstitutionName": "Pioneer Credit Union",
				"siteURL": "www.pioneercu.org"
			}
		},
		{
			"name": "Pioneer Valley Postal FCU",
			"fid": "1211",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "246 Brookdale Drive",
				"address2": null,
				"address3": null,
				"city": "Springfield",
				"state": "MA",
				"zip": "01104",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 793-1448",
				"technicalSupportPhone": "(877) 793-1448",
				"fax": null,
				"financialInstitutionName": "Pioneer Valley Postal FCU",
				"siteURL": "www.pioneervalley.coop"
			}
		},
		{
			"name": "Point Breeze Credit Union Direct",
			"fid": "252076565",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "11104 McCormick Rd",
				"address2": null,
				"address3": null,
				"city": "Hunt Valley",
				"state": "MD",
				"zip": "21031",
				"country": "USA",
				"email": "mail@pbcu.com",
				"customerServicePhone": "(410)584-7228",
				"technicalSupportPhone": "(410)584-7228",
				"fax": "410-584-7438",
				"financialInstitutionName": "Point Breeze Credit Union",
				"siteURL": "www.pbcu.com"
			}
		},
		{
			"name": "Premier America Credit Union",
			"fid": "322283990",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "19867 Prairie Street",
				"address2": null,
				"address3": null,
				"city": "Chatsworth",
				"state": "CA",
				"zip": "91311",
				"country": "USA",
				"email": "info@premier.org",
				"customerServicePhone": "800-772-4000",
				"technicalSupportPhone": "800-772-4000",
				"fax": "818-772-4175",
				"financialInstitutionName": "Premier America Credit Union",
				"siteURL": "www.premier.org"
			}
		},
		{
			"name": "Premier Bank - Tallahassee, FL",
			"fid": "1419",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "PO BOX 3606",
				"address2": "TALLAHASSEE, FL 32315",
				"address3": null,
				"city": "CONWAY",
				"state": "AR",
				"zip": "720320000",
				"country": "USA",
				"email": "CustomerCare@premier-bank.com",
				"customerServicePhone": "(850) 386-2225",
				"technicalSupportPhone": "(850)386-2225",
				"fax": null,
				"financialInstitutionName": "CENTENNIAL BANK",
				"siteURL": "http://www.premier-bank.com"
			}
		},
		{
			"name": "Premier Bank Rochester",
			"fid": "1597",
			"org": "olb-3397",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "421 1st Avenue SW",
				"address2": null,
				"address3": null,
				"city": "Rochester",
				"state": "MN",
				"zip": "55902",
				"country": "USA",
				"email": "billpay@premierbanks.com",
				"customerServicePhone": "800-772-6497",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Premier Bank Rochester",
				"siteURL": "http://www.premierbanks.com"
			}
		},
		{
			"name": "Premier Members Federal Credit Union",
			"fid": "307074551",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "5495 Arapahoe Avenue",
				"address2": null,
				"address3": null,
				"city": "Boulder",
				"state": "CO",
				"zip": "80303",
				"country": "USA",
				"email": "mail@premiermembers.org",
				"customerServicePhone": "(303) 657-7151",
				"technicalSupportPhone": "(303) 657-7151",
				"fax": "(303) 657-7358",
				"financialInstitutionName": "Premier Members FCU",
				"siteURL": "www.premiermembers.org"
			}
		},
		{
			"name": "Presidential Bank",
			"fid": "255073345",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "4520 East West Hwy",
				"address2": null,
				"address3": null,
				"city": "Bethesda",
				"state": "MD",
				"zip": "20814",
				"country": "USA",
				"email": "email@presidential.com",
				"customerServicePhone": "800-383-6266",
				"technicalSupportPhone": "800-383-6266",
				"fax": "301-951-3582",
				"financialInstitutionName": "Presidential Bank, FSB",
				"siteURL": "http://www.presidential.com"
			}
		},
		{
			"name": "Principal Financial Group",
			"fid": "033",
			"org": "Principal Financial Group",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "711 High Street",
				"address2": null,
				"address3": null,
				"city": "Des Moines",
				"state": "IA",
				"zip": "50392",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "888-774-6267",
				"technicalSupportPhone": "-",
				"fax": "515-248-0112",
				"financialInstitutionName": "Principal Financial Group",
				"siteURL": "http://www.principal.com"
			}
		},
		{
			"name": "Principal Funds",
			"fid": "16857",
			"org": "principal",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=722120617142015",
			"profile": {
				"address1": "711 High Street",
				"address2": null,
				"address3": null,
				"city": "Des Moines",
				"state": "IA",
				"zip": "50392",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Principal",
				"siteURL": null
			}
		},
		{
			"name": "Private Bank of Buckhead",
			"fid": "7292",
			"org": "mfis-7292",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "3565 Piedmont Road",
				"address2": "Building Three, Suite 210",
				"address3": null,
				"city": "Atlanta",
				"state": "GA",
				"zip": "30305",
				"country": "USA",
				"email": "ebanking@PrivateBankofBuckhead.com",
				"customerServicePhone": "404-264-7979",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Private Bank of Buckhead",
				"siteURL": "www.privatebankofbuckhead.com"
			}
		},
		{
			"name": "Provident Credit Union",
			"fid": "1830",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "303 Twin Dolphin Dr",
				"address2": null,
				"address3": null,
				"city": "Redwood City",
				"state": "CA",
				"zip": "94065",
				"country": "USA",
				"email": "ccerpa@providentcu.org",
				"customerServicePhone": "800-632-4600",
				"technicalSupportPhone": "800-632-4600",
				"fax": null,
				"financialInstitutionName": "Provident Credit Union-Quicken",
				"siteURL": "http://www.providentcu.org"
			}
		},
		{
			"name": "Prudential Retirement",
			"fid": "1271",
			"org": "Prudential Retirement Services",
			"ofx": "https://ofx.prudential.com/eftxweb/EFTXWebRedirector",
			"profile": {
				"address1": "Gateway Center 3",
				"address2": "11th Floor",
				"address3": null,
				"city": "Newark",
				"state": "NJ",
				"zip": "07102",
				"country": "USA",
				"email": "rsofeedback@prudential.com",
				"customerServicePhone": "(800)562-8838",
				"technicalSupportPhone": "(732)482-6356",
				"fax": null,
				"financialInstitutionName": "Prudential Inc.",
				"siteURL": "www.prudential.com/online/retirement/"
			}
		},
		{
			"name": "Qualstar Credit Union",
			"fid": "325081966",
			"org": "QUALSTARCU",
			"ofx": "https://ofx.qualstarcu.com/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "2115 152nd Avenue NE",
				"address2": null,
				"address3": null,
				"city": "Redmond",
				"state": "WA",
				"zip": "98052",
				"country": "USA",
				"email": "ofxsupport@qualstarcu.com",
				"customerServicePhone": "1-800-848-0018",
				"technicalSupportPhone": "425-643-3400",
				"fax": null,
				"financialInstitutionName": "Qualstar Credit Union",
				"siteURL": "www.qualstarcu.com"
			}
		},
		{
			"name": "Queensborough NB&T-Direct Consumer",
			"fid": "061103975",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "113 East Broad Street",
				"address2": "Post Office Box 467",
				"address3": null,
				"city": "Louisville",
				"state": "GA",
				"zip": "30434",
				"country": "USA",
				"email": "customerservice@qnbtrust.com",
				"customerServicePhone": "912-552-7317",
				"technicalSupportPhone": "912-552-7317",
				"fax": null,
				"financialInstitutionName": "Queensborough National Bank & Tr",
				"siteURL": "www.qnbtdi.com"
			}
		},
		{
			"name": "Quincy Credit Union",
			"fid": "211385297",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "380 Washington Street",
				"address2": null,
				"address3": null,
				"city": "Quincy",
				"state": "MA",
				"zip": "02169",
				"country": "USA",
				"email": "qcu@qcu.org",
				"customerServicePhone": "617-479-5558",
				"technicalSupportPhone": "617-479-5558",
				"fax": "617-479-6142",
				"financialInstitutionName": "Quincy Credit Union",
				"siteURL": "www.qcu.org"
			}
		},
		{
			"name": "RBC Bank USA - Business Accounts Only",
			"fid": "1901",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01901.ofx",
			"profile": {
				"address1": "PO Box 1220",
				"address2": null,
				"address3": null,
				"city": "Rocky Mount",
				"state": "NC",
				"zip": "27802",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Centura Bank",
				"siteURL": "http://www.centura.com/"
			}
		},
		{
			"name": "RBC Wealth Management",
			"fid": "8035",
			"org": "RBC Dain Rauscher",
			"ofx": "https://ofx.rbc.com",
			"profile": {
				"address1": "RBC Plaza",
				"address2": "60 South 6th Street",
				"address3": null,
				"city": "Minneapolis",
				"state": "MN",
				"zip": "55402",
				"country": "USA",
				"email": "connectdesk@rbc.com",
				"customerServicePhone": "888.281.4094",
				"technicalSupportPhone": "888.281.4094",
				"fax": "612.607.8016",
				"financialInstitutionName": "RBC Wealth Management",
				"siteURL": "http://www.rbcwm-usa.com"
			}
		},
		{
			"name": "Rabobank",
			"fid": "1001",
			"org": "RBB",
			"ofx": "https://ofx.rabobankamerica.com/ofx/process.ofx",
			"profile": {
				"address1": "PO Box 6002",
				"address2": null,
				"address3": null,
				"city": "Arroyo Grande",
				"state": "CA",
				"zip": "93420",
				"country": "USA",
				"email": "ebanking@rabobank.com",
				"customerServicePhone": "800-959-2399",
				"technicalSupportPhone": "800-959-2399",
				"fax": null,
				"financialInstitutionName": "Rabobank",
				"siteURL": "http://www.rabobankamerica.com"
			}
		},
		{
			"name": "Raymond James",
			"fid": "1021",
			"org": "Raymond James & Associates",
			"ofx": "https://directconnect.rjf.com/eftxweb/access.ofx",
			"profile": {
				"address1": "880 Carillon Parkway",
				"address2": null,
				"address3": null,
				"city": "St. Petersburg",
				"state": "FL",
				"zip": "33716",
				"country": "USA",
				"email": "InvestorAccess@RaymondJames.com",
				"customerServicePhone": "877-752-2237",
				"technicalSupportPhone": "877-752-2237",
				"fax": null,
				"financialInstitutionName": "Raymond James & Associates",
				"siteURL": "www.RaymondJames.com"
			}
		},
		{
			"name": "Redstone Federal Credit Union",
			"fid": "262275835",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "220 Wynn Dr NW",
				"address2": null,
				"address3": null,
				"city": "Huntsville",
				"state": "AL",
				"zip": "35893-0001",
				"country": "USA",
				"email": "general-info@redfcu.org",
				"customerServicePhone": "1-800-234-1234",
				"technicalSupportPhone": "1-800-234-1234",
				"fax": "256-722-3655",
				"financialInstitutionName": "Redstone Federal Credit Union",
				"siteURL": "https://www.redfcu.org"
			}
		},
		{
			"name": "Regions Bank - OLD",
			"fid": "1001",
			"org": "AmSouth",
			"ofx": "https://securebank.regions.com/OfxPipeline/ofx.ofx",
			"profile": {
				"address1": "P.O. Box 11007",
				"address2": null,
				"address3": null,
				"city": "Birmingham",
				"state": "AL",
				"zip": "35288",
				"country": "USA",
				"email": "moreinfo@regions.com",
				"customerServicePhone": "888-472-2265",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Regions Bank",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "Regions Financial",
			"fid": "14281",
			"org": "AmSouth",
			"ofx": "https://securebank.regions.com/OfxPipeline/ofx.ofx",
			"profile": {
				"address1": "P.O. Box 11007",
				"address2": null,
				"address3": null,
				"city": "Birmingham",
				"state": "AL",
				"zip": "35288",
				"country": "USA",
				"email": "moreinfo@regions.com",
				"customerServicePhone": "888-472-2265",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Regions Bank",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "Reliant Community Federal CU",
			"fid": "222382438",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "10 Benton Place",
				"address2": null,
				"address3": null,
				"city": "Sodus",
				"state": "NY",
				"zip": "14551",
				"country": "USA",
				"email": "reliant@reliantcu.com",
				"customerServicePhone": "1-800-724-9282",
				"technicalSupportPhone": "1-800-724-9282",
				"fax": "315-483-3126",
				"financialInstitutionName": "Reliant Community Federal CU",
				"siteURL": "www.reliantcu.com"
			}
		},
		{
			"name": "Republic Bank & Trust",
			"fid": "083001314",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "601 W Market Street",
				"address2": null,
				"address3": null,
				"city": "Louisville",
				"state": "KY",
				"zip": "40202",
				"country": "USA",
				"email": "info@republicbank.com",
				"customerServicePhone": "888-782-3333",
				"technicalSupportPhone": "888-782-3333",
				"fax": "502-420-1812",
				"financialInstitutionName": "Republic Bank & Trust Company",
				"siteURL": "http://www.republicbank.com"
			}
		},
		{
			"name": "Rivermark Community CU",
			"fid": "323076012",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "PO Box 4044",
				"address2": null,
				"address3": null,
				"city": "Beaverton,",
				"state": "OR",
				"zip": "97076-4044",
				"country": "USA",
				"email": "mbrsvcs@rivermarkcu.org",
				"customerServicePhone": "(503) 626-6600",
				"technicalSupportPhone": "(503) 626-6600",
				"fax": "(503) 233-9223",
				"financialInstitutionName": "Rivermark Credit Union",
				"siteURL": "www.rivermarkcu.org"
			}
		},
		{
			"name": "Robert W. Baird & Co.",
			"fid": "1109",
			"org": "Robert W. Baird & Co.",
			"ofx": "https://ofx.rwbaird.com",
			"profile": {
				"address1": "777 East Wisconsin Avenue",
				"address2": null,
				"address3": null,
				"city": "Milwaukee",
				"state": "WI",
				"zip": "53202",
				"country": "USA",
				"email": "info@rwbaird.com",
				"customerServicePhone": "414.765.3500",
				"technicalSupportPhone": "414.765.3500",
				"fax": "414.765.3500",
				"financialInstitutionName": "Robert W. Baird & Co.",
				"siteURL": "http://www.rwbaird.com"
			}
		},
		{
			"name": "Rock Canyon Bank",
			"fid": "124302914",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "475 East State Road",
				"address2": null,
				"address3": null,
				"city": "Pleasant Grove",
				"state": "UT",
				"zip": "84062",
				"country": "USA",
				"email": "info@westerncommunitybank.com",
				"customerServicePhone": "801-222-9006",
				"technicalSupportPhone": "801-222-9006",
				"fax": "801-222-9020",
				"financialInstitutionName": "Western Community Bank",
				"siteURL": "www.westerncommunitybank.com"
			}
		},
		{
			"name": "Royal Alliance",
			"fid": "045",
			"org": "AIG Royal Alliance Associates",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "1 World Financial Center",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10281",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "Royal Alliance",
				"siteURL": "http://www.royalalliance.com"
			}
		},
		{
			"name": "S&T Bank",
			"fid": "5013",
			"org": "368",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "PO BOX 190",
				"address2": null,
				"address3": null,
				"city": "Indiana",
				"state": "PA",
				"zip": "15701",
				"country": "USA",
				"email": "eft.services@stbank.net",
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": "412-465-5450",
				"financialInstitutionName": "SNTBank",
				"siteURL": "www.stbank.com"
			}
		},
		{
			"name": "SAFE Credit Union",
			"fid": "321173742",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "4636 Watt Avenue",
				"address2": null,
				"address3": null,
				"city": "North Highlands",
				"state": "CA",
				"zip": "95660",
				"country": "USA",
				"email": "onlinesupport@safecu.org",
				"customerServicePhone": "916-979-7233",
				"technicalSupportPhone": "916-979-7233",
				"fax": null,
				"financialInstitutionName": "Safe Credit Union",
				"siteURL": "http://www.safecu.org"
			}
		},
		{
			"name": "SAFE Federal Credit Union",
			"fid": "253279691",
			"org": "USERS",
			"ofx": "https://safenet.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Sacramento Credit Union",
			"fid": "1",
			"org": "SACRAMENTO CREDIT UNION",
			"ofx": "https://homebank.sactocu.org/ofx/ofx.dll",
			"profile": {
				"address1": "P.O. BOX 2351",
				"address2": null,
				"address3": null,
				"city": "Sacramento",
				"state": "CA",
				"zip": "95812",
				"country": "USA",
				"email": "info@sactocu.org",
				"customerServicePhone": "916 444 6070",
				"technicalSupportPhone": null,
				"fax": "916 449 2765",
				"financialInstitutionName": "Sacramento Credit Union",
				"siteURL": "https://homebank.sactocu.org"
			}
		},
		{
			"name": "Salem Five",
			"fid": "5007",
			"org": "126",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "210 Essex Street",
				"address2": null,
				"address3": null,
				"city": "Salem",
				"state": "MA",
				"zip": "01970",
				"country": "USA",
				"email": "mail@salemfive.com",
				"customerServicePhone": "800-332-2265",
				"technicalSupportPhone": "800-332-2265",
				"fax": "978-720-5850",
				"financialInstitutionName": "SalemFiveCentsSavingsBank",
				"siteURL": "www.salemfive.com"
			}
		},
		{
			"name": "Salisbury Bank and Trust Company",
			"fid": "11186",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "5 BISSELL STREET, PO BOX 1868",
				"address2": "LAKEVILLE, CT 06039",
				"address3": null,
				"city": "CANAAN",
				"state": "CT",
				"zip": "060180000",
				"country": "USA",
				"email": "customersupport@salisburybank.com",
				"customerServicePhone": "(860) 435-9801",
				"technicalSupportPhone": "860-596-2444",
				"fax": null,
				"financialInstitutionName": "SALISBURY BANK AND TRUST CO",
				"siteURL": "http://www.salisburybank.com"
			}
		},
		{
			"name": "Salomon Smith Barney",
			"fid": "3201",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/03201.ofx",
			"profile": {
				"address1": "388 Greenwich St. 10th Floor",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10013",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Smith Barney",
				"siteURL": "http://www.smithbarney.com"
			}
		},
		{
			"name": "Sandia Laboratory FCU",
			"fid": "1001",
			"org": "SLFCU",
			"ofx": "https://ofx-prod.slfcu.org/ofx/process.ofx",
			"profile": {
				"address1": "3707 Juan Tabo Blvd. N.E.",
				"address2": null,
				"address3": null,
				"city": "Albuquerque",
				"state": "NM",
				"zip": "87111",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "505-293-0500",
				"technicalSupportPhone": "505-237-3725",
				"fax": null,
				"financialInstitutionName": "SLFCU",
				"siteURL": "https://www.slfcu.org/"
			}
		},
		{
			"name": "Sandia Laboratory FCU - New",
			"fid": "1977",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "P.O Box 18044",
				"address2": null,
				"address3": null,
				"city": "Albuquerque",
				"state": "NM",
				"zip": "87185",
				"country": "USA",
				"email": null,
				"customerServicePhone": "505-292-6343 x 5",
				"technicalSupportPhone": "505-292-6343 x 5",
				"fax": null,
				"financialInstitutionName": "Sandia Area Federal Credit Union",
				"siteURL": "https://www.sandia.org/ASP/home.asp"
			}
		},
		{
			"name": "Savings Institute Bank & Trust",
			"fid": "394",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "803 Main Street",
				"address2": null,
				"address3": null,
				"city": "Willimantic",
				"state": "CT",
				"zip": "06226",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 423-0142",
				"technicalSupportPhone": "(800) 423-0142",
				"fax": null,
				"financialInstitutionName": "Savings Institute Bank and Trust",
				"siteURL": "http://www.savingsinstitute.com"
			}
		},
		{
			"name": "ScholarShare College Savings Plan",
			"fid": "53532",
			"org": "tiaaca",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=719080000270200",
			"profile": {
				"address1": "PO Box 55205",
				"address2": null,
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02205-5205",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "ScholarShare CSP",
				"siteURL": null
			}
		},
		{
			"name": "Schools Financial Credit Union",
			"fid": "14568",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "P.O. Box 526001",
				"address2": "Sacramento, CA 95852",
				"address3": null,
				"city": "SACRAMENTO",
				"state": "CA",
				"zip": "958526001",
				"country": "USA",
				"email": "memberservices@schools.org",
				"customerServicePhone": "(800) 962-0990",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Schools Financial Credit Union",
				"siteURL": "https://www.schools.org/"
			}
		},
		{
			"name": "SchoolsFirst FCU",
			"fid": "17600",
			"org": "OCTFCU",
			"ofx": "https://ofx.octfcu.org",
			"profile": {
				"address1": "15442 Del Amo Ave",
				"address2": null,
				"address3": null,
				"city": "Tustin",
				"state": "CA",
				"zip": "92780",
				"country": "USA",
				"email": "info@octfcu.org",
				"customerServicePhone": "714.258.8700",
				"technicalSupportPhone": "714.258.8700",
				"fax": "714.258.4258",
				"financialInstitutionName": "OCTFCU",
				"siteURL": "http://www.octfcu.org"
			}
		},
		{
			"name": "Schwab - The 401k Company",
			"fid": "11811",
			"org": "The 401k Company",
			"ofx": "https://ofx1.401kaccess.com",
			"profile": {
				"address1": "98 San Jacinto Blvd.",
				"address2": "Suite 1100",
				"address3": null,
				"city": "Austin",
				"state": "TX",
				"zip": "78701",
				"country": "USA",
				"email": "partserv@the401k.com",
				"customerServicePhone": "(800) 777-4015",
				"technicalSupportPhone": "(800) 777-4015",
				"fax": "(512) 397-6605",
				"financialInstitutionName": "The 401k Company",
				"siteURL": "http://www.the401k.com"
			}
		},
		{
			"name": "Schwab Retirement Plan Services",
			"fid": "3184",
			"org": "SchwabRPS",
			"ofx": "https://ofx.schwab.com/rps/ofx_server",
			"profile": {
				"address1": "101 Montgomery Street",
				"address2": null,
				"address3": null,
				"city": "San Francisco",
				"state": "CA",
				"zip": "94104",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Charles Schwab & Co., Inc.",
				"siteURL": "WWW.SCHWAB.COM"
			}
		},
		{
			"name": "Scottrade",
			"fid": "777",
			"org": "Scottrade",
			"ofx": "https://ofx.scottrade.com",
			"profile": {
				"address1": "12855 Flushing Meadows Dr.",
				"address2": null,
				"address3": null,
				"city": "St. Louis",
				"state": "MO",
				"zip": "63131",
				"country": "USA",
				"email": "support@scottrade.com",
				"customerServicePhone": "314.965.1555",
				"technicalSupportPhone": "314.965.1555",
				"fax": "314.965.1555",
				"financialInstitutionName": "Scottrade, Inc.",
				"siteURL": "http://www.scottrade.com"
			}
		},
		{
			"name": "Scottrade Bank",
			"fid": "14632",
			"org": "Scottrade Bank",
			"ofx": "https://ofx.scottrade.com",
			"profile": {
				"address1": "12855 Flushing Meadows Dr.",
				"address2": null,
				"address3": null,
				"city": "St. Louis",
				"state": "MO",
				"zip": "63131",
				"country": "USA",
				"email": "support@scottrade.com",
				"customerServicePhone": "314.965.1555",
				"technicalSupportPhone": "314.965.1555",
				"fax": "314.965.1555",
				"financialInstitutionName": "Scottrade Bank, Inc.",
				"siteURL": "http://www.scottrade.com"
			}
		},
		{
			"name": "Sears Card",
			"fid": "26810",
			"org": "CITIGROUP",
			"ofx": "https://www.accountonline.com/cards/svc/CitiOfxManager.do",
			"profile": {
				"address1": "8787 Baypine Road",
				"address2": null,
				"address3": null,
				"city": "Jacksonville",
				"state": "FL",
				"zip": "32256",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Sears",
				"siteURL": "www.citicards.com"
			}
		},
		{
			"name": "Securian Financial Services, Inc.",
			"fid": "029",
			"org": "Securian Financial Services, Inc",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "400 Robert Street North",
				"address2": null,
				"address3": null,
				"city": "Saint Paul",
				"state": "MN",
				"zip": "55101",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "888-237-1838",
				"technicalSupportPhone": "888-237-1838",
				"fax": "651-665-1647",
				"financialInstitutionName": "Securian Financial Services,Inc.",
				"siteURL": "http://www.securianfinancial.com"
			}
		},
		{
			"name": "Securityplus FCU",
			"fid": "252076714",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "PO Box 47128",
				"address2": null,
				"address3": null,
				"city": "Baltimore",
				"state": "MD",
				"zip": "21244",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "410-965-8908",
				"technicalSupportPhone": null,
				"fax": "410-281-6273",
				"financialInstitutionName": "Securityplus Federal CreditUnion",
				"siteURL": "www.securityplusfcuhb.org"
			}
		},
		{
			"name": "Select Bank & Trust - New",
			"fid": "2565",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "700 WEST CUMBERLAND STREET",
				"address2": "DUNN NC 28334",
				"address3": null,
				"city": "DUNN",
				"state": "NC",
				"zip": "283340000",
				"country": "USA",
				"email": "electronicbanking@selectbank.com",
				"customerServicePhone": "(877) 610-7315",
				"technicalSupportPhone": "877-610-7315",
				"fax": null,
				"financialInstitutionName": "SELECT BANK & TRUST",
				"siteURL": "https://www.selectbank.com/"
			}
		},
		{
			"name": "Sentinel Investments",
			"fid": "18480",
			"org": "Sentinel Investments",
			"ofx": "https://ofx.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=81804131908130411",
			"profile": {
				"address1": "P.O. Box 1499",
				"address2": null,
				"address3": null,
				"city": "Montpelier",
				"state": "VT",
				"zip": "05601",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Sentinel Investments",
				"siteURL": null
			}
		},
		{
			"name": "Sentinel Securities, Inc .",
			"fid": "051",
			"org": "Sentinel Securities, Inc.",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "55 Walkers Brook Drive,",
				"address2": "Suite 100",
				"address3": null,
				"city": "Reading",
				"state": "MA",
				"zip": "01867",
				"country": "USA",
				"email": "clientcare@sbgi.com",
				"customerServicePhone": "888-880-1330",
				"technicalSupportPhone": "781-213-7390",
				"fax": "-",
				"financialInstitutionName": "Sentinel Securities, Inc.",
				"siteURL": "http://www.sentinelsecurities.com"
			}
		},
		{
			"name": "Service Credit Union",
			"fid": "211489656",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3003 Lafayette Road",
				"address2": "PO Box 1268",
				"address3": null,
				"city": "Portsmouth",
				"state": "NH",
				"zip": "0380-1268",
				"country": "USA",
				"email": "scu@servicecu.org",
				"customerServicePhone": "800-936-7730",
				"technicalSupportPhone": "800-936-7730",
				"fax": "603-422-8451",
				"financialInstitutionName": "Service Credit Union",
				"siteURL": "www.servicecu.org"
			}
		},
		{
			"name": "ServisFirst Bank",
			"fid": "2370",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "850 Shades Creek Pkwy Ste 200",
				"address2": "Birmingham, AL 35209",
				"address3": null,
				"city": "BIRMINGHAM",
				"state": "AL",
				"zip": "352090000",
				"country": "USA",
				"email": "cashmgmtinfo@servisfirstbank.com",
				"customerServicePhone": "(205) 949-0302",
				"technicalSupportPhone": "(866)922-5794",
				"fax": null,
				"financialInstitutionName": "ServisFirst Bank           SVF",
				"siteURL": "http://www.servisfirstbank.com"
			}
		},
		{
			"name": "ShareBuilder",
			"fid": "5575",
			"org": "ShareBuilder",
			"ofx": "https://ofx.sharebuilder.com",
			"profile": {
				"address1": "1445 120th Ave NE",
				"address2": null,
				"address3": null,
				"city": "Bellevue",
				"state": "WA",
				"zip": "98005",
				"country": "USA",
				"email": "customercare@sharebuilder.com",
				"customerServicePhone": "(800) 747-2537",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "ShareBuilder",
				"siteURL": "http://www.sharebuilder.com"
			}
		},
		{
			"name": "Shareholders Service Group, Inc.",
			"fid": "048",
			"org": "Shareholders Service Group, Inc.",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "9845 ERMA RD. SUITE 312",
				"address2": null,
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92131",
				"country": "USA",
				"email": "service@shareholdersgroup.com",
				"customerServicePhone": "858-530-1031",
				"technicalSupportPhone": "858-530-1031",
				"fax": "-",
				"financialInstitutionName": "Shareholders Service Group, Inc.",
				"siteURL": "http://www.shareholdersgroup.com"
			}
		},
		{
			"name": "Sharonview Federal CU",
			"fid": "253075303",
			"org": "1477",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1081 521 Corporate Ctr Dr",
				"address2": null,
				"address3": null,
				"city": "Fort Mill",
				"state": "SC",
				"zip": "29707-7151",
				"country": "USA",
				"email": "eservices@sharonview.org",
				"customerServicePhone": "(800)462-4421",
				"technicalSupportPhone": "(800)462-4421",
				"fax": "(704) 969-6748",
				"financialInstitutionName": "Sharonview Federal Credit Union",
				"siteURL": "www.sharonview.org/"
			}
		},
		{
			"name": "Shore Bank-New",
			"fid": "251472542",
			"org": "MEightSevenNine",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "25020 Shore Parkway",
				"address2": null,
				"address3": null,
				"city": "Onley",
				"state": "VA",
				"zip": "23418",
				"country": "USA",
				"email": null,
				"customerServicePhone": "800-852-8176",
				"technicalSupportPhone": "800-852-8176",
				"fax": null,
				"financialInstitutionName": "Shore Bank",
				"siteURL": "http://www.shorebank.com"
			}
		},
		{
			"name": "Sierra Central Credit Union",
			"fid": "321174770",
			"org": "USERS",
			"ofx": "https://sccupcu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Sikorsky Credit Union",
			"fid": "221180806",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1000 Oronoque Lane",
				"address2": null,
				"address3": null,
				"city": "Stratford",
				"state": "CT",
				"zip": "06614",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "1-888-753-5553",
				"technicalSupportPhone": "1-888-753-5553",
				"fax": null,
				"financialInstitutionName": "Sikorsky CU",
				"siteURL": "www.sikorskycu.org"
			}
		},
		{
			"name": "Simmons First",
			"fid": "3779",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P O  Box 7009",
				"address2": "Pine Bluff AR 71611-7009",
				"address3": null,
				"city": "PINE BLUFF",
				"state": "AR",
				"zip": "716110000",
				"country": "USA",
				"email": "bankanywhere@simmonsfirst.com",
				"customerServicePhone": "(870) 541-1000",
				"technicalSupportPhone": "(866)246-2400",
				"fax": null,
				"financialInstitutionName": "Simmons First National Bank",
				"siteURL": "http://www.simmonsfirst.com"
			}
		},
		{
			"name": "Siouxland Federal Credit Union",
			"fid": "304982235",
			"org": "USERS",
			"ofx": "https://siouxlandfederalcu.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Sound CU",
			"fid": "325183220",
			"org": "SOUNDCUDC",
			"ofx": "https://mb.soundcu.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "1331 Broadway Plaza",
				"address2": null,
				"address3": null,
				"city": "Tacoma",
				"state": "WA",
				"zip": "98402",
				"country": "USA",
				"email": "info@soundcu.com",
				"customerServicePhone": "253-383-2016",
				"technicalSupportPhone": "253-383-2016",
				"fax": null,
				"financialInstitutionName": "Sound CU DC",
				"siteURL": "www.soundcu.com"
			}
		},
		{
			"name": "South State Bank",
			"fid": "053200983",
			"org": "MZeroOneZeroSCBT",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "PO BOX 1287",
				"address2": null,
				"address3": null,
				"city": "Orangeburg",
				"state": "NC",
				"zip": "29116",
				"country": "USA",
				"email": null,
				"customerServicePhone": "1-877-277-2185",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "South Carolina Bank & Trust",
				"siteURL": "http://www.scbtonline.com"
			}
		},
		{
			"name": "South Trust Bank",
			"fid": "6101",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06101.ofx",
			"profile": {
				"address1": "South Trust Online Banking",
				"address2": "P.O. Box 2554",
				"address3": null,
				"city": "Birmingham",
				"state": "AL",
				"zip": "35290",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "South Trust Bank",
				"siteURL": "http://www.southtrust.com"
			}
		},
		{
			"name": "Southern Community Bank and Trust",
			"fid": "053112097",
			"org": "MOneFortyEight",
			"ofx": "https://ofx1.evault.ws/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "4605 Country Club Road",
				"address2": null,
				"address3": null,
				"city": "Winston-Salem",
				"state": "NC",
				"zip": "27104",
				"country": "USA",
				"email": null,
				"customerServicePhone": "(888)768-2666",
				"technicalSupportPhone": "(888)768-2666",
				"fax": null,
				"financialInstitutionName": "Southern Community Bank & Trust",
				"siteURL": "http://www.smallenoughtocare.com"
			}
		},
		{
			"name": "Southwest Bank",
			"fid": "111900756",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3737 S.W. Loop 820",
				"address2": null,
				"address3": null,
				"city": "Fort Worth",
				"state": "TX",
				"zip": "76133",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "817-292-4820",
				"technicalSupportPhone": "817-292-4820",
				"fax": null,
				"financialInstitutionName": "Southwest Bank",
				"siteURL": "www.swbankonline.com"
			}
		},
		{
			"name": "St. Marys Credit Union",
			"fid": "211384214",
			"org": "MSevenThirtySeven",
			"ofx": "https://ofx1.evault.ws/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "293 Boston Post Road West",
				"address2": null,
				"address3": null,
				"city": "Marlborough",
				"state": "MA",
				"zip": "01752",
				"country": "USA",
				"email": null,
				"customerServicePhone": "(508) 490-6707",
				"technicalSupportPhone": "(508) 490-6707",
				"fax": null,
				"financialInstitutionName": "St. Mary's Credit Union",
				"siteURL": null
			}
		},
		{
			"name": "Standard Federal Bank",
			"fid": "6507",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/06507.ofx",
			"profile": {
				"address1": "79 W. Monroe, Suite 302",
				"address2": "Online Banking Customer Service",
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60603",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Standard Federal Bank",
				"siteURL": "http://www.standardfederalbank.com"
			}
		},
		{
			"name": "Star One Credit Union",
			"fid": "321177968",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1306 Bordeaux Dr.",
				"address2": null,
				"address3": null,
				"city": "Sunnyvale",
				"state": "CA",
				"zip": "94089",
				"country": "USA",
				"email": "service@starone.org",
				"customerServicePhone": "(866)543-5202",
				"technicalSupportPhone": "(866)543-5202",
				"fax": "(408)543-5203",
				"financialInstitutionName": "Star One Credit Union",
				"siteURL": "www.starone.org"
			}
		},
		{
			"name": "State Bank & Trust - Macon, GA",
			"fid": "11500",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "P O Box 4748",
				"address2": "Macon GA 31208",
				"address3": null,
				"city": "MACON",
				"state": "GA",
				"zip": "312080000",
				"country": "USA",
				"email": "customerservice@statebt.com",
				"customerServicePhone": "(478) 796-6300",
				"technicalSupportPhone": "800.414.4177",
				"fax": null,
				"financialInstitutionName": "STATE BANK",
				"siteURL": "http://www.statebt.com"
			}
		},
		{
			"name": "State Employees Credit Union - NC",
			"fid": "1001",
			"org": "SECU",
			"ofx": "https://onlineaccess.ncsecu.org/secuofx/secu.ofx",
			"profile": {
				"address1": "900 Wade Avenue",
				"address2": null,
				"address3": null,
				"city": "Raleigh",
				"state": "NC",
				"zip": "27603",
				"country": "USA",
				"email": "service@ncsecu.org",
				"customerServicePhone": "8887328562",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "SECU",
				"siteURL": "http://www.ncsecu.org"
			}
		},
		{
			"name": "Steele Street Bank & Trust",
			"fid": "3243",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "101 Cook Street",
				"address2": "Denver CO 80206",
				"address3": null,
				"city": "DENVER",
				"state": "CO",
				"zip": "802060000",
				"country": "USA",
				"email": "COadminemail@midfirst.com",
				"customerServicePhone": "(303) 376-3800",
				"technicalSupportPhone": "(303)376-3800",
				"fax": null,
				"financialInstitutionName": "MidFirst Bank (formerly SSBT)",
				"siteURL": "http://www.steelestreet.com"
			}
		},
		{
			"name": "Sterne Agee",
			"fid": "2170",
			"org": "AFS",
			"ofx": "https://salofx.automatedfinancial.com",
			"profile": {
				"address1": "50 Broadway",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10004",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "AFS",
				"siteURL": null
			}
		},
		{
			"name": "Stifel Nicolaus",
			"fid": "11212",
			"org": "Stifel Nicolaus",
			"ofx": "https://directconnect.access.investor.stifel.com",
			"profile": {
				"address1": "501 N. Broadway",
				"address2": null,
				"address3": null,
				"city": "St. Louis",
				"state": "MO",
				"zip": "63102",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Stifel Nicolaus",
				"siteURL": null
			}
		},
		{
			"name": "Sun Federal Credit Union",
			"fid": "241282412",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1627HollandRd.",
				"address2": null,
				"address3": null,
				"city": "Maumee",
				"state": "OH",
				"zip": "43537",
				"country": "USA",
				"email": "sunsupport@sunfcu.org",
				"customerServicePhone": "419-893-2170",
				"technicalSupportPhone": "419-893-2170",
				"fax": "419-893-4809",
				"financialInstitutionName": "SunFederalCreditUnion",
				"siteURL": "www.sunfcuhb.org"
			}
		},
		{
			"name": "SunTrust",
			"fid": "2801",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/02801.ofx",
			"profile": {
				"address1": "200 South Orange Avenue",
				"address2": "Tower 3",
				"address3": null,
				"city": "Orlando",
				"state": "FL",
				"zip": "32801",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "SunTrust",
				"siteURL": "http://www.suntrust.com/"
			}
		},
		{
			"name": "Susquehanna Bank Group",
			"fid": "1756",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "P O  Box 1000",
				"address2": "Lititz PA 17543",
				"address3": null,
				"city": "LITITZ",
				"state": "PA",
				"zip": "175430000",
				"country": "USA",
				"email": "messages@internetbanker.susquehanna.net",
				"customerServicePhone": "(800) 311-3182",
				"technicalSupportPhone": "(800)311-3182",
				"fax": null,
				"financialInstitutionName": "Susquehanna Bank",
				"siteURL": "https://www.susquehanna.net"
			}
		},
		{
			"name": "Synergy FCU",
			"fid": "314092128",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "One Valero Way",
				"address2": null,
				"address3": null,
				"city": "San Antonio",
				"state": "TX",
				"zip": "78249",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "210-345-2222",
				"technicalSupportPhone": "210-345-2222",
				"fax": null,
				"financialInstitutionName": "Valero Federal Credit Union",
				"siteURL": "www.valerofcu.org"
			}
		},
		{
			"name": "T. Rowe Price Brokerage",
			"fid": "016",
			"org": "TRP",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "100 E. Pratt Street",
				"address2": null,
				"address3": null,
				"city": "Baltimore",
				"state": "MD",
				"zip": "21202",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "1-888-358-8490",
				"technicalSupportPhone": "410-345-8609",
				"fax": "410-345-8100",
				"financialInstitutionName": "T. Rowe Price Brokerage",
				"siteURL": "http://www.troweprice.com"
			}
		},
		{
			"name": "T. Rowe Price Retirement Plans",
			"fid": "40109",
			"org": "T. Rowe Price",
			"ofx": "https://www3.troweprice.com/ffs/ffsweb/OFXServlet",
			"profile": {
				"address1": "100 E. Pratt Street",
				"address2": null,
				"address3": null,
				"city": "Baltimore",
				"state": "MD",
				"zip": "21202",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "T. Rowe Price",
				"siteURL": null
			}
		},
		{
			"name": "TD Ameritrade",
			"fid": "ameritrade.com",
			"org": "MDNC",
			"ofx": "https://ofxs.ameritrade.com/cgi-bin/apps/OFX",
			"profile": {
				"address1": "4211 So. 102nd Street",
				"address2": null,
				"address3": null,
				"city": "Omaha",
				"state": "NE",
				"zip": "68127",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Ameritrade",
				"siteURL": null
			}
		},
		{
			"name": "TD Bank BusinessDirect",
			"fid": "1001",
			"org": "CommerceBank",
			"ofx": "https://businessofx.tdbank.com/scripts/serverext.dll",
			"profile": {
				"address1": "Unknown",
				"address2": null,
				"address3": null,
				"city": "Unknown",
				"state": "XX",
				"zip": "99999",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "555-555-5555",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CommerceBank",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "TD Bank Online Banking - New",
			"fid": "1002",
			"org": "CommerceBank",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/TDBankNew.ofx",
			"profile": {
				"address1": "Unknown",
				"address2": null,
				"address3": null,
				"city": "Unknown",
				"state": "XX",
				"zip": "99999",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "555-555-5555",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "CommerceBank",
				"siteURL": "Unknown"
			}
		},
		{
			"name": "TIAA-CREF",
			"fid": "1304",
			"org": "TIAA-CREF",
			"ofx": "https://ofx-service.tiaa-cref.org/public/ofx",
			"profile": {
				"address1": "730 Third Avenue",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10017",
				"country": "USA",
				"email": null,
				"customerServicePhone": "800-842-2776",
				"technicalSupportPhone": "800-842-2776",
				"fax": null,
				"financialInstitutionName": "TIAA-CREF",
				"siteURL": "http://www.tiaa-cref.org"
			}
		},
		{
			"name": "TIAA-CREF Brokerage Services",
			"fid": "041",
			"org": "TIAA-CREF",
			"ofx": "https://ofx.netxclient.com/cgi/OFXNetx",
			"profile": {
				"address1": "730 Third Avenue",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10017-3206",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "800-927-3059",
				"technicalSupportPhone": "800-927-3059",
				"fax": "-",
				"financialInstitutionName": "TIAA-CREF Brokerage Services",
				"siteURL": "http://www.tiaa-cref.org"
			}
		},
		{
			"name": "Tangerine Bank (Canada)",
			"fid": "10951",
			"org": "TangerineBank",
			"ofx": "https://ofx.tangerine.ca",
			"profile": {
				"address1": "3389 Steeles Avenue East",
				"address2": null,
				"address3": null,
				"city": "Toronto",
				"state": "ON",
				"zip": "M2H 3S8",
				"country": "CAN",
				"email": "clientservices@ingdirect.ca",
				"customerServicePhone": "800-464-3473",
				"technicalSupportPhone": "800-464-3473",
				"fax": null,
				"financialInstitutionName": "Tangerine Bank",
				"siteURL": "http://www.tangerine.ca"
			}
		},
		{
			"name": "Technology Credit Union - DC",
			"fid": "121181976",
			"org": "TECHCUDC",
			"ofx": "https://m.techcu.com/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "2010 North First Street",
				"address2": null,
				"address3": null,
				"city": "San Jose",
				"state": "CA",
				"zip": "95131",
				"country": "USA",
				"email": "info@techcu.com",
				"customerServicePhone": "800-553-0880",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Technology Credit Union - DC",
				"siteURL": "https://webbranch.techcu.com/onlineapps/email.asp"
			}
		},
		{
			"name": "Texas Capital Bank",
			"fid": "3HG2Y",
			"org": "Electronic Data Systems",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "6060 N. CENTRAL EXPRESSWAY",
				"address2": "SUITE 800",
				"address3": null,
				"city": "DALLAS",
				"state": "TX",
				"zip": "75206",
				"country": "US",
				"email": null,
				"customerServicePhone": "8778392737",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "TEXAS CAPITAL",
				"siteURL": "https://www.netit.financial-net.com/bnkdirct/"
			}
		},
		{
			"name": "Texas Dow Employees Credit Union",
			"fid": "313185515",
			"org": "TexasDow",
			"ofx": "https://allthetime.tdecu.org/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Texas Security Bank",
			"fid": "1582",
			"org": "clk-3428",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "1212 Turtle Creek Blvd.",
				"address2": null,
				"address3": null,
				"city": "Dallas",
				"state": "TX",
				"zip": "75207",
				"country": "USA",
				"email": "customerservice@texassecuritybank.com",
				"customerServicePhone": "214-571-9595",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Texas Security Bank",
				"siteURL": "http://www.texassecuritybank.com/personal/"
			}
		},
		{
			"name": "The Bank of Oswego",
			"fid": "123206930",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "310 N. State St.",
				"address2": "Suite 218",
				"address3": null,
				"city": "Lake Oswego",
				"state": "OR",
				"zip": "97034",
				"country": "USA",
				"email": "ibcustspt@bankofoswego.com",
				"customerServicePhone": "503-635-1699",
				"technicalSupportPhone": "503-635-1699",
				"fax": "503-635-1633",
				"financialInstitutionName": "The Bank of Oswego",
				"siteURL": "www.bankofoswego.com"
			}
		},
		{
			"name": "The Bank of San Antonio",
			"fid": "14523",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "8000 IH 10 W STE 1100",
				"address2": "San Antonio, TX 78230-3871",
				"address3": null,
				"city": "SAN ANTONIO",
				"state": "TX",
				"zip": "782300000",
				"country": "USA",
				"email": "TMClientservices@thebankofsa.com",
				"customerServicePhone": "(210) 807-5555",
				"technicalSupportPhone": "210-807-5524",
				"fax": null,
				"financialInstitutionName": "THE BANK OF SAN ANTONIO",
				"siteURL": "http://www.thebankofsa.com"
			}
		},
		{
			"name": "The Berkshire Bank (NY)",
			"fid": "330",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "4 East 39th Street",
				"address2": "New York, NY  10016",
				"address3": null,
				"city": "NEW YORK",
				"state": "NY",
				"zip": "100040000",
				"country": "USA",
				"email": "BerkOnline@berkbank.com",
				"customerServicePhone": "(212) 802-1000",
				"technicalSupportPhone": "212-785-8499",
				"fax": null,
				"financialInstitutionName": "The Berkshire Bank",
				"siteURL": "http://www.berkbank.com"
			}
		},
		{
			"name": "The Columbia Bank DirectConnect",
			"fid": "055002338",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "7168 Columbia Gateway Dr",
				"address2": null,
				"address3": null,
				"city": "Columbia",
				"state": "MD",
				"zip": "21044",
				"country": "USA",
				"email": "customerservice@thecolumbiabank",
				"customerServicePhone": "888.822.2265",
				"technicalSupportPhone": "888.822.2265",
				"fax": "717.569.6316",
				"financialInstitutionName": "The Columbia Bank",
				"siteURL": "http://www.thecolumbiabank.com"
			}
		},
		{
			"name": "The Cooperative Bank",
			"fid": "826",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "40 Belgrade Avenue",
				"address2": null,
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02131",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 235-8258",
				"technicalSupportPhone": "(800) 235-8258",
				"fax": null,
				"financialInstitutionName": "The Cooperative Bank",
				"siteURL": "http://www.thecooperativebank.com"
			}
		},
		{
			"name": "The Fauquier Bank",
			"fid": "051402259",
			"org": "MEightFiveZero",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "10 Courthouse Square",
				"address2": null,
				"address3": null,
				"city": "Warrenton",
				"state": "VA",
				"zip": "20188",
				"country": "USA",
				"email": null,
				"customerServicePhone": "540-347-2700",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "The Fauquier Bank",
				"siteURL": "http://www.thefauquierbank.com/"
			}
		},
		{
			"name": "The Golden 1 Credit Union",
			"fid": "1001",
			"org": "Golden1",
			"ofx": "https://homebanking.golden1.com/scripts/serverext.dll",
			"profile": {
				"address1": "6507 4th Avenue",
				"address2": null,
				"address3": null,
				"city": "Sacramento",
				"state": "CA",
				"zip": "95817-2698",
				"country": "USA",
				"email": "Unknown",
				"customerServicePhone": "555-555-5555",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Golden One Credit Union",
				"siteURL": "http://www.golden1.com"
			}
		},
		{
			"name": "The National Iron Bank",
			"fid": "627",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "195 Main Street",
				"address2": null,
				"address3": null,
				"city": "Salisbury",
				"state": "CT",
				"zip": "06068",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 904-8122",
				"technicalSupportPhone": "(877) 904-8122",
				"fax": null,
				"financialInstitutionName": "The National Iron Bank",
				"siteURL": "http://www.ironbank.com"
			}
		},
		{
			"name": "The Northampton Co-operative Bank",
			"fid": "492",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "67 King Street",
				"address2": null,
				"address3": null,
				"city": "Northampton",
				"state": "MA",
				"zip": "01060",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 490-4658",
				"technicalSupportPhone": "(877) 490-4658",
				"fax": null,
				"financialInstitutionName": "The Northampton Co-operative Bank",
				"siteURL": "http://www.northamptoncoop.com/"
			}
		},
		{
			"name": "The PrivateBank (Chicago)",
			"fid": "5518",
			"org": "992",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "10 N. DEARBORN; SUITE 900",
				"address2": null,
				"address3": null,
				"city": "Chicago",
				"state": "IL",
				"zip": "60602",
				"country": "USA",
				"email": "customersupport@privatebk.com",
				"customerServicePhone": "312-683-7100",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "PrivateBank Chicago",
				"siteURL": "http://www.theprivatebank.com/chicago/homepage.htm"
			}
		},
		{
			"name": "The Provident Bank MA - NH",
			"fid": "1106",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "5 Market Street",
				"address2": null,
				"address3": null,
				"city": "Amesbury",
				"state": "MA",
				"zip": "01913",
				"country": "USA",
				"email": "onlinehelp@theprovidentbank.com",
				"customerServicePhone": "(877) 487-2977",
				"technicalSupportPhone": "(877) 487-2977",
				"fax": "(978) 378-1202",
				"financialInstitutionName": "The Provident Bank MA_NH",
				"siteURL": "www.theprovidentbank.com"
			}
		},
		{
			"name": "The Washington Trust Company",
			"fid": "011500858",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "23 Broad St",
				"address2": null,
				"address3": null,
				"city": "Westerly",
				"state": "RI",
				"zip": "02891",
				"country": "USA",
				"email": "mrauh@washtrust.com",
				"customerServicePhone": "401-348-1310",
				"technicalSupportPhone": "401-348-1310",
				"fax": "401-348-1600",
				"financialInstitutionName": "The Washington Trust Company",
				"siteURL": "www.washingtontrust2.com"
			}
		},
		{
			"name": "TheBANK of Edwardsville-IL",
			"fid": "081004070",
			"org": "1143",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "330 West Vandalia",
				"address2": null,
				"address3": null,
				"city": "Edwardsville",
				"state": "IL",
				"zip": "62025",
				"country": "USA",
				"email": "customerservice@4thebank.com",
				"customerServicePhone": "(618)656-0098",
				"technicalSupportPhone": "(618)656-0098",
				"fax": "1 (618)659-6376",
				"financialInstitutionName": "TheBANK of Edwardsville",
				"siteURL": "www.magiconlinebanking.com"
			}
		},
		{
			"name": "Think Mutual Bank",
			"fid": "10139",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "5200 Members Parkway NW",
				"address2": "Rochester MN  55903",
				"address3": null,
				"city": "ROCHESTER",
				"state": "MN",
				"zip": "559010000",
				"country": "USA",
				"email": "think@thinkbank.com",
				"customerServicePhone": "(800) 288-3425",
				"technicalSupportPhone": "800-288-3425",
				"fax": null,
				"financialInstitutionName": "Think Mutual Bank",
				"siteURL": "https://www.thinkbank.com"
			}
		},
		{
			"name": "TotalBank QN",
			"fid": "066009155",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2720 Coral Way",
				"address2": null,
				"address3": null,
				"city": "Miami",
				"state": "FL",
				"zip": "33145",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "305-448-6500",
				"technicalSupportPhone": "305-448-6500",
				"fax": null,
				"financialInstitutionName": "TotalBank",
				"siteURL": "www.totalbankonline.com"
			}
		},
		{
			"name": "Tower Federal Credit Union",
			"fid": "255077370",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "7901 Sandy Spring Road",
				"address2": null,
				"address3": null,
				"city": "Laurel",
				"state": "MD",
				"zip": "20707-3589",
				"country": "US",
				"email": "2",
				"customerServicePhone": "(301)497-7000",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Tower Federal Credit Union",
				"siteURL": "www.towerfcu.org"
			}
		},
		{
			"name": "Tower Square Securities, Inc.",
			"fid": "036",
			"org": "MetLife",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "One City Place",
				"address2": "18th Floor",
				"address3": null,
				"city": "Hartford",
				"state": "CT",
				"zip": "06103-3415",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "800-842-3732",
				"fax": "-",
				"financialInstitutionName": "Tower Square Securities, Inc.",
				"siteURL": "http://www.towersquare.com"
			}
		},
		{
			"name": "Town Bank",
			"fid": "5503",
			"org": "118",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "400 Genesee Street",
				"address2": null,
				"address3": null,
				"city": "Delafield",
				"state": "WI",
				"zip": "53018",
				"country": "USA",
				"email": "onlinebanking@townbank.us",
				"customerServicePhone": "800-524-7940",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "TownBank",
				"siteURL": "http://www.townbank.us"
			}
		},
		{
			"name": "TowneBank VA Personal & Biz",
			"fid": "051408949",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "5716 High St W",
				"address2": null,
				"address3": null,
				"city": "Portsmouth",
				"state": "VA",
				"zip": "23703",
				"country": "USA",
				"email": "support@townebank.com",
				"customerServicePhone": "757-638-6724",
				"technicalSupportPhone": "757-638-6724",
				"fax": "757-484-4705",
				"financialInstitutionName": "TowneBank",
				"siteURL": "www.townebank.com"
			}
		},
		{
			"name": "Treasure State Bank WC & DC",
			"fid": "092905508",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3660 Mullan Road",
				"address2": null,
				"address3": null,
				"city": "Missoula",
				"state": "MT",
				"zip": "59808",
				"country": "USA",
				"email": "admin@treasurestatebank.com",
				"customerServicePhone": "406-543-8700",
				"technicalSupportPhone": "406-543-8700",
				"fax": "406-543-4477",
				"financialInstitutionName": "Treasure State Bank WC & DC",
				"siteURL": "www.treasurestatebank.com"
			}
		},
		{
			"name": "Treasury Dept FCU",
			"fid": "254075409",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "Penn & Madison Place NW",
				"address2": "room 1000",
				"address3": null,
				"city": "Washington",
				"state": "DC",
				"zip": "20038",
				"country": "USA",
				"email": "rfloriza@tdfcu.com",
				"customerServicePhone": "202-289-1950",
				"technicalSupportPhone": "202-289-1950",
				"fax": "202-371-9328",
				"financialInstitutionName": "Treasury Department FCU",
				"siteURL": "www.tdfcu.org"
			}
		},
		{
			"name": "Tri Valley Bank - DC",
			"fid": "1739",
			"org": "mfis-1739",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "2404 San Ramon Valley Blvd",
				"address2": null,
				"address3": null,
				"city": "San Ramon",
				"state": "CA",
				"zip": "94583",
				"country": "USA",
				"email": "BillPaymentNotification@trivalleybank.com",
				"customerServicePhone": "925-791-4340",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Tri Valley Bank",
				"siteURL": "http://www.trivalleybank.com"
			}
		},
		{
			"name": "Truity Credit Union",
			"fid": "54429",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "PO Box 1358",
				"address2": "Bartlesville, OK 74003",
				"address3": null,
				"city": "BARTLESVILLE",
				"state": "OK",
				"zip": "740051358",
				"country": "USA",
				"email": "eSupport@truitycu.org",
				"customerServicePhone": "(918) 336-7662",
				"technicalSupportPhone": "800.897.6991",
				"fax": null,
				"financialInstitutionName": "Truity Credit Union",
				"siteURL": "https://www.netteller.com/truity"
			}
		},
		{
			"name": "Truliant Federal Credit Union",
			"fid": "253177832",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "3200 Truliant Way",
				"address2": null,
				"address3": null,
				"city": "Winston-Salem",
				"state": "NC",
				"zip": "27103",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-822-0382",
				"technicalSupportPhone": "800-822-038",
				"fax": null,
				"financialInstitutionName": "Truliant Federal Credit Union",
				"siteURL": "www.truliantfcu.org"
			}
		},
		{
			"name": "UBS Financial Services Inc.",
			"fid": "7772",
			"org": "Intuit",
			"ofx": "https://ofx1.ubs.com/eftxweb/access.ofx",
			"profile": {
				"address1": "1285 Avenue of the Americas",
				"address2": null,
				"address3": null,
				"city": "New York",
				"state": "NY",
				"zip": "10011",
				"country": "USA",
				"email": "OnlineService@ubs.com",
				"customerServicePhone": "1-888-279-3343",
				"technicalSupportPhone": "1-888-279-3343",
				"fax": null,
				"financialInstitutionName": "UBS Financial Services Inc.",
				"siteURL": "http://financialservicesinc.ubs.com"
			}
		},
		{
			"name": "UMB Bank",
			"fid": "UMB",
			"org": "UMBOFX",
			"ofx": "https://ofx.umb.com/",
			"profile": {
				"address1": "1010 GRAND BLVD",
				"address2": null,
				"address3": null,
				"city": "KANSAS CITY",
				"state": "MO",
				"zip": "64106",
				"country": "USA",
				"email": "onlinebanking@umb.com",
				"customerServicePhone": "8006998702",
				"technicalSupportPhone": "8006998702",
				"fax": null,
				"financialInstitutionName": "UMB BANK, NA",
				"siteURL": "http://www.umb.com"
			}
		},
		{
			"name": "US Bank (U.S. Bank - PFM Direct Connect)",
			"fid": "1401",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/01401.ofx",
			"profile": {
				"address1": "P. O. Box 5190",
				"address2": null,
				"address3": null,
				"city": "Portland",
				"state": "OR",
				"zip": "97208",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "U.S. Bank",
				"siteURL": "http://www.usbank.com/"
			}
		},
		{
			"name": "US Federal CU",
			"fid": "291074722",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1400 Riverwood Drive",
				"address2": null,
				"address3": null,
				"city": "Burnsville",
				"state": "MN",
				"zip": "55337",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "952-736-5000",
				"technicalSupportPhone": "952-736-5000",
				"fax": "952-736-5209",
				"financialInstitutionName": "U.S. Federal Credit Union",
				"siteURL": "http://www.usfed.org/home/"
			}
		},
		{
			"name": "USAA Federal Savings Bank",
			"fid": "24591",
			"org": "USAA",
			"ofx": "https://service2.usaa.com/ofx/OFXServlet",
			"profile": {
				"address1": "10750 McDermott Freeway",
				"address2": null,
				"address3": null,
				"city": "San Antonio",
				"state": "TX",
				"zip": "78288",
				"country": "USA",
				"email": null,
				"customerServicePhone": "877-820-8320",
				"technicalSupportPhone": "877-820-8320",
				"fax": null,
				"financialInstitutionName": "USAA Federal Savings Bank",
				"siteURL": "www.usaa.com"
			}
		},
		{
			"name": "USAA Investment Management Co.",
			"fid": "24592",
			"org": "USAA",
			"ofx": "https://service2.usaa.com/ofx/OFXServlet",
			"profile": {
				"address1": "Attn:USAA BrokSvcs/MutualFunds",
				"address2": "PO BOX 659453",
				"address3": null,
				"city": "San Antonio",
				"state": "TX",
				"zip": "78265-9825",
				"country": "USA",
				"email": null,
				"customerServicePhone": "800-531-8777",
				"technicalSupportPhone": "877-632-3002",
				"fax": "800-292-8177",
				"financialInstitutionName": "USAA Investment Mgmt Co.",
				"siteURL": "https://www.usaa.com/inet/gas_imco/ImMainMenu"
			}
		},
		{
			"name": "USE Credit Union",
			"fid": "322281691",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "10120 Pacific Heights Blvd.",
				"address2": null,
				"address3": null,
				"city": "San Diego",
				"state": "CA",
				"zip": "92121",
				"country": "USA",
				"email": "webmaster@usecu.org",
				"customerServicePhone": "1-866-USE-4-YOU",
				"technicalSupportPhone": "1-866-USE-4-YOU",
				"fax": null,
				"financialInstitutionName": "USE Credit Union",
				"siteURL": "http://www.usecu.org"
			}
		},
		{
			"name": "UW Credit Union",
			"fid": "1001",
			"org": "UWCU",
			"ofx": "https://ofx.uwcu.org/serverext.dll",
			"profile": {
				"address1": "3500 University Avenue",
				"address2": null,
				"address3": null,
				"city": "Madison",
				"state": "WI",
				"zip": "53744",
				"country": "USA",
				"email": "contactus@uwcu.org",
				"customerServicePhone": "800-533-6773",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "UW Credit Union",
				"siteURL": "http://www.uwcu.org/"
			}
		},
		{
			"name": "Ulster Savings Bank",
			"fid": "221971264",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "180 Schwenk Dr",
				"address2": null,
				"address3": null,
				"city": "Kingston",
				"state": "NY",
				"zip": "12401-2940",
				"country": "USA",
				"email": "dummy@ulstersavings.com",
				"customerServicePhone": "866-440-0391",
				"technicalSupportPhone": "866-440-0391",
				"fax": "845-339-9334",
				"financialInstitutionName": "Ulster Savings Bank",
				"siteURL": "www.ulstersavings.com"
			}
		},
		{
			"name": "Umpqua Bank - Direct Connect",
			"fid": "1001",
			"org": "Umpqua",
			"ofx": "https://ofx.umpquabank.com/ofx/process.ofx",
			"profile": {
				"address1": "PO Box 1820",
				"address2": null,
				"address3": null,
				"city": "Roseburg",
				"state": "OR",
				"zip": "97470",
				"country": "USA",
				"email": null,
				"customerServicePhone": "866-486-7782",
				"technicalSupportPhone": "866-486-7782",
				"fax": null,
				"financialInstitutionName": "Umpqua Bank",
				"siteURL": "http://www.umpquabank.com"
			}
		},
		{
			"name": "Union Bank - Quicken",
			"fid": "2901",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/02901.ofx",
			"profile": {
				"address1": "P.O. Box 19666",
				"address2": null,
				"address3": null,
				"city": "Irvine",
				"state": "CA",
				"zip": "92623",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Union Bank of California",
				"siteURL": "http://www.uboc.com/"
			}
		},
		{
			"name": "Union Savings Bank CT",
			"fid": "1001",
			"org": "USB",
			"ofx": "https://ofx.unionsavings.com/ofx/ofx.ofx",
			"profile": {
				"address1": "225 Main Street",
				"address2": "P.O. Box 647",
				"address3": null,
				"city": "Danbury",
				"state": "CT",
				"zip": "06813-0647",
				"country": "USA",
				"email": "contactusb@unionsavings.com",
				"customerServicePhone": "866-719-6654",
				"technicalSupportPhone": "866-719-6654",
				"fax": null,
				"financialInstitutionName": "Union Savings Bank",
				"siteURL": "https://usbonline.unionsavings.com"
			}
		},
		{
			"name": "United American Bank-DC",
			"fid": "121143558",
			"org": "Fidelity",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "101. S. Ellsworth Avenue",
				"address2": "St 101",
				"address3": null,
				"city": "San Mateo",
				"state": "CA",
				"zip": "94401",
				"country": "USA",
				"email": "CashMgmt@unitedamericanbank.com",
				"customerServicePhone": "650 579 1500",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "United American Bank",
				"siteURL": "www.unitedamericanbank.com"
			}
		},
		{
			"name": "United American Savings Bank",
			"fid": "1689",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "1812 East Carson Street",
				"address2": null,
				"address3": null,
				"city": "Pittsburgh",
				"state": "PA",
				"zip": "15203",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 397-8869",
				"technicalSupportPhone": "(800) 397-8869",
				"fax": null,
				"financialInstitutionName": "United American Savings Bank",
				"siteURL": "http://www.uasb.com"
			}
		},
		{
			"name": "United Bank & Trust-Marshalltown",
			"fid": "073922843",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2101 S. Center Street",
				"address2": null,
				"address3": null,
				"city": "Marshalltown",
				"state": "IA",
				"zip": "50158",
				"country": "USA",
				"email": "service@ubtna.com",
				"customerServicePhone": "641-352-2088",
				"technicalSupportPhone": "641-352-2088",
				"fax": "641-752-3004",
				"financialInstitutionName": "United Bank & Trust",
				"siteURL": "www.ubtna.com"
			}
		},
		{
			"name": "United Bank - Massachusetts",
			"fid": "853",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "95 Elm Street",
				"address2": null,
				"address3": null,
				"city": "West Springfield",
				"state": "MA",
				"zip": "01089",
				"country": "USA",
				"email": "clientservices@bankatunited.com",
				"customerServicePhone": "(800) 396-0270",
				"technicalSupportPhone": "(800) 396-0270",
				"fax": null,
				"financialInstitutionName": "United Bank - Business - MA",
				"siteURL": "http://www.bankatunited.com"
			}
		},
		{
			"name": "United California Bank",
			"fid": "2701",
			"org": "ISC",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/02701.ofx",
			"profile": {
				"address1": "P.O. Box 3567",
				"address2": null,
				"address3": null,
				"city": "Los Angeles",
				"state": "CA",
				"zip": "900519738",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Sanwa Bank California",
				"siteURL": "http://www.sanwabank.com/"
			}
		},
		{
			"name": "United Community Bank - IN",
			"fid": "274970584",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "215 W. Eads Parkway",
				"address2": "P O Box 4070",
				"address3": null,
				"city": "Lawrenceburg",
				"state": "IN",
				"zip": "47025-1840",
				"country": "USA",
				"email": "ucb@bankucb1.com",
				"customerServicePhone": "812-537-4822 ext 485",
				"technicalSupportPhone": "812-537-4822 ext 485",
				"fax": "812-537-5769",
				"financialInstitutionName": "United Community Bank",
				"siteURL": "www.bankucb.com"
			}
		},
		{
			"name": "United Heritage Credit Union",
			"fid": "314977188",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "12208NMoPacExpy",
				"address2": null,
				"address3": null,
				"city": "Austin",
				"state": "TX",
				"zip": "78758",
				"country": "USA",
				"email": "general@uhcu.org",
				"customerServicePhone": "512.435.4545",
				"technicalSupportPhone": "512.435.4545",
				"fax": "512.445.6824",
				"financialInstitutionName": "UnitedHeritageCreditUnion",
				"siteURL": "www.uhcu.org"
			}
		},
		{
			"name": "United Teletech Financial FCU",
			"fid": "221276011",
			"org": "Users",
			"ofx": "https://utfinancial.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Unity One Federal Credit Union",
			"fid": "1",
			"org": "Unity One Federal Credit Union",
			"ofx": "https://expressonline.unityonefcu.org/ofx/ofx.dll",
			"profile": {
				"address1": "6701 Burlington Blvd",
				"address2": null,
				"address3": null,
				"city": "Fort Worth",
				"state": "TX",
				"zip": "76131",
				"country": "USA",
				"email": "service@unityonefcu.org",
				"customerServicePhone": "817.306.3100",
				"technicalSupportPhone": null,
				"fax": "817.306.3133",
				"financialInstitutionName": "Unity One Federal Credit Union",
				"siteURL": "https://expressonline.unityonefcu.org"
			}
		},
		{
			"name": "University Credit Union Miami",
			"fid": "21030",
			"org": "USERS",
			"ofx": "https://ucumiami.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "University of IL Empl CU",
			"fid": "59049",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "2201 South First St",
				"address2": "Champaign IL 61820",
				"address3": null,
				"city": "CHAMPAIGN",
				"state": "IL",
				"zip": "618200000",
				"country": "USA",
				"email": "info@uiecu.org",
				"customerServicePhone": "(877) 678-4328",
				"technicalSupportPhone": "217-278-7700",
				"fax": null,
				"financialInstitutionName": "U of I Employees Credit Union",
				"siteURL": "https://www.uiecu.org"
			}
		},
		{
			"name": "Utah Central Credit Union",
			"fid": "324079474",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "25 East 1700 South",
				"address2": null,
				"address3": null,
				"city": "Salt Lake City",
				"state": "UT",
				"zip": "84115",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "801-487-8841",
				"technicalSupportPhone": "801-487-8841",
				"fax": null,
				"financialInstitutionName": "Utah Ctrl CU",
				"siteURL": "www.utahcentralonline.com"
			}
		},
		{
			"name": "Utah Community Credit Union",
			"fid": "324377820",
			"org": "Utah Community Credit Union",
			"ofx": "https://ofx.uccu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Utah Educational Savings Plan-UESP",
			"fid": "1",
			"org": "UHEAAUESP",
			"ofx": "https://ofx.uesp.org/ofx.ashx",
			"profile": {
				"address1": "PO Box 145100",
				"address2": null,
				"address3": null,
				"city": "Salt Lake City",
				"state": "UT",
				"zip": "84114",
				"country": "USA",
				"email": "info@uesp.org",
				"customerServicePhone": "800.418.2551",
				"technicalSupportPhone": "800.418.2551",
				"fax": "800.214.2956",
				"financialInstitutionName": "Utah Educational Savings Plan",
				"siteURL": "http://www.uesp.org"
			}
		},
		{
			"name": "VALIC",
			"fid": "77019",
			"org": "valic.com",
			"ofx": "https://ofx.valic.com/eftxweb/access.ofx",
			"profile": {
				"address1": "2929 Allen Parkway",
				"address2": null,
				"address3": null,
				"city": "Houston",
				"state": "TX",
				"zip": "77019",
				"country": "USA",
				"email": "ofxsupport@valic.com",
				"customerServicePhone": "800-448-2542",
				"technicalSupportPhone": "800-448-2542",
				"fax": null,
				"financialInstitutionName": "VALIC",
				"siteURL": "http://www.valic.com"
			}
		},
		{
			"name": "VISA Information Source",
			"fid": "10942",
			"org": "VISA",
			"ofx": "https://vis.informationmanagement.visa.com/eftxweb/access.ofx",
			"profile": {
				"address1": "900 Metro Center Blvd",
				"address2": null,
				"address3": null,
				"city": "Foster City",
				"state": "CA",
				"zip": "94404",
				"country": "USA",
				"email": "support@joineei.com",
				"customerServicePhone": "212 344 2000",
				"technicalSupportPhone": "212 344 2000",
				"fax": "212 344 2000",
				"financialInstitutionName": "VISA",
				"siteURL": "www.joineei.com"
			}
		},
		{
			"name": "Valley Bank & Trust-Brighton,CO",
			"fid": "4839",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "30 N. 4TH AVENUE",
				"address2": "BRIGHTON, CO  80601",
				"address3": null,
				"city": "BRIGHTON",
				"state": "CO",
				"zip": "806010000",
				"country": "USA",
				"email": "Contact@valleybankandtrust.com",
				"customerServicePhone": "(303) 659-5450",
				"technicalSupportPhone": "(303)659-5450",
				"fax": null,
				"financialInstitutionName": "Valley Bank & Trust",
				"siteURL": "http://www.valleybankandtrust.com"
			}
		},
		{
			"name": "Valley Bank National Association",
			"fid": "284",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "3520 South Louise Avenue",
				"address2": null,
				"address3": null,
				"city": "Sioux Falls",
				"state": "SD",
				"zip": "57106",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 441-2809",
				"technicalSupportPhone": "(877) 441-2809",
				"fax": null,
				"financialInstitutionName": "Valley Bank National Association",
				"siteURL": "http://www.valleybanks.com"
			}
		},
		{
			"name": "Valley Business Bank",
			"fid": "121142397",
			"org": "MSevenFortyTwo",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "200 South Court Street",
				"address2": null,
				"address3": null,
				"city": "Visalia",
				"state": "CA",
				"zip": "93291",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Valley Business Bank",
				"siteURL": null
			}
		},
		{
			"name": "Valley Green Bank PFM",
			"fid": "5502",
			"org": "981",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "7226-34 Germantown Avenue",
				"address2": null,
				"address3": null,
				"city": "Philadelphia",
				"state": "PA",
				"zip": "19119",
				"country": "USA",
				"email": "crichards@valleygreenbank.com",
				"customerServicePhone": "215-242-7585",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "ValleyGreen Bank",
				"siteURL": "http://www.valleygreenbank.com"
			}
		},
		{
			"name": "Van Kampen Funds, Inc.",
			"fid": "3625",
			"org": "Van Kampen Funds, Inc.",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=9210013100012150413",
			"profile": {
				"address1": "1 Parkview Plaza",
				"address2": null,
				"address3": null,
				"city": "Oakbrook Terrace",
				"state": "IL",
				"zip": "60181",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Van Kampen",
				"siteURL": null
			}
		},
		{
			"name": "Vanguard",
			"fid": "15103",
			"org": "Vanguard",
			"ofx": "https://vesnc.vanguard.com/us/OfxProfileServlet",
			"profile": {
				"address1": "P.O. Box 1110",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482-1110",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Vanguard",
				"siteURL": null
			}
		},
		{
			"name": "Vantage Bank Texas",
			"fid": "114912589",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "45 NE Loop 410",
				"address2": "Suite 500",
				"address3": null,
				"city": "San Antonio",
				"state": "TX",
				"zip": "78216",
				"country": "USA",
				"email": "support@sanb.com",
				"customerServicePhone": "1-866-580-7262",
				"technicalSupportPhone": "1-866-580-7262",
				"fax": "210-764-0068",
				"financialInstitutionName": "San Antonio National Bank",
				"siteURL": "www.sanb.com"
			}
		},
		{
			"name": "Vantage Credit Union",
			"fid": "281081479",
			"org": "EECU-St. Louis",
			"ofx": "https://quicken.vcu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Vectra Bank of Colorado - Direct",
			"fid": "1124",
			"org": "276-3",
			"ofx": "https://quicken.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "2000 S. Colorado Boulevard",
				"address2": "#2-1200",
				"address3": null,
				"city": "Denver",
				"state": "CO",
				"zip": "80222",
				"country": "USA",
				"email": "vectrapfm@vectrabank.com",
				"customerServicePhone": "1-800-884-6725",
				"technicalSupportPhone": "1-800-884-6725",
				"fax": "1-888-440-0339",
				"financialInstitutionName": "VectraBank",
				"siteURL": "http://www.vectrabank.com/"
			}
		},
		{
			"name": "Velocity Credit Union",
			"fid": "9909",
			"org": "Velocity Credit Union",
			"ofx": "https://rbserver.velocitycu.com/ofx/ofx.dll",
			"profile": {
				"address1": "P.O. Box 1089",
				"address2": null,
				"address3": null,
				"city": "Austin",
				"state": "TX",
				"zip": "78767-1089",
				"country": "USA",
				"email": "msc@velocitycu.com",
				"customerServicePhone": "512-469-7000",
				"technicalSupportPhone": null,
				"fax": "512-469-7024",
				"financialInstitutionName": "Velocity Credit Union",
				"siteURL": "https://www.velocitycu.com"
			}
		},
		{
			"name": "Vibe Credit Union",
			"fid": "272479388",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "44575 W. Twelve Mile Rd",
				"address2": null,
				"address3": null,
				"city": "Novi",
				"state": "MI",
				"zip": "48377",
				"country": "USA",
				"email": "answercenter@vibecu.com",
				"customerServicePhone": "(248) 735-9500",
				"technicalSupportPhone": "(248) 735-9500",
				"fax": null,
				"financialInstitutionName": "Vibe Credit Union",
				"siteURL": "www.vibecreditunion.com"
			}
		},
		{
			"name": "Village Bank & Trust",
			"fid": "5512",
			"org": "629",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "234 West Northwest Highway",
				"address2": null,
				"address3": null,
				"city": "Arlington Heights",
				"state": "IL",
				"zip": "60004",
				"country": "USA",
				"email": "info@bankatvillage.com",
				"customerServicePhone": "877-650-9907",
				"technicalSupportPhone": null,
				"fax": "847-392-6200",
				"financialInstitutionName": "VillageBankNTrust",
				"siteURL": "http://www.bankatvillage.com"
			}
		},
		{
			"name": "Virginia CU",
			"fid": "251082615",
			"org": "VACUDC",
			"ofx": "https://secure.vacu.org/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "PO BOX 90010",
				"address2": null,
				"address3": null,
				"city": "Richmond",
				"state": "VA",
				"zip": "23225",
				"country": "USA",
				"email": "memsvc@vacu.org",
				"customerServicePhone": "800-285-6609",
				"technicalSupportPhone": "800-285-6609",
				"fax": null,
				"financialInstitutionName": "VIRGINIA CREDIT UNION DC",
				"siteURL": "www.vacu.org"
			}
		},
		{
			"name": "Virginia Company Bank",
			"fid": "051409304",
			"org": "MTwoSixThree",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "601 Thimble Shoals Blvd",
				"address2": "Suite 201",
				"address3": null,
				"city": "Newport News",
				"state": "VA",
				"zip": "23606",
				"country": "USA",
				"email": null,
				"customerServicePhone": "757-596-2700",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Virginia Company Bank",
				"siteURL": "http://www.vacompanybank.com"
			}
		},
		{
			"name": "Visterra Credit Union -New",
			"fid": "15067",
			"org": "Visterra Credit Union -New",
			"ofx": "https://mb.visterracu.org/ofx/ofxserver.aspx",
			"profile": {
				"address1": "23540 Cactus Ave",
				"address2": null,
				"address3": null,
				"city": "Moreno Valley",
				"state": "CA",
				"zip": "92553",
				"country": "USA",
				"email": "visterra@visterracu.org",
				"customerServicePhone": "800-755-2347",
				"technicalSupportPhone": "800-755-2347",
				"fax": null,
				"financialInstitutionName": "Visterra Credit Union -New",
				"siteURL": "http://www.cubussolutions.com"
			}
		},
		{
			"name": "Voya Financial Advisors, Inc.",
			"fid": "056",
			"org": "Voya Financial Advisors, Inc.",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "909 Locust Street",
				"address2": null,
				"address3": null,
				"city": "Des Moines",
				"state": "IA",
				"zip": "503009-2899",
				"country": "USA",
				"email": "Lance.presley@us.ing.com",
				"customerServicePhone": "800-356-2906",
				"technicalSupportPhone": "800-356-2906",
				"fax": "515-698-3315",
				"financialInstitutionName": "ING Financial Partners",
				"siteURL": "-"
			}
		},
		{
			"name": "VyStar Credit Union",
			"fid": "263079276",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "4949 Blanding Blvd",
				"address2": null,
				"address3": null,
				"city": "Jacksonville",
				"state": "FL",
				"zip": "32210",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "904-777-6000",
				"technicalSupportPhone": "904-777-6000",
				"fax": null,
				"financialInstitutionName": "Vystar Credit Union",
				"siteURL": "www.vystarcu.org"
			}
		},
		{
			"name": "WECU",
			"fid": "58968",
			"org": "WECU",
			"ofx": "https://m.wecu.com/ofx/ofxserver.aspx",
			"profile": {
				"address1": "600 E. Holly St.",
				"address2": null,
				"address3": null,
				"city": "Bellingham",
				"state": "WA",
				"zip": "98225",
				"country": "USA",
				"email": "memberservices@wecu.com",
				"customerServicePhone": "800-525-8703",
				"technicalSupportPhone": "800-525-8703",
				"fax": null,
				"financialInstitutionName": "WECU",
				"siteURL": "https://www.wecu.com"
			}
		},
		{
			"name": "WSECU",
			"fid": "325181028",
			"org": "WSECU",
			"ofx": "https://ssl3.wsecu.org/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "330 Union Ave SE",
				"address2": null,
				"address3": null,
				"city": "Olympia",
				"state": "WA",
				"zip": "98501",
				"country": "USA",
				"email": "mfm.support@wsecu.org",
				"customerServicePhone": "800-562-0999",
				"technicalSupportPhone": "800-562-0999",
				"fax": null,
				"financialInstitutionName": "WSECU",
				"siteURL": "www.wsecu.org"
			}
		},
		{
			"name": "Waddell & Reed - Ivy Funds",
			"fid": "49623",
			"org": "waddell",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=722000303041111",
			"profile": {
				"address1": "816 Broadway",
				"address2": null,
				"address3": null,
				"city": "Kansas City",
				"state": "MO",
				"zip": "64105",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Waddell and Reed",
				"siteURL": null
			}
		},
		{
			"name": "Wakefield Cooperative Bank",
			"fid": "1304",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "342 Main Street",
				"address2": null,
				"address3": null,
				"city": "Wakefield",
				"state": "MA",
				"zip": "01882",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(877) 530-1141",
				"technicalSupportPhone": "(877) 530-1141",
				"fax": null,
				"financialInstitutionName": "Wakefield Cooperative Bank",
				"siteURL": "http://www.wcbbank.com"
			}
		},
		{
			"name": "Walnut Street Securities",
			"fid": "022",
			"org": "Walnut Street Securities",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "13045 Tesson Ferry Road",
				"address2": null,
				"address3": null,
				"city": "St. Louis",
				"state": "MO",
				"zip": "63128",
				"country": "USA",
				"email": "-",
				"customerServicePhone": "-",
				"technicalSupportPhone": "-",
				"fax": "-",
				"financialInstitutionName": "Walnut Street Securities",
				"siteURL": "http://Walnutstreet.com"
			}
		},
		{
			"name": "Washington Trust Bank - DL",
			"fid": "57558",
			"org": "JackHenry",
			"ofx": "https://directline.netteller.com",
			"profile": {
				"address1": "P O Box 2127",
				"address2": "Spokane WA 99210-2127",
				"address3": null,
				"city": "SPOKANE",
				"state": "WA",
				"zip": "992014440",
				"country": "USA",
				"email": "Washingtontrustbank@watrust.com",
				"customerServicePhone": "(800) 788-4578",
				"technicalSupportPhone": "800.788.4578",
				"fax": null,
				"financialInstitutionName": "Washington Trust Bank",
				"siteURL": "https://www.watrust.com/personal/banking/index"
			}
		},
		{
			"name": "Waterbury CT Teachers FCU",
			"fid": "867",
			"org": "orcc",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "99 North Main Street",
				"address2": null,
				"address3": null,
				"city": "Waterbury",
				"state": "CT",
				"zip": "06702",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 647-8711",
				"technicalSupportPhone": "(800) 647-8711",
				"fax": null,
				"financialInstitutionName": "Waterbury CT Teachers FCU",
				"siteURL": "http://www.wctfcu.com"
			}
		},
		{
			"name": "Watermark Credit Union",
			"fid": "325082033",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "808 Howell Street",
				"address2": null,
				"address3": null,
				"city": "Seattle",
				"state": "WA",
				"zip": "98101",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "206-382-7000",
				"technicalSupportPhone": "206-382-7000",
				"fax": "206-382-7983",
				"financialInstitutionName": "Watermark Credit Union",
				"siteURL": "www.watermarkcuonlinebanking.org"
			}
		},
		{
			"name": "Wedbush Bank",
			"fid": "122087590",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1000 Wilshire Blvd",
				"address2": null,
				"address3": null,
				"city": "Los Angeles",
				"state": "CA",
				"zip": "90017",
				"country": "USA",
				"email": "customersupport@wedbushbank.com",
				"customerServicePhone": "800-WEDBUSH",
				"technicalSupportPhone": "800-WEDBUSH",
				"fax": "213-688-4348",
				"financialInstitutionName": "Wedbush Bank",
				"siteURL": "www.wedbushbank.com"
			}
		},
		{
			"name": "Wells Fargo Advantage Funds",
			"fid": "000000",
			"org": "Wells",
			"ofx": "https://ofx3.financialtrans.com/tf/OFXServer?tx=OFXController&cz=702110804131918&cl=6181917141306",
			"profile": {
				"address1": "P.O. Box 8266",
				"address2": null,
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02266-8266",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Wells Fargo Advantage Funds",
				"siteURL": null
			}
		},
		{
			"name": "West Chester Savings Bank",
			"fid": "073916480",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "1060 West Monroe Street",
				"address2": null,
				"address3": null,
				"city": "Washington",
				"state": "IA",
				"zip": "52353",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "319-653-2265",
				"technicalSupportPhone": "319-653-2265",
				"fax": null,
				"financialInstitutionName": "West Chester Savings Bank",
				"siteURL": "www.wcsbankonline.com"
			}
		},
		{
			"name": "West Coast Bank",
			"fid": "123203218",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "5335 Meadows Road",
				"address2": null,
				"address3": null,
				"city": "Lake Oswego",
				"state": "OR",
				"zip": "97035",
				"country": "USA",
				"email": "homebanking@wcb.com",
				"customerServicePhone": "800-895-3345",
				"technicalSupportPhone": "800-895-3345",
				"fax": null,
				"financialInstitutionName": "West Coast Bank",
				"siteURL": "www.wcb.com"
			}
		},
		{
			"name": "WestStar Credit Union",
			"fid": "1904",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": null,
				"address2": null,
				"address3": null,
				"city": null,
				"state": null,
				"zip": null,
				"country": null,
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": null,
				"siteURL": null
			}
		},
		{
			"name": "Western Alliance Bank",
			"fid": "122105980",
			"org": "LOneEightyFour",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "2701 E. Camelback",
				"address2": "Suite 110",
				"address3": null,
				"city": "Phoenix",
				"state": "AZ",
				"zip": "85016",
				"country": "USA",
				"email": null,
				"customerServicePhone": "602-952-5400",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Alliance Bank of Arizona",
				"siteURL": null
			}
		},
		{
			"name": "Westfield Bank FSB",
			"fid": "1223",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "Two Park Circle",
				"address2": null,
				"address3": null,
				"city": "Westfield Center",
				"state": "Ohio",
				"zip": "44251",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "800-368-8930",
				"technicalSupportPhone": "800-368-8930",
				"fax": null,
				"financialInstitutionName": "Westfield Bank FSB",
				"siteURL": "https://www.westfield-bank.com"
			}
		},
		{
			"name": "Wheaton Bank & Trust",
			"fid": "5508",
			"org": "291",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "211 S. Wheaton Avenue",
				"address2": null,
				"address3": null,
				"city": "Wheaton",
				"state": "IL",
				"zip": "60187",
				"country": "USA",
				"email": "customer_service@wheatonbank.com",
				"customerServicePhone": "888-671-3221",
				"technicalSupportPhone": null,
				"fax": "630-690-4771",
				"financialInstitutionName": "WheatonBank",
				"siteURL": "http://www.wheatonbank.com"
			}
		},
		{
			"name": "White Eagle Credit Union",
			"fid": "64HXI",
			"org": "White Eagle Credit Union",
			"ofx": "https://www.netit.financial-net.com/ofx",
			"profile": {
				"address1": "2830 OHIO ST",
				"address2": null,
				"address3": null,
				"city": "AUGUSTA",
				"state": "KS",
				"zip": "67010",
				"country": "US",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "WHITE EAGLE CU",
				"siteURL": "https://www.netit.financial-net.com/awecu"
			}
		},
		{
			"name": "Whitney Bank Direct Connect",
			"fid": "9735",
			"org": "Hancock",
			"ofx": "https://ofx.onlinencr.com/scripts/serverext.dll",
			"profile": {
				"address1": "PO Box 4019",
				"address2": null,
				"address3": null,
				"city": "Gulfport",
				"state": "MS",
				"zip": "39502",
				"country": "USA",
				"email": "service@hancock-whitneybank.com",
				"customerServicePhone": "1-800-522-6542",
				"technicalSupportPhone": "1-800-522-6542",
				"fax": null,
				"financialInstitutionName": "Hancock Bank",
				"siteURL": "http://www.hancockbank.com/"
			}
		},
		{
			"name": "Williamstown Savings Bank",
			"fid": "348",
			"org": "ORCC",
			"ofx": "https://www20.onlinebank.com/OROFX16Listener",
			"profile": {
				"address1": "795 Main Street",
				"address2": null,
				"address3": null,
				"city": "Williamstown",
				"state": "MA",
				"zip": "01267",
				"country": "USA",
				"email": "info@orcc.com",
				"customerServicePhone": "(800) 442-0078",
				"technicalSupportPhone": "(800) 442-0078",
				"fax": null,
				"financialInstitutionName": "Williamstown Savings Bank",
				"siteURL": "http://www.williamstownsavings.com"
			}
		},
		{
			"name": "Wilshire State Bank",
			"fid": "122038251",
			"org": "MSevenSixEight",
			"ofx": "https://ofx1.evault.ws/ofxserver/ofxsrvr.dll",
			"profile": {
				"address1": "3200 Wilshire Blvd",
				"address2": null,
				"address3": null,
				"city": "Los Angeles",
				"state": "CA",
				"zip": "90010",
				"country": "USA",
				"email": null,
				"customerServicePhone": "213-387-3200",
				"technicalSupportPhone": "213-427-6570",
				"fax": null,
				"financialInstitutionName": "Wilshire State Bank",
				"siteURL": "www.wilshirebank.com"
			}
		},
		{
			"name": "Winchester Cooperative Bank New",
			"fid": "1031",
			"org": "COCC",
			"ofx": "https://ofx.myvirtualbranch.com/eftxweb/access.ofx",
			"profile": {
				"address1": "19 Church Street",
				"address2": "Winchester",
				"address3": null,
				"city": "Winchester",
				"state": "MA",
				"zip": "01890",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "(877) 409-0278",
				"technicalSupportPhone": "(877) 409-0278",
				"fax": null,
				"financialInstitutionName": "Winchester Cooperative Bank",
				"siteURL": "https://www.wcbonline.com/"
			}
		},
		{
			"name": "Windward Community FCU",
			"fid": "321380315",
			"org": "Users",
			"ofx": "https://wcfcu.online-cu.com/scripts/isaofx.dll",
			"profile": {
				"address1": "1250 Drummers Ln.",
				"address2": null,
				"address3": null,
				"city": "Valley Forge",
				"state": "PA",
				"zip": "19482",
				"country": "USA",
				"email": "admin@users.com",
				"customerServicePhone": "610-687-9400",
				"technicalSupportPhone": "610-687-9400",
				"fax": "610-293-4433",
				"financialInstitutionName": "USERS Credit Union",
				"siteURL": "http://www.users.com"
			}
		},
		{
			"name": "Winslow, Evans and Crocker, Inc",
			"fid": "046",
			"org": "Winslow Evans Crocker Inc.",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "175 Federal Street",
				"address2": "6th Floor",
				"address3": null,
				"city": "Boston",
				"state": "MA",
				"zip": "02110",
				"country": "USA",
				"email": "clientservices@e-winslow.com",
				"customerServicePhone": "617-896-3555",
				"technicalSupportPhone": "617-896-3555",
				"fax": "617-227-5505",
				"financialInstitutionName": "Winslow, Evans and Crocker, Inc",
				"siteURL": "http://www.winslowevanscrocker.com"
			}
		},
		{
			"name": "Wintrust Bank",
			"fid": "5509",
			"org": "380",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "1145 Wilmette Avenue",
				"address2": null,
				"address3": null,
				"city": "Wilmette",
				"state": "IL",
				"zip": "60091",
				"country": "USA",
				"email": "customer_service@wintrustbank.com",
				"customerServicePhone": "877-650-9905",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Wintrust Bank",
				"siteURL": "www.wintrustbank.com"
			}
		},
		{
			"name": "Wright-Patt Credit Union",
			"fid": "242279408",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "2455 Executive Park Boulevard",
				"address2": null,
				"address3": null,
				"city": "Fairborn",
				"state": "OH",
				"zip": "45324",
				"country": "USA",
				"email": "ContactUs@wpcu.coop",
				"customerServicePhone": "1(800)762-0047",
				"technicalSupportPhone": "(800)762-0047",
				"fax": "(937)912-8000",
				"financialInstitutionName": "Wright-Patt Credit Union",
				"siteURL": "www.wpcu.coop"
			}
		},
		{
			"name": "Xceed Financial Credit Union",
			"fid": "322275490",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "888 Nash St",
				"address2": null,
				"address3": null,
				"city": "El Segundo",
				"state": "CA",
				"zip": "90245-2826",
				"country": "USA",
				"email": "2",
				"customerServicePhone": "(800)932-8222",
				"technicalSupportPhone": "(800)932-8222",
				"fax": null,
				"financialInstitutionName": "Xceed Financial Credit Union",
				"siteURL": "www.xfcu.org"
			}
		},
		{
			"name": "Xenith Bank - DC",
			"fid": "1546",
			"org": "s7x",
			"ofx": "https://pfm.metavante.com/ofx/OFXServlet",
			"profile": {
				"address1": "1011 Boulder Springs Drive",
				"address2": "Suite 410",
				"address3": null,
				"city": "Richmond",
				"state": "VA",
				"zip": "23225-4950",
				"country": "USA",
				"email": "Xenithbank@billsupport.com",
				"customerServicePhone": "888-412-9662",
				"technicalSupportPhone": null,
				"fax": "877-329-7298",
				"financialInstitutionName": "Xenith Bank",
				"siteURL": "www.XenithBank.com"
			}
		},
		{
			"name": "Ziegler",
			"fid": "050",
			"org": "Ziegler",
			"ofx": "https://ofx.netxclient.com/NxcOFXServer/InvestmentDownload",
			"profile": {
				"address1": "215 N Main Street",
				"address2": null,
				"address3": null,
				"city": "West Bend",
				"state": "WI",
				"zip": "53095",
				"country": "USA",
				"email": "jkuehn@ziegler.com",
				"customerServicePhone": "262-808-2157",
				"technicalSupportPhone": "262-808-2157",
				"fax": "-",
				"financialInstitutionName": "Ziegler",
				"siteURL": "https://www.netxselect.com/hybrid/login_44A.htm"
			}
		},
		{
			"name": "Zions Direct",
			"fid": "025",
			"org": "Zions Investment Securities,Inc.",
			"ofx": "https://ofx.ibgstreetscape.com:443",
			"profile": {
				"address1": "XXXXXXXXXX",
				"address2": null,
				"address3": null,
				"city": "XXXXXXXXXX",
				"state": "XX",
				"zip": "XXXXX",
				"country": "USA",
				"email": null,
				"customerServicePhone": "Contact your broker/dealer.",
				"technicalSupportPhone": "Contact your broker/dealer.",
				"fax": "Contact your broker/dealer.",
				"financialInstitutionName": "myStreetscape",
				"siteURL": null
			}
		},
		{
			"name": "Zions First National Bank - Direct",
			"fid": "4676",
			"org": "244-3",
			"ofx": "https://www.oasis.cfree.com/fip/genesis/prod/04676.ofx",
			"profile": {
				"address1": "7730 South Union Park Ave",
				"address2": "Suite 250",
				"address3": null,
				"city": "Midvale",
				"state": "UT",
				"zip": "84047",
				"country": "USA",
				"email": null,
				"customerServicePhone": null,
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Zions First National Bank",
				"siteURL": "http://www.zionsbank.com/"
			}
		},
		{
			"name": "generations federal credit union",
			"fid": "314088572",
			"org": "GENERATIONSFCUDC",
			"ofx": "https://mb.mygenfcu.org/OFXServer/ofxsrvr.dll",
			"profile": {
				"address1": "PO Box 791870",
				"address2": null,
				"address3": null,
				"city": "San Antonio",
				"state": "TX",
				"zip": "78279-1870",
				"country": "USA",
				"email": "eServices@mygenfcu.org",
				"customerServicePhone": "800-232-8178",
				"technicalSupportPhone": null,
				"fax": null,
				"financialInstitutionName": "Generations FCU Quicken",
				"siteURL": "www.MyGenFCU.org"
			}
		},
		{
			"name": "iBeria bank",
			"fid": "1070",
			"org": "JackHenry",
			"ofx": "https://directline2.netteller.com",
			"profile": {
				"address1": "200 West Congress Street",
				"address2": "Lafayette            LA  70501",
				"address3": null,
				"city": "LAFAYETTE",
				"state": "LA",
				"zip": "705010000",
				"country": "USA",
				"email": "PlusMail@iberiabank.com",
				"customerServicePhone": "(800) 968-0801",
				"technicalSupportPhone": "(800)682-3231",
				"fax": null,
				"financialInstitutionName": "IBERIABANK",
				"siteURL": "http://www.iberiabank.com"
			}
		},
		{
			"name": "nuVision Financial FCU",
			"fid": "322282399",
			"org": "DI",
			"ofx": "https://ofxdi.diginsite.com/cmr/cmr.ofx",
			"profile": {
				"address1": "7812 Edinger Ave",
				"address2": null,
				"address3": null,
				"city": "Huntington Beach",
				"state": "CA",
				"zip": "92647",
				"country": "USA",
				"email": "webmaster@nuvision.coop",
				"customerServicePhone": "714-375-8000",
				"technicalSupportPhone": "714-375-8000",
				"fax": "714-843-9670",
				"financialInstitutionName": "nuVision Financial FCU",
				"siteURL": "www.nuvisionfinancial.org"
			}
		}
	]

/***/ }

});
//# sourceMappingURL=ezm.js.map