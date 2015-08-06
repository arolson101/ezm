/// <reference path="../project.d.ts"/>

import Icon = require("react-fa");
import {BudgetItem} from "../models/budgetItem";
import {EnumEx} from "../enumEx";
import {EasyList, Props, InputType} from "./easyList";
import {t} from "../t";



export class BudgetItemList extends EasyList<BudgetItem> {
	constructor(props?: Props<BudgetItem>) {
		var accountTypePlaceholder: string = t("accountDialog.add.typePlaceholder");
		this.getKey = (acct: BudgetItem) => acct.name;
		this.sortKey = "dbid";
		this.columns = [
			{
				key: "name",
				defaultValue: "",
				placeholder: t("budgetList.add.namePlaceholder"),
				editable: true,
				input: InputType.Text,
				unique: true,
				required: true,
			}
		];

		super(props);
	}
}
