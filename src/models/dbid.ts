/// <reference path="../project.d.ts"/>

export function DbId(): Updraft.Column {
  return Updraft.Column.Int().Key();
}
