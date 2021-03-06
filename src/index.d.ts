declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

/**
 * An event that gets passed to the {@link PanelDefinition.show} show function.
 */
declare interface ShowPanelEvent extends Event {
	/**
	 * the node to which the panel gets inserted
	 */
	readonly node: Node;
}

/**
 * A definition for a panel
 */
declare interface PanelDefinition {
	show: (event: ShowPanelEvent) => void;
	update: () => void;
}
