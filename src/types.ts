export interface Action {
	do(): boolean;

	/**
	 * @default false
	 */
	repeat?: boolean;
}
