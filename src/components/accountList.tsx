/// <reference path="../project.d.ts"/>

import Icon = require("react-fa");
import {Button, Input, ButtonInput, OverlayTrigger, Popover, Table} from "react-bootstrap";

import {EnumEx} from "../enumEx";
import {IAccount} from "../models/account";
import {AccountType, AccountType_t} from "../models/accountType";
import {EasyList, Props, InputType} from "./easyList";
import {t} from "../t";



export class AccountList extends EasyList<IAccount> {
	constructor(props?: Props<IAccount>) {
		var accountTypePlaceholder: string = t("accountDialog.add.typePlaceholder");
		this.getKey = (acct: IAccount) => acct.number;
		this.sortKey = "number";
		this.columns = [
			{
				key: "visible",
				defaultValue: true,
				display: (acct: IAccount) =>
			        <Button
			            bsStyle="link"
			            onClick={() => { acct.visible = !acct.visible; this.forceUpdate(); }}
			            title={t("accountDialog.toggleVisTooltip")}
			          >
			          <Icon name={acct.visible ? "eye" : "eye-slash"}/>
			        </Button>,
				input: InputType.None,
			},

			{
				key: "type",
				defaultValue: "",
				input: InputType.Select,
				editable: true,
				placeholder: t("accountDialog.add.typePlaceholder"),
				values: EnumEx.getValues<AccountType>(AccountType).map(type => AccountType_t(type)),
				required: true,
			},

			{
				key: "name",
				defaultValue: "",
				placeholder: t("accountDialog.add.namePlaceholder"),
				editable: true,
				input: InputType.Text,
				unique: true,
				required: true,
			},

			{
				key: "number",
				defaultValue: "",
				placeholder: t("accountDialog.add.idPlaceholder"),
				editable: true,
				input: InputType.Text,
				unique: true,
				required: true,
			},
		];

		super(props);
	}
}
