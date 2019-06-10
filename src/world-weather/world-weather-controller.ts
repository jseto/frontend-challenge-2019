import { City } from "./city";
import { List } from "../utils/list";

export class WorldWeatherController {
	get selectableCities(): City[] {
		return []
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
}
