/// <reference path="../project.d.ts"/>

import {Button, Input, ButtonInput, OverlayTrigger, Popover, Table} from "react-bootstrap";
import Icon = require("react-fa");

import {mixin} from "../mixins/applyMixins";
import {SortableMixin} from "../mixins/sortable";
import {DragHandle} from "./dragHandle";
import {XText, XSelect} from "./xeditable";
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

@SortableMixin("root")
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
		return <Table hover={true}>
			{this.renderHeader()}
			{this.renderFooter()}
			{this.renderBody()}
		</Table>;
	}

	renderHeader(): React.ReactElement<any> {
		return null;
	}

	renderBody(): React.ReactElement<any> {
		var data = this.sortKey ? _.sortBy(this.props.data, this.sortKey) : this.props.data;
		return <ReactCSSTransitionGroup component="tbody" transitionName="example" ref="root">
			{data.map((elt, index) => this.renderRow(elt, index))}
		</ReactCSSTransitionGroup>;
	}

	renderRow(elt: T, index: number): React.ReactElement<any> {
		return <tr key={this.getKey(elt)}>
			{(!this.sortKey)
				? <td key="dragHandle"><DragHandle/></td>
				: null}

			{this.columns.map((col: Column<T>) =>
				<td key={col.key} style={{verticalAlign: "middle"}}>
					{this.renderCell(elt, col)}
				</td>
			)}

			{this.props.delete
				? <td key="delete">
					<Button bsStyle="danger" onClick={() => this.props.delete(index)}>
						<Icon name="minus"/>
					</Button>
				</td>
				: null}
		</tr>;
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
			return <XText
					validate={this.createValidator(elt, col, value)}
					mode="inline"
					onSave={(e, params) => {
						elt[col.key] = params.newValue;
						this.forceUpdate();
					}}
				>
				{value}
			</XText>;

		case InputType.Select:
			return <XSelect
					mode="inline"
					source={col.values.map((val, i) => new Object({value: i, text: val}))}
					value={value}
					onSave={(e, params) => {
						elt[col.key] = checkInt(params.newValue);
						this.forceUpdate();
					}}
				/>;
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

		return (
			<tfoot>
				<tr>
					{this.columns.map((col: Column<T>) =>
						<td key={col.key}>
							{this.renderInput(col)}
						</td>
					)}
					<td key="add">
						<Button
								/*type="submit",*/
								onClick={(e) => this.onAdd(e)}
							>
							<Icon name="plus"/>
						</Button>
					</td>
				</tr>
			</tfoot>
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
			return <Input
				type="text"
				bsStyle={bsStyle}
				help={this.state[col.key + "_reason"]}
				placeholder={col.placeholder}
				value={this.state[col.key + "_value"]}
				onChange={(e) => {
					this.setState({ [col.key + "_value"]: e.target.value });
				}}
			/>;

		case InputType.Select:
			return <Input
					type="select"
					bsStyle={bsStyle}
					help={this.state[col.key + "_reason"]}
					placeholder={col.placeholder}
					value={this.state[col.key + "_value"]}
					onChange={(e) => {
						this.setState({ [col.key + "_value"]: checkInt(e.target.value) });
					}}
				>
					<optgroup label={col.placeholder}>
						<option disabled={true} hidden={true} value="">{col.placeholder}</option>
				  		{col.values.map((val: string, idx: number) =>
							<option key={val} value={idx}>{val}</option>
						)}
					</optgroup>
				</Input>;
		}
	}

	valueExists(key: string, value: any): boolean {
		return _.any(this.props.data, (elt: T) => elt[key] === value);
	}

	onAdd(e) {
		e.preventDefault();

		var obj: T = {} as T; // TODO: new?

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
