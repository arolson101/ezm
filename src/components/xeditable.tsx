 /// <reference path="../project.d.ts"/>

interface Props extends React.Props<any>, XEditable.Options {
    onSave?: (e, params) => void;
}


export class XEditable extends React.Component<Props, any> {
    render() {
        return <a href="#" ref="a">
            {this.props.children}
        </a>;
        //return <a href="#" ref="a" success={this.onSuccess}>{this.props.children}</a>;
    }

    componentDidMount() {
        var $a = $(React.findDOMNode(this.refs["a"]));
        this.props.unsavedclass = null;
        $a.editable(this.props);
        $a.on('save', (e, params) => this.onSave(e, params));
    }

    onSave(e, params) {
        var $a = $(React.findDOMNode(this.refs["a"]));
        $a.removeClass('editable-unsaved');
        if(this.props.onSave) {
            this.props.onSave(e, params);
        }
    }
}


export class XSelect extends XEditable {
    constructor(props?: Props) {
        super(_.extend({}, props, { type: 'select' }));
    }
}


export class XText extends XEditable {
    constructor(props?: Props) {
        super(_.extend({}, props, { type: 'text' }));
    }
}
