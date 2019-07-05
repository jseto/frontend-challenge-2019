import { h, Component } from "preact";
import { WorldWeatherController } from "./world-weather-controller";
import { City } from "./city";
import { MasterView, ViewListItem } from "../utils/frontend/master-detail-view/master-view";
import { SearchBox } from "../utils/frontend/search-box";
import { CityView } from "./city-view";

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
				<div className="flex-box">
					<div style="flex-grow:1;"></div>
					<div style="flex-grow:1;">
						<div className="flex-box vertical-margin-half">
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
							<button
								className="units-button flex-vertical-center align-center"
								onClick={ () => {
									controller.imperialUnits = !controller.imperialUnits;
									this.setState({});
									console.log( controller.imperialUnits )
								} }
							>
								<p>Units</p><p>{ controller.imperialUnits? 'ºF' : 'ºC' }</p>
							</button>
						</div>

						<MasterView
							listSource={ controller.selectedCities.map(
								city => ({ key: city.name, label: city.name, object: city })
							)}
							onDelete={ item => controller.deleteCity( item.object ) }
							onMoveUp={ item => this.move( item, -1 ) }
							onMoveDown={ item => this.move( item, 1 ) }
							>
							{
								( city: City, active: boolean, activateClick: () => void ) => {
									return (
										<CityView
											city={city}
											active={active}
											activatePanel={activateClick}
											units={ controller.imperialUnits? 'imperial' : 'international' }
										>
										</CityView>
									);
								}
							}
						</MasterView>
					</div>
					<div style="flex-grow:1;"></div>
				</div>
			</div>
		);
  }

	move( item: ViewListItem<City>, distance: number ): ViewListItem<City> {
		const replacedCity = this.props.controller.moveCity( item.object, distance )
		if ( replacedCity ) {
			return {
				key: replacedCity.name,
				label: replacedCity.placeName,
				object: replacedCity
			}
		}
	}
}
