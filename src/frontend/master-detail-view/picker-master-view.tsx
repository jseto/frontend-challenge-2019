import { h, Component } from "preact";
import { ItemPicker, ViewListItem } from "../item-picker";
import { MasterView } from "./master-view";
let PlusIcon = require( "@fortawesome/fontawesome-free/svgs/solid/plus.svg" );

interface PickerMasterViewProps<T> {
	addButtonLabel: string;
	selectableItems: ViewListItem<T>[];
	selectedItems: ViewListItem<T>[];
	addItem: ( item: ViewListItem<T> ) => void;
	onDelete: ( item: ViewListItem<T> ) => void;
	onMoveUp: ( item: ViewListItem<T> ) => ViewListItem<T>;
	onMoveDown: ( item: ViewListItem<T> ) => ViewListItem<T>;
	emptySelectableItemsMessage?: JSX.Element;
}

export class PickerMasterView<T> extends Component< PickerMasterViewProps<T>, {} > {

	render() {
		return (
			<div className="frontend-challenge-2019">
				<ItemPicker
					items={ this.props.selectableItems }
					label={ this.props.addButtonLabel }
					onSelectItem={ item => this.props.addItem( item ) }
					icon={<PlusIcon className="svg-inline icon-button" fill='grey' width='1rem'/>}
					emptyItemsMessage={ this.props.emptySelectableItemsMessage }
				/>
				<MasterView
					listSource={ this.props.selectedItems }
					onDelete={ ( item: ViewListItem<T> ) => this.props.onDelete( item ) }
					onMoveUp={ ( item: ViewListItem<T> ) => this.props.onMoveUp( item ) }
					onMoveDown={ ( item: ViewListItem<T> ) => this.props.onMoveDown( item ) }
				>
				{this.props.children}
				</MasterView>
			</div>
		);
	}
}
