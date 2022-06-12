import React, { useCallback, useEffect, useState } from 'react';
import './App.scss';
import Auth from './screens/Auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './screens/Game/Game';
import GameProvider from './context/gameContext';
import GameResult from './screens/GameResult/GameResult';

function App() {
	const [isAuth, setIsAuth] = useState(true);
	const [userName, setUserName] = useState('');

	const onUserNameChange = useCallback(
		(newUserName) => {
			setUserName(newUserName);
		},
		[setUserName],
	);

	
	return (
		<div className='App'>
			{isAuth ? (
				<Auth
					setIsAuth={setIsAuth}
					onUserNameChange={onUserNameChange}
				/>
			) : (
				<GameProvider userName={userName}>
					<BrowserRouter>
						<Routes>
							<Route path='/' element={<Game />} />
							<Route
								path='/gameResult'
								element={<GameResult />}
							/>
						</Routes>
					</BrowserRouter>
				</GameProvider>
			)}
		</div>
	);
}

export default React.memo(App);
