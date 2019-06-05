import { h, Component } from "preact";

interface ItemPickerState {
	showItems: boolean; /** wether to open the items panel */
}

/**
 * A structure containing item list information
 */
export interface ViewListItem<T> {
	key: string; /** A unique key identifier in the list. See React docs for more info */
	label: string; /** The text to show in the item picker panel */
	object?: T; /** Associated object to this item */
}

interface ItemPickerProps<T> {
	items: ViewListItem<T>[]; /** The item list of available options */
	label: string; /** The text to show on the button */
	onSelectItem: ( item: ViewListItem<T> ) => void; /** callback called when a item is selected */
	icon?: JSX.Element; /** Icon to show on the button */
	emptyItemsMessage?: JSX.Element; /** Text to show if the item list is empty */
}


/**
 * Manages a list of items to choose from
 * @param props the element properties
 */
export class ItemPicker<T> extends Component< ItemPickerProps<T>, ItemPickerState > {

	constructor( props: ItemPickerProps<T> ) {
		super( props );
		this.setState({
			showItems: false,
		});
	}

	componentDidMount() {
		//handles closing this panel when click outside it
		window.addEventListener( 'click', e => this.globalClickHandler(e) );
	}

	componentWillUnmount() {
		window.removeEventListener( 'click', (e) => this.globalClickHandler(e) );
	}

	render() {
		let { label, items, icon, emptyItemsMessage } = { ...this.props };
		let { showItems } = { ...this.state };
		return (
			<div className="frontend-challenge-2019">
				<button class="add-button"
					onClick={ ()=> this.setState( { showItems: !showItems } ) }>
						{icon}
						<span style="position:relative">{label}</span>
				</button>
				<ul
					className={ 'picker-panel' + ( showItems? '': ' hide' ) }
					onClick={ () => this.setState( { showItems: false} ) }>
					{
						 items && items.map( item => { return (
							<li key={item.key}
								className="button"
								onClick={ ()=> this.itemClicked( item ) }>
								{item.label}
							</li>
						)})
					}
					{ items && !items.length && emptyItemsMessage }
				</ul>
			</div>
		);
	}

	private globalClickHandler( event: Event ) {
		if ( this.base && !this.base.contains( event.target as HTMLElement )  ) {
			this.setState({ showItems: false})
		}
	}

	private itemClicked( item: ViewListItem<T> ) {
		this.props.onSelectItem && this.props.onSelectItem( item );
		this.setState({showItems: false});
	}
}
