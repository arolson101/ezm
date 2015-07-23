/// <reference path="../project.d.ts"/>

import {Input} from "react-bootstrap";


interface Props extends InputAttributes, Select2Options {
	onChange2(e: Select2ChangeEvent);
}


export interface Select2ChangeEvent extends JQueryEventObject {
	value: any;
	prev: any;
}


export class Select2 extends React.Component<Props, any> {
	render() {
		return (
			<Input
				{... this.props}
				type="select"
				ref="input"
				className="form-control"
			>
				{this.props.children}
			</Input>
		);
	}

	componentDidMount() {
	    var input = (this.refs["input"] as any).getInputDOMNode();
	    var $input = $(input);
	    $input.select2(this.props);
	    $input.data("prev", $input.val());
	    $input.change(this.onChange);
	}

	onChange = (e: Select2ChangeEvent) => {
	    var input = (this.refs["input"] as any).getInputDOMNode();
	    var $input = $(input);
			e.value = input.options[input.selectedIndex].value;
	    e.prev = $input.data("prev");
	    $input.data("prev", $input.val());

		if(this.props.onChange2) {
			this.props.onChange2(e);
		}
	}

	componentWillUnmount() {
	    var input = (this.refs["input"] as any).getInputDOMNode();
	    var $input = $(input);
	    $input.select2("destroy");
	}

}
