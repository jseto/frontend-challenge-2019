import { h, ComponentChildren, Component } from "preact";
import { ViewListItem } from "./master-view";
let TrashBin = require( "@fortawesome/fontawesome-free/svgs/regular/trash-alt.svg" );
let AngleUp = require( "@fortawesome/fontawesome-free/svgs/solid/angle-up.svg" );
let AngleDown = require( "@fortawesome/fontawesome-free/svgs/solid/angle-down.svg" );

interface DetailViewProps<T> {
	children?: ComponentChildren;
	item: ViewListItem<T>;
	queryActivate: ( key: string ) => void;
	active: boolean;
	onDelete: ( item: ViewListItem<T> ) => void;
	onMoveUp: ( item: ViewListItem<T> ) => void;
	onMoveDown: ( item: ViewListItem<T> ) => void;
	haveToShowUp: ( item: ViewListItem<T> ) => boolean;
	haveToShowDown: ( item: ViewListItem<T> ) => boolean;
}

interface DetailViewState {
}

/**
 * Manages the detail view of a Master-Detail-View
 * @params props 	children the children component to render as a detail View
 * 								item data asociated with this detail View
 * 								queryActivate callback called when the user interacted to activate this View
 * 								active indicates if this view is active
 * 								onDelete callback called when a item is deleted
 * 								onMoveUp callback called when item is moved up
 * 								onMoveDown callback called when item is moved up
 * 								haveToShowUp should return true if this view have to show up arrow. If it is the first view it should return false
 * 								haveToShowDown should return true if this view have to show down arrow. If it is the last view it should return false
 */
export class DetailView<T> extends Component< DetailViewProps<T>, DetailViewState > {

	render () {
		let { item, children, onMoveDown, onMoveUp, onDelete, haveToShowUp, haveToShowDown } = this.props;

		return (
			<div className="detail-view">
				<div className="detail-icon-panel">
					<div className="move-arrows">
						<span
							className={ "arrow-icon-text up-button" + ( haveToShowUp( item )? '' : ' hide' ) }
							onClick={ () => onMoveUp( item )}
						>
							<AngleUp data-icon="angle-up" fill="gray" width="1em" height="1.4em"
								className="svg-inline icon-button"
							/>
							Up
						</span>
						<span
							className={ "arrow-icon-text down-button" + ( haveToShowDown( item )? '' : ' hide' ) }
							onClick={ () => onMoveDown( item )}
						>
							<AngleDown data-icon="angle-down" fill="gray" width="1em" height="1.4em"
								className="svg-inline icon-button"
							/>
							Down
						</span>
					</div>
					<div className="trash-bin-icon">
						<TrashBin data-icon="trash-alt" fill="#f99898" width="1em" height="1em"
							className="svg-inline icon-button"
							onClick={ () => onDelete( item )}
						/>
					</div>
				</div>
				<div className="detail-content">
					{ (children as ComponentChildren[]).length? children[0]( item.object, this.props.active, this.props.queryActivate ) : <p>{item.label }</p> }
				</div>
			</div>
		);
	}
}
