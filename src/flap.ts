/// <reference path="project.d.ts"/>

/**
 * FLux Actions / Promises
 */
export module Flap {
  
  /**
   * signature for listener callbacks  
   */
  export interface Listener<P> {
    (params?: P): Promise<any> | void;
  }
  
  /**
   * interface for triggering actions and managing listeners 
   */
  export interface Action<P> {
    trigger(params?: P): Promise<any>;
    listen(listener: Listener<P>): ActionDeleter;
    remove(listener: Listener<P>): void;
  }

  /**
   * callback used to unregister a listener on an action
   */  
  export interface ActionDeleter {
    (): void;
  }
  
  /**
   * an action that behaves like a function (because it is), so you can
   * invoke it as action() instead of action.trigger(...)
   */
  export interface ActionFunction<P> extends Action<P> {
    (params?: P): Promise<any>;
  }
  

  /**
   * create an action
   */
  export function createAction<P>(): ActionFunction<P> {
    var subscribers = [];
  
    var act = <ActionFunction<P>>function(params?: P): Promise<any> {
      return act.trigger(params);
    };
    
    act.trigger = <ActionFunction<P>>function(params?: P): Promise<any> {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          Promise.all( subscribers.slice().map( (sub) => sub(params) ) )
          .then(resolve, reject);
        });
      });
    }
    
    act.listen = function(listener: Listener<P>) {
      subscribers.push(listener);
      return function() {
        act.remove(listener); 
      };
    };
    
    act.remove = function(listener: Listener<P>) {
      var idx = subscribers.indexOf(listener);
      if(idx != -1) {
        subscribers.splice(idx, 1);
      }
    }
      
    return act;
  }
  
  
  /**
   * create a new action that will fire when all of its component actions
   * have fired.  Once fired, it will reset itself and will fire again once
   * all component actions re-fire.
   */
  export function joinActions(...actions: Action<any>[]): Action<any> {
    var act = createAction();
    var promises: Promise<any>[] = [];
    
    var reset = function() {
      promises = [];
  
      actions.forEach(function(action, index) {
        var remove = null;
        var p = new Promise(function(resolve, reject) {
          remove = action.listen(() => resolve());
        })
        .then(remove);
        promises.push(p);
      });
      
      return Promise.all(promises);
    };
    
    reset()
    .then(act)
    .then(reset);
    
    return act;
  }
  
  
  /**
   * A store of items 
   */
  export class Store<P> implements Action<P> {
    private action: ActionFunction<P>;
    
    constructor() {
      this.action = createAction();
    }
    
    public trigger(params?: P): Promise<any> {
      return this.action(params);
    }

    public listen(listener: Listener<P>): ActionDeleter {
      return this.action.listen(listener);
    }
  
    public remove(listener: Listener<P>): void {
      return this.action.remove(listener);
    }
    
    public listenTo<P2>(action: Action<P2>, callback: Listener<P2>) {
      action.listen(callback.bind(this));
    }
    
    public data(): P {
      throw new Error("abstract");
    }
  }
  
  
  /**
   * mixin for React components
   * provides a mechanism to easily listen to actions and unlisten when component unmounts  
   */
  export function ReactMixin() {
    /* add the following to your class to make typescript happy:
    linkState: <P>(store: Flap.Store<P>, state: string) => void;
    listenTo: <P>(action: Flap.Action<P>, callback: Flap.Listener<P>) => void;
    */
    return {
      _deleters: new Array<ActionDeleter>(),
      
      linkState: function<P>(store: Store<P>, state: string): void {
        this.setState({[state]: store.data()});
        this.listenTo(store, (params: P) => {
          this.setState({[state]: params});
        });
      },
      
      listenTo: function<P>(action: Action<P>, callback: Listener<P>): void {
        var deleter = action.listen( (params?: P) => callback.call(this, params) );
        this._deleters.push(deleter);
      },
  
      componentWillUnmount: function() {
        this._deleters.forEach((deleter) => deleter());
        this._deleters = [];
      }
    }
  }
}
