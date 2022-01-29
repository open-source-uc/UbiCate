import { localStore } from './localStore';
import type { UserInfo } from './types';

function createUserStore() {
	const { set, subscribe } = localStore<UserInfo>('userData', null);

	const handleSet = (userInfoInput?: Record<string, any>) => {
		console.log(userInfoInput);

		if (!userInfoInput) {
			set(null);
			return;
		}

		// Parse DateTime values
		const userInfo = {
			...userInfoInput,
			exp: new Date(userInfoInput.exp * 1000),
			iat: new Date(userInfoInput.exp * 1000)
		} as UserInfo;

		// Check the remaining time of the token
		console.log(userInfo);
		const today = new Date();
		const difference = userInfo.exp.getTime() - today.getTime();
		console.log(difference);
		if (difference <= 0) {
			set(null);
			return;
		}

		// Save the user info
		set(userInfo);
		const logoutTimeout = setTimeout(() => set(null), difference);
		return () => clearTimeout(logoutTimeout);
	};

	console.log('1');

	return {
		subscribe,
		set: handleSet,
		close: () => handleSet(null)
	};
}

export const userSession = createUserStore();
