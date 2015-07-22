 /// <reference path="../project.d.ts"/>

interface Props extends React.Props<any>, XEditable.Options {
    onSave?: (e, params) => void;
}


class XEditableClass extends React.Component<Props, {}> {
    render() {
        return <a href="#" ref="a">
            this.props.children
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


export class XSelectClass extends XEditableClass {
    constructor(props: Props) {
        props.type = "select";
        super(props);
    }
}

export class XTextClass extends XEditableClass {
    constructor(props: Props) {
        props.type = "text";
        super(props);
    }
}

export var XSelect = React.createFactory(XSelectClass);
export var XText = React.createFactory(XTextClass);
