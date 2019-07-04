import { WeatherState } from "../world-weather/city";

type Measure = 'speed' | 'temperature' | 'pressure' | 'length';

export class UnitConverter {

	static toCelsius( tempKelvin: number ) {
		return Math.round( tempKelvin - 272.15 );
	}

	static toFahrenheit( tempKelvin: number ) {
		return Math.round( tempKelvin * 9/5 - 459.67 );
	}

	static toMPH( speedMPS: number ) {
		return Math.round( speedMPS * 100 * 2.23693629 ) / 100;
	}

	static toInches( mm: number ) {
		return Math.round( mm * 1000 * 0.0393700787 ) / 1000;
	}

	static getConvertedMeasures( weatherData: WeatherState, imperialUnits: Boolean ) {
		let measures: WeatherState = {...weatherData };
		measures.wind = imperialUnits? UnitConverter.toMPH( weatherData.wind ) : weatherData.wind;

		measures.temp = {
			current: imperialUnits? UnitConverter.toFahrenheit( weatherData.temp.current ) : UnitConverter.toCelsius( weatherData.temp.current ),
			min: imperialUnits? UnitConverter.toFahrenheit( weatherData.temp.min ) : UnitConverter.toCelsius( weatherData.temp.min ),
			max: imperialUnits? UnitConverter.toFahrenheit( weatherData.temp.max ) : UnitConverter.toCelsius( weatherData.temp.max )
		};
		measures.rain = imperialUnits? UnitConverter.toInches( weatherData.rain ) : weatherData.rain;

		return measures;
	}

	static getMeasureUnit( measure: Measure, imperialUnits: Boolean ) {
		switch ( measure ) {
			case 'speed': return imperialUnits? 'mph' : 'm/s';
			case 'temperature': return imperialUnits? 'ºF' : 'ºC';
			case 'pressure': return 'hPa';
			case 'length': return imperialUnits? 'in' : 'mm';
		}
	}
}
