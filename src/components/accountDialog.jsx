"use strict";

var _ = require("lodash");
var React = require("react/addons");
var {Button, Input, Modal, Panel} = require("react-bootstrap");
var access = require('safe-access');
var t = require("../t");
var ficache = require("../ficache");


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
];

var AccountDialog = React.createClass({
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
      return <option key={fi.id} value={fi.id}>{fi.name}</option>;
    });
    
    var onlineFields = null;
    if(this.state.online) {
      onlineFields = (
        <div>
          <Input
            type="text"
            label={t("accountDialog.fidLabel")}
            help={t("accountDialog.fidHelp")}
            placeholder={t("accountDialog.fidPlaceholder")}
            defaultValue={this.props.fid}
            valueLink={this.linkState('fid')}
          />

          <Input
            type="text"
            label={t("accountDialog.orgLabel")}
            help={t("accountDialog.orgHelp")}
            placeholder={t("accountDialog.orgPlaceholder")}
            defaultValue={this.props.org}
            valueLink={this.linkState('org')}
          />

          <Input
            type="text"
            label={t("accountDialog.ofxLabel")}
            help={t("accountDialog.ofxHelp")}
            placeholder={t("accountDialog.ofxPlaceholder")}
            defaultValue={this.props.url}
            valueLink={this.linkState('ofx')}
          />
        </div>
      );
    }

    return (
      <Modal {...this.props}
        title={title}
        animation={true}
        data-backdrop="static"
        data-keyboard="false"
        data-trigger="focus"
        >
        <div className="modal-body">
          <form onSubmit={this.onSubmit} >
          
            <Input
              ref="institution"
              type="select"
              label={t("accountDialog.institutionLabel")}
              help={t("accountDialog.institutionHelp")}
              defaultValue={this.props.institution}
              >
              <option></option>
              {institutionOptions}
            </Input>

            <Input
              type="text"
              label={t("accountDialog.nameLabel")}
              help={t("accountDialog.nameHelp")}
              placeholder={t("accountDialog.namePlaceholder")}
              defaultValue={this.props.name}
              valueLink={this.linkState('name')}
            />

            <Input
              type="text"
              label={t("accountDialog.webLabel")}
              placeholder={t("accountDialog.webPlaceholder")}
              defaultValue={this.props.web}
              valueLink={this.linkState('web')}
            />
            
            <Input
              type="textarea"
              rows="4"
              label={t("accountDialog.addressLabel")}
              placeholder={t("accountDialog.addressPlaceholder")}
              defaultValue={this.props.address}
              valueLink={this.linkState('address')}
            />
            
            <Input
              type="textarea"
              rows="4"
              label={t("accountDialog.notesLabel")}
              placeholder={t("accountDialog.notesPlaceholder")}
              defaultValue={this.props.notes}
              valueLink={this.linkState('notes')}
            />


            <Input
              type="checkbox"
              label={t("accountDialog.enableOnline")}
              checkedLink={this.linkState('online')}
              wrapperClassName="col-xs-12"
            />
            
            <Panel key="onlineFields">
              {onlineFields}
            </Panel>
                        
            <div className="modal-footer">
              <Button onClick={this.props.onRequestHide}>{t("accountDialog.close")}</Button>
              <Button bsStyle="primary" type="submit" disabled={!canSave}>{t("accountDialog.save")}</Button>
            </div>
          </form>
        </div>
      </Modal>
    );
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
