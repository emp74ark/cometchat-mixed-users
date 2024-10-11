import style from './CcUserItem.module.css';

export const CcUserItem = ({ user }: { user: CometChat.User }) => {
	return (
		<div className={style.container}>
			<span>{user.getName()}</span>
			<span>{user.getUid()}</span>
		</div>
	);
};
