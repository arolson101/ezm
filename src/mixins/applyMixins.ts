/// <reference path="../project.d.ts"/>

function callboth(key: string, fcn1: Function, fcn2: Function) {
  var f1 = typeof(fcn1) == "function";
  var f2 = typeof(fcn2) == "function";
    if(typeof(fcn1) == "function" && typeof(fcn2) == "function") {
        return function() {
            fcn1.apply(this, arguments);
            fcn2.apply(this, arguments);
        }
    } else if(typeof(fcn1) == "undefined") {
      return fcn2;
    } else {
      // which?
      console.warn("conflicting value for key " + key, fcn1, fcn2);
      return fcn1;
    }
}



export function applyMixin(target: Function, baseCtor: any) {
  var src = typeof baseCtor === 'function' ? baseCtor.prototype : baseCtor;
  Object.getOwnPropertyNames(src).forEach(name => {
    target.prototype[name] = callboth(name, target.prototype[name], src[name]);
  })
}


export function applyMixins(target: Function, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => applyMixin(target, baseCtor));
}


export function mixin(...derived: any[]) {
    return function(target: Function) {
      applyMixins(target, derived);
    }
}
