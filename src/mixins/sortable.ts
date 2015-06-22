"use strict";

var SortableJS = require("sortablejs");

var DefaultProps = {
  animation: 150,
  ghostClass: "sortable-ghost",
};


export function SortableMixin(rootRefName, props?) {
  props = props || DefaultProps;
  
  return {
    _sortable: null,
    _sortableEnabled: true,

    componentDidMount: function() {
      if(this._sortableEnabled) {
        var domNode = React.findDOMNode(this.refs[rootRefName]);
        this._sortable = SortableJS.create(domNode, props);
      }
    },

    componentWillUnmount: function () {
      if(this._sortable) {
        this._sortable.destroy();
      }
    },
    
    enableSort: function(enabled) {
      this._sortableEnabled = enabled;
      if(this._sortable) {
        this._sortable.option("disabled", !enabled);
      }
    }
  };
}

(<any>SortableMixin).DefaultProps = DefaultProps;

