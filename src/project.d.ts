///<reference path='../typings/tsd.d.ts'/>
///<reference path='../node_modules/filist/filist.d.ts'/>
///<reference path='../node_modules/updraft/dist/updraft.d.ts'/>
///<reference path="../node_modules/ts-jsx-loader/react-jsx.d.ts"/>

declare function require(module: string): any;


declare module Reflux {
	interface ActionOptions {
		sync?: boolean;
		asyncResult?: boolean;
		children?: string[];
	}
	
	function createAction<T>(options?: ActionOptions): Action<T>;
	/** @returns an object with keys matching names and values are Actions */
	function createActions<T extends ActionObject>(names: string[]): T;
	
	interface Action<T> {
		(param?: T): void;
		trigger(param?: T): void;
		triggerAsync(param?: T): void;
		listen(callback: (param?: T) => void): void;
		preEmit: () => void;
		shouldEmit: (value: T) => boolean;
	}
	
	interface ActionObject {
		[key: string]: Action<any>;
	}
	
	interface StoreOptions {
		mixins?: any[];
		listenables?: ActionObject;
		init?: () => void;
	}
	
	function createStore<T extends Store<any>>(options: StoreOptions): T;
	
	interface Store<T> extends Action<T>, StoreOptions {
		listenTo<X>(which: Action<X>, callback: (X) => void);
		listenToMany(which: Action<any>[]);
	}
	
	function listenTo<T>(store: Store<T>, event: string): any;
	function connect<T>(store: Store<T>, event: string): any;
	function connectFilter<T>(store: Store<T>, event: string, callback: (items: Aggregate<T>) => FilterResult);
	
	interface FilterResult {}
	
	interface Aggregate<T> {
		filter(callback: (item: T) => boolean): FilterResult;
	} 
}


interface StringHashFcn {
	(input: string): number;
}
