/// <reference path="../project.d.ts"/>

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        var src = typeof baseCtor === 'function' ? baseCtor.prototype : baseCtor;
        Object.getOwnPropertyNames(src).forEach(name => {
            derivedCtor.prototype[name] = src[name];
        })
    }); 
}
