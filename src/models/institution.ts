/// <reference path="../project.d.ts"/>

import {DbId} from "./dbid";
var {Int, Text, Bool, Enum, Ptr} = Updraft.Column;
var hash: StringHashFcn = require("string-hash");


export class Institution extends Updraft.Instance<number> {
  static tableName: string = "institutions";
  static columns: Updraft.ColumnSet = {
    dbid: DbId(),
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
  
  public dbid: number;
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
    if(!this.dbid) {
      this.dbid = hash(Date.now().toString());
    }
  }
}
