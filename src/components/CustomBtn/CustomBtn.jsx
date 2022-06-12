import React from 'react';

const CustomBtn = ({ title, onBtnClick }) => {
	return (
		<button className='custom__btn' onClick={onBtnClick}>
			{title}
		</button>
	);
};

export default React.memo(CustomBtn);
