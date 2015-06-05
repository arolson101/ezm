///<reference path="project.d.ts"/>


var i18n: I18nextStatic = require("i18next-client");

export var t = i18n.t;

export function init(): JQueryDeferred<void> {
  return i18n.init({
    resGetPath: 'locales/__ns__.__lng__.json'
  });
}

