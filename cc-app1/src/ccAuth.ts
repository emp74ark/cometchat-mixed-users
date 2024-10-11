import {
	CometChatUIKit,
	UIKitSettingsBuilder
} from '@cometchat/chat-uikit-react';
import { CometChat, CometChatException } from '@cometchat/chat-sdk-javascript';

export type ChatUser = { uid: string; name: string };

const chatLogin = async (userId: string) => {
	try {
		const cometUser = await CometChatUIKit.login(userId);
		console.info(`User ${cometUser.getName()} logged to the chat`);
		const CHAT_ALL_GUID = 'all';
		const commonGroup = await CometChat.getGroup(CHAT_ALL_GUID);
		if (!commonGroup.getHasJoined()) {
			await CometChat.joinGroup(commonGroup.getGuid());
		}
		return true;
	} catch (error) {
		const cometChatError = error as CometChatException;
		if (cometChatError.code === 'ERR_UID_NOT_FOUND') {
			console.info('User not found, new CometChat account will be created');
		} else {
			console.error('LOGIN ERROR', error);
		}
		return false;
	}
};

const chatSignup = async (user: ChatUser) => {
	try {
		const newUser = new CometChat.User({
			...user,
			withAuthToken: true
		});
		return await CometChatUIKit.createUser(newUser);
	} catch (error) {
		console.error('SIGNUP ERROR', error);
		return false;
	}
};

const chatLogout = async () => {
	try {
		const loggedUser = await CometChat.getLoggedinUser();
		if (loggedUser) {
			await CometChat.logout();
		}
	} catch (error) {
		console.error('LOGOUT ERROR', error);
	}
};

export const initChat = async () => {
	try {
		const uiKitSettings = new UIKitSettingsBuilder()
			.setAppId(import.meta.env.VITE_CHAT_APP_ID)
			.setRegion(import.meta.env.VITE_CHAT_REGION)
			.setAuthKey(import.meta.env.VITE_CHAT_AUTH_KEY)
			.subscribePresenceForAllUsers()
			.build();
		await CometChatUIKit.init(uiKitSettings);
		console.info('Chat started successfully');
	} catch (e) {
		console.error('CHAT INIT ERROR', e);
	}
};

export const startChat = async (user: ChatUser) => {
	console.info('CHAT START')
	try {
		await chatLogout(); // cleanup cache before login
		const login = await chatLogin(user.uid);
		if (!login) {
			const signup = await chatSignup(user);
			if (!signup) {
				console.error('Chat signup failed');
				return false;
			}
			await chatLogin(signup.getUid())
		}
		return true;
	} catch (error) {
		console.error('CHAT START ERROR', error);
		return false;
	}
};
