/// <reference path='../project.d.ts'/>

import {Actions} from "../actions";
import {Flap} from "../flap";
import {persistentStore} from "./persistentStore";


interface PartialClassTemplate<K> extends Function {
  all?: Updraft.Query<K, Updraft.Instance<K>>;
}


export class ItemStore<T extends Updraft.Instance<number>> extends Flap.Store<T[]> {
  private type: PartialClassTemplate<number>;
  private items: T[];

  constructor(type: PartialClassTemplate<number>) {
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

  load() {
    return this.type.all.order("dbid", true).get()
    .then((results: T[]) => {
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
