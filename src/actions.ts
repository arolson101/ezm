/// <reference path="project.d.ts"/>

import {Account} from "./models/account";
import {Institution} from "./models/institution";
import {Flap} from "./flap";



export var Actions = {
	/** open a database */
	startup: Flap.createAction(),

	/** aggregate signal that all systems required for opening have completed */
	open: Flap.createAction(),

	/** persist items to storage */
	save: Flap.createAction<Updraft.Instance<any>[]>(),

	/** remove items from storage */
	delete: Flap.createAction<Updraft.Instance<any>[]>(),

	/* something was saved to db */
	saved: Flap.createAction<Updraft.Instance<any>[]>(),

	/* something was removed from db */
	deleted: Flap.createAction<Updraft.Instance<any>[]>(),
};
