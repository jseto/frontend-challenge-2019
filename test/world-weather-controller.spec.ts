import { WorldWeatherController } from "../src/world-weather/world-weather-controller";
import { MockPlacesAPI } from "./mocks/mock-places-api";

describe( 'World Weather Controller', ()=>{
	let controller: WorldWeatherController;

	beforeEach(()=>{
		controller = new WorldWeatherController( new MockPlacesAPI() );
	})


	describe( 'Managing city in the list', ()=>{
		it( 'should add city', async ()=>{
			const cities = await controller.findCity('ba');
			controller.addCity( cities[4] );

			expect( controller.selectedCities.length ).toBe(1);
			expect( controller.selectedCities[0].name ).toBe('Barcelona')
		})

		it( 'should delecte city', async ()=>{
			const cities = await controller.findCity('ba');
			controller.addCity( cities[0] );
			controller.addCity( cities[1] );
			controller.addCity( cities[2] );
			controller.addCity( cities[3] );

			expect( controller.selectedCities.length ).toBe( 4 );
			controller.deleteCity( cities[1] );
			expect( controller.selectedCities.length ).toBe( 3 );
			expect( controller.selectedCities ).not.toContain( cities[1] );
		})

		it( 'should arrange city', async ()=>{
			const cities = await controller.findCity('ba');
			controller.addCity( cities[0] );
			controller.addCity( cities[1] );
			controller.addCity( cities[2] );
			controller.addCity( cities[3] );
			controller.addCity( cities[4] );

			expect( controller.selectedCities[3] ).toBe( cities[3] );
			controller.moveCity( cities[3], 1 )
			expect( controller.selectedCities[4] ).toBe( cities[3] );
		})
	})

})
