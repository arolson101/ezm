///<reference path="project.d.ts"/>
var i18n = require("i18next-client");
exports.t = i18n.t;
function init() {
    return i18n.init({
        resGetPath: 'locales/__ns__.__lng__.json'
    });
}
exports.init = init;
