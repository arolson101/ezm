/// <reference path="../project.d.ts"/>

import {Actions} from "../actions"
import {Flap} from "../flap";
import {Account} from "../models/account";
import {Institution} from "../models/institution";


class PersistentStore extends Flap.Store<any> {
	
	updraftStore: Updraft.Store; 

	constructor() {
		super();
		this.listenTo(Actions.startup, this.onStartup);
		this.listenTo(Actions.persist, this.onPersist);
	}

	onStartup() {
		this.updraftStore = new Updraft.Store();

		this.updraftStore.addClass(Institution);
		this.updraftStore.addClass(Account);

		var storeOptions = {
			name: "EasyMoney"
		};
		
		//this.updraftStore.logSql = true;
		return this.updraftStore.open(storeOptions);
	}
	
	onPersist(params: Updraft.Instance<any>[]) {
		// TODO: see if there's a way to trigger the completed action on this instance
		return this.updraftStore.save(...params);
	}
}

export var persistentStore = new PersistentStore();
