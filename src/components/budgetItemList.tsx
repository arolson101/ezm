/// <reference path="../project.d.ts"/>

import moment = require("moment");
import Icon = require("react-fa");
import {BudgetItem} from "../models/budgetItem";
import {EnumEx} from "../enumEx";
import {EasyList, Props, InputType} from "./easyList";
import {t} from "../t";



export class BudgetItemList extends EasyList<BudgetItem> {
	constructor(props?: Props<BudgetItem>) {
		var accountTypePlaceholder: string = t("accountDialog.add.typePlaceholder");
		this.getKey = (acct: BudgetItem) => acct.dbid as any;
		this.sortKey = "dbid";
		this.columns = [
			// {
			// 	key: "next",
			// 	defaultValue: "",//moment().format("YYYY-MM-DD"),
			// 	placeholder: t("budgetList.add.nextPlaceholder"),
			// 	editable: true,
			// 	input: InputType.Date,
			// 	unique: true,
			// 	required: true,
			// },
			{
				key: "payee",
				defaultValue: "",
				placeholder: t("budgetList.add.payeePlaceholder"),
				editable: true,
				input: InputType.Text,
				unique: true,
				required: true,
			},
			{
				key: "rrule",
				defaultValue: "",
				placeholder: t("budgetList.add.rrulePlaceholder"),
				editable: true,
				input: InputType.Text,
				unique: true,
				required: true,
			}
		];

		super(props);
	}
}
