/// <reference path="../project.d.ts"/>

import {AccountType} from "./accountType";
import {Institution} from "./institution";
import {U} from "./updraftMixin";
var hash: StringHashFcn = require("string-hash");


export interface IAccount {
  dbid?: number;
  institution?: Institution;
  name: string;
  type: AccountType;
  number: string;
  visible: boolean;
}

@U.Table({tableName: "accounts"})
export class Account extends Updraft.Instance<number> implements IAccount {
  static all: Updraft.Query<number, Account>;
  static get: (id: number) => Promise<Account>;

  @U.DbId()
  public dbid: number;
  @U.Ptr(Institution)
  public institution: Institution;
  @U.String()
  public name: string;
  @U.Enum(AccountType)
  public type: AccountType;
  @U.Int()
  public number: string;
  @U.Bool(true)
  public visible: boolean;

  assignId() {
    if(!this.dbid) {
      console.assert(!!this.institution);
      console.assert(!!this.number);
      this.dbid = hash(this.institution.dbid + " " + this.number);
    }
  }
}
