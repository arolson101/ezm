"use strict";

var SortableJS = require("sortablejs");

var DefaultProps = {
  animation: 150,
  ghostClass: "sortable-ghost",
};


function SortableMixin(rootRefName, props) {
  props = props || DefaultProps;
  return {
    componentDidMount: function() {
      this._sortable = SortableJS.create(this.refs[rootRefName].getDOMNode(), props);
    },

    componentWillUnmount: function () {
      this._sortable.destroy();
    },
    
    enableSort: function(enabled) {
      this._sortable.option("disabled", !enabled);
    }
  };
}

SortableMixin.DefaultProps = DefaultProps;

module.exports = SortableMixin;
