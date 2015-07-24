/// <reference path="../project.d.ts"/>

import {Button, ListGroupItem, ModalTrigger, Navbar, Nav, NavItem, DropdownButton} from "react-bootstrap";


export class Home extends React.Component<any, any> {
	static href: string = "home.html"

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h1 className="page-header">Home</h1>
					</div>
				</div>
			</div>
		);
	}
}
