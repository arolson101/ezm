"use strict";

var _ = require("lodash");
var clone = require("clone");
var React = require("react/addons");
var {Panel, Button, Input, Modal, Row, Col} = require("react-bootstrap");
var Icon = require("react-fa");
var access = require('safe-access');
var t = require("../t");
var ficache = require("../ficache");
var Editable = require("./xeditable");
var {Account, AccountTypes, AccountTypes_t, Institution} = require("../models/account");


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

var AccountDialog = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    institution: React.PropTypes.instanceOf(Institution),
    accounts: React.PropTypes.arrayOf(Account),
  },
  
  getInitialState: function() {
    var src = this.props.institution || new Institution();
    var state = {
      accounts: clone(this.props.accounts) || [],
      addAccountName: "",
      addAccountNumber: "",
      addAccountType: t("accountDialog.add.typePlaceholder"),
    };
    _.forEach(Keys, function(key) {
      state[key] = src[key];
    });
    return state;
  },
  
  render: function() {
    var title = this.props.id ? t("accountDialog.editTitle") : t("accountDialog.addTitle");
    var canSave = this.state.name ? true : false;
    
    var institutionOptions = _.map(ficache.byName(), function(fi) {
      return <option key={fi.id} value={fi.id}>{fi.name}</option>;
    });
    
    var inputClasses = {
      labelClassName: "col-xs-2",
      wrapperClassName: "col-xs-10",
    };
    
    return (
      <Modal {...this.props}
        title={title}
        animation={true}
        data-backdrop="static"
        data-keyboard="false"
        data-trigger="focus"
        >
        <div className="modal-body">
          <form onSubmit={this.onSubmit} className="form-horizontal">
          
            <Input
              ref="institution"
              type="select"
              label={t("accountDialog.institutionLabel")}
              help={t("accountDialog.institutionHelp")}
              defaultValue={this.props.institution}
              wrapperClassName= "col-xs-10"
              labelClassName= "col-xs-2"
              >
              <option></option>
              {institutionOptions}
            </Input>

            <hr/>

            <Input
              type="text"
              label={t("accountDialog.nameLabel")}
              help={t("accountDialog.nameHelp")}
              placeholder={t("accountDialog.namePlaceholder")}
              defaultValue={this.props.name}
              valueLink={this.linkState('name')}
              {...inputClasses}
            />

            <Input
              type="text"
              label={t("accountDialog.webLabel")}
              placeholder={t("accountDialog.webPlaceholder")}
              defaultValue={this.props.web}
              valueLink={this.linkState('web')}
              {...inputClasses}
            />
            
            <Input
              type="textarea"
              rows="4"
              label={t("accountDialog.addressLabel")}
              placeholder={t("accountDialog.addressPlaceholder")}
              defaultValue={this.props.address}
              valueLink={this.linkState('address')}
              {...inputClasses}
            />
            
            <Input
              type="textarea"
              rows="4"
              label={t("accountDialog.notesLabel")}
              placeholder={t("accountDialog.notesPlaceholder")}
              defaultValue={this.props.notes}
              valueLink={this.linkState('notes')}
              {...inputClasses}
            />
            
            <hr/>

            <Input
              type="checkbox"
              label={t("accountDialog.enableOnline")}
              checkedLink={this.linkState('online')}
              wrapperClassName="col-xs-12"
            />
            
            {this.renderOnlineFields(inputClasses)}
            
            <hr/>
            
            <Input label="Accounts" {...inputClasses}>
              {this.renderAccounts()}
              {this.state.accounts.length > 0 ? <hr/> : null}
              {this.renderAddAccountForm()}
            </Input>

            <div className="modal-footer">
              <Button onClick={this.props.onRequestHide}>{t("accountDialog.close")}</Button>
              <Button bsStyle="primary" type="submit" disabled={!canSave}>{t("accountDialog.save")}</Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  },
  
  renderOnlineFields: function(inputClasses) {
    if(this.state.online) {
      return (
        <div>
          <Panel header={t("accountDialog.ofxInfo")}>
            <Input
              type="text"
              label={t("accountDialog.fidLabel")}
              help={t("accountDialog.fidHelp")}
              placeholder={t("accountDialog.fidPlaceholder")}
              defaultValue={this.props.fid}
              valueLink={this.linkState('fid')}
              {...inputClasses}
            />

            <Input
              type="text"
              label={t("accountDialog.orgLabel")}
              help={t("accountDialog.orgHelp")}
              placeholder={t("accountDialog.orgPlaceholder")}
              defaultValue={this.props.org}
              valueLink={this.linkState('org')}
              {...inputClasses}
            />

            <Input
              type="text"
              label={t("accountDialog.ofxLabel")}
              help={t("accountDialog.ofxHelp")}
              placeholder={t("accountDialog.ofxPlaceholder")}
              defaultValue={this.props.url}
              valueLink={this.linkState('ofx')}
              {...inputClasses}
            />
          </Panel>
          
          <Panel header={t("accountDialog.userpassInfo")}>
            <Input
              type="text"
              label={t("accountDialog.usernameLabel")}
              help={t("accountDialog.usernameHelp")}
              placeholder={t("accountDialog.usernamePlaceholder")}
              defaultValue={this.props.username}
              valueLink={this.linkState('username')}
              {...inputClasses}
            />

            <Input
              type="text"
              label={t("accountDialog.passwordLabel")}
              help={t("accountDialog.passwordHelp")}
              placeholder={t("accountDialog.passwordPlaceholder")}
              defaultValue={this.props.password}
              valueLink={this.linkState('password')}
              {...inputClasses}
            />
          </Panel>
          
          <Input label=" " {...inputClasses}>
            <Row>
              <Col xs={12}>
                <span className="pull-right">
                  <Button>{t("accountDialog.getAccountList")}</Button>
                </span>
              </Col>
            </Row>
          </Input>
        </div>
      );
    }
  },
  
  renderAccounts: function() {
    var accountTypeOptions = AccountTypes.enums.map(function(type) {
      return AccountTypes_t(type);
    });
    return this.state.accounts.map(function(acct) {
      var typeDisplay = AccountTypes_t(acct.type);
      return (
        <Row key={acct.id}>
          <Col xs={1}>
            <Button
              bsStyle="link"
              onClick={this.toggleVis.bind(this, acct)}
              title={t("accountDialog.toggleVisTooltip")}
            >
              <Icon name={acct.visible ? "eye" : "eye-slash"}/>
            </Button>
          </Col>
          <Col xs={2}>
            <Editable
              type="select"
              source={accountTypeOptions}
              value={typeDisplay}
              title={t("accountDialog.add.typePlaceholder")}
            >
              {typeDisplay}
            </Editable>
          </Col>
          <Col xs={3}>
            <Button
              bsStyle="link"
              disabled
            >
              {acct.id}
            </Button>
          </Col>
          <Col xs={3}>
            <Editable
              type="text"
              title={t("accountDialog.add.namePlaceholder")}
              validate={ValidateNotEmpty}
            >
              {acct.name}
            </Editable>
          </Col>
          <Col xs={1}>
            <Button bsStyle="link" onClick="">Remove</Button>
          </Col>
        </Row>
      );
    }, this);
  },
  
  renderAddAccountForm: function() {
    var accountTypeOptions = AccountTypes.enums.map(function(type) {
      return <option key={type} value={type}>{AccountTypes_t(type)}</option>;
    });
    var btnEnabled = (this.state.addAccountType !== t("accountDialog.add.typePlaceholder")) &&
                      (this.state.addAccountId !== "") &&
                      (this.state.addAccountName !== "");
    return (
      <Row>
        <Col xs={3}>
          <select
            className="form-control"
            valueLink={this.linkState('addAccountType')}
          >
            <option selection disabled>{t("accountDialog.add.typePlaceholder")}</option>
            {accountTypeOptions}
          </select>
        </Col>
        <Col xs={3}>
          <input
            type="text"
            className="form-control"
            valueLink={this.linkState('addAccountId')}
            placeholder={t("accountDialog.add.idPlaceholder")}
          />
        </Col>
        <Col xs={3}>
          <input
            type="text"
            className="form-control"
            valueLink={this.linkState('addAccountName')}
            placeholder={t("accountDialog.add.namePlaceholder")}
          />
        </Col>
        <Col xs={1}>
          <Button disabled={!btnEnabled} onClick={this.addAccount}>{t("accountDialog.addAccount")}</Button>
        </Col>
      </Row>
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
