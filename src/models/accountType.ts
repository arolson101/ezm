/// <reference path="../project.d.ts"/>

import {t} from "../t";

export enum AccountType {
  CHECKING,
  SAVINGS,
  MONEYMRKT,
  CREDITLINE,
  CREDITCARD,
}


export function AccountType_t(val: AccountType) {
  return t("AccountTypes." + AccountType[val]);
}
