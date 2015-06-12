/// <reference path="project.d.ts"/>

export interface FI extends FinancialInstitution {
  id: number;
}

class FiCache {
  private filist: FI[];
  
  constructor() {
    filist: require("filist");
  }

  init(): void {
    this.filist = _.sortBy(this.filist, fi => fi.name.toLowerCase());
    this.filist.forEach( (fi: FI, idx: number) => fi.id = idx );
  }

  get(id: number): FI {
    console.assert(<any>this.filist[id]);
    return this.filist[id];
  }
  
  byName(): FI[] {
    return this.filist;
  }
}

export var ficache = new FiCache();
