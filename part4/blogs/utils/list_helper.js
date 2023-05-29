const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const totalValue = blogs.reduce((accumulator, currentBlog) => {
		return accumulator + currentBlog.likes
	}, 0)

	return totalValue
}

module.exports = {
	dummy,
	totalLikes
}