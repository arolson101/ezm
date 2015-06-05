// Type definitions for react-bootstrap
// Project: https://react-bootstrap.github.io/
// Definitions by: René Verheij <https://github.com/flyon>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../react/react-global.d.ts" />

declare module "react-bootstrap"
{
	var Accordion:React.Factory<PanelGroupAttributes>;
	var Affix:React.Factory<AffixAttributes>;
	var AffixMixin:React.Mixin<AffixAttributes,any>;
	var Alert:React.Factory<AlertAttributes>;
	var Badge:React.Factory<BadgeAttributes>;
	var Button:React.Factory<ButtonAttributes>;
	var ButtonGroup:React.Factory<ButtonGroupAttributes>;
	var ButtonToolbar:React.Factory<ReactBootstrapAttributes>;
	var Carousel:React.Factory<CarouselAttributes>;
	var CarouselItem:React.Factory<CarouselItemAttributes>;
	var Col:React.Factory<ColAttributes>;
	var DropdownButton:React.Factory<DropdownButtonAttributes>;
	var DropdownMenu:React.Factory<DropdownMenuAttributes>;
	var Glyphicon:React.Factory<GlyphiconAttributes>;
	var Grid:React.Factory<GridAttributes>;
	var Input:React.Factory<InputAttributes>;
	var Interpolate:React.Factory<InterpolateAttributes>;
	var Jumbotron:React.Factory<{}>;
	var Label:React.Factory<ReactBootstrapAttributes>;
	var ListGroup:React.Factory<ListGroupAttributes>;
	var ListGroupItem:React.Factory<ListGroupItemAttributes>;
	var MenuItem:React.Factory<MenuItemAttributes>;
	var Modal:React.Factory<ModalAttributes>;
	var ModalTrigger:React.Factory<ModalTriggerAttributes>;
	var Nav:React.Factory<NavAttributes>;
	var NavItem:React.Factory<NavItemAttributes>;
	var Navbar:React.Factory<NavbarAttributes>;
	var OverlayTrigger:React.Factory<OverlayTriggerAttributes>;
	var PageHeader:React.Factory<any>;
	var PageItem:React.Factory<PageItemAttributes>;
	var Pager:React.Factory<PagerAttributes>;
	var Panel:React.Factory<PanelAttributes>;
	var PanelGroup:React.Factory<PanelGroupAttributes>;
	var Popover:React.Factory<PopoverAttributes>;
	var ProgressBar:React.Factory<ProgressBarAttributes>;
	var Row:React.Factory<RowAttributes>;
	var SplitButton:React.Factory<SplitButtonAttributes>;
	var SubNav:React.Factory<SubNavAttributes>;
	var TabPane:React.Factory<TabPaneAttributes>;
	var TabbedArea:React.Factory<TabbedAreaAttributes>;
	var Table:React.Factory<TableAttributes>;
	var Tooltip:React.Factory<TooltipAttributes>;
	var Well:React.Factory<ReactBootstrapAttributes>;
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
	modal: React.Factory<ModalAttributes>
}

interface ModalAttributes extends ReactBootstrapAttributes
{
	title: any;
	/**
	 * oneOf(['static', true, false]),
	 */
	backdrop?: string;
	keyboard?: boolean;
	closeButton?:boolean;
	animation?:boolean;
	onRequestHide:()=>void;
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
