import React, { useState, useCallback } from 'react';
import CustomBtn from '../../components/CustomBtn/CustomBtn';
import CustomInput from '../../components/CustomInput/CustomInput';

const Auth = ({ setIsAuth, onUserNameChange}) => {
	const [userName, setUserName] = useState('');
	const [err, setErr] = useState('');

	const logIn = useCallback(() => {
		if (!userName) {
			setErr('Pole nie może pozostać puste!');
			return;
		}
		onUserNameChange(userName);
		setUserName('');
		setIsAuth(false);
	}, [userName]);

	const onInputChange = useCallback(
		(e) => {
			const value = e.target.value;
			if (value) {
				setErr('');
			}
			setUserName(value);
		},
		[setUserName],
	);

	return (
		<div className='auth'>
			<div className='auth__container'>
				<h1 className='auth__heading'>Wordcloud game</h1>
				<CustomInput
					placeholder='Enter your nickname here...'
					onInputChange={onInputChange}
					err={err}
				/>
				<CustomBtn title='Play' onBtnClick={logIn} />
			</div>
		</div>
	);
};

export default React.memo(Auth);
