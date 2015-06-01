/// <reference path='project.d.ts'/>
var db = require("./db");
var account_1 = require("./models/account");
var actions = Reflux.createActions([
    "addInstitution",
    "addAccount",
]);
var idServer = 1;
var institutions = [];
var accounts = [];
exports.AccountStore = Reflux.createStore({
    listenables: actions,
    actions: actions,
    onDbOpen: function () {
        return Promise.all([
            account_1.Institution.all.get().then(function (results) {
                institutions = results;
                var ids = _.pluck(results, "id");
                ids.push(0);
                idServer = _.max(ids) + 1;
            }),
            account_1.Account.all.get().then(function (results) {
                accounts = results;
            }),
        ]);
    },
    save: function (institution, accounts) {
        institution.assignId();
        _.forEach(accounts, function (account) {
            account.institution = institution;
            account.assignId();
        });
        return (_a = db.Store).save.apply(_a, [institution].concat(accounts));
        var _a;
    },
    onAddInstitution: function (newInstitution) {
        console.assert(!newInstitution.id);
        newInstitution.id = idServer++;
        console.log("onAddInstitution", newInstitution);
        db.Store.save(newInstitution);
        accounts.push(newInstitution);
        this.trigger(accounts);
    },
    onAddAccount: function (newAccount) {
        console.log("onAddAccount", newAccount);
    },
    getDefaultData: function () {
        console.log("getDefaultData");
        return accounts;
    }
});
db.onOpen(exports.AccountStore.onDbOpen);
