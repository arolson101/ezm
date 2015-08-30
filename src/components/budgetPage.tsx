/// <reference path="../project.d.ts"/>

import {Route, Link} from "react-router";
import {Actions} from "../actions";
import {Flap} from "../flap";
import {BudgetItem, BudgetItemStore} from "../models/budgetItem";
import {BudgetItemList} from "./budgetItemList";

interface State {
  items: BudgetItem[];
}

@Flap
export class BudgetPage extends React.Component<any, State> {
  linkState: <P>(store: Flap.Store<P>, state: string) => void;
  listenTo: <P>(action: Flap.Action<P>, callback: Flap.Listener<P>) => void;

  static name = "budget";

  static route() {
    return <Route name={BudgetPage.name} handler={BudgetPage}/>;
  }

  static link() {
    return BudgetPage.name;
  }

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.linkState(BudgetItemStore, "items");
  }

  render() {
    return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-12">
						<h1 className="page-header">Budget</h1>
					</div>
				</div>

        <div className="row">
					<div className="col-lg-12">
            <BudgetItemList
              data={this.state.items}
              add={this.onAdd}
              save={this.onSave}
              delete={this.onDelete}
            />
					</div>
				</div>
			</div>
		);
  }

  onAdd = (acct: BudgetItem) => {
    console.assert(!(acct instanceof BudgetItem));
    acct = new BudgetItem(acct);
    acct.dbid = Date.now();

    Actions.save([acct]);
  }

  onSave = (acct: BudgetItem) => {
    console.assert(acct instanceof BudgetItem);
    Actions.save([acct]);
  }

  onDelete = (index: number, item: BudgetItem) => {
    Actions.delete([item]);
  }
}
