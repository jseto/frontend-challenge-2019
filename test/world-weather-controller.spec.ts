import { WorldWeatherController } from "../src/world-weather/world-weather-controller";
import { MockPlacesAPI } from "./mocks/mock-places-api";
import fetchMock = require("fetch-mock");
import * as mockeWeatherData from "./mocks/mock-weather-data.json"

describe( 'World Weather Controller', ()=>{
	let controller: WorldWeatherController;
	let mockOnChange: jest.Mock<any, any>;

	beforeEach(()=>{
		fetchMock.mock('*',() => mockeWeatherData );
		mockOnChange = jest.fn();
		controller = new WorldWeatherController( new MockPlacesAPI() );
		controller.setOnChange( mockOnChange )
	})

	afterEach(fetchMock.reset);

	describe( 'Managing city search', ()=>{
		it( 'should store a list for cities searched with a patern', async ()=>{
			const cities = await controller.findCity('ba');
			expect( cities ).toEqual( controller.foundCities );
			expect( cities.length ).toBeTruthy();
		})
	})

	describe( 'Managing city in the list', ()=>{
		it( 'should add city', async ()=>{
			const cities = await controller.findCity('ba');
			mockOnChange.mockReset();
			await controller.addCity( cities[4] );

			expect( controller.selectedCities.length ).toBe(1);
			expect( controller.selectedCities[0].name ).toBe('Barcelona');
			expect( mockOnChange ).toHaveBeenCalledTimes( 1 );
		})

		it( 'should delecte city', async ()=>{
			const cities = await controller.findCity('ba');
			await controller.addCity( cities[0] );
			await controller.addCity( cities[1] );
			await controller.addCity( cities[2] );
			await controller.addCity( cities[3] );
			mockOnChange.mockReset();

			expect( controller.selectedCities.length ).toBe( 4 );
			controller.deleteCity( cities[1] );
			expect( controller.selectedCities.length ).toBe( 3 );
			expect( controller.selectedCities ).not.toContain( cities[1] );
			expect( mockOnChange ).toHaveBeenCalledTimes( 1 );
		})

		it( 'should arrange city', async ()=>{
			const cities = await controller.findCity('ba');
			await controller.addCity( cities[0] );
			await controller.addCity( cities[1] );
			await controller.addCity( cities[2] );
			await controller.addCity( cities[3] );
			await controller.addCity( cities[4] );
			mockOnChange.mockReset();

			expect( controller.selectedCities[3] ).toBe( cities[3] );
			controller.moveCity( cities[3], 1 )
			expect( controller.selectedCities[4] ).toBe( cities[3] );
			expect( mockOnChange ).toHaveBeenCalledTimes( 1 );
		})
	})

})
