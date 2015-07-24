/// <reference path="../project.d.ts"/>

import Icon = require("react-fa");
import * as React from "react/addons";
import Router = require("react-router");
var Radium: any = require("radium");
var Link = Router.Link;

interface JQuery {
  metisMenu();
}


interface MetisMenuItemProps extends React.Props<any> {
  href?: string;
  icon?: string;
  title?: string;
  level?: number;
  style?: React.CSSProperties;
}

@Radium
export class MetisMenuItem extends React.Component<MetisMenuItemProps, any> {
    static parentStyle = {
        borderBottom: {
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            borderBottomColor: "#e7e7e7"
        }
    }

    static childStyle = {
        borderBottom: {
            borderBottomWidth: 0,
            borderBottomStyle: "none",
        }
    }

    render() {
        var style: any = {};
        if(this.props.level > 0) {
            style.borderBottom = "none !important";
        }
        return (
            <li style={[
                (this.props.level == 0 ? MetisMenuItem.parentStyle : MetisMenuItem.childStyle),
                this.props.style
            ]}>
                <Link to={this.props.href || "#"} style={{paddingLeft: 15 + 22 * this.props.level}}>
                    {this.props.icon ? <Icon name={this.props.icon}/> : null}
                    {this.props.icon ? " " : null}
                    {this.props.title}
                    {this.props.children ? <span className="fa arrow"/> : null}
                </Link>

                {this.props.children ? <ul className="nav">{this.renderChildren()}</ul> : null}
            </li>
        );
    }

  renderChildren() {
    var level = this.props.level || 0;
    return React.Children.map(this.props.children, function(child: React.ReactElement<any>) {
      return React.cloneElement(child, {level: level + 1});
    });
  }
}


interface MetisMenuProps extends React.Props<any> {
}

export class MetisMenu extends React.Component<MetisMenuProps, any> {
  render() {
    return (
      <ul className="nav" ref="menu" style={{borderBottom: "1px solid #e7e7e7"}}>
        {this.props.children}
      </ul>
    );
  }

  componentDidMount() {
    var menu = React.findDOMNode(this.refs['menu']);
    ($(menu) as any).metisMenu();
  }
}
