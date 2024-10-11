import { CometChatUsers } from '@cometchat/chat-uikit-react';
import { CcUserItem } from '../CcUserItem/CcUserItem.tsx';

export const CcUsers = ({ refreshKey }: { refreshKey: number }) => {
	return (
		<CometChatUsers
			key={refreshKey}
			title=''
			hideSearch={true}
			listItemView={user => <CcUserItem user={user} />}
		/>
	);
};
