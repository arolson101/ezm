/// <reference path="../project.d.ts"/>

import React = require("react/addons");

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        var src = typeof baseCtor === 'function' ? baseCtor.prototype : baseCtor;
        Object.getOwnPropertyNames(src).forEach(name => {
            derivedCtor.prototype[name] = src[name];
        })
    }); 
}


export class LinkedStateComponent<P, S> extends React.Component<P, S> {
	linkState: <T>(key: string) => React.ReactLink<T>;
}

applyMixins(LinkedStateComponent, [React.addons.LinkedStateMixin]);
