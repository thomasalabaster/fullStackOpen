const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	const totalValue = blogs.reduce((accumulator, currentBlog) => {
		return accumulator + currentBlog.likes
	}, 0)

	return totalValue
}

const favoriteBlog = (blogs) => {
    // Check each blog for .likes, if bigger than max, set as maxLikesBlog
    const blogMostLikes = blogs.reduce((maxLikesBlog, currentBlog) => {
        if(currentBlog.likes > maxLikesBlog.likes) {
            return currentBlog
        } else {
			return maxLikesBlog
        }
    })

    // Create new Obj to return
    const newBlog = {
        title: blogMostLikes.title,
        author: blogMostLikes.author,
        likes: blogMostLikes.likes
    }
	return newBlog
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}