import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { saveToLocalStore } from './localStore';
import type { UserInfo } from './types';

const checkRemainingSessionTime = (exp: Date) => {
	const today = new Date();
	const difference = exp.valueOf() - today.valueOf();
	return Math.max(0, difference)
}

const createUserStore = () => {
	const { set, subscribe } = writable<UserInfo>(null);
	const save = saveToLocalStore("userData")

	const handleSet = (userInfoInput?: Record<string, any>) => {

		if (!userInfoInput) {
			set(null);
			return;
		}

		// Parse DateTime values
		const userInfo = {
			...userInfoInput,
			exp: new Date(userInfoInput.exp),
			iat: new Date(userInfoInput.iat)
		} as UserInfo;

		// Check the remaining time of the token
		const remainingTime = checkRemainingSessionTime(userInfo.exp)
		if (remainingTime === 0) {
			set(null);
			return;
		}

		// Save the user info
		set(userInfo);
		save(userInfo);
		const logoutTimeout = setTimeout(() => set(null), remainingTime);
		return () => clearTimeout(logoutTimeout);
	};

	if (!browser) return

	const stored = localStorage.getItem('userData');
	if (stored !== null) handleSet(JSON.parse(stored));

	return {
		subscribe,
		set: handleSet,
		close: () => handleSet(null)
	};
}

export const userSession = createUserStore();
