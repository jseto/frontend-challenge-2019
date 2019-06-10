import { h, render } from "preact";
import { WorldWeather } from "./world-weather/world-weather";
import { WorldWeatherController } from "./world-weather/world-weather-controller";
import { List } from "./utils/list";
import { MasterView, ViewListItem } from "./utils/frontend/master-detail-view/master-view";

let controller = new WorldWeatherController();

render(<WorldWeather controller={controller}/>, document.getElementsByTagName("WorldWeather").item(0));


let testData = new List<ViewListItem<number>>([
	{ key: 'a', label: 'a', object: 1 },
	{ key: 'b', label: 'b', object: 2 },
	{ key: 'c', label: 'c', object: 3 },
	{ key: 'd', label: 'd', object: 4 },
	{ key: 'e', label: 'e', object: 5 }
])

render(
	<MasterView
				listSource = { testData.items }
				onMoveUp = { item => testData.swap( item, -1 ) }
				onMoveDown = { item => testData.swap( item, 1 ) }
				onDelete = { item => testData.delete( item ) }
			>
				{ (n:number) => <p className="items-to-show">The number is {n}</p> }
			</MasterView>
, document.getElementsByTagName("MasterView").item(0));
