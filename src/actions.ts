/// <reference path="project.d.ts"/>

import {Account} from "./models/account";
import {Institution} from "./models/institution";
import {Flap} from "./flap";


export interface SaveAccountParams {
  institution: Institution,
  accounts: Account[],
}


export var Actions = {
	/** open a database */
	startup: Flap.createAction(),
	
	/** aggregate signal that all systems required for opening have completed */
	open: Flap.createAction(),
	
	/** save changes to an account or institution */
	saveAccount: Flap.createAction<SaveAccountParams>(),

	/** persist items to storage */
	persist: Flap.createAction<Updraft.Instance<any>[]>(),
};
