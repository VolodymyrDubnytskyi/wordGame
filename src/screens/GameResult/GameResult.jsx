import React, { useMemo } from 'react';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import { useGameContext } from '../../context/gameContext';
import { useNavigate } from 'react-router-dom';

const GameResult = () => {
	const {
		gameScore,
		gameData,
		userName,
		selectedWords,
		playAgain,
	} = useGameContext();

	let navigate = useNavigate();

	const countedScore = useMemo(() => {
		if (gameScore <= 0) {
			return 0;
		}
		const correctAnswers = gameScore.length;
		const incorrectAnswers = selectedWords.length - correctAnswers;
		const unmarkedCorrectAnswers = gameData.good_words.length - gameScore.length;
		return correctAnswers * 2 -
			(incorrectAnswers + unmarkedCorrectAnswers) >
			0
			? correctAnswers * 2 - (incorrectAnswers + unmarkedCorrectAnswers)
			: 0;
	}, [gameScore, gameData, selectedWords]);

	const playAgainCallback = () => {
		navigate('/');
	};

	return (
		<div className='game-result'>
			<div className='game-result__content-box'>
				<h2 className='game-result__heading'>
					Congratulations, {userName}!
				</h2>
				<h3 className='game-result__heading'>Your score:</h3>
				<p className='game-result__score'> {countedScore} points</p>
				<CustomBtn
					title='Play again'
					onBtnClick={() => playAgain(playAgainCallback)}
				/>
			</div>
		</div>
	);
};

export default React.memo(GameResult);
