/// <reference path="../project.d.ts"/>

function callboth(fcn1: Function, fcn2: Function) {
    if(fcn1 && !fcn2) {
        return fcn1;
    } else if(!fcn1 && fcn2) {
        return fcn2;
    } else {
        return function() {
            fcn1.apply(this, arguments);
            fcn2.apply(this, arguments);
        }
    }
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        var src = typeof baseCtor === 'function' ? baseCtor.prototype : baseCtor;
        Object.getOwnPropertyNames(src).forEach(name => {
            derivedCtor.prototype[name] = callboth(derivedCtor.prototype[name], src[name]);
        })
    }); 
}
