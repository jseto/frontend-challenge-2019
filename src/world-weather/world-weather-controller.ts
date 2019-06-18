import { City } from "./city";
import { List } from "../utils/list";
import { PlacesAPI } from "../places-apis/places-api";
import { WeatherData } from "./weather-data";

export class WorldWeatherController {
	constructor( placesAPI: PlacesAPI ) {
		this._selectedCitiesList = new List<City>();
		this._foundCities = [];
		this._placesAPI = placesAPI;
	}

	async findCity( partialName: string ): Promise<City[]> {
		return new Promise( resolve => this._placesAPI.getCities( partialName, 5 )
			.then( cities => {
				this._foundCities = [...cities];
				this.notifyChange();
				resolve( cities );
			})
		)
	}

	get foundCities() {
		return this._foundCities;
	}

	get selectedCities(): City[] {
		return this._selectedCitiesList.items;
	}

	async addCity( city: City ) {
		city = await WeatherData.get( city );
		city = await WeatherData.getHourly( city );
		this._selectedCitiesList.push( city );
		this.notifyChange();
	}

	deleteCity( city: City ) {
		this._selectedCitiesList.delete( city );
		this.notifyChange();
	}

	moveCity( city: City, distance: number ) {
		const moved = this._selectedCitiesList.swap( city, distance );
		this.notifyChange();
		return moved;
	}

	setOnChange( cb: ()=>void ) {
		this._onChange = cb;
		return this;
	}

	private notifyChange() {
		if ( this._onChange ) this._onChange();
	}

	private _selectedCitiesList: List<City>;
	private _placesAPI: PlacesAPI;
	private _foundCities: City[];
	private _onChange: ()=>void;
}
