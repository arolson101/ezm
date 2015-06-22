///<reference path="project.d.ts"/>

import {Actions} from "./actions";
import {Flap} from "./flap";

var i18n: I18nextStatic = require("i18next-client");


class TranslationStore extends Flap.Store<any> {
  constructor() {
    super();
    this.listenTo(Actions.startup, this.onStartup);
  }
  
  onStartup() {
    var res = i18n.init({
      resGetPath: 'locales/__ns__.__lng__.json'
    });
    
    if(res) {
      return <Promise<any>><any>res.promise();
    }
  }
}

export var translationStore = new TranslationStore();

export var t = i18n.t;
