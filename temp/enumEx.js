///<reference path="project.d.ts"/>
var EnumEx = (function () {
    function EnumEx() {
    }
    EnumEx.getNames = function (e) {
        var a = [];
        for (var val in e) {
            if (isNaN(val)) {
                a.push(val);
            }
        }
        return a;
    };
    EnumEx.getValues = function (e) {
        var a = [];
        for (var val in e) {
            if (!isNaN(val)) {
                a.push(parseInt(val, 10));
            }
        }
        return a;
    };
    EnumEx.map = function (e, cb) {
        var a = [];
        for (var val in e) {
            if (!isNaN(val)) {
                var value = parseInt(val, 10);
                var name = e[val];
                a.push(cb(name, value));
            }
        }
        return a;
    };
    EnumEx.each = function (e, cb) {
        for (var val in e) {
            if (!isNaN(val)) {
                var value = parseInt(val, 10);
                var name = e[val];
                cb(name, value);
            }
        }
    };
    return EnumEx;
})();
exports.EnumEx = EnumEx;
