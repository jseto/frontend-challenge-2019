export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface WeatherState {
	temp: {
		current: number;
		min: number;
		max: number;
	};
	icon: string;
	weather: string;
	description: string;
	wind: number;
	humidity: number;
	pressure: number;
	rain: number;
	time: Date;
}

type Measure = 'speed' | 'temperature' | 'pressure' | 'length';

export class City {

	setCode( code: string ) {
		this._code = code;
		return this;
	}

	get code() {
		return this._code
	}

	setName( name: string ) {
		this._name = name;
		return this;
	}

	get name() {
		return this._name;
	}

	setPlaceName( name: string ) {
		this._placeName = name;
		return this;
	}

	get placeName() {
		return this._placeName;
	}

	setLocation( value: Coordinates ) {
		this._location = value;
		return this;
	}

	get location() {
		return this._location;
	}

	setWeatherData( data: WeatherState ) {
		this._weatherData = {...data};
		return this;
	}

	get weatherData() {
		return this._weatherData;
	}

	setHourlyWeatherData( data: WeatherState[] ) {
		this._hourlyWeatherData = [...data];
		return this;
	}

	get hourlyWeatherData() {
		return this._hourlyWeatherData;
	}

	localeTemp( temp?: number ) {
		const t = temp? temp : this.weatherData.temp.current;
		return Math.round( t - 272.15 );
	}

	getMeasureUnit( measure: Measure ) {
		switch ( measure ) {
			case 'speed': return 'm/s';
			case 'temperature': return 'ºC';
			case 'pressure': return 'hPa';
			case 'length': return 'mm';
		}
	}

	private _code: string;
	private _name: string;
	private _placeName: string;
	private _location: Coordinates;
	private _weatherData: WeatherState;
	private _hourlyWeatherData: WeatherState[];
}
