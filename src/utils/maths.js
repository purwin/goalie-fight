// Function that calculates percentile of a given number
// Receives a number and an array as arguments
// Returns percentile as number
export const percentile = (num, arr) => {
	// Get array of values < given number
	const position = arr.filter(item => item < num);

	// Calculate percentile
	return (position.length / arr.length) * 100
};