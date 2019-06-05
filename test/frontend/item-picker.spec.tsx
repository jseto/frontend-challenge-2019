import { ReactWrapper } from "../../types/enzyme";
import { ItemPicker } from "../../src/frontend/item-picker";
import fetchMock = require("fetch-mock");

describe('ItemPicker',()=>{
	let itemClicked = jest.fn();
	let wrapper: ReactWrapper;
	let map = {};
	fetchMock.mock('*', ()=>[] );

	beforeEach(()=>{
		window.addEventListener = jest.fn((event, cb) => {
  		map[event] = cb;
		});

		wrapper = mount(
			<ItemPicker
				label="TestPickupPanel"
				items={[
					{ key: '1', label:'test1' },
					{ key: '2', label:'test2' },
					{ key: '3', label:'test3' },
				]}
				onSelectItem={ itemClicked }
			>
			</ItemPicker>
		);
	});

	it( 'should show label only on start',()=>{
		expect( wrapper ).toIncludeText('TestPickupPanel');
		expect( wrapper.find('ul') ).toHaveClassName('hide');
	});

	describe( 'behaviour on button click', ()=>{
		beforeEach(()=>{
			wrapper.find('button').simulate('click');
		});

		afterEach(()=>{
			itemClicked.mockClear();
		});

		it( 'should show item options on click',()=>{
			expect( wrapper.find('ul') ).not.toHaveClassName('hide');
			expect( wrapper ).toIncludeText( 'test1' );
			expect( wrapper ).toIncludeText( 'test2' );
			expect( wrapper ).toIncludeText( 'test3' );
			expect( itemClicked ).not.toHaveBeenCalled();
		});

		describe( 'item options panel behaviour', ()=>{
			it( 'should hide item options on option click',()=>{
				wrapper.find( 'li' ).at(0).simulate('click');
				expect( wrapper.find('ul') ).toHaveClassName('hide');
			});

			it( 'should hide item options on panel click',()=>{
				wrapper.find( 'ul' ).simulate('click');
				expect( wrapper.find('ul') ).toHaveClassName('hide');
			});

			it( 'should hide item options on clicking outside of panel',()=>{
				map['click']({ target: document.body })
				wrapper.update();

				expect( wrapper.find('ul') ).toHaveClassName('hide');
			});

			it( 'should retrieve the clicked item', ()=>{
				wrapper.find( 'li' ).at(1).simulate('click');
				expect( itemClicked ).toHaveBeenCalledWith( { key: '2', label:'test2' } );
			})
		});

		describe( 'Error messages', ()=>{
			it( 'should not show error message if item list not empty', ()=>{
				wrapper = mount(
					<ItemPicker
						label="TestPickupPanel"
						items={[
							{ key: '1', label:'test1' },
							{ key: '2', label:'test2' },
							{ key: '3', label:'test3' },
						]}
						onSelectItem={ itemClicked }
						emptyItemsMessage={ <p className="danger">error</p>}
					>
					</ItemPicker>
				);
				expect( wrapper.find( 'p.danger' ) ).not.toExist();
			})

			it( 'should show error message if items list empty and emptyItemsMessage set', ()=>{
				wrapper = mount(
					<ItemPicker
						label="TestPickupPanel"
						items={[]}
						onSelectItem={ itemClicked }
						emptyItemsMessage={ <p className="danger">error</p> }
					>
					</ItemPicker>
				);
				expect( wrapper.find( 'p.danger' ) ).toExist();
			})
		})
	});
});
