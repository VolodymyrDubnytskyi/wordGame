import React, { useMemo } from 'react';

const ListItem = ({ word, active, status, onWordClick, }) => {
	const currentStatus = useMemo(() => {
		return active && status
			? status === 'Bad'
				? 'word-status--err'
				: 'word-status--success'
			: '';
	}, [status, active]);

	return (
		<li
			className={`game__word ${
				active ? 'game__word--active' : ''
			} ${currentStatus} `}
			onClick={() => onWordClick(word)}
		>
			{status && active && <span className='status'>{status}</span>}
			<span className='word'>{word}</span>
		</li>
	);
};

export default React.memo(ListItem);
