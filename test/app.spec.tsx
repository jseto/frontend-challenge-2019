import { WorldWeather } from '../src/app';

describe( 'App unit tests', ()=>{
	it( 'should retrieve a string to write', ()=>{
		let app = new WorldWeather({name:'pep'});
		expect( app.stringToWrite() ).toEqual( 'Hello world' );
	});
});

describe( 'App e2e tests', ()=>{
		const wrapper = mount( <WorldWeather name='pep'/> );

	it( 'should show a string', ()=>{
		expect( wrapper.find( WorldWeather ) ).toHaveLength(1);
		expect( wrapper.find( WorldWeather ) ).toHaveText( 'Hello props: pep state: pep' );
	});
});
