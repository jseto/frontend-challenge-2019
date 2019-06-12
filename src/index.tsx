import "../scss/main.scss";
import { h, render } from "preact";
import { WorldWeather } from "./world-weather/world-weather";
import { WorldWeatherController } from "./world-weather/world-weather-controller";
import { Mapbox } from "./places-apis/mapbox";

let controller = new WorldWeatherController( new Mapbox() );

render(<WorldWeather controller={controller}/>, document.getElementsByTagName("WorldWeather").item(0));


// import { List } from "./utils/list";
// import { MasterView, ViewListItem } from "./utils/frontend/master-detail-view/master-view";
// import { SearchBox } from "./utils/frontend/search-box";
// let testData = new List<ViewListItem<number>>([
// 	{ key: 'a', label: 'Aberdin', object: 1 },
// 	{ key: 'b', label: 'Barcelona', object: 2 },
// 	{ key: 'c', label: 'Cologne', object: 3 },
// 	{ key: 'd', label: 'Dever', object: 4 },
// 	{ key: 'e', label: 'Edinburg', object: 5 }
// ])
//
// render(
// 	<SearchBox
// 		items={ testData.items }
// 		onSelect={item => console.log('selected ', item.label)}
// 	>
// 	</SearchBox>
// , document.getElementsByTagName("SearchBox").item(0));
//
// render(
// 	<MasterView
// 				listSource = { testData.items }
// 				onMoveUp = { item => testData.swap( item, -1 ) }
// 				onMoveDown = { item => testData.swap( item, 1 ) }
// 				onDelete = { item => testData.delete( item ) }
// 			>
// 				{ (n:number) => <p className="items-to-show">The number is {n}</p> }
// 			</MasterView>
// , document.getElementsByTagName("MasterView").item(0));
