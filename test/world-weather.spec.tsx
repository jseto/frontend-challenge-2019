import { WorldWeather } from "../src/world-weather/world-weather";
import { MockPlacesAPI } from "./mocks/mock-places-api";
import { WorldWeatherController } from "../src/world-weather/world-weather-controller";
import { ReactWrapper } from "../types/enzyme";

describe('WorldWeather', ()=>{
	let wrapper: ReactWrapper;
	let controller: WorldWeatherController;
	const dataList = () => wrapper.find('.data-list');
	const dataListItems = () => dataList().find('options');

	beforeEach(()=>{
		controller = new WorldWeatherController( new MockPlacesAPI() );
		wrapper = mount(
			<WorldWeather controller={ controller }/>
		);
	})

	describe( 'Challenge features', ()=>{

		describe( 'Look for cities from suggestion', ()=>{

			xit( 'should show a list of cities when partial name entered', ()=>{
				dataList().find('input').get(0).attributes['onInput']({ target: { value: '2019-09-15' } })

			 	expect( dataListItems().length ).toBe( 5 );
			})
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
	})
})
