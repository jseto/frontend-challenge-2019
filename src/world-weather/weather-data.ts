import { City } from "./city";

export class WeatherData {
	static apiKey = '04b1ffd8fc46ad9be74016c1ad44f636';

	static async get( city: City, location?: Coordinates ) {
		const lat = location? location.latitude : city.location.latitude;
		const lon = location? location.longitude : city.location.longitude;
		const resp = await fetch( `https://api.openweathermap.org/data/2.5/weather?APPID=${WeatherData.apiKey}&lat=${lat}&lon=${lon}` );
		const data: RespWeatherData = await resp.json();

		return city.setWeatherData({
			time: new Date(data.dt),
			temp: {
				current: data.main.temp,
				min: data.main.temp_min,
				max: data.main.temp_max
			},
			pressure: data.main.pressure,
			humidity: data.main.humidity,
			rain: data.rain? data.rain['1h'] : 0,
			wind: data.wind.speed,
			icon: data.weather[0].icon,
			weather: data.weather[0].main,
			description: data.weather[0].description
		});
	}

	static async getHourly( city: City, location?: Coordinates ) {
		const lat = location? location.latitude : city.location.latitude;
		const lon = location? location.longitude : city.location.longitude;
		const resp = await fetch( `https://api.openweathermap.org/data/2.5/forecast?APPID=${WeatherData.apiKey}&lat=${lat}&lon=${lon}` );
		const data: HourlyWeatherData = await resp.json();

		return city.setHourlyWeatherData( data.list.map( (item: ListData) =>{
			return {
				time: new Date( item.dt ),
				temp: {
					current: item.main.temp,
					min: item.main.temp_min,
					max: item.main.temp_max
				},
				pressure: item.main.pressure,
				humidity: item.main.humidity,
				rain: item.rain? item.rain['1h'] : 0,
				wind: item.wind.speed,
				icon: item.weather[0].icon,
				weather: item.weather[0].main,
				description: item.weather[0].description
			}
		}));
	}
}


// Generated by https://quicktype.io

interface HourlyWeatherData {
	cod:     string;
	message: number;
	cnt:     number;
	list:    ListData[];
	city:    CityW;
}

interface CityW {
	id:      number;
	name:    string;
	coord:   Coord;
	country: string;
}

interface Coord {
	lat: number;
	lon: number;
}

interface ListData {
	dt:      number;
	main:    Main;
	weather: WeatherElement[];
	clouds:  Clouds;
	wind:    Wind;
	sys:     SysList;
	dt_txt:  string;
	rain?:   Rain;
}

interface Clouds {
	all: number;
}

interface Main {
	temp:       number;
	humidity:   number;
	pressure:   number;
	temp_min:   number;
	temp_max:   number;
	sea_level?:  number;
	grnd_level?: number;
	temp_kf?:    number;
}

interface Rain {
	'1h'?: number;
	'3h'?: number;
}

interface SysList {
	pod: Pod;
}

enum Pod {
	D = "d",
	N = "n",
}

interface WeatherElement {
	id:          number;
	main:        MainEnum;
	description: Description;
	icon:        string;
}

enum Description {
	BrokenClouds = "broken clouds",
	ClearSky = "clear sky",
	FewClouds = "few clouds",
	LightRain = "light rain",
	OvercastClouds = "overcast clouds",
	ScatteredClouds = "scattered clouds",
}

enum MainEnum {
	Clear = "Clear",
	Clouds = "Clouds",
	Rain = "Rain",
}

interface Wind {
	speed: number;
	deg:   number;
}

// Generated by https://quicktype.io

export interface RespWeatherData {
	coord:   Coord;
	sys:     Sys;
	weather: Weather[];
	main:    Main;
	wind:    Wind;
	rain:    Rain;
	clouds:  Clouds;
	dt:      number;
	id:      number;
	name:    string;
	cod:     number;
}

interface Sys {
	country: string;
	sunrise: number;
	sunset:  number;
}

interface Weather {
	id:          number;
	main:        string;
	description: string;
	icon:        string;
}
