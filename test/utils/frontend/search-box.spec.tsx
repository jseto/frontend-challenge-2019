import { ReactWrapper } from "../../../types/enzyme";
import { SearchBox } from "../../../src/utils/frontend/search-box";

describe( 'Data List', ()=>{
	let wrapper: ReactWrapper;
	let map = {};
	let onSelect: jest.Mock<any, any>;
	let onInput: jest.Mock<any, any>;
	const data = [
		{ key: 'a', label: 'Aberdin', object: 1 },
		{ key: 'b', label: 'Barcelona', object: 2 },
		{ key: 'c', label: 'Cologne', object: 3 },
		{ key: 'd', label: 'Dever', object: 4 },
		{ key: 'e', label: 'Edinburg', object: 5 }
	];

	beforeEach(()=>{
		window.addEventListener = jest.fn((event, cb) => {
  		map[event] = cb;
		});

		onSelect = jest.fn();
		onInput = jest.fn();

		wrapper = mount(
				<SearchBox
					onSelect={ item => onSelect( item ) }
					onInput={ value => onInput( value ) }
					items={ data }
				>
				</SearchBox>
		);
	})

	it( 'should open options panel on writting', ()=>{
		expect( wrapper.find('.search-box-panel') ).toHaveClassName( 'hide' );
		wrapper.find('input').get(0).attributes['onInput']({ target: { value: 'a' } });
		wrapper = wrapper.update();

		expect( wrapper.find('.search-box-panel') ).not.toHaveClassName( 'hide' );
	})

	it( 'should notify on writting', ()=>{
		wrapper.find('input').get(0).attributes['onInput']({ target: { value: 'a' } });

		expect( onInput ).toHaveBeenCalledWith( 'a' );
	})


	it( 'should close options panel on selected', ()=>{
		wrapper.find('input').get(0).attributes['onInput']({ target: { value: 'a' } });
		wrapper = wrapper.update();
		expect( wrapper.find('.search-box-panel') ).not.toHaveClassName( 'hide' );
		wrapper.find('li').at(0).simulate('click');

		expect( wrapper.find('.search-box-panel') ).toHaveClassName( 'hide' );
	})

	it( 'should clear value on selected', ()=>{
		wrapper.find('input').get(0).attributes['onInput']({ target: { value: 'a' } });
		wrapper.find('li').at(0).simulate('click');

		expect( wrapper ).toHaveState( 'value', '' );
	})

	it( 'should close panel on outside click', ()=>{
		wrapper.find('input').get(0).attributes['onInput']({ target: { value: 'a' } });
		map['click']({ target: document.body })
		wrapper.update();

		expect( wrapper.find('.search-box-panel') ).toHaveClassName( 'hide' );
	})

	it( 'should notify when item clicked', ()=>{
		wrapper.find('input').get(0).attributes['onInput']({ target: { value: 'a' } });
		wrapper.find('li').at(0).simulate('click');

		expect( onSelect ).toHaveBeenCalledWith( data[0] )
	})
})
