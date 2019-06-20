import { h, Component } from "preact";
import { City, WeatherState } from "./city";

export interface CityViewProps {
	city: City;
	active?: boolean;
	activatePanel?: () => void;
	queryUpdateContentHeight?: ()=>void;
}

export interface ControllerPanelState {
	scrollHeight: number;
}

export class CityView extends Component<CityViewProps, ControllerPanelState> {
	render() {
		const city = this.props.city;
		const tempSym = city.getMeasureUnit( 'temperature' );

		return (
			<div className="city-view">
				<div className="accordion-header flex-box">
					<div  className="header-city-name clickable" onClick={ ()=>this.props.activatePanel() }>
						<h2>{city.name}</h2>
					</div>
					<div className="heder-data">
						<img src={`http://openweathermap.org/img/w/${city.weatherData.icon}.png`}></img>
					</div>
					<div className="header-data dim-color">
						<h3>{city.localeTemp()}{tempSym}</h3>
					</div>
				</div>
				<div className="panel-content accordion-panel" style={ { maxHeight: this.getAccordionPanelHeight() } }>
					{ this.renderContent() }
				</div>
			</div>
		);
	}

	private renderContent() {
		const city = this.props.city;
		const tempSym = city.getMeasureUnit( 'temperature' );
		const windSym = city.getMeasureUnit( 'speed' );
		const presSym = city.getMeasureUnit( 'pressure' );
		const rainSym = city.getMeasureUnit( 'length' );

		return (
			<div className="city-view-detail flex-box">
				<div style="flex-grow: 1"></div>
				<div style="flex-grow: 1">
					<div className="flex-box vertical-flex">
						<p>Min: {city.localeTemp( city.weatherData.temp.min )}{tempSym} Max: {city.localeTemp( city.weatherData.temp.max )}{tempSym}</p>
						<h1>{city.localeTemp()}{tempSym}</h1>
						<img src={`http://openweathermap.org/img/w/${city.weatherData.icon}.png`} width="50px"></img>
						<h3>{city.weatherData.weather}</h3>
						<p>{city.weatherData.description}</p>
					</div>
					<div className="weather-details">
						<p>Wind: {city.weatherData.wind} {windSym}</p>
						<p>Pressure: {city.weatherData.pressure} {presSym}</p>
						<p>Humidity: {city.weatherData.humidity}%</p>
						<p>Rain: {city.weatherData.rain} {rainSym}</p>
					</div>
					<div className="flex-box">
						{ city.hourlyWeatherData.slice( 0, 8 ).map( item => this.renderHourlyData( item ) ) }
					</div>
				</div>
				<div style="flex-grow: 1"></div>
			</div>
		);
	}

	private renderHourlyData( data: WeatherState ):JSX.Element {
		const city = this.props.city;

		return (
			<div className="hourly-data">
				<p>{data.time.getHours()}:00</p>
				<img src={`http://openweathermap.org/img/w/${data.icon}.png`}></img>
				<p>{city.localeTemp( data.temp.current )}{city.getMeasureUnit('temperature')}</p>
			</div>
		);
	}

	componentDidUpdate() {
		this.updateContentPanelHeight();
		// Delayed execution to wait for css animation
		setTimeout( ()=>this.props.queryUpdateContentHeight && this.props.queryUpdateContentHeight(), 300 );
	}

	private getAccordionPanelHeight() {
		return this.props.active? this.state.scrollHeight + 'px' : null;
	}

	updateContentPanelHeight() {
		const newHeight = this.getContentPanelHeight() + 900; //900 is an arbritary number near to the height of screen so it repaints the entire screen. Afeter that, on delayed update parent it will set the proper height
		if ( newHeight !== this.state.scrollHeight ) {
			this.setState({ scrollHeight: newHeight })
		}
	}

	private getContentPanelHeight(): number {
		const panelContent = this.base.getElementsByClassName('panel-content');
		return panelContent.length && panelContent.item(0).scrollHeight;
	};


}
