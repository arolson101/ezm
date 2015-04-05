"use strict";

var {ListGroupItem} = ReactBootstrap;

//var DragHandle = require("./dragHandle");


module.exports = React.createClass({
  propTypes: {
    account: React.PropTypes.object.isRequired,
    //isEditing: React.PropTypes.bool.isRequired,
  },

  render: function() {
    //var onClick = this.onClick;
    
/*
    if(this.props.isEditing) {
      style.cursor = "-webkit-grab";
      onClick = null;
    }
*/

    return (
      <ListGroupItem {... this.props} bsSize="small">
        {/*<DragHandle isEditing={this.props.isEditing}/>*/}
        {this.props.account.name}
      </ListGroupItem>
    );
  },

});
