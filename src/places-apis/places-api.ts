import { City } from "../world-weather/city";

interface APIRegistry {
	[ name: string ]: PlacesAPI;
}

export abstract class PlacesAPI {
  abstract getCities( partialName: string, limit?: number ): Promise<City[]>;

	static registerAPI( name: string, instance: PlacesAPI ) {
		PlacesAPI.apis[ name ] = instance;
	}

	static getAPI( name: string ) {
		return PlacesAPI.apis[name];
	}

	private static apis: APIRegistry;
}
