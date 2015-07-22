/// <reference path='../project.d.ts'/>


interface MetisOpts {
	toggle?: boolean;
	activeClass?: string;
	collapseClass?: string;
	collapseInClass?: string;
	collapsingClass?: string;
}


interface JQuery {
	metisMenu?(opts?: MetisOpts): any;
}


export class MetisMenu extends React.Component<React.Props<any>, any> {
	
	render() {
		return React.DOM.nav({className: "sidebar-nav"},
			React.DOM.ul({
					className: "metismenu",
					ref: "metis",
				},
				this.props.children
			)
		);
	}
	
	componentDidMount() {
		var metis = React.findDOMNode(this.refs["metis"]);
		var $metis: JQuery = $(metis);
		$metis.metisMenu({
			toggle: false
		});
	}
}
