/// <reference path='../project.d.ts'/>


class NavbarHeader extends React.Component<any, any> {
  render() {
    return (
      <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
          <ReactRouter.Link className="navbar-brand" to="index.html">SB Admin v2.0</ReactRouter.Link>
      </div>
    );
  }
}
