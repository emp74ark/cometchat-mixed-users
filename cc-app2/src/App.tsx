import './App.css';
import { CcForm } from './CcForm/CcForm.tsx';
import { CcUsers } from './CcUsers/CcUser.tsx';
import { useLayoutEffect, useState } from 'react';
import { initChat } from './ccAuth.ts';

function App() {
	const [loginFinished, setLoginFinished] = useState<boolean>(false);
	const [refreshKey, setRefreshKey] = useState<number>(Math.random());

	useLayoutEffect(() => {
		localStorage.clear();

		initChat();
	}, []);

	const toggleLoginState = (value: boolean) => {
		setLoginFinished(value);
		setRefreshKey(Math.random());
	};

	return (
		<div className='container'>
			<h1>Test App {import.meta.env.VITE_CHAT_APP_ID}</h1>
			<CcForm toggleLoginState={toggleLoginState} />
			<h3>Login finished successfully: {String(loginFinished)}</h3>
			{loginFinished && (
				<>
					<h3>Users:</h3>
					<CcUsers refreshKey={refreshKey} />
				</>
			)}
		</div>
	);
}

export default App;
