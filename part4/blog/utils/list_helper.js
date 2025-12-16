const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blogs)=> sum+blogs.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }
    let favorite = blogs[0];
    for (let blog of blogs){
        if (blog.likes > favorite.likes){
            favorite = blog;
        }
    }
    return favorite;
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0){
        return null;
    }
    const authorBlogCount = {};
    for (let blog of blogs){
        if (blog.author in authorBlogCount){
            authorBlogCount[blog.author] += 1;
        } else{
            authorBlogCount[blog.author] = 1;
        }
    }
    let authorWithMostBlogs = blogs[0].author;
    for (let author in authorBlogCount){
        if (authorBlogCount[author] > authorBlogCount[authorWithMostBlogs]){
            authorWithMostBlogs = author;
        }
    }
    return {author: authorWithMostBlogs, blogs: authorBlogCount[authorWithMostBlogs]};
}

const mostLikes = (blogs) => {
    if (blogs.length === 0){
        return null;
    }
    const authorLikeCount = {};
    for (let blog of blogs){
        if (blog.author in authorLikeCount){
            authorLikeCount[blog.author] += blog.likes;
        } else{
            authorLikeCount[blog.author] = blog.likes;
        }
    }
    let authorWithMostLikes = blogs[0].author;
    for (let author in authorLikeCount){
        if (authorLikeCount[author] > authorLikeCount[authorWithMostLikes]){
            authorWithMostLikes = author;
        }
    }
    return {author: authorWithMostLikes, likes: authorLikeCount[authorWithMostLikes]};
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}