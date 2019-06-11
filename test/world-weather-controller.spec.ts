import { WorldWeatherController } from "../src/world-weather/world-weather-controller";
import { City } from "../src/world-weather/city";
import { PlacesAPI } from "../src/places-apis/places-api";

class MockPlacesAPI extends PlacesAPI {
	getCities( _partialName: string, _limit?: number ): Promise<City[]> {
		return new Promise<City[]>( resolve => {
			resolve([
				new City().setName('Bandung').setPlaceName('Bandung, Jawa Barat, Indonesia').setLocation({ latitude: -6.95, longitude: 107.56667}),
				new City().setName('Bangkok').setPlaceName('Bangkok, Bangkok Metropolis, Thailand').setLocation({ latitude: 13.75, longitude: 100.51667}),
				new City().setName('Bandung').setPlaceName('Badung, Bali, Indonesia').setLocation({ latitude: -8.58333, longitude: 115.18333}),
				new City().setName('Bandar Lampung').setPlaceName('Bandar Lampung, Lampung, Indonesia').setLocation({ latitude: -5.42944, longitude: 105.2625}),
				new City().setName('Barcelona').setPlaceName('Barcelona, Barcelona, Spain').setLocation({ latitude: 41.3825, longitude: 2.17694}),
			])
		})
	}
}

describe( 'World Weather Controller', ()=>{
	let controller: WorldWeatherController;

	beforeEach(()=>{
		controller = new WorldWeatherController( new MockPlacesAPI() );
	})

	describe( 'Challenge features', ()=>{
		it( 'should look for cities from suggestion', async ()=>{
			const cityList = await controller.findCity( 'ba' );
			 expect( cityList.length ).toBe( 5 );
		})

		xit( 'should list all city which user selected with currently average temperature data', ()=>{

		})

		xit( 'should let config the temperature unit system e.g. Kelvin, Fahrenheit, Celsius', ()=>{

		})

		xit( 'should show datailed Weather info', ()=>{
		// Average temperature.
		// Min/Max temperature.
		// Weather icon.
		// Weather main e.g. Rain Snow, Sunny.
		// Weather description.
		// Wind speed.
		// Humidity.
		// Pressure.
		// Rain volume.
		// Showing 24 hours forecast.
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

	});


})
