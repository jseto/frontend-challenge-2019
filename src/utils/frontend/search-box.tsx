import { h, Component } from "preact";
import { ViewListItem } from "./master-detail-view/master-view";

export interface SearchBoxProps<T> {
	onSelect: ( item: ViewListItem<T> ) => void;
	onInput: ( value: string ) => void;
	items: ViewListItem<T>[];
	value?: string;
}

export interface SearchBoxState {
	showItems: boolean
	value: string;
}

export class SearchBox<T> extends Component< SearchBoxProps<T>, SearchBoxState >{
	componentDidMount() {
		this.setState({ value: this.props.value });
		window.addEventListener( 'click', e => this.globalClickHandler(e) );
	}

	componentWillUnmount() {
		window.removeEventListener( 'click', e => this.globalClickHandler(e) );
	}

	render(){
		const { value, showItems } = { ...this.state };
		const { items } = { ...this.props };

		return (
			<div className="search-box">
				<input
					value={ value }
					placeholder="type a city to add"
					onInput={ event => this.valueChanged( event.target['value']) }
				/>
				<ul
					className={ 'search-box-panel' + ( showItems? '': ' hide' ) }
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
				</ul>
			</div>
		);
	}

	private itemClicked( item: ViewListItem<T> ) {
		this.props.onSelect && this.props.onSelect( item );
		this.setState({showItems: false});
	}

  private valueChanged( value: string ) {
    this.setState({
			value: value,
			showItems: value !== ''
		});
		if ( this.props.onInput ) this.props.onInput( value );
  }

	private globalClickHandler( event: Event ) {
		//closes option-panel if click outside panel
		if ( this.base && !this.base.contains( event.target as HTMLElement )  ) {
			this.setState({ showItems: false})
		}
	}

}
