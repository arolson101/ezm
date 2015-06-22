/// <reference path="../project.d.ts"/>

import Icon = require("react-fa");


var editWidth = 20;
//var transitionTime = 0.3;

class Props {
//  isEditing: boolean;
}

export class DragHandle extends React.Component<Props, any> {
  render() {
    var spanStyle = {
      color: "lightgray",
      cursor: "-webkit-grab",
    
      // transition: "width " + transitionTime + "s ease-in-out",
      // overflow: "hidden",
      // float: "left",
      // width: (this.props.isEditing ? editWidth : 0),
    };

    return (
      React.DOM.span({style: spanStyle},
        React.createElement(Icon, {name: "bars"})
      )
    );
  }
}
