/// <reference path="project.d.ts"/>

import {Actions} from "./actions";
import {Flap} from "./flap";


export interface FI extends FinancialInstitution {
  id: number;
}


class FiCache extends Flap.Store<any> {
  filist: FI[];
  
  constructor() {
    super();
    this.filist = require("filist");
    this.listenTo(Actions.open, this.onOpen);
  }
  
  onOpen() {
    this.filist = _.sortBy(this.filist, (fi: FI) => fi.name.toLowerCase());
    this.filist.forEach( (fi: FI, idx: number) => fi.id = idx );
  }
  
  get(id: number): FI {
    return this.filist[id];
  }
  
  byName(): FI[] {
    return this.filist;
  }
}

export var ficache = new FiCache();
