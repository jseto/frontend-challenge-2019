import { ReactWrapper } from '../../../types/enzyme';
import * as fetchMock from 'fetch-mock';
import { MockData } from '../../database/mock-data/db-sql';
import { PickerMasterView } from '../../../src/frontend/master-detail-view/picker-master-view';
import { Controller, CodeName } from '../../../src/trip-planner/controller/controller';
import { ViewListItem } from '../../../src/frontend/item-picker';

class TestController extends Controller {
	loadSelectableItems(): Promise<CodeName[]> {
    return new Promise( resolve => resolve([
			{ code: 'AD', name: 'Andorra' },
			{ code: 'FR', name: 'France' },
			{ code: 'ES', name: 'Spain' },
			{ code: 'TH', name: 'Thailand' },
			{ code: 'UK', name: 'United Kingdom' }
		]));
  }
	endpoint() {return ''}
	async loadChildren(): Promise<Controller[]> {return [];}
}

describe( 'PickerMasterView', ()=>{
	let wrapper: ReactWrapper;
	const picker = () => wrapper.find( '.item-picker' );
	const addButton = () => picker().find( 'button' );
	let pickerItems = () => picker().find( 'li' );

	beforeAll(()=>{
		let mockData = new MockData();
		fetchMock.mock('*', ( url, opts )=>{ return mockData.response( url, opts ) } );
	});

	beforeEach( async()=>{
		let controller = new TestController( 'test', 'ts' );
		let selectableData_ = controller.selectableItems.items
		let selectedData_ = controller.selectedItems.items

		controller.onChange = ( changedData ) =>{
			if ( changedData['selectableItems'] ) selectableData_ = changedData['selectableItems'].items
			if ( changedData['selectedData'] ) selectedData_ = changedData['selectedData'];
			if ( wrapper ) wrapper = wrapper.update();
		};

		await controller.fetchData();

		wrapper = mount(
			<PickerMasterView
				addButtonLabel="add item button"
				selectableItems={ selectableData_.map( item => ({ key: item.code, label: item.name }) ) }
				selectedItems={ selectedData_.map< ViewListItem< TestController > >( item => ({ key: item.isoCode, label: item.name }) ) }
				onDelete={ item => controller.deleteSelected( item.object ) }
				onMoveUp={ item => controller.moveSelected( item.object, -1 ) as unknown as ViewListItem<TestController> }
				onMoveDown={ item => controller.moveSelected( item.object, 1 ) as unknown as ViewListItem<TestController>  }
				addItem={ item => controller.addSelected( new TestController( item.label, item.key ) ) }
				emptySelectableItemsMessage={ <p className="danger">error</p> }
			>
				{(item: string ) => <h3>Child element value: {item}</h3>}
			</PickerMasterView>
		);
	});

	describe( 'Add item button', ()=> {

		it( 'should show a list of items to choose from on click', ()=> {
			addButton().simulate('click');

			expect( pickerItems().length ).toBe( 5 );
			expect( pickerItems().at( 0 ) ).toIncludeText( 'Andorra' );
			expect( pickerItems().at( 1 ) ).toIncludeText( 'France' );
			expect( pickerItems().at( 2 ) ).toIncludeText( 'Spain' );
			expect( pickerItems().at( 3 ) ).toIncludeText( 'Thailand' );
			expect( pickerItems().at( 4 ) ).toIncludeText( 'United Kingdom' );
		});

		it( 'should not show error message if have selectableItems', ()=>{
			expect( wrapper.find( 'p.danger' ) ).not.toExist();
		})

		it( 'should show error message if NOT have selectableItems', ()=>{
			wrapper = mount(
				<PickerMasterView
					addButtonLabel="add item button"
					selectableItems={ [] }
					selectedItems={ [] }
					onDelete={ _item => jest.fn() }
					onMoveUp={ _item => jest.fn().mockReturnValue(_item) as unknown as ViewListItem<{}> }
					onMoveDown={ _item => jest.fn().mockReturnValue(_item) as unknown as ViewListItem<{}> }
					addItem={ _item => jest.fn() }
					emptySelectableItemsMessage={ <p className="danger">error</p> }
				>
					{(item: string ) => <h3>Child element value: {item}</h3>}
				</PickerMasterView>
			);
			expect( wrapper.find( 'p.danger' ) ).toExist();
		})

// 		it( 'should add a choosen item to the main panel when click on it', ()=> {
// 			addButton().simulate('click');
// 			pickerItems().at(1).simulate('click');
// 			wrapper= wrapper.update();
// 			expect( selectedList().find('li').length ).toBe( 1 );
// 			expect( selectedList().at(0).find( 'h3' ) ).toIncludeText( 'France' );
//
// 			pickerItems().at(0).simulate('click');
// 			expect( selectedList().length ).toBe( 2 );
// 			expect( selectedList().at(1).find( 'h3' ) ).toIncludeText( 'Andorra' );
// 		});
//
// 		it( 'should remove the clicked item from choose list', ()=> {
// 			addButton().simulate('click');
// 			expect( pickerItems().find( 'li' ).length ).toBe(5);
//
// 			pickerItems().find( 'li' ).at(0).simulate('click');
// 			expect( pickerItems().find( 'li' ).length ).toBe(4);
// 			expect( pickerItems().find( 'li' ).at(0) ).not.toIncludeText( 'Andorra' );
// 		});

	});

	// xdescribe( 'Delete Item', ()=>{
	// 	beforeEach(()=>{
	// 		addButton().simulate('click');
	// 		pickerItems().find( 'li' ).at(0).simulate('click');
	// 	});
	//
	// 	it( 'should delete item from main panel', ()=>{
	// 		expect( selectedList().length ).toBe( 1 );
	//
	// 		selectedList().at(0).find( '[data-icon="trash-alt"]' ).simulate( 'click' );
	// 		expect( selectedList().length ).toBe( 0 );
	// 	});
	//
	// 	it( 'should add item to pick list on delete from main panel', ()=>{
	// 		expect( pickerItems().find('li').length ).toBe(4)
	// 		selectedList().at(0).find( '[data-icon="trash-alt"]' ).simulate( 'click' );
	// 		expect( pickerItems().find('li').length ).toBe(5)
	// 	});
	//
	// 	it( 'should sort the pick list on delete from main panel', ()=>{
	// 		addButton().simulate('click');
	// 		pickerItems().find( 'li' ).at(3).simulate('click');
	// 		addButton().simulate('click');
	// 		pickerItems().find( 'li' ).at(0).simulate('click');
	// 		addButton().simulate('click');
	// 		pickerItems().find( 'li' ).at(1).simulate('click');
	//
	// 		selectedList().at(0).find( '[data-icon="trash-alt"]' ).simulate( 'click' );
	// 		selectedList().at(0).find( '[data-icon="trash-alt"]' ).simulate( 'click' );
	// 		selectedList().at(0).find( '[data-icon="trash-alt"]' ).simulate( 'click' );
	//
	// 		expect( pickerItems().find( 'li' ).at(0) ).toIncludeText('Andorra');
	// 		expect( pickerItems().find( 'li' ).at(1) ).toIncludeText('France');
	// 		expect( pickerItems().find( 'li' ).at(2) ).toIncludeText('Spain');
	// 		expect( pickerItems().find( 'li' ).at(3) ).toIncludeText('United Kingdom');
	// 	})
	// });

});
