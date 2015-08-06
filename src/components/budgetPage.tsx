/// <reference path="../project.d.ts"/>

import {Route, Link} from "react-router";
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
              delete={(index) => {
                this.state.items.splice(index, 1);
                this.forceUpdate();
              }}
              add={(acct: BudgetItem) => {
                this.state.items.push(acct);
                this.forceUpdate();
              }}
            />
					</div>
				</div>
			</div>
		);
  }
}
