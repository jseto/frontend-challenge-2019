import { Component } from "preact";

export interface AnimatedPanelProps {
	active?: boolean;
}

export interface AnimatedPanelState {
	scrollHeight: number;
}

/**
 * Controls the panel height on an animated height panel activation component
 * If you want your panel to activate with animated heigh, just extend your component
 * from this class
 * @params props 	active whether the panel is in active setState
 */
export abstract class AnimatedPanel< P extends AnimatedPanelProps > extends Component< P, AnimatedPanelState > {

		componentDidUpdate() {
			this.updateContentPanelHeight();
		}

		/**
		 * Calculates the panel heigh.
		 * It gets the style to apply to maxHeight according to the panel state
		 * @return the panel heigh if active, null otherwise
		 */
		protected getAnimatedPanelHeight() {
			return this.props.active? this.state.scrollHeight + 'px' : null;
		}

		private updateContentPanelHeight() {
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
