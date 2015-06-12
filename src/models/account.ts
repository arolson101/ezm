/// <reference path="../project.d.ts"/>

import {AccountType} from "./accountType";
import {Institution} from "./institution";
import {DbId} from "./dbid";
var hash: StringHashFcn = require("string-hash");
var {Int, Text, Bool, Enum, Ptr} = Updraft.Column;


export interface IAccount {
  dbid?: number;
  institution?: Institution;
  name: string;
  type: AccountType;
  visible: boolean;
  
  number: number;
}


export class Account extends Updraft.Instance<number> implements IAccount {
  static tableName: string = "accounts";
  static columns: Updraft.ColumnSet = {
    dbid: DbId(),
    institution: Ptr(Institution),
    name: Text(),
    type: Enum(AccountType),
    number: Int(),
    visible: Bool().Default(true),
  };
  static all: Updraft.Query<number, Account>;
  static get(id: number): Promise<Account> { throw new Error("overwritten"); }
  
  public dbid: number;
  public institution: Institution;
  public name: string;
  public type: AccountType;
  public number: number;
  public visible: boolean;
  
  assignId() {
    if(!this.dbid) {
      console.assert(!!this.institution);
      console.assert(!!this.number);
      this.dbid = hash(this.institution.dbid + " " + this.number);
    }
  }
}
