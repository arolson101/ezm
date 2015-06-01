/// <reference path="../project.d.ts"/>

//var Updraft = require("updraft");
var {Int, Text, Bool, Enum, Ptr} = Updraft.Column;

var hash: StringHashFcn = require("string-hash");
import {t} from "../t";
import {Store, Id} from "../db";


export enum AccountType {
  CHECKING,
  SAVINGS,
  CREDITCARD,
}


export function AccountType_t(val: AccountType) {
  return t("AccountTypes." + AccountType[val]);
}



export class Institution extends Updraft.Instance<number> {
  static tableName: string = "institutions";
  static columns: Updraft.ColumnSet = {
    id: Id(),
    name: Text(),
    web: Text(),
    address: Text(),
    notes: Text(),

    online: Bool().Default(true),

    fid: Text(),
    org: Text(),
    ofx: Text(),
    
    username: Text(),
    password: Text(),
  };
  static all: Updraft.Query<number, Institution>;
  static get(id: number): Promise<Institution> { throw new Error("overwritten"); }
  
  public id: number;
  public name: string;
  public web: string;
  public address: string;
  public notes: string;
  
  public online: boolean;
  
  public fid: string;
  public org: string;
  public ofx: string;
  
  public username: string;
  public password: string;
  
  constructor() {
    super();
  }
  
  assignId() {
    if(!this.id) {
      this.id = hash(Date.now().toString());
    }
  }
}

Store.addClass(Institution);


export interface IAccount {
  id?: number;
  institution?: Institution;
  name: string;
  type: AccountType;
  visible: boolean;
  
  number: number;
}

export class Account extends Updraft.Instance<number> implements IAccount {
  static tableName: string = "accounts";
  static columns: Updraft.ColumnSet = {
    id: Id(),
    institution: Ptr(Institution),
    name: Text(),
    type: Enum(AccountType),
    visible: Bool().Default(true),
    number: Text(),
  };
  static all: Updraft.Query<number, Account>;
  static get(id: number): Promise<Account> { throw new Error("overwritten"); }
  
  public id: number;
  public institution: Institution;
  public name: string;
  public type: AccountType;
  public visible: boolean;

  // not stored ???  
  public number: number;
  
  assignId() {
    if(!this.id) {
      console.assert(!!this.institution);
      console.assert(!!this.number);
      this.id = hash(this.institution.id + " " + this.number);
    }
  }
}

Store.addClass(Account);
