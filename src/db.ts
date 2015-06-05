/// <reference path="project.d.ts"/>

//var Updraft = require("updraft");

interface OnOpenCallback {
  (): Promise<any>;
}

var storeOptions = {
  name: "EasyMoney"
}

export var Store = new Updraft.Store();
//Store.logSql = true;
var openCallbacks: OnOpenCallback[] = [];

export function onOpen(callback: OnOpenCallback) {
  openCallbacks.push(callback);
}

export function open(): Promise<any> {
  require("./models/account");
  
  return Store.open(storeOptions)
  .then(function() {
    return Promise.all(
      openCallbacks.map( callback => callback() )
    );
  });
}


export function Id(): Updraft.Column {
  return Updraft.Column.Int().Key();
}
