import { City } from "./city";
import { List } from "../utils/list";
import { PlacesAPI } from "../places-apis/places-api";

export class WorldWeatherController {
	constructor( placesAPI: PlacesAPI ) {
		this._selectedCitiesList = new List<City>();
		this._placesAPI = placesAPI;
	}

	findCity( partialName: string ): Promise<City[]> {
		return this._placesAPI.getCities( partialName, 5 );
	}

	get selectedCities(): City[] {
		return this._selectedCitiesList.items;
	}

	addCity( city: City ) {
		this._selectedCitiesList.push( city );
	}

	deleteCity( city: City ) {
		this._selectedCitiesList.delete( city );
	}

	moveCity( city: City, distance: number ) {
		return this._selectedCitiesList.swap( city, distance );
	}

	private _selectedCitiesList: List<City>;
	private _placesAPI: PlacesAPI;
}
