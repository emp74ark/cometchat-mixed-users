import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import style from './CcForm.module.css';
import { startChat } from '../ccAuth.ts';

export const CcForm = ({
	toggleLoginState
}: {
	toggleLoginState: (value: boolean) => void;
}) => {
	const [userId, setUserId] = useState<string>();
	const [userName, setUserName] = useState<string>();

	const generateNewUid = () => {
		setUserId(uuid());
	};

	const onSubmit = async () => {
		if (userName && userId) {
			const startResult = await startChat({
				uid: userId,
				name: userName
			});

			toggleLoginState(startResult);
		}
	};

	return (
		<div className={style.form}>
			<label
				htmlFor='userId'
				className={style.label}
			>
				<span>User ID</span>
				<input
					key={userId}
					onChange={e => setUserId(e.target.value)}
					defaultValue={userId}
					type='text'
					name='userId'
					id='userId'
					placeholder='User ID'
				/>
				<button onClick={generateNewUid}>Generate user ID</button>
			</label>
			<label
				htmlFor='userName'
				className={style.label}
			>
				<span>User name (required)</span>
				<input
					onChange={e => setUserName(e.target.value)}
					defaultValue={userName}
					type='text'
					name='userName'
					id='userName'
					placeholder='Enter your name'
				/>
			</label>
			<button
				onClick={onSubmit}
				disabled={!userName}
			>
				Login to the CometChat
			</button>
		</div>
	);
};
