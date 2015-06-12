/// <reference path='project.d.ts'/>

import {db} from "./db";
import {Account} from "./models/account";
import {Institution} from "./models/institution";

interface Actions extends Reflux.ActionObject {
  addInstitution: Reflux.Action</*Institution*/string>;
  addAccount: Reflux.Action</*Account*/any>;
}

var actions: Actions = Reflux.createActions<Actions>([
  "addInstitution",
  "addAccount",
]);


var idServer = 1;
var institutions = [];
//var accounts = [{id: idServer++, name:'abc'}, {id: idServer++, name: 'def'}];
var accounts = [];


interface Methods {
  onDbOpen: () => Promise<any>;
}


interface AccountStore extends Reflux.Store<Account>, Methods {
  save(institution: Institution, accounts: Account[]): Promise<any>;
  getDefaultData(): Account[];
}


export var AccountStore = <AccountStore>Reflux.createStore(<Methods>{
  listenables: actions,
  
  actions: actions, //???
  
  onDbOpen: function(): Promise<any> {
    return Promise.all([
      Institution.all.get().then(function(results) {
        institutions = results;
        var ids = _.pluck(results, "id");
        ids.push(0);
        idServer = _.max(ids) + 1;
      }),
      Account.all.get().then(function(results) {
        accounts = results;
      }),
    ]);
  },
  
  save: function(institution: Institution, accounts: Account[]): Promise<any> {
    // TODO: remove accounts somehow
    institution.assignId();
    
    _.forEach(accounts, function(account) {
      account.institution = institution;
      account.assignId();
    });
    
    return db.Store.save(institution, ...accounts); // TODO: does this work?
  },
  
  onAddInstitution: function(newInstitution) {
    console.assert(!newInstitution.id);
    newInstitution.id = idServer++;
    console.log("onAddInstitution", newInstitution);
    db.Store.save(newInstitution);
    accounts.push(newInstitution);
    this.trigger(accounts);
  },
  
  onAddAccount: function(newAccount) {
    console.log("onAddAccount", newAccount);
  },
  
  getDefaultData: function() {
    console.log("getDefaultData");
    return accounts;
  }
});

db.onOpen(AccountStore.onDbOpen);
