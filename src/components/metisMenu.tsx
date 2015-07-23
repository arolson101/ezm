/// <reference path="../project.d.ts"/>


interface JQuery {
  metisMenu();
}


interface MetisMenuItemProps extends React.Props<any> {
  href?: string;
  icon?: string;
  title?: string;
  level?: number;
}

export class MetisMenuItem extends React.Component<MetisMenuItemProps, any> {
  render() {
    var style: any = {borderBottom: "1px solid #e7e7e7"};
    if(this.props.level > 0) {
      style.borderBottom = "none !important";
    }
    return (
      <li style={style}>
        <ReactRouter.Link to={this.props.href || "#"} style={{paddingLeft: 15 + 22 * this.props.level}}>
          {this.props.icon ? <i className={"fa " + this.props.icon + " fa-fw"}/> : null}
          {this.props.icon ? " " : null}
          {this.props.title}
          {this.props.children ? <span className="fa arrow"/> : null}
        </ReactRouter.Link>

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
    $(menu).metisMenu();
  }
}
