export const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const arrMatchingValues = (arr, arr2) => {
	var ret = [];
	arr.sort();
	arr2.sort();
	for (var i = 0; i < arr.length; i += 1) {
		if (arr2.indexOf(arr[i]) > -1) {
			ret.push(arr[i]);
		}
	}
	return ret;
};
