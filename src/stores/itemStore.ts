/// <reference path='../project.d.ts'/>

import {Actions} from "../actions";
import {Flap} from "../flap";
import {persistentStore} from "./persistentStore";


interface Item extends Updraft.Instance<number> {
  dbid: number;
}

interface Template<I extends Item> extends Function {
  all?: Updraft.Query<number, Updraft.Instance<number>>;
  new(): I;
}


export class ItemStore<I extends Item> extends Flap.Store<I[]> {
  private type: Template<I>;
  private items: I[];

  constructor(type: Template<I>) {
    super();
    this.type = type;
    this.items = [];
    this.listenTo(Actions.open, this.onOpen);
    this.listenTo(Actions.saved, this.onSaved);

    persistentStore.updraftClasses.push(type);
  }

  data() {
    return this.items;
  }

  get(dbid: number): I {
    var result: I = _.find(this.items, item => item.dbid == dbid);
    console.assert(result != null);
    return result;
  }

  load() {
    return this.type.all.order("dbid", true).get()
    .then((results: I[]) => {
      this.items = results;
    });
    // TODO: interface to sort, apply sort order upon load
  }

  onOpen() {
    return this.load();
  }

  onSaved(items: Updraft.Instance<any>[]): Promise<any> {
    if(_.any(items, item => item instanceof this.type)) {
      return this.load()
      .then(() => this.trigger(this.items));
    }
  }
}
