/// <reference path="../project.d.ts"/>

import {U} from "./updraftMixin";
import {ItemStore} from "../stores/itemStore";
var hash: StringHashFcn = require("string-hash");


@U.Table({tableName: "institutions"})
export class Institution extends Updraft.Instance<number> {
  static all: Updraft.Query<number, Institution>;
  static get: (id: number) => Promise<Institution>;

  @U.DbId()
  public dbid: number;

  @U.String()
  public name: string;
  @U.String()
  public web: string;
  @U.String()
  public address: string;
  @U.String()
  public notes: string;

  @U.Bool(true)
  public online: boolean;

  @U.String()
  public fid: string;
  @U.String()
  public org: string;
  @U.String()
  public ofx: string;

  @U.String()
  public username: string;
  @U.String()
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

export var InstitutionStore = new ItemStore(Institution);
