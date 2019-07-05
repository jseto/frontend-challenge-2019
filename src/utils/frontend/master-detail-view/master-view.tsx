import { h, ComponentProps, Component } from "preact";
import { DetailView } from "./detail-view";

export interface ViewListItem<T> {
	key: string;
	label: string;
	object?: T;
}

export interface MasterViewState {
	active: {
		[ key: string ]: boolean;
	}
}

export interface MasterViewProps<T> extends ComponentProps {
	listSource: ViewListItem<T>[];
	onDelete: ( item: ViewListItem<T> ) => void;
	onMoveUp: ( item: ViewListItem<T> ) => ViewListItem<T>;
	onMoveDown: ( item: ViewListItem<T> ) => ViewListItem<T>;
}

/**
 * Master Detail View Master manager
 * Manages add, delete and move operations of contained detail view
 * @param props listSource the items associated to each detail View
 * 							onDelete callback called when a item is deleted
 * 							onMoveUp callback called when item is moved up
 * 							onMoveUp callback called when item is moved up
 */

export class MasterView< T > extends Component< MasterViewProps<T>, MasterViewState >{
	constructor( props: MasterViewProps<T> ) {
		super( props );
		this.detailViewClicked('');
	}

	componentDidUpdate() {
		if ( this.scrollBy ) {
			window.scrollBy( 0, this.scrollBy );
			this.scrollBy = 0;
		}
	}

	render() {
		let { listSource } = this.props;

		return (
			<ul className="master-view">
				{ listSource.map( item => { return (
					<li id={item.key} key={item.key}>
						<DetailView
							item={ item }
							queryActivate={ () => this.detailViewClicked( item.key ) }
							active={ this.state.active[ item.key ] }
							onDelete={ ()=>this.delete( item ) }
							onMoveUp={ ()=>this.moveUp( item ) }
							onMoveDown={ ()=>this.moveDown( item ) }
							haveToShowUp={ () => this.haveToShowUpArrow( item ) }
							haveToShowDown={ () => this.haveToShowDownArrow( item ) } >
							{this.props.children}
						</DetailView>
					</li>
				)})}
			</ul>
		);
	}

	private delete( item: ViewListItem<T> ) {
		this.props.onDelete( item );
		this.setState({})
	}

	private moveUp( item: ViewListItem<T> ) {
		const replacedItem = this.props.onMoveUp( item );
		this.setState({})
		this.scrollBy = -this.base.children.namedItem( replacedItem.key ).scrollHeight;
	}

	private moveDown( item: ViewListItem<T> ) {
		const replacedItem = this.props.onMoveDown( item );
		this.setState({})
		this.scrollBy = this.base.children.namedItem( replacedItem.key ).scrollHeight;
	}

	private detailViewClicked( key: string ) {
		this.setState( ( state: MasterViewState ) => {
			let active = {...state.active};
			this.props.listSource.forEach( item => active[ item.key ] = ( item.key === key )? !active[ item.key ] : false )
			return {
				active: active
			}
		});
	}

	protected haveToShowUpArrow( item: ViewListItem<T> ): boolean {
		const itemPos = this.props.listSource.indexOf( item );
		return itemPos != 0;
	}

	protected haveToShowDownArrow( item: ViewListItem<T> ): boolean {
		const itemPos = this.props.listSource.indexOf( item );
		return itemPos != ( this.props.listSource.length - 1 );
	}

	private scrollBy: number;
}
