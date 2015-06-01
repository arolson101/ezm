 /// <reference path="../project.d.ts"/>
import React = require("react");

interface Props extends React.Props<any>, XEditable.Options {
    onSave?: () => void;
}


class XEditableClass extends React.Component<Props, {}> {
    render() {
        return React.DOM.a(
            {
                href: "#",
                ref: "a"
            },
            this.props.children
        );
        //return <a href="#" ref="a" success={this.onSuccess}>{this.props.children}</a>;
    }

    componentDidMount() {
        var $a = $(React.findDOMNode(this.refs["a"]));
        this.props.unsavedclass = null;
        $a.editable(this.props);
        $a.on('save', this.onSave);
    }

    onSave(/*e, params*/) {
        var $a = $(React.findDOMNode(this.refs["a"]));
        $a.removeClass('editable-unsaved');
        if(this.props.onSave) {
            this.props.onSave();
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
