import { hideElement } from "./dom";
import type { Action } from "./types";

const hideTabAll: Action = {
	do() {
		const tabs = document.querySelectorAll(".ChatFolders > .TabList > .Tab");
		for (const tab of tabs) {
			if (!(tab instanceof HTMLElement)) {
				continue;
			}
			if (!tab.textContent) {
				continue;
			}
			if (/All\d*/.test(tab.textContent)) {
				hideElement(tab);
			}
			return true;
		}
		return false;
	},
};

const switchToPersonalTabByDefault: Action = {
	do() {
		const tabs = document.querySelectorAll(".ChatFolders > .TabList > .Tab");
		for (const tab of tabs) {
			if (!tab.textContent) {
				continue;
			}
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
};

export const actions = [hideTabAll, switchToPersonalTabByDefault];
