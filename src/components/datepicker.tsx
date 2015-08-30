/// <reference path="../project.d.ts"/>

import Icon = require("react-fa");
import {Input} from "react-bootstrap";


interface YMD {
  year: number;
  month: number;
  day: number;
}

interface Options {
  autoclose?: boolean;
  beforeShowDay?: (date: Date) => any;
  beforeShowMonth?: (date: Date) => any;
  beforeShowYear?: (date: Date) => any;
  calendarWeeks?: boolean;
  clearBtn?: boolean;
  container?: string;
  datesDisabled?: string[];
  daysOfWeekDisabled?: number[];
  daysOfWeekHighlighted?: number[];
  defaultViewDate?: YMD;
  disableTouchKeyboard?: boolean;
  enableOnReadonly?: boolean;
  endDate?: string;
  forceParse?: boolean;
  format?: string;
  immediateUpdates?: boolean;
  keyboardNavigation?: boolean;
  language?: string;
  maxViewMode?: string;
  multidate?: boolean;
  multidateSeparator?: string;
  orientation?: string;
  showOnFocus?: boolean;
  startDate?: string;
  startView?: string;
  title?: string;
  todayBtn?: boolean;
  todayHighlight?: boolean;
  toggleActive?: boolean;
  weekStart?: number;
  zIndexOffset?: number;
}

interface Props extends React.Props<any> {
  options?: Options;
  onChange?: (newValue: Date) => any;
  value?: string;
}


export class DatePicker extends React.Component<Props, any> {

  constructor(props?: Props) {
    super(props);
  }

  render() {
    //return <Input {... this.props} ref="input" className="form-control"/>;
    // return (<div>
    //   <Input
    //     {... this.props}
    //     type="text"
    //     value={this.props.value}
    //     ref="input"
    //     className="form-control"
    //   /></div>
    // );

    return <div className="input-group date" ref="input" style={{width: 200}}>
      <span className="input-group-addon">
        <i className="fa fa-calendar"></i>
      </span>
      <input type="text" className="form-control"/>
    </div>;
  }

  componentDidMount() {
    var input = React.findDOMNode(this.refs["input"] as any);
    var $input: any = $(input);
    $input.datepicker(_.merge({
      //keyboardNavigation: false,
      autoclose: true,
      todayHighlight: true
    }, this.props.options))
    .on('changeDate', e => {
      if(this.props.onChange) {
        this.props.onChange(e);
      }
    });
  }
}
