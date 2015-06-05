/// <reference path="../project.d.ts"/>

import clone = require("clone");
import React = require("react");
import {Panel, Button, Icon, Input, Modal, Row, Col} from "../factories";
import access = require("safe-access");
import {t} from "../t";
import * as ficache from "../ficache";
import {XText, XSelect} from "./xeditable";
import {Account, IAccount, AccountType, AccountType_t, Institution} from "../models/account";
import {EnumEx} from "../enumEx";
import {AccountStore} from "../accountStore";


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
  institution: Institution;
  accounts: Account[];
}

interface State {
  accounts?: IAccount[];
  addAccountName?: string;
  addAccountNumber?: number;
  addAccountType?: string;

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
 }

export class AccountDialogClass extends React.Component<Props, State> {
  //mixins: [React.addons.LinkedStateMixin],
  
  constructor(props?: Props) {
    super(props);

    var src = this.props.institution || new Institution();
    this.state = {
      accounts: clone(this.props.accounts) || [],
      addAccountName: "",
      addAccountNumber: 0,
      addAccountType: t("accountDialog.add.typePlaceholder"),
      name: null,
    };
    Keys.forEach( key =>
      this.state[key] = (typeof(src[key]) === "undefined" ? "" : src[key])
    );
  }
  
  render() {
    var title = this.props.id ? t("accountDialog.editTitle") : t("accountDialog.addTitle");
    var canSave = this.state.name ? true : false;
    
    var inputClasses = {
      labelClassName: "col-xs-2",
      wrapperClassName: "col-xs-10",
    };

    return (
      Modal(<ModalAttributes>_.merge({
        title: title,
        animation: true,
        backdrop: "static",
        keyboard: false,
        trigger: "focus",
      }, this.props),
        React.DOM.div({className: "modal-body"},
          React.DOM.form({onSubmit: this.onSubmit, className: "form-horizontal"}, 
            Input({
              ref: "institution",
              type: "select",
              label: t("accountDialog.institutionLabel"),
              help: t("accountDialog.institutionHelp"),
              defaultValue: this.state.id,
              wrapperClassName: "col-xs-10",
              labelClassName: "col-xs-2"
            }),
            
            React.DOM.hr(),
            
            Input(_.merge({
              type: "text",
              label: t("accountDialog.nameLabel"),
              help: t("accountDialog.nameHelp"),
              placeholder: t("accountDialog.namePlaceholder"),
              defaultValue: this.state.name,
              //valueLink={this.linkState('name')}
              wrapperClassName: "col-xs-10",
              labelClassName: "col-xs-2"
            }, inputClasses)),

            Input(_.merge({
              type: "text",
              label: t("accountDialog.webLabel"),
              placeholder: t("accountDialog.webPlaceholder"),
              defaultValue: this.state.web,
              //valueLink={this.linkState('name')}
            }, inputClasses)),

            Input(_.merge({
              type: "textarea",
              rows: 4,
              label: t("accountDialog.addressLabel"),
              placeholder: t("accountDialog.addressPlaceholder"),
              defaultValue: this.state.address,
              //valueLink={this.linkState('address')}
            }, inputClasses)),

            Input(_.merge({
              type: "textarea",
              rows: 4,
              label: t("accountDialog.notesLabel"),
              placeholder: t("accountDialog.notesPlaceholder"),
              defaultValue: this.state.notes,
              //valueLink={this.linkState('address')}
            }, inputClasses)),
            
            React.DOM.hr(),
            
            Input({
              type: "checkbox",
              label: t("accountDialog.enableOnline"),
              //checkedLink: this.linkState('online'),
              wrapperClassName: "col-xs-12"
            }),
            
            this.renderOnlineFields(inputClasses),
            
            React.DOM.hr(),
            
            Input(_.merge({label: "Accounts"}, inputClasses), 
              this.renderAccounts(),
              (this.state.accounts.length ? React.DOM.hr() : null),
              this.renderAddAccountForm()
            ),
            
            React.DOM.div({className: "modal-footer"},
              Button({onClick: this.props.onRequestHide}, t("accountDialog.close")),
              Button({bsStyle: "primary", type: "submit", disabled: !canSave}, t("accountDialog.save"))
            )
          )
        )
      )
    );
  }
  
  renderOnlineFields(inputClasses) {
    if(this.state.online) {
      return (
        React.DOM.div(null, [
          Panel({header: t("accountDialog.ofxInfo")}, [
            Input(_.merge({
              type: "text",
              label: t("accountDialog.fidLabel"),
              help: t("accountDialog.fidHelp"),
              placeholder: t("accountDialog.fidPlaceholder"),
              defaultValue: this.state.fid,
              //valueLink: this.linkState('fid')
            }, inputClasses)),
            
            Input(_.merge({
              type: "text",
              label: t("accountDialog.orgLabel"),
              help: t("accountDialog.orgHelp"),
              placeholder: t("accountDialog.orgPlaceholder"),
              defaultValue: this.state.org,
              //valueLink: this.linkState('org')
            }, inputClasses)),
            
            Input(_.merge({
              type: "text",
              label: t("accountDialog.ofxLabel"),
              help: t("accountDialog.ofxHelp"),
              placeholder: t("accountDialog.ofxPlaceholder"),
              defaultValue: this.state.ofx,
              //valueLink: this.linkState('ofx')
            }, inputClasses)),
          ]),
          
          Panel({header: t("accountDialog.userpassInfo")}, [
            Input(_.merge({
              type: "text",
              label: t("accountDialog.usernameLabel"),
              help: t("accountDialog.usernameHelp"),
              placeholder: t("accountDialog.usernamePlaceholder"),
              defaultValue: this.state.username,
              //valueLink: this.linkState('username')
            }, inputClasses)),
            
            Input(_.merge({
              type: "text",
              label: t("accountDialog.passwordLabel"),
              help: t("accountDialog.passwordHelp"),
              placeholder: t("accountDialog.passwordPlaceholder"),
              defaultValue: this.state.password,
              //valueLink: this.linkState('password')
            }, inputClasses)),
          ]),

          Input(_.merge({label: " "}, inputClasses),
            Row(null,
              Col({xs: 12},
                React.DOM.span({className:"pull-right"},
                  Button(null, t("accountDialog.getAccountList"))
                )
              ) 
            ) 
          ),
        ])
      );
    }
  }
  
  renderAccounts() {
    var accountTypeOptions: string[] = EnumEx.getValues<AccountType>(AccountType).map(type => AccountType_t(type));

    return this.state.accounts.map(acct => {
      var typeDisplay = AccountType_t(acct.type);
      return (
        Row({key: acct.number}, [
          Col({xs: 1},
            Button({
              bsStyle: "link",
              onClick: this.toggleVis.bind(this, acct),
              title: t("accountDialog.toggleVisTooltip"),
            },
              Icon({name: acct.visible ? "eye" : "eye-slash"})
            )
          ),
          Col({xs: 2},
            XSelect({source: accountTypeOptions},
              typeDisplay 
            )
          ),
          Col({xs: 3},
            Button({bsStyle: "link", disabled: true}, acct.number)
          ),
          Col({xs: 3},
            XText({title: t("accountDialog.add.namePlaceholder"), validate: ValidateNotEmpty},
              acct.name
            )
          ),
          Col({xs: 1},
            Button({bsStyle: "link", onClick: null},
              "Remove"
            )
          )
        ])
      );
    });
  }
  
  renderAddAccountForm() {
    var accountTypeOptions = EnumEx.map(AccountType, (name: string, val: AccountType) =>  
      React.DOM.option({key: name, value: name}, AccountType_t(val))
    );
    var btnEnabled = (this.state.addAccountType !== t("accountDialog.add.typePlaceholder")) &&
                      (this.state.addAccountNumber !== 0) &&
                      (this.state.addAccountName !== "");
    return (
      Row(null, [
        Col({xs: 3, key: "opts"},
          React.DOM.select({
            className: "form-control"
            //valueLink: this.linkState('addAccountType')
            },
            accountTypeOptions
          )
        ),
        Col({xs: 3, key: "id"},
          React.DOM.input({
            type: "text",
            className: "form-control",
            //valueLink: this.linkState('addAccountNumber'),
            placeholder: t("accountDialog.add.idPlaceholder")
          })
        ),
        Col({xs: 3, key: "name"},
          React.DOM.input({
            type: "text",
            className: "form-control",
            //valueLink: this.linkState('addAccountName'),
            placeholder: t("accountDialog.add.namePlaceholder")
          })
        ),
        Col({xs: 1, key: "add"},
          Button({disabled: !btnEnabled, onClick: this.addAccount}, t("accountDialog.addAccount"))
        )
      ])
    );
  }
  
  addAccount() {
    this.state.accounts.push({
      type: AccountType[this.state.addAccountType],
      number: this.state.addAccountNumber,
      name: this.state.addAccountName,
      visible: true
    });
    
    this.setState({
      addAccountType: t("accountDialog.add.typePlaceholder"),
      addAccountNumber: 0,
      addAccountName: "",
    });
  }
  
  toggleVis(acct) {
    acct.visible = !acct.visible;
    this.forceUpdate();
  }
  
  componentDidMount() {
    var data = ficache.byName().map(fi => { return {
      id: fi.id.toString(),
      text: fi.name
    }});
    
    var institution = (<any>this.refs["institution"]).getInputDOMNode();
    var $institution = $(institution);
    $institution.select2({
      placeholder: t("accountDialog.institutionPlaceholder"),
      allowClear: true,
      data: data
    });
    $institution.data("prev", $institution.val());
    $institution.change(this.onInstitutionChange);
  }
  
  onInstitutionChange = () => {
    var institution = (<any>this.refs["institution"]).getInputDOMNode();
    //var institution = React.findDOMNode<HTMLSelectElement>(this.refs["institution"]);
    var $institution = $(institution);

    var prev = $institution.data("prev");
    $institution.data("prev", $institution.val());
    var oldfi = ficache.get(prev);

    var value = institution.options[institution.selectedIndex].value;
    var state = {institution: value};
    var newfi = ficache.get(value);
    
    var initField = (stateKey: string, fiProp?: string | ((fi: ficache.FI) => string)) => {
      fiProp = fiProp || stateKey;
      var getValue = (typeof fiProp === "function" ? fiProp : function(fi) { return access(fi, <string>fiProp); });
      if(!this.state[stateKey] || this.state[stateKey] === getValue(oldfi)) {
        state[stateKey] = getValue(newfi);
      }
    };

    initField("name");
    initField("web", "profile.siteURL");
    initField("address", function(fi: ficache.FI) {
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
  
  onSubmit = () => {
    var institution = new Institution();
    Keys.forEach(key => {
      institution[key] = this.state[key];
    });
    
    var accounts = this.state.accounts.map(account => new Account(account));
    
    AccountStore.save(institution, accounts);
  }
}


export var AccountDialog = React.createFactory(AccountDialogClass);
