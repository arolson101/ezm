"use strict";

var {Button, ListGroupItem, ModalTrigger} = ReactBootstrap;
var Icon = require("react-fa");

var t = require("../t");
var AccountStore = require("../accountStore");
var AccountDisplay = require("./accountDisplay");
var SortableMixin = require("../mixins/sortable");
var AccountDialog = require("./accountDialog");


module.exports = React.createClass({
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
        <AccountDisplay
          {... selectionProps(account.id)}
          account={account}
        />
      );
    }, this);
    
/*
    var addButtonTooltip = (
      <Tooltip>{t("sidebar.addAccountTooltip")}</Tooltip>
    );
*/
    
    return (
      <div>
        <ListGroupItem ref="root">
          <ListGroupItem {... selectionProps("home")}><Icon name="home"/> {t("sidebar.home")}</ListGroupItem>
          {accounts}
          <ListGroupItem {... selectionProps("budget")}><Icon name="area-chart"/> {t("sidebar.budget")}</ListGroupItem>
          <ListGroupItem {... selectionProps("calendar")}><Icon name="calendar"/> {t("sidebar.calendar")}</ListGroupItem>
        </ListGroupItem>
        <span className="pull-right" style={{marginTop: 5}}>
          <ModalTrigger modal={<AccountDialog/>}>
            <Button><Icon name="plus"/></Button>
          </ModalTrigger>
        </span>
      </div>
    );
  },
  
  onSetActive: function(eventKey) {
    this.setState({active: eventKey});
  },
  
});
