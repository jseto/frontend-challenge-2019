import { MasterView, ViewListItem } from "../../../src/utils/frontend/master-detail-view/master-view";
import { List } from "../../../src/utils/list";
import { ReactWrapper } from "../../../types/enzyme";


describe( 'Master View Detail View', ()=>{
	let wrapper: ReactWrapper;
	let testData: List<ViewListItem<number>>;
	let deleteHdl: jest.Mock<ViewListItem<number>, [any]>;
	const itemsToShow = ()=>wrapper.find('.items-to-show');
	const detailView = ()=>wrapper.find( '.detail-view' );

	beforeEach(()=>{
		testData = new List<ViewListItem<number>>([
			{ key: 'a', label: 'a', object: 1 },
			{ key: 'b', label: 'b', object: 2 },
			{ key: 'c', label: 'c', object: 3 },
			{ key: 'd', label: 'd', object: 4 },
			{ key: 'e', label: 'e', object: 5 }
		])

		deleteHdl = jest.fn( item => testData.delete( item ) );

		wrapper = mount(
			<MasterView
				listSource = { testData.items }
				onMoveUp = { item => testData.swap( item, -1 ) }
				onMoveDown = { item => testData.swap( item, 1 ) }
				onDelete = { deleteHdl }
			>
				{ (n:number) => <p className="items-to-show">The number is {n}</p> }
			</MasterView>
		)
	});

	it( 'should show items in listSource', ()=>{
		expect( itemsToShow().length ).toEqual( 5 );
		expect( itemsToShow().at(0) ).toHaveText( 'The number is 1' );
		expect( itemsToShow().at(1) ).toHaveText( 'The number is 2' );
		expect( itemsToShow().at(2) ).toHaveText( 'The number is 3' );
		expect( itemsToShow().at(3) ).toHaveText( 'The number is 4' );
		expect( itemsToShow().at(4) ).toHaveText( 'The number is 5' );
	});

	describe( 'Delete operations',()=>{
		it( 'should delete first item', ()=>{
			detailView().at(0).find('.trash-bin-icon').childAt(0).simulate('click');

			expect( deleteHdl ).toHaveBeenCalled();
			expect( testData.length ).toBe( 4 );
			expect( itemsToShow().length ).toBe( 4 );
			expect( itemsToShow().at(0) ).toHaveText( 'The number is 2' );
		})

		it( 'should delete last item', ()=>{
			detailView().at(4).find('.trash-bin-icon').childAt(0).simulate('click');

			expect( itemsToShow().length ).toBe( 4 );
			expect( itemsToShow().at(3) ).toHaveText( 'The number is 4' );
		})

		it( 'should delete central item', ()=>{
			detailView().at(2).find('.trash-bin-icon').childAt(0).simulate('click');

			expect( itemsToShow().length ).toBe( 4 );
			expect( itemsToShow().at(2) ).not.toHaveText( 'The number is 3' );
		})
	});

	describe( 'Move items', ()=>{
		it( 'should show up down text in central items', ()=>{
			expect( detailView().at(1).find('.up-button') ).not.toHaveClassName( 'hide' );
			expect( detailView().at(1).find('.down-button') ).not.toHaveClassName( 'hide' );
		})

		it( 'should NOT show up text in first item', ()=>{
			expect( detailView().at(0).find('.up-button') ).toHaveClassName( 'hide' );
			expect( detailView().at(0).find('.down-button') ).not.toHaveClassName( 'hide' );
		})

		it( 'should NOT show down text in first item', ()=>{
			expect( detailView().at(4).find('.up-button') ).not.toHaveClassName( 'hide' );
			expect( detailView().at(4).find('.down-button') ).toHaveClassName( 'hide' );
		})

		it('should move down a item', ()=>{
			detailView().at(0).find('.down-button').simulate('click');

			expect( itemsToShow().at(0) ).toHaveText( 'The number is 2' );
			expect( itemsToShow().at(1) ).toHaveText( 'The number is 1' );
		})

		it('should move up a item', ()=>{
			detailView().at(4).find('.up-button').simulate('click');

			expect( itemsToShow().at(4) ).toHaveText( 'The number is 4' );
			expect( itemsToShow().at(3) ).toHaveText( 'The number is 5' );
		})
	})

})
