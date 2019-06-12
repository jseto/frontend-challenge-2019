import { PlacesAPI } from "../../src/places-apis/places-api";
import { City } from "../../src/world-weather/city";

export class MockPlacesAPI extends PlacesAPI {
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
