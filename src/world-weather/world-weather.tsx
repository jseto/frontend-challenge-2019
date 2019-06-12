import { h, Component } from "preact";
import { WorldWeatherController } from "./world-weather-controller";
import { City } from "./city";
import { MasterView, ViewListItem } from "../utils/frontend/master-detail-view/master-view";
import { SearchBox } from "../utils/frontend/search-box";

export interface WorldWeatherProps {
	controller: WorldWeatherController;
}

export class WorldWeather extends Component<WorldWeatherProps> {
	constructor( props: WorldWeatherProps ) {
		super( props );
		props.controller.setOnChange( ()=> this.setState({}) );
	}

  render() {

		const controller = this.props.controller;

    return (
			<div className="world-weather">
				<SearchBox
					onSelect={ ( item: ViewListItem<City> ) => controller.addCity( item.object ) }
					onInput={ value => controller.findCity( value ) }
					items={ controller.foundCities.map( city => ({
						key: city.name,
						label: city.placeName,
						object: city
					})) }
				>
				</SearchBox>

				<MasterView
					listSource={ controller.selectedCities.map(
						city => ({ key: city.name, label: city.name, object: city })
					)}
					onDelete={ item => controller.deleteCity( item.object ) }
					onMoveUp={ item => this.move( item, -1 ) }
					onMoveDown={ item => this.move( item, 1 ) }
					>
				</MasterView>
			</div>
		);
  }

	move( item: ViewListItem<City>, distance: number ): ViewListItem<City> {
	const replacedCity = this.props.controller.moveCity( item.object, distance )
	if ( replacedCity )
		return {
			key: replacedCity.code,
			label: replacedCity.name,
			object: replacedCity
		}
	}

}
