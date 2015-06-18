// Type definitions for react-ladda
// Project: https://github.com/jsdir/react-ladda
// Definitions by: Andrew Olson <andrew@olsononline.org>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../react/react-global.d.ts" />

declare module "react-ladda" {
	var LaddaButton:React.ComponentClass<LaddaButtonAttributes>;
	
	interface LaddaButtonAttributes {
		
	}
	
	export = LaddaButton;
}

interface ButtonAttributes extends React.DOMAttributes
{
	progress?:number;
	color?:string;
	size?:string;
	spinnerSize?:number;
	spinnerColor?:number;
	style?:string;
}