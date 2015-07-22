// Type definitions for react-bootstrap
// Project: https://react-bootstrap.github.io/
// Definitions by: René Verheij <https://github.com/flyon>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../react/react-global.d.ts" />

declare module "react-bootstrap"
{
	var Accordion:React.ComponentClass<PanelGroupAttributes>;
	var Affix:React.ComponentClass<AffixAttributes>;
	var AffixMixin:React.Mixin<AffixAttributes,any>;
	var Alert:React.ComponentClass<AlertAttributes>;
	var Badge:React.ComponentClass<BadgeAttributes>;
	var Button:React.ComponentClass<ButtonAttributes>;
	var ButtonInput:React.ComponentClass<ButtonAttributes>;
	var ButtonGroup:React.ComponentClass<ButtonGroupAttributes>;
	var ButtonToolbar:React.ComponentClass<ReactBootstrapAttributes>;
	var Carousel:React.ComponentClass<CarouselAttributes>;
	var CarouselItem:React.ComponentClass<CarouselItemAttributes>;
	var Col:React.ComponentClass<ColAttributes>;
	var DropdownButton:React.ComponentClass<DropdownButtonAttributes>;
	var DropdownMenu:React.ComponentClass<DropdownMenuAttributes>;
	var Glyphicon:React.ComponentClass<GlyphiconAttributes>;
	var Grid:React.ComponentClass<GridAttributes>;
	var Input:React.ComponentClass<InputAttributes>;
	var Interpolate:React.ComponentClass<InterpolateAttributes>;
	var Jumbotron:React.ComponentClass<{}>;
	var Label:React.ComponentClass<ReactBootstrapAttributes>;
	var ListGroup:React.ComponentClass<ListGroupAttributes>;
	var ListGroupItem:React.ComponentClass<ListGroupItemAttributes>;
	var MenuItem:React.ComponentClass<MenuItemAttributes>;
	var Modal:React.ComponentClass<ModalAttributes>;
	var ModalTrigger:React.ComponentClass<ModalTriggerAttributes>;
	var Nav:React.ComponentClass<NavAttributes>;
	var NavItem:React.ComponentClass<NavItemAttributes>;
	var Navbar:React.ComponentClass<NavbarAttributes>;
	var OverlayTrigger:React.ComponentClass<OverlayTriggerAttributes>;
	var PageHeader:React.ComponentClass<any>;
	var PageItem:React.ComponentClass<PageItemAttributes>;
	var Pager:React.ComponentClass<PagerAttributes>;
	var Panel:React.ComponentClass<PanelAttributes>;
	var PanelGroup:React.ComponentClass<PanelGroupAttributes>;
	var Popover:React.ComponentClass<PopoverAttributes>;
	var ProgressBar:React.ComponentClass<ProgressBarAttributes>;
	var Row:React.ComponentClass<RowAttributes>;
	var SplitButton:React.ComponentClass<SplitButtonAttributes>;
	var SubNav:React.ComponentClass<SubNavAttributes>;
	var TabPane:React.ComponentClass<TabPaneAttributes>;
	var TabbedArea:React.ComponentClass<TabbedAreaAttributes>;
	var Table:React.ComponentClass<TableAttributes>;
	var Tooltip:React.ComponentClass<TooltipAttributes>;
	var Well:React.ComponentClass<ReactBootstrapAttributes>;
}

interface TooltipAttributes extends ReactBootstrapAttributes
{
	/**
	 * oneOf(['top','right', 'bottom', 'left']),
	 */
	placement?: string;
	positionLeft?:number;
	positionTop?:number;
	arrowOffsetLeft?:number;
	arrowOffsetTop?:number;
}
interface TableAttributes extends React.DOMAttributes
{
	striped?: boolean;
	bordered?: boolean;
	condensed?: boolean;
	hover?: boolean;
	responsive?: boolean;
}
interface TabbedAreaAttributes extends ReactBootstrapAttributes
{
	/**
	 * oneOf(['tabs','pills'])
	 */
	bsStyle: string;
	animation: boolean;
	onSelect:(key?:string)=>void;
}
interface TabPaneAttributes extends React.DOMAttributes
{
	animation?:boolean;
	active?:boolean;
	onAnimateOutEnd?:()=>void;
}
interface SubNavAttributes extends ReactBootstrapAttributes
{
	onSelect?: (key?:string, href?:string)=>void;
	active?: boolean;
	disabled?: boolean;
	href?: string;
	title?: string;
	text?: any;
}

interface SplitButtonAttributes extends ReactBootstrapAttributes
{
	pullRight?: boolean;
	title?: any;
	href?: string;
	/**
	 * Is rendered inside <span>
	 */
	dropdownTitle?: any
	onClick?: (e?:React.MouseEvent)=>void;
	onSelect?: (key?:string)=>void;
	disabled?: boolean;
}
interface RowAttributes extends React.DOMAttributes
{
	componentClass?: string;
}

interface ProgressBarAttributes extends ReactBootstrapAttributes
{
	min?: number;
	now?: number;
	max?: number;
	label?: any;
	/**
	 * ScreenReaderOnly
	 */
	srOnly?: boolean;
	striped?: boolean;
	active?: boolean;
}
interface PopoverAttributes extends ReactBootstrapAttributes
{
	/**
	 * oneOf(['top','right', 'bottom', 'left']),
	 */
	placement?: string;
	positionLeft?: number;
	positionTop?: number;
	arrowOffsetLeft?: number;
	arrowOffsetTop?: number;
	title?: any;
}
interface PanelGroupAttributes extends ReactBootstrapAttributes {
	collapsable?: boolean;
	activeKey?: any;
	defaultActiveKey?: any;
	onSelect?: (key?:string)=>void;
}
interface PanelAttributes extends ReactBootstrapAttributes,CollapsableAttributes {
	onSelect?: (key?:string)=>void;
	header?: any;
	footer?: any;
}

interface PagerAttributes extends React.DOMAttributes {
	onSelect:()=>void;
}

interface PageItemAttributes extends React.DOMAttributes
{
	disabled?: boolean;
	previous?: boolean;
	next?: boolean;
	onSelect?:(key?:string,href?:string)=>void;
}
interface OverlayTriggerAttributes extends OverlayAttributes
{
	/**
	 * oneOfType([
	 	oneOf(['manual', 'click', 'hover', 'focus']),
	 	arrayOf(oneOf(['click', 'hover', 'focus']))
	   ])
	 */
	trigger?: any;
	/**
	 * oneOf(['top','right', 'bottom', 'left']),
	 */
	placement?: string;
	delay?: number;
	delayShow?: number;
	delayHide?: number;
	defaultOverlayShown?:boolean;
	overlay: any;
}
interface NavbarAttributes extends ReactBootstrapAttributes
{
	fixedTop?:boolean;
	fixedBottom?:boolean;
	staticTop?:boolean;
	inverse?:boolean;
	fluid?:boolean;
	role?: string;
	componentClass?: string;
	brand?: any;
	toggleButton?: any;
	onToggle?: ()=>void;
	navExpanded?:boolean;
	defaultNavExpanded?: boolean;
}
interface NavItemAttributes extends ReactBootstrapAttributes
{
	onSelect?:(key?:string,href?:string)=>void;
	active?:boolean;
	disabled?:boolean;
	href?:string;
	title?:string;
}
interface NavAttributes extends ReactBootstrapAttributes,CollapsableAttributes
{
	/**
	 * oneOf('tabs','pills')
	 */
	bsStyle?: string;
	stacked?:boolean;
	justified?:boolean;
	//TODO: see what type of attributes
	onSelect?: ()=>void;
	collapsable?:boolean;
	expanded?:boolean;
	navbar?: boolean;
}
interface OverlayAttributes extends React.DOMAttributes
{
	/**
	 * CustomPropTypes.mountable
	 */
	container?: any;
}
interface ModalTriggerAttributes extends OverlayAttributes
{
	//change to 'any'?
	modal: any; //React.Factory<ModalAttributes>
}

interface ModalAttributes extends ReactBootstrapAttributes
{
	title?: any;
	/**
	 * oneOf(['static', true, false]),
	 */
	backdrop?: string;
	keyboard?: boolean;
	closeButton?:boolean;
	animation?:boolean;
	onRequestHide?:()=>void;
	trigger?: string;
}
interface ListGroupItemAttributes extends ReactBootstrapAttributes
{
	/**
	 * oneOf(['danger','info','success','warning']),
	 */
	bsStyle?: string;
	active?: any;
	disabled?: any;
	header?: any;
	/**
	 * NOTE: In actuality: onClick?: (key?:string,href?:string)=>void;
	 * Altough typescript does not allow overwrites
	 * React Bootstrap implements onClick different from the React default
	 * with two parameters, being: key and href
	 * @param key:string
	 * @param href:string
	 */
	onClick?: (event: React.MouseEvent) => void;

}
interface ListGroupAttributes extends ReactBootstrapAttributes
{
	onClick:()=>void;
}
interface InterpolateAttributes extends React.DOMAttributes
{
	format?: string;
}

interface InputAttributes extends React.DOMAttributes
{
	type?: string;
	label?: any;
	help?: any;
	addonBefore?: any;
	addonAfter?: any;
	/**
	 * success,warning,error,default,info
	 */
	bsStyle?: string;
	hasFeedback?: boolean;
	groupClassName?: string;
	wrapperClassName?: string;
	labelClassName?: string;
	disabled?: boolean;
	placeholder?: string;
	defaultValue?: string;
	valueLink?: any;
	checkedLink?: any;
	rows?: number;
}
interface GridAttributes extends React.DOMAttributes
{
	fluid?:boolean;
	compenentClass:string;
}
interface GlyphiconAttributes extends ReactBootstrapAttributes
{
	glyph: string;
}
interface DropdownMenuAttributes extends React.DOMAttributes
{
	pullRight?: boolean;
	//TODO: what type of attributes?
	onSelect?: ()=>void;
}
interface DropdownButtonAttributes extends ReactBootstrapAttributes
{
	pullRight?:boolean;
	dropup?:boolean;
	title?:any;
	href?:string;
	onClick?:()=>void;
	onSelect?:(key?:string)=>void;
	navItem?:boolean;
}
interface CollapsableAttributes
{
	collapsable?: boolean;
	defaultExpanded?: boolean;
	expanded?: boolean;
}

interface ColAttributes extends React.DOMAttributes
{
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xsOffset?: number;
	smOffset?: number;
	mdOffset?: number;
	lgOffset?: number;
	xsPush?: number;
	smPush?: number;
	mdPush?: number;
	lgPush?: number;
	xsPull?: number;
	smPull?: number;
	mdPull?: number;
	lgPull?: number;
	componentClass?: string;
}

interface CarouselItemAttributes extends React.DOMAttributes
{
	/**
	 * oneOf(['prev', 'next']),
	 */
	direction?: string;
	onAnimateOutEnd?: (index:string)=>void;
	active?: boolean;
	caption?: any;
}
interface CarouselAttributes extends ReactBootstrapAttributes
{
	slide?:boolean;
	indicators?:boolean;
	controls?:boolean;
	pauseOnHover?:boolean;
	wrap?:boolean;
	onSelect?:(index?:string,direction?:string)=>void;
	onSlideEnd?: ()=>void;
	activeIndex?: number;
	defaultActiveIndex?: number;
	/**
	 * 'prev' or 'next'
	 */
	direction?:string;
}
interface ButtonGroupAttributes extends ReactBootstrapAttributes
{
	vertical?:boolean;
	justified?:boolean;
}
interface ButtonAttributes extends ReactBootstrapAttributes
{
	active?:boolean;
	disabled?: boolean;
	block?: boolean;
	navItem?:boolean;
	navDropdown?:boolean;
	componentClass?:string;
}
interface BadgeAttributes extends React.DOMAttributes
{
	pullRight?: boolean;
}
interface AlertAttributes extends ReactBootstrapAttributes
{
	onDismiss?: (e?:React.MouseEvent)=>void;
	dismissAfter?: number;
}
interface ReactBootstrapAttributes extends React.DOMAttributes
{
	/**
	 * Used internally in react-bootstrap
	 */
	bsClass?:string;
	/**
	 * 'default','primary','success','info','warning','danger',
	 *	'link','inline',
	 *	'tabs','pills'
	 **/
	bsStyle?:string;
	/**
	 * 'large','medium','small','xsmall'
	 */
	bsSize?:string;
}
interface AffixAttributes extends React.DOMAttributes
{
	offset?: number;
	offsetTop?: number;
	offsetBottom?: number;
}

interface MenuItemAttributes extends ReactBootstrapAttributes
{
	header?:boolean;
	divider?:boolean;
	href?:string;
	title?:string;
	onSelect?:(key?:string)=>void;
}
