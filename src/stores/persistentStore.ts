/// <reference path="../project.d.ts"/>

import {Actions} from "../actions"
import {Flap} from "../flap";
import {Account} from "../models/account";
import {Institution} from "../models/institution";

@Flap
class PersistentStore {
	// flap mixin
	linkState: <P>(store: Flap.Store<P>, state: string) => void;
  listenTo: <P>(action: Flap.Action<P>, callback: Flap.Listener<P>) => void;

	updraftClasses: any[] = [];
	updraftStore: Updraft.Store;

	constructor() {
		this.listenTo(Actions.startup, this.onStartup);
		this.listenTo(Actions.save, this.onSave);
		this.listenTo(Actions.delete, this.onDelete);
	}

	onStartup() {
		this.updraftStore = new Updraft.Store();

		for (let uclass of this.updraftClasses) {
		    this.updraftStore.addClass(uclass);
		}

		var storeOptions = {
			name: "EasyMoney"
		};

		//this.updraftStore.logSql = true;
		return this.updraftStore.open(storeOptions);
	}

	onSave(params: Updraft.Instance<any>[]) {
		// TODO: see if there's a way to trigger the completed action on this instance
		return this.updraftStore.save(...params)
		.then(() => Actions.saved(params));
	}

	onDelete(params: Updraft.Instance<any>[]) {
		return this.updraftStore.delete(...params)
		.then(() => Actions.deleted(params));
	}
}

export var persistentStore = new PersistentStore();
