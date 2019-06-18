import { WorldWeather } from "../src/world-weather/world-weather";
import { MockPlacesAPI } from "./mocks/mock-places-api";
import { WorldWeatherController } from "../src/world-weather/world-weather-controller";
import { ReactWrapper } from "../types/enzyme";
import fetchMock = require("fetch-mock");
import * as mockeWeatherData from "./mocks/mock-weather-data.json"

describe('WorldWeather', ()=>{
	let wrapper: ReactWrapper;
	let controller: WorldWeatherController;
	let mockFindCity: jasmine.Spy;

	beforeEach(()=>{
		fetchMock.mock( '*', () => mockeWeatherData )
		controller = new WorldWeatherController( new MockPlacesAPI() );
		mockFindCity = spyOn( controller, 'findCity' ).and.callThrough();
		wrapper = mount(
			<WorldWeather controller={ controller }/>
		);
	})

	afterEach(fetchMock.reset);

	describe( 'Challenge features', ()=>{

		describe( 'Look for cities from suggestion', ()=>{

			it( 'should show a list of cities when partial name entered', async ()=>{
				wrapper.find('.search-box input').get(0).attributes['onInput']({ target: { value: 'ba' } })
				expect( mockFindCity ).toHaveBeenCalledWith('ba');
				await controller.findCity('ba')
				wrapper = wrapper.update();

				expect( controller.foundCities.length ).toBe( 5 );
			 	expect( wrapper.find('.search-box-panel li').length ).toBe( 5 );
			})
		})

		it( 'should list all city which user selected with currently average temperature data', async ()=>{
			await controller.findCity('ba')
			wrapper = wrapper.update();
			wrapper.find( '.search-box-panel li' ).at(0).simulate('click');
			await fetchMock.flush(true);
			wrapper = wrapper.update();

			expect( wrapper.find('.master-view li').at(0) ).toIncludeText( 'Bandung' );
			expect( wrapper.find('.master-view li').at(0) ).toIncludeText( '17º' );
		})

		xit( 'should let config the temperature unit system e.g. Kelvin, Fahrenheit, Celsius', ()=>{

		})

		it( 'should show datailed Weather info', async ()=>{
			await controller.findCity('ba')
			wrapper = wrapper.update();
			wrapper.find( '.search-box-panel li' ).at(0).simulate('click');
			await fetchMock.flush(true);
			wrapper = wrapper.update();

			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( '17º' /*Average temperature*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( 'Min: 15ºC Max: 20ºC' /*Min/Max temperature*/ );
			expect( wrapper.find('.city-view-detail img').get(0).attributes['src'] ).toContain( '04n' /*Weather icon*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( 'clouds' /*Weather main e.g. Rain Snow, Sunny*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( 'overcast clouds' /*Weather description*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( '7.31 m/s' /*Wind speed*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( '89%' /*Humidity*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( '1013 hPa' /*Pressure*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( '3 mm' /*Rain volume*/ );
			expect( wrapper.find('.city-view-detail').at(0) ).toIncludeText( '--' /*Showing 24 hours forecast*/ );
		})
	})
})
