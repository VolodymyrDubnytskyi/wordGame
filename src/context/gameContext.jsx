import React, { useCallback, useContext, useMemo, useState } from 'react';

const GameContext = React.createContext();

export const useGameContext = () => {
	return useContext(GameContext);
};

const GameProvider = ({ children, userName }) => {
	const [gameScore, setGameScore] = useState([]);
	const [isAnswersView, setIsAnswersView] = useState(false);
	const [selectedWords, setSelectedWords] = useState([]);
	const [gameData, setGameData] = useState(null);

	const changeGameScore = useCallback(
		(newScore) => {
			setGameScore(newScore);
		},
		[setGameScore],
	);

	const changeIsAnswersView = useCallback(() => {
		setIsAnswersView(true);
	}, [setIsAnswersView]);

	const playAgain = useCallback((callback)=>{
		setSelectedWords([])
		setIsAnswersView(false)
		setGameScore([])
		callback();
	},[])

	const value = useMemo(() => {
		return {
			userName,
			gameScore,
			changeGameScore,
			isAnswersView,
			changeIsAnswersView,
			selectedWords,
			setSelectedWords,
			gameData,
			setGameData,
			playAgain
		};
	}, [userName, gameScore, changeGameScore, gameData, selectedWords]);

	return (
		<GameContext.Provider value={value}>{children}</GameContext.Provider>
	);
};

export default React.memo(GameProvider);
