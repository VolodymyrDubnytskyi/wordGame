import React, { useCallback, useEffect, useState } from 'react';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import ListItem from '../../components/ListItem/ListItem';
import { useGameContext } from '../../context/gameContext';
import {
	arrMatchingValues,
	randomIntFromInterval,
} from '../../utils/globalUtils';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game = () => {
	const {
		gameData,
		setGameData,
		gameScore,
		changeGameScore,
		isAnswersView,
		changeIsAnswersView,
		selectedWords,
		setSelectedWords,
	} = useGameContext();
	let navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	const fetchGameData = () => {
		setIsLoading(true);
		fetch('./api/words-api.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setGameData(data[randomIntFromInterval(0, 2)]);
			})
			.catch((_) => {
				toast.error('Ups, something went wron, try again!');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const onWordClick = useCallback(
		(newWord) => {
			if (selectedWords.includes(newWord)) {
				setSelectedWords((prev) => {
					return prev.filter((word) => word !== newWord);
				});
				return;
			}
			setSelectedWords((prev) => {
				return [...prev, newWord];
			});
		},
		[selectedWords],
	);

	const endGame = useCallback(() => {
		if (isAnswersView) {
			navigate('/gameResult');
			return;
		}
		const result = arrMatchingValues(gameData.good_words, selectedWords);
		changeGameScore(result);
		changeIsAnswersView();
	}, [selectedWords, gameData, isAnswersView]);

	useEffect(() => {
		fetchGameData();
	}, []);

	return (
		<div className='game'>
			{gameData && (
				<>
					<h2 className='game__heading'>{gameData.question}</h2>
					<div className='game__board'>
						<ul
							className={`game__words ${
								isAnswersView ? 'game__words--inactive' : ''
							}`}
						>
							{gameData.all_words.map((word) => (
								<ListItem
									key={word}
									word={word}
									active={selectedWords.includes(word)}
									status={
										isAnswersView
											? gameScore.includes(word)
												? 'Good'
												: 'Bad'
											: false
									}
									onWordClick={onWordClick}
								/>
							))}
						</ul>
					</div>
					<CustomBtn
						title={isAnswersView ? 'Finish game' : 'Check answers'}
						onBtnClick={endGame}
					/>
				</>
			)}
			{isLoading && (
				<div className='loading-overlay'>
					<Loader />
				</div>
			)}
			{!isLoading && !gameData && <p>Brak danych..</p>}
			<ToastContainer />
		</div>
	);
};

export default React.memo(Game);
