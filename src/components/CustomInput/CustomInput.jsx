import React from 'react';

const CustomInput = ({
	type = 'text',
	onInputChange,
	placeholder = '',
	err,
}) => {
	return (
		<div className='custom-input-container'>
			<input
				className='custom-input'
				placeholder={placeholder}
				type={type}
				onChange={onInputChange}
			/>
			{err && <p className='custom-input__error'>{err}</p>}
		</div>
	);
};

export default React.memo(CustomInput);
