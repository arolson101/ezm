/// <reference path="../project.d.ts"/>

var hash: StringHashFcn = require("string-hash");


interface UTableParams {
	tableName: string;
}

export class U
{
  private static ensureColumns(template: Updraft.ClassTemplate<any>) {
    if(!template.columns) {
      template.columns = {};
    }
  }

	static Table(params: UTableParams) {
		return function(target: Function) {
			var template: Updraft.ClassTemplate<any> = <any>target;
			template.tableName = params.tableName;
      // property decorators' target is Function.prototype; put the columns on Function instead
      if((<any>target.prototype).columns) {
        template.columns = (<any>target.prototype).columns;
        delete (<any>target.prototype).columns;
      }
      U.ensureColumns(template);
		}
	}

	static Column(column: Updraft.Column) {
		return function(target: Object, propertyKey: string): any {
			var template: Updraft.ClassTemplate<any> = <any>target;
      U.ensureColumns(template);
			console.assert(!(propertyKey in template.columns));
			template.columns[propertyKey] = column;
		}
	}

	static DbId() { return U.Column(Updraft.Column.Int().Key()); }
	static Int() { return U.Column(Updraft.Column.Int()); }
	static Real() { return U.Column(Updraft.Column.Real()); }
	static Bool(dflt?: boolean) {
		var col = Updraft.Column.Bool();
		if(typeof(dflt) !== 'undefined') {
			col = col.Default(dflt);
		}
		return U.Column(col);
	}
	static Text() { return U.Column(Updraft.Column.Text()); }
	static String() { return U.Column(Updraft.Column.String()); }
	static Blob() { return U.Column(Updraft.Column.Blob()); }
	static Enum(enum_: any) { return U.Column(Updraft.Column.Enum(enum_)); }
	static Date() { return U.Column(Updraft.Column.Date()); }
	static DateTime() { return U.Column(Updraft.Column.DateTime()); }
	static JSON() { return U.Column(Updraft.Column.JSON()); }
	static Ptr(ref: any) { return U.Column(Updraft.Column.Ptr(ref)); }
	static Set(ref: any) { return U.Column(Updraft.Column.Set(ref)); }
}
