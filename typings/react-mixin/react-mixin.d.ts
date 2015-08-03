// Type definitions for react-mixin 1.7.0
// Project: https://github.com/brigand/react-mixin
// Definitions by: Andrew Olson <andrew@olsononline.org>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "react-mixin" {
    function reactMixin(prototype: any, mixin: Object): void;

    module reactMixin {
        function onClass(fcn: Function, mixin: Object): void;
        function decorate(mixin: Object): Function;
    }

    export = reactMixin
}
