import type { Action } from "./types";

export interface ActionRunner {
	start(): void;
	stop(): void;
}

export function createActionRunner(actions: Action[]): ActionRunner {
	let pendingActions: Action[] = actions;

	const observer = new MutationObserver(() => {
		const toStopObserving: Action[] = [];

		for (const action of pendingActions) {
			const success = action.do();
			if (!success) {
				continue;
			}
			if (!action.repeat) {
				toStopObserving.push(action);
			}
		}

		if (toStopObserving.length > 0) {
			pendingActions = pendingActions.filter(
				(el) => !toStopObserving.includes(el),
			);
		}

		toStopObserving.length = 0;
	});

	return {
		start() {
			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		},
		stop() {
			observer.disconnect();
		},
	};
}
