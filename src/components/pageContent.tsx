/// <reference path="../project.d.ts"/>

import {Button, ListGroupItem, ModalTrigger, Navbar, Nav, NavItem, DropdownButton} from "react-bootstrap";
var Radium: any = require("radium");

import {t} from "../t";


interface PageContentProps extends React.Props<any> {
	wrapperMinHeight: Number;
}

@Radium
export class PageContent extends React.Component<PageContentProps, any> {
	static style = {
		padding: "0 15px",
		minHeight: 568,
		backgroundColor: "#fff",

		"@media (min-width: 768px)": {
			position: "inherit",
			margin: "0 0 0 250px",
			padding: "0 30px",
			borderLeft: "1px solid #e7e7e7"
		}
	}

	render() {
		/*var style = { minHeight: this.props.wrapperMinHeight };
		if(style.minHeight == 0) {
		delete style.minHeight;
		}*/

		return (
			<div style={PageContent.style}>
				{this.props.children}
			</div>
		);
	}
}
