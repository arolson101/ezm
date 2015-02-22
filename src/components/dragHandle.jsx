"use strict";

var React = require("react/addons");

var editWidth = 20;
var transitionTime = 0.3;

module.exports = React.createClass({
  propTypes: {
    isEditing: React.PropTypes.bool.isRequired,
  },

  render: function() {
    var spanStyle = {
      color: "lightgray",
      cursor: "-webkit-grab",
    
      transition: "width " + transitionTime + "s ease-in-out",
      overflow: "hidden",
      float: "left",
      width: (this.props.isEditing ? editWidth : 0),
    };

    return (
      <span style={spanStyle} >
        <i className="fa fa-bars"></i>
      </span>
    );
  }
});
