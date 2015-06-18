/// <reference path="../project.d.ts"/>

import {FI} from "../ficache";
import {AccountType} from "../models/accountType";
import {IAccount} from "../models/account";

import BankAccount = ofx4js.client.BankAccount;
import FinancialInstitutionImpl = ofx4js.client.impl.FinancialInstitutionImpl;
import BaseFinancialInstitutionData = ofx4js.client.impl.BaseFinancialInstitutionData;
import OFXV1Connection = ofx4js.client.net.OFXV1Connection;
import AccountProfile = ofx4js.domain.data.signup.AccountProfile;


export interface ReadAccountProfiles {
  fid: string;
  org: string;
  ofx: string;
  name: string;
  
	username: string;
	password: string;
}


export function readAccountProfiles(params: ReadAccountProfiles): Promise<IAccount[]> {
  var bank = new BaseFinancialInstitutionData();
  bank.setFinancialInstitutionId(params.fid);
  bank.setOrganization(params.org);
  bank.setOFXURL(params.ofx);
  bank.setName(params.name);
  
  var connection = new OFXV1Connection();
  
  // NOTE: making an OFX connection will fail security checks in browsers.  On Chrome you
  // can make it run with the "--disable-web-security" command-line option
  // e.g. (OSX): open /Applications/Google\ Chrome.app --args --disable-web-security
  var service = new FinancialInstitutionImpl(bank, connection);
  return service.readAccountProfiles(params.username, params.password)
  .then(convertAccountList);
}


function convertAccountType(acctType: ofx4js.domain.data.banking.AccountType): AccountType {
  var str = ofx4js.domain.data.banking.AccountType[acctType];
  console.assert(str in AccountType);
  return AccountType[str];
}


function convertAccountList(accountProfiles: AccountProfile[]): IAccount[] {
  return accountProfiles.map(convertAccount);
}


function convertAccount(accountProfile: AccountProfile): IAccount {
  if(accountProfile.getBankSpecifics()) {
    return {
      name: accountProfile.getDescription(),
      type: convertAccountType(accountProfile.getBankSpecifics().getBankAccount().getAccountType()),
      number: accountProfile.getBankSpecifics().getBankAccount().getAccountNumber(),
      visible: true,
    };
  }
  else if(accountProfile.getCreditCardSpecifics()) {
    return {
      name: accountProfile.getDescription(),
      type: AccountType.CREDITCARD,
      number: accountProfile.getCreditCardSpecifics().getCreditCardAccount().getAccountNumber(),
      visible: true,
    };
  }
  else if(accountProfile.getInvestmentSpecifics()) {
    // TODO: support investment accounts
    console.warn("investment account not supported: ", accountProfile);
  }
}
