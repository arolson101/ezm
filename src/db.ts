/// <reference path="project.d.ts"/>

import {Institution} from "./models/institution";
import {Account} from "./models/account";


interface OnOpenCallback {
  (): Promise<any>;
}


class Database {
  Store: Updraft.Store;
  openCallbacks: OnOpenCallback[];
  
  constructor() {
    this.Store = new Updraft.Store();
    this.Store.addClass(Account);
    this.Store.addClass(Institution);
    
    this.openCallbacks = [];
  }
  
  onOpen(callback: OnOpenCallback) {
    this.openCallbacks.push(callback);
  }

  
  open(): Promise<any> {
    require("./models/account");
    
    var storeOptions = {
      name: "EasyMoney"
    }
  
    //this.Store.logSql = true;
    return this.Store.open(storeOptions)
    .then(() => this.callOpenCallbacks());
  }
  
  private callOpenCallbacks(): Promise<any> {
    return Promise.all(
      this.openCallbacks.map( callback => callback() )
    );
  }
}

export var db = new Database();
