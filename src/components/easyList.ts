/// <reference path="../project.d.ts"/>

import {Button, Input, ButtonInput, OverlayTrigger, Popover, Table} from "react-bootstrap";
import Icon = require("react-fa");

import {mixin} from "../mixins/applyMixins";
import {SortableMixin} from "../mixins/sortable";
import {DragHandle} from "./dragHandle";
import {XTextClass, XSelectClass} from "./xeditable";
import {Select2} from "./select2";
import * as React from "react/addons";
import {t} from "../t";

import ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export enum InputType {
	None,
	Text,
	Select,
}


export interface Props<T> extends React.Props<any>
{
	data: T[];

	// events
	canAdd?: (t: T) => string;
	add?: (t: T) => any;
	delete?: (index: number) => any;
}


export interface Column<T> {
	key: string,
	defaultValue: any;
	display?(t: T): any;
	input: InputType;
	placeholder?: string;
	editable?: boolean;
	values?: string[];
	icons?: string[];
	unique?: boolean;
	required?: boolean;
	validate?: Validator;
}


export interface Validator {
	(value): string;
}


@mixin(
  SortableMixin("root")
)
export class EasyList<T> extends React.Component<Props<T>, any> {
	enableSort: (enabled: boolean) => any;
	
	// abstract methods/properties
	getKey: (t: T) => string;
	columns: Column<T>[];
	sortKey: string;

	
	constructor(props: Props<T>) {
		super(props);
		this.enableSort(!this.sortKey);
		this.state = this.defaultState();
	}
	
	defaultState() { 
		var state = {};
		this.columns.forEach(
			(col: Column<T>) => {
				state[col.key + "_valid"] = true;
				state[col.key + "_reason"] = "";
				state[col.key + "_value"] = col.defaultValue;
			}
		);
		return state;
	}
	
	render() {
		// if(this.onAdd) {
		// 	return React.DOM.form({
		// 			ref: "_form",
		// 			onSubmit: (e) => this.onAdd(e)
		// 		},
		// 		this.renderTable()
		// 	);
		// } else {
			return this.renderTable();
		// }
	}
	
	renderTable(): React.ReactElement<any> {
		return React.createElement(Table, {hover: true},
			this.renderHeader(),
			this.renderFooter(),
			this.renderBody()
		);
	}
	
	renderHeader(): React.ReactElement<any> {
		return null;
	}
	
	renderBody(): React.ReactElement<any> {
		var data = this.sortKey ? _.sortBy(this.props.data, this.sortKey) : this.props.data;
		return React.createElement(ReactCSSTransitionGroup, {component: "tbody", transitionName: "example", ref: "root"},
			data.map((elt, index) => this.renderRow(elt, index))
		);
	}
	
	renderRow(elt: T, index: number): React.ReactElement<any> {
		return React.DOM.tr({key: this.getKey(elt)}, 
			(!this.sortKey)
				? React.DOM.td({key: "dragHandle"}, React.createElement(DragHandle, null))
				: null,

			this.columns.map((col: Column<T>) =>
				React.DOM.td({
						key: col.key, 
						style: {verticalAlign: "middle"}
					},
					this.renderCell(elt, col)
				)
			),

			this.props.delete
				? React.DOM.td({key: "delete"}, 
						React.createElement(Button, {bsStyle: "danger", onClick: () => this.props.delete(index)},
							React.createElement(Icon, {name: "minus"}))
					)
				: null
		);
	}
	
	renderCell(elt: T, col: Column<T>) {
		if(col.display) {
			return col.display(elt);
		}
		
		var value = elt[col.key];
		if(!col.editable) {
			return value;
		}
		
		switch(col.input) {
		case InputType.None:
			return value;
			
		case InputType.Text:
			return React.createElement(XTextClass, {
					validate: this.createValidator(elt, col, value),
					mode: "inline",
					onSave: (e, params) => {
						elt[col.key] = params.newValue;
						this.forceUpdate();
					}
				},
				value
			);
			
		case InputType.Select:
			return React.createElement(XSelectClass, {
					mode: "inline",
					source: col.values.map((val, i) => new Object({value: i, text: val})),
					value: value,
					onSave: (e, params) => {
						elt[col.key] = checkInt(params.newValue);
						this.forceUpdate();
					}
				}
			);
			break;
		}
	}
	
	createValidator(elt: T, col: Column<T>, currentValue: any): Validator {
		return (value): string => {
			var problem: string;
			if(col.validate) {
				problem = col.validate(value);
			}
			if(col.required && !problem) {
				if($.trim(value) === "") {
    			problem = t("easyList.emptyValue");
			  }
			}
			if(col.unique && !problem) {
				if(value !== elt[col.key] && this.valueExists(col.key, value)) {
					problem = t("easyList.valueExists");
				}
			}
			return problem;
		};
	}
	
	renderFooter(): React.ReactElement<any> {
		if(!this.props.add) {
			return;
		}

		return React.DOM.tfoot(null,
			React.DOM.tr(null,
				this.columns.map((col: Column<T>) =>
					React.DOM.td({key: col.key},
						this.renderInput(col)
					)
				),
				React.DOM.td({key: "add"},
					React.createElement(Button, {
							/*type: "submit",*/
							onClick: (e) => this.onAdd(e)
						},
						React.createElement(Icon, {name: "plus"})
					)
				)
			)
		);
	}
	
	renderInput(col: Column<T>): React.ReactElement<any> {
		if(!col.input) {
			return;
		}
		
		var valid = this.state[col.key + "_valid"]; 
		var bsStyle: string = valid ? undefined : "error";

		switch(col.input) {
		case InputType.Text:
			return React.createElement(Input, {
				type: "text",
				bsStyle,
				help: this.state[col.key + "_reason"],
				placeholder: col.placeholder,
				value: this.state[col.key + "_value"],
				onChange: (e) => {
					this.setState({ [col.key + "_value"]: e.target.value });
				}
			});
			
		case InputType.Select:
			return React.createElement(Input, {
					type: "select",
					bsStyle,
					help: this.state[col.key + "_reason"],
					placeholder: col.placeholder,
					value: this.state[col.key + "_value"],
					onChange: (e) => {
						this.setState({ [col.key + "_value"]: checkInt(e.target.value) });
					}
				},
				React.DOM.optgroup({label: col.placeholder},
					React.DOM.option({disabled: true, hidden: true, value: ""}, col.placeholder),
				  col.values.map((val: string, idx: number) =>
						React.DOM.option({key: val, value: <any>idx}, val) 
					)
				)
			);
		}
	}

	valueExists(key: string, value: any): boolean {
		return _.any(this.props.data, (elt: T) => elt[key] === value);
	}

	onAdd(e) {
		e.preventDefault();

		var obj: T = <T>{}; // TODO: new?

		var fail = false;
		for(var col of this.columns) {
			var value = this.state[col.key + "_value"];
			var valid: boolean = true;
			var reason: string = null;

			var validator = this.createValidator(obj, col, value);
			if(validator) {
				reason = validator(value);
				if(reason) {
					valid = false;
					fail = true;
				}
			}

			obj[col.key] = value;
			
			this.setState({
				[col.key + "_reason"]: reason,
				[col.key + "_valid"]: valid
			});
		}
		
		if(fail) {
			return;
		}
		
		if(this.props.canAdd) {
			var reason = this.props.canAdd(obj);
			if(reason) {
				return;
			}
		}
		
		this.props.add(obj);
		this.setState(this.defaultState());
	}

}


function checkInt(value: string): any {
	if(typeof value === "string" && value.length == 0) {
		return value; // empty string passes through
	}
	else if(typeof value == "number") {
		return value;
	}
	else {
		var x = parseInt(value, 10);
		console.assert(!isNaN(x));
		return x;
	}
}
