/// <reference path="project.d.ts"/>

export interface FI extends FinancialInstitution {
  id: number;
}

var filist: FI[] = require("filist");

export function init(): void {
  filist = _.sortBy(filist, fi => fi.name.toLowerCase());
  filist.forEach( (fi: FI, idx: number) => fi.id = idx );
}

export function get(id): FI {
  return filist[id];
}

export function byName(): FI[] {
  return filist;
}
