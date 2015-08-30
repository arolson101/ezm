/// <reference path="../project.d.ts"/>

import {U} from "./updraftMixin";
import {ItemStore} from "../stores/itemStore";


@U.Table({tableName: "budgetItems"})
export class BudgetItem extends Updraft.Instance<number> {
  static all: Updraft.Query<number, BudgetItem>;
  static get: (id: number) => Promise<BudgetItem>;

  @U.DbId()
  public dbid: number;

  @U.String()
  public payee: string;

  @U.Date()
  public next: Date;

  @U.String()
  public rrule: string;
}


export var BudgetItemStore = new ItemStore(BudgetItem);
