///<reference path="project.d.ts"/>

require("./ezm.css");

//var nav = require("./navigation");
import React = require("react");
//import {Input, ListGroup, ListGroupItem, OverlayTrigger, Popover, Table, Grid, Col} from "./factories";
var {Input, ListGroup, ListGroupItem, OverlayTrigger, Popover, Table, Grid, Col} = require("react-bootstrap");
import * as t from "./t";
import {ficache} from "./ficache";
import {Sidebar} from "./components/sidebar";
//import {db} from "./db";
import {Actions} from "./actions";

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

//
//var Account = React.createClass({
//  render: function() {
//    var active = (this.props.selectedAccountId === this.props.account.id);
//
//    return (
//      <OverlayTrigger trigger={["hover"]} placement="right"
//        overlay={
//          <Popover title={t(" RecentTransactions")}>
//            <Table condensed>
//              <tr><td>1/2/2015</td><td>Company</td><td>$123</td></tr>
//              <tr><td>1/2/2015</td><td>Company</td><td>$123</td></tr>
//              <tr><td>1/2/2015</td><td>Company</td><td>$123</td></tr>
//            </Table>
//          </Popover>
//        }>
//
//        <ListGroupItem
//          onClick={this.props.onAccountClick}
//          eventKey={this.props.account.id}
//          active={active}
//          >
//          <span>
//            <i className="fa fa-money"></i> {this.props.account.name}
//          </span>
//          <span className="pull-right">
//            <small>$1,234.56</small>
//          </span>
//        </ListGroupItem>
//      </OverlayTrigger>
//    );
//  }
//});
//
//
//var Institution = React.createClass({
//  getInitialState: function() {
//    return { active: '' };
//  },
//
//  render: function() {
//    var items = this.props.inst.accounts.map(function(acct) {
//      //return <ListGroupItem key={acct.name}><span>{acct.name}</span><span className="pull-right">{acct.name}</span></ListGroupItem>;
//      return (
//        <Account
//          key={acct.id}
//          account={acct}
//          store={this.props.store}
//          selectedAccountId={this.props.selectedAccountId}
//          onAccountClick={this.props.onAccountClick}
//        />
//      );
//    }.bind(this));
//
//    return <ListGroupItem header={this.props.inst.name}>{items}</ListGroupItem>;
//  }
//});
//
//var AccountList = React.createClass({
//  getInitialState: function() {
//    return {
//      selectedAccountId: '',
//    };
//  },
//
//  render: function() {
//    var items = this.props.accounts.map(function(inst) {
//      return (
//        <Institution
//          key={inst.name}
//          inst={inst}
//          selectedAccountId={this.state.selectedAccountId}
//          onAccountClick={this.onAccountClick}
//        />
//      );
//    }.bind(this));
//    
//    return <ListGroup>{items}</ListGroup>;
//  },
//  
//  onAccountClick: function(id) {
//    this.setState({selectedAccountId: id});
//  },
//  
//  getSelectedAccountId: function() {
//    return this.state.selectedAccountId;
//  }
//});
//
//var AccountStore = require("./accountStore");
//
//var Sortable = require("sortablejs");
//
//var Item = React.createClass({
//  //mixins: [sortable.ItemMixin],
//  render: function() {
//    return <ListGroupItem>
//      <span className="drag-handle"><i className="fa fa-bars"></i></span> item {this.props.item.name}
//      <div ref="root">
//        <ListGroupItem onClick={this.click}>sub1</ListGroupItem>
//        <ListGroupItem onClick={this.click}>sub2</ListGroupItem>
//      </div>
//    </ListGroupItem>;
//  },
//  
//  click: function() {
//  },
//  
//  componentDidMount: function() {
//    // Set items' data, key name `items` required
//    //this.setState({ items: this.props.items });
//    this.sortable = Sortable.create(this.refs.root.getDOMNode(), {
//      //handle: ".drag-handle"
//      animation: 150,
//      ghostClass: "sortable-ghost",
//    });
//  },
//  
//  componentWillUnmount: function () {
//    this.sortable.destroy();
//  },
//  
//  onUpdate: function (/**Event*/evt) {
//    console.log("onUpdate", evt);
//    //var itemEl = evt.item;  // dragged HTMLElement
//    // + indexes from onEnd
//  },
//});
//
//var idServer = 100;
//
//var List = React.createClass({
//  mixins: [
//    Reflux.connect(AccountStore, "list"),
//    React.addons.LinkedStateMixin
//  ],
//  
//  getInitialState: function() {
//    return {
//      text: 'hello',
//    };
//  },
//  
//  componentDidMount: function() {
//    // Set items' data, key name `items` required
//    //this.setState({ items: this.props.items });
//    this.sortable = Sortable.create(this.refs.root.getDOMNode(), {
//      //handle: ".drag-handle"
//      animation: 150,
//      ghostClass: "sortable-ghost", 
//    });
//  },
//  
//  componentWillUnmount: function () {
//    this.sortable.destroy();
//  },
//
//  handleValueChange: function(evt) {
//    var text = this.state.text; // because of the linkState call in render, this is the contents of the field
//    // we pressed enter, if text isn't empty we blur the field which will cause a save
//    if (evt.which === 13 && text) {
//      AccountStore.actions.addInstitution({id:idServer++, name: text});
//      this.setState({text: ''});
//      //this.refs.editInput.getDOMNode().blur();
//    }
//  },
//  
//  render: function() {
//    var items = this.props.list.map(function(item, i) {
//      return <Item key={item.id} item={item} index={i} {...this.movableProps}/>;
//    }, this);
//  
//    return (
//      <div>
//        <ListGroupItem ref="root">
//          {items}
//        </ListGroupItem>
//        <Input
//          type="text"
//          placeholder="Enter text"
//          valueLink={this.linkState('text')}
//          onKeyUp={this.handleValueChange} />
//      </div>
//    );
//  }
//});
//
function asdf() {
  if(0) {
//    React.render(
//      <Grid>
//        <Col md={4}>
//          <AccountList accounts={accountListData}/>
//          <ListGroupItem>{t("Budget")}</ListGroupItem>
//        </Col>
//      </Grid>,
//      document.body
//    );
  }
  else if(0) {
//    React.render(
//      <List list={AccountStore.getDefaultData()}/>,
//      document.body
//    );
  }
  else {
     React.render(
    //React.jsx(`
    //   <Grid>
    //     <Col md={4}>
    //       <Sidebar/>
    //     </Col>
    //   </Grid>
    // `),
    
     React.createElement(Grid, null,
       React.createElement(Col, {md: 4},
         React.createElement(Sidebar)
       )
     ),
      document.body
    );
  }
}


function reportError(err) {
  console.log(err);
}


// force reference
require("./stores/persistentStore");

export function main() {
  Actions.open()
  .then(Actions.openCompleted)
  .then(asdf);
}

