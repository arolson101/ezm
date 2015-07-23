/// <reference path="../project.d.ts"/>

import clone = require("clone");
import React = require("react/addons");
import {Alert, Panel, Button, Input, Label, Modal, Row, Col} from "react-bootstrap";
import Icon = require("react-fa");
import access = require("safe-access");
import LaddaButton = require('react-ladda');
import {Actions} from "../actions";
import {t} from "../t";
import {ficache, FI} from "../ficache";
import {XText, XSelect} from "./xeditable";
import {Account, IAccount} from "../models/account";
import {AccountType, AccountType_t} from "../models/accountType";
import {Institution} from "../models/institution";
import {EnumEx} from "../enumEx";
import {mixin} from "../mixins/applyMixins";
import {readAccountProfiles} from "../online/readAccountProfiles";
import {AccountList} from "./accountList";
import {Select2, Select2ChangeEvent} from "./select2";


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
  if($.trim(value) === "") {
    return t("accountDialog.validateNotEmpty");
  }
}


interface Props extends ModalAttributes {
  id?: string;
  institution?: Institution;
  accounts?: Account[];
}

interface State {
  accounts?: IAccount[];

  name?: string;
  web?: string;
  address?: string;
  notes?: string;
  institution?: string;
  id?: number;

  online?: string;

  fid?: string;
  org?: string;
  ofx?: string;

  username?: string;
  password?: string;

  gettingAccounts?: boolean;
  gettingAccountsError?: string;
  gettingAccountsSuccess?: number;
}


@mixin(React.addons.LinkedStateMixin)
export class AccountDialog extends React.Component<Props, State> {
  linkState: <T>(key: string) => React.ReactLink<T>;

  constructor(props?: Props) {
    super(props);

    var src = this.props.institution || new Institution();
    this.state = {
      accounts: clone(this.props.accounts) || [],
      name: null,
      gettingAccounts: false,
      gettingAccountsError: null,
      gettingAccountsSuccess: 0,
    };
    Keys.forEach( key =>
      this.state[key] = (typeof(src[key]) === "undefined" ? "" : src[key])
    );
  }

  render() : any {
    var title = this.props.id ? t("accountDialog.editTitle") : t("accountDialog.addTitle");
    var canSave = (this.state.name && this.state.accounts.length > 0);

    var institutionOptions = ficache.byName().map(fi => <option value={fi.id.toString()} key={fi.id}>{fi.name}</option>);

    return (
      <Modal
        title={title}
        animation={true}
        backdrop="static"
        keyboard={false}
        trigger="focus"
        {... this.props}>
        <div className="modal-body">
          <Select2
            key="institution"
            label={t("accountDialog.institutionLabel")}
            help={t("accountDialog.institutionHelp")}
            /*defaultValue={this.state.id}*/
            placeholder={t("accountDialog.institutionPlaceholder")}
            allowClear={true}
            /*className="form-control"*/
            onChange2={(e) => this.onInstitutionChange(e)}
          >
            <option/>
            {institutionOptions}
          </Select2>

          <hr/>

          <Input
            key="name"
            type="text"
            label={t("accountDialog.nameLabel")}
            help={t("accountDialog.nameHelp")}
            placeholder={t("accountDialog.namePlaceholder")}
            defaultValue={this.state.name}
            valueLink={this.linkState('name')}
          />

          <Input
            key="web"
            type="text"
            label={t("accountDialog.webLabel")}
            placeholder={t("accountDialog.webPlaceholder")}
            defaultValue={this.state.web}
            valueLink={this.linkState('web')}
          />

          <Input
            key="address"
            type="textarea"
            rows={4}
            label={t("accountDialog.addressLabel")}
            placeholder={t("accountDialog.addressPlaceholder")}
            defaultValue={this.state.address}
            valueLink={this.linkState('address')}
          />

          <Input
            key="notes"
            type="textarea"
            rows={4}
            label={t("accountDialog.notesLabel")}
            placeholder={t("accountDialog.notesPlaceholder")}
            defaultValue={this.state.notes}
            valueLink={this.linkState('notes')}
          />

          <hr/>

          <Input
            key="online"
            type="checkbox"
            label={t("accountDialog.enableOnline")}
            checkedLink={this.linkState('online')}
            wrapperClassName="col-xs-12"
          />

          {this.renderOnlineFields()}

          <hr/>

          <Input label="--Accounts">
            {this.renderAccounts()}
          </Input>

          <div key="footer" className="modal-footer">
            <Button onClick={this.props.onRequestHide}>{t("accountDialog.close")}</Button>
            <Button bsStyle="primary" onClick={(e) => this.onSubmit(e)} disabled={!canSave}>{t("accountDialog.save")}</Button>
          </div>
        </div>
      </Modal>
    );
  }

  renderOnlineFields() {
    if(this.state.online) {
      var canGetAccounts: boolean = (
        this.state.ofx != "" &&
        this.state.username != "" &&
        this.state.password != ""
      );
      return (
        <div key="onlineFields">
          <Panel key="ofx" header={t("accountDialog.ofxInfo")}>
            <Input
              key="fid"
              type="text"
              label={t("accountDialog.fidLabel")}
              help={t("accountDialog.fidHelp")}
              placeholder={t("accountDialog.fidPlaceholder")}
              defaultValue={this.state.fid}
              valueLink={this.linkState('fid')}
            />

            <Input
              key="org"
              type="text"
              label={t("accountDialog.orgLabel")}
              help={t("accountDialog.orgHelp")}
              placeholder={t("accountDialog.orgPlaceholder")}
              defaultValue={this.state.org}
              valueLink={this.linkState('org')}
            />

            <Input
              key="ofx"
              type="text"
              label={t("accountDialog.ofxLabel")}
              help={t("accountDialog.ofxHelp")}
              placeholder={t("accountDialog.ofxPlaceholder")}
              defaultValue={this.state.ofx}
              valueLink={this.linkState('ofx')}
            />
          </Panel>

          <Panel key="pass" header={t("accountDialog.userpassInfo")}>
            <Input
              key="username"
              type="text"
              label={t("accountDialog.usernameLabel")}
              help={t("accountDialog.usernameHelp")}
              placeholder={t("accountDialog.usernamePlaceholder")}
              defaultValue={this.state.username}
              valueLink={this.linkState('username')}
            />

            <Input
              key="password"
              type="text"
              label={t("accountDialog.passwordLabel")}
              help={t("accountDialog.passwordHelp")}
              placeholder={t("accountDialog.passwordPlaceholder")}
              defaultValue={this.state.password}
              valueLink={this.linkState('password')}
            />
          </Panel>

          <Input key="accountList" label=" ">
            <Row>
              <Col xs={12}>
                <span className="pull-right">
                  <LaddaButton active={this.state.gettingAccounts}>
                    <Button disabled={!canGetAccounts} onClick={() => this.onGetAccountList()}>{t("accountDialog.getAccountList")}</Button>
                  </LaddaButton>
                </span>
              </Col>
            </Row>
          </Input>
          {this.state.gettingAccountsSuccess > 0
            ? <Alert
                bsStyle="success"
                onDismiss={() => this.setState({gettingAccountsSuccess: 0})}
                dismissAfter={2000}
              >
              <h4>{t("accountDialog.successGettingAccounts")}</h4>
              <p>{t("accountDialog.successGettingAccountsMessage", {numAccounts: this.state.gettingAccountsSuccess})}</p>
            </Alert>
            : null}
          {this.state.gettingAccountsError
            ? <Alert
                bsStyle="danger"
                onDismiss={() => this.setState({gettingAccountsError: null})}
              >
                <h4>{t("accountDialog.errorGettingAccounts")}</h4>
                <p>{this.state.gettingAccountsError}</p>
              </Alert>
            : null}
        </div>
      );
    }
  }

  renderAccounts() {
  	return <AccountList
			data={this.state.accounts}
			delete={(index) => {
        this.state.accounts.splice(index, 1);
        this.forceUpdate();
      }}
			add={(acct: Account) => {
        this.state.accounts.push(acct);
        this.forceUpdate();
      }}
		/>;
  }

  onGetAccountList() {
    function convAccountType(acctType: ofx4js.domain.data.banking.AccountType): AccountType {
      var str = ofx4js.domain.data.banking.AccountType[acctType];
      return AccountType[str];
    }

    this.setState({
      gettingAccounts: true,
      gettingAccountsSuccess: 0,
      gettingAccountsError: null
    });

    readAccountProfiles({
      name: this.state.name,
      fid: this.state.fid,
      org: this.state.org,
      ofx: this.state.ofx,
      username: this.state.username,
      password: this.state.password
    })
    .then((accounts: IAccount[]) => {
      var resolvedAccounts = _.union(this.state.accounts, accounts);
      resolvedAccounts = _.uniq(resolvedAccounts, account => account.number);
      this.setState({
        gettingAccounts: false,
        gettingAccountsSuccess: accounts.length,
        accounts: resolvedAccounts
      });
    })
    .catch((err) => {
      this.setState({
        gettingAccounts: false,
        gettingAccountsError: err.toString()
      });
    });
  }

  toggleVis(acct) {
    acct.visible = !acct.visible;
    this.forceUpdate();
  }

  onInstitutionChange = (e: Select2ChangeEvent) => {
    var prev = e.prev;
    var value = e.value;
    var oldfi = ficache.get(prev);

    var state = {institution: value};
    var newfi = ficache.get(value);

    var initField = (stateKey: string, fiProp?: string | ((fi: FI) => string)) => {
      fiProp = fiProp || stateKey;
      var getValue: (fi: FI) => string = (typeof fiProp === "function" ? fiProp : function(fi) { return access(fi, fiProp as string); });
      if(!this.state[stateKey] || this.state[stateKey] === getValue(oldfi)) {
        state[stateKey] = getValue(newfi);
      }
    };

    initField("name");
    initField("web", "profile.siteURL");
    initField("address", function(fi: FI) {
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
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onRequestHide();

    var institution = new Institution();
    Keys.forEach(key => {
      institution[key] = this.state[key];
    });

    var accounts = this.state.accounts.map(account => new Account(account));

    Actions.saveAccount({institution, accounts});
  }
}
