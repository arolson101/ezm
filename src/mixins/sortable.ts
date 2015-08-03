/// <reference path="../project.d.ts"/>

var SortableJS = require("sortablejs");
import reactMixin = require('react-mixin');

// TODO: use the official mixin - https://github.com/RubaXa/Sortable#react

interface SortableProps {
  animation: number;
  ghostClass: string;
}

var DefaultProps = {
  animation: 150,
  ghostClass: "sortable-ghost",
};


export function SortableMixin(rootRefName: string, props: SortableProps = DefaultProps) {
  return function(target: Function) {
    reactMixin(target.prototype, {
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
    });
  }
}
