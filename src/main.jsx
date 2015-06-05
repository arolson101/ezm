/** @jsx React.DOM */
'use strict';


require("./ezm.css");

//var nav = require("./navigation");
var {Input, ListGroup, ListGroupItem, OverlayTrigger, Popover, Table, Grid, Col} = ReactBootstrap;
var t = require("./t");
var ficache = require("./ficache");
var Sidebar = require("./components/sidebar");
var db = require("./db");

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
      L(OverlayTrigger, {trigger: ["hover"], placement: "right", 
        overlay: 
          L(Popover, {title: t(" RecentTransactions")}, 
            L(Table, {condensed: true}, 
              L("tr", null, L("td", null, "1/2/2015"), L("td", null, "Company"), L("td", null, "$123")), 
              L("tr", null, L("td", null, "1/2/2015"), L("td", null, "Company"), L("td", null, "$123")), 
              L("tr", null, L("td", null, "1/2/2015"), L("td", null, "Company"), L("td", null, "$123"))
            )
          )
        }, 

        L(ListGroupItem, {
          onClick: this.props.onAccountClick, 
          eventKey: this.props.account.id, 
          active: active
          }, 
          L("span", null, 
            L("i", {className: "fa fa-money"}), " ", this.props.account.name
          ), 
          L("span", {className: "pull-right"}, 
            L("small", null, "$1,234.56")
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
        L(Account, {
          key: acct.id, 
          account: acct, 
          store: this.props.store, 
          selectedAccountId: this.props.selectedAccountId, 
          onAccountClick: this.props.onAccountClick}
        )
      );
    }.bind(this));

    return L(ListGroupItem, {header: this.props.inst.name}, items);
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
        L(Institution, {
          key: inst.name, 
          inst: inst, 
          selectedAccountId: this.state.selectedAccountId, 
          onAccountClick: this.onAccountClick}
        )
      );
    }.bind(this));

    return L(ListGroup, null, items);
  },

  onAccountClick: function(id) {
    this.setState({selectedAccountId: id});
  },

  getSelectedAccountId: function() {
    return this.state.selectedAccountId;
  }
});

var AccountStore = require("./accountStore");
var Reflux = require("reflux");

var Sortable = require("sortablejs");

var Item = React.createClass({displayName: "Item",
  //mixins: [sortable.ItemMixin],
  render: function() {
    return L(ListGroupItem, null, 
      L("span", {className: "drag-handle"}, L("i", {className: "fa fa-bars"})), " item ", this.props.item.name, 
      L("div", {ref: "root"}, 
        L(ListGroupItem, {onClick: this.click}, "sub1"), 
        L(ListGroupItem, {onClick: this.click}, "sub2")
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
      return L(Item, React.__spread({key: item.id, item: item, index: i},  this.movableProps));
    }, this);

    return (
      L("div", null, 
        L(ListGroupItem, {ref: "root"}, 
          items
        ), 
        L(Input, {
          type: "text", 
          placeholder: "Enter text", 
          valueLink: this.linkState('text'), 
          onKeyUp: this.handleValueChange})
      )
    );
  }
});



var L = L;

function main() {
  if(0) {
    React.render(
      L(Grid, null, 
        L(Col, {md: 4}, 
          L(AccountList, {accounts: accountListData}), 
          L(ListGroupItem, null, t("Budget"))
        )
      ),
      document.body
    );
  }
  else if(0) {
    React.render(
      L(List, {list: AccountStore.getDefaultData()}),
      document.body
    );
  }
  else {
    React.render(
      L(Grid, null, 
        L(Col, {md: 4}, 
          L(Sidebar, null)
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
