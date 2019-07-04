import { Component } from "preact";

export interface AnimatedPanelProps {
	active?: boolean;
	queryUpdateContentHeight?: ()=>void;
}

export interface AnimatedPanelState {
	scrollHeight: number;
}

export abstract class AnimatedPanel< P extends AnimatedPanelProps > extends Component< P, AnimatedPanelState > {

		componentDidUpdate() {
			this.updateContentPanelHeight();
			// Delayed execution to wait for css animation
			setTimeout( ()=>this.props.queryUpdateContentHeight && this.props.queryUpdateContentHeight(), 300 );
		}

		protected getAccordionPanelHeight() {
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
