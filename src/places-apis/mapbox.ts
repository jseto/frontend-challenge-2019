import { PlacesAPI } from "./places-api";
import { City } from "../world-weather/city";

export class Mapbox implements PlacesAPI {
	getCities( partialName: string, limit?: number ): Promise<City[]> {
		let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${partialName}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&cachebuster=1560237075230&autocomplete=true&types=place`
		if ( limit ) {
			url += `&limit=${limit}`;
		}

		return new Promise( resolve => {
			fetch( url ).then( async response => {
				const data = await response.json();
				let cities = [];
				data.features.forEach( (feature: any) => {

					cities.push(
						new City()
							.setName( feature.text )
							.setPlaceName( feature.place_name )
							.setLocation({
								latitude: feature.center[1],
								longitude: feature.center[0]
							})
					);

				})
				resolve( cities );
			})
		})
	}
}

PlacesAPI.registerAPI( 'mapbox', new Mapbox() );
