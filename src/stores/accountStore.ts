/// <reference path='../project.d.ts'/>

import {Actions, SaveAccountParams} from "../actions";
import {Account} from "../models/account";
import {Institution} from "../models/institution";
import {Flap} from "../flap";


class AccountStore extends Flap.Store<Account[]> {
  private institutions: Institution[];
  private accounts: Account[];
  
  constructor() {
    super();
    this.accounts = [];
    this.listenTo(Actions.open, this.onOpenCompleted);
    this.listenTo(Actions.saveAccount, this.onSaveAccount);
  }
  
  loadData() {
    return Promise.all([
      Institution.all.get().then((results) => {
        this.institutions = results;
        var ids = _.pluck(results, "id");
        ids.push(0);
      }),
      Account.all.get().then((results) => {
        this.accounts = results;
      }),
    ])
    .then(() => this.trigger(this.accounts));
  }
  
  onOpenCompleted() {
    return this.loadData();
  }
  
  onSaveAccount(params: SaveAccountParams) {
    // TODO: remove accounts somehow
    params.institution.assignId();
    
    _.forEach(params.accounts, function(account) {
      account.institution = params.institution;
      account.assignId();
    });

    var param = [params.institution, ...params.accounts];
    Actions.persist(param)
      .then(() => this.loadData());
  }
  
  // onAddInstitution: function(newInstitution) {
  //   console.assert(!newInstitution.id);
  //   console.log("onAddInstitution", newInstitution);
  //   db.Store.save(newInstitution);
  //   this.accounts.push(newInstitution);
  //   this.trigger(this.accounts);
  // },
  
  // onAddAccount: function(newAccount) {
  //   console.log("onAddAccount", newAccount);
  // },
  
  data() {
    return this.accounts;
  }
}

export var accountStore = new AccountStore();
