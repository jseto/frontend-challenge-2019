import { h, Component } from "preact";
import { City } from "./city";

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
				<div className="accordion-header">
					<div  className="inline-middle half-width clickable" onClick={ ()=>this.props.activatePanel() }>
						<h2>{city.name}</h2>
					</div>
					<div className="inline-middle align-right half-width dim-color stay-length">
						<img src={`http://openweathermap.org/img/w/${city.weatherData.icon}.png`}></img>
						<span>{city.localeTemp()}{tempSym}</span>
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
			<div className="city-view-detail">
				<p>Min: {city.localeTemp( city.weatherData.temp.min )}{tempSym} Max: {city.localeTemp( city.weatherData.temp.max )}{tempSym}</p>
				<h1>{city.localeTemp()}{tempSym}</h1>
				<img src={`http://openweathermap.org/img/w/${city.weatherData.icon}.png`}></img>
				<h3>{city.weatherData.weather}</h3>
				<p>{city.weatherData.description}</p>
				<div>
					<span>Wind: </span><span>{city.weatherData.wind} {windSym}</span>
					<span>Pressure: </span><span>{city.weatherData.pressure} {presSym}</span>
					<span>Humidity: </span><span>{city.weatherData.humidity}%</span>
					<span>Rain: </span><span>{city.weatherData.rain} {rainSym}</span>
				</div>
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
