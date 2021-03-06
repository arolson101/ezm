// Type definitions for react-fa
// Project: https://github.com/andreypopp/react-fa
// Definitions by: Andrew Olson <andrew@olsononline.org>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../react/react-global.d.ts" />

declare module "react-fa" {
	
	interface IconAttributes extends React.DOMAttributes {
		name: string;
		/** one of: 'lg', '2x', '3x', '4x', '5x' */
		size?: string;
		/** one of: '90', '180', '270' */
		rotate?: string;
		/** one of: 'horizontal', 'vertical' */
		flip?: string;
		fixedWidth?: boolean;
		spin?: boolean;
		/** one of: '1x', '2x' */
		stack?: string;
		inverse?: boolean;
	}
	
	var Icon:React.ComponentClass<IconAttributes>;
	export = Icon;
}
