const hideTabAll = {
	do() {
		const tab = document.querySelector(
			".ChatFolders > .TabList > .Tab:first-child",
		);
		if (!tab) {
			return false;
		}
		if (/All\d*/.test(tab.textContent)) {
			hideElement(tab);
		}
		return true;
	},
	repeat: false,
};

const switchToPersonalTabByDefault = {
	do() {
		const tabs = document.querySelectorAll(".ChatFolders > .TabList > .Tab");
		for (const tab of tabs) {
			if (!/Personal\d*/.test(tab.textContent)) {
				continue;
			}
			tab.dispatchEvent(
				new MouseEvent("mousedown", {
					bubbles: true,
					cancelable: true,
				}),
			);
			return true;
		}
		return false;
	},
	repeat: false,
};

const actions = [hideTabAll, switchToPersonalTabByDefault];

let pendingActions = actions;

const observer = new MutationObserver(() => {
	const toStopObserving = [];
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

observer.observe(document.body, {
	childList: true,
	subtree: true,
});

function hideElement(element) {
	element.style.display = "none";
}
