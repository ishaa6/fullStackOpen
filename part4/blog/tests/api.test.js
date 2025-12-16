require('../utils/mongoose')
const {test, after, beforeEach, describe} = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const { title } = require('node:process')
const api = supertest(app)

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }  
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
})

describe('GET /api/blogs', () => {
    test.only('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(blogs.length, response.body.length)
    })

    test('unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert.ok(blog.id)
            assert.strictEqual(blog._id, undefined)
        })
    })
})

describe('POST /api/blogs', () => {
    test('blog without likes property defaults to 0 likes', async () => {
        const newBlog = {
            title: "Blog without likes",
            author: "No Likes Author",
            url: "http://example.com/no-likes-blog"
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
        
    })

    test('blog without title is not added', async () => {
        const newBlog = {
            author: "No Title Author",
            url: "http://example.com/no-title-blog",
            likes: 3
        }
        const blogsAtStart = await Blog.find({})

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('blog without url is not added', async () => {
        const newBlog = {
            title: "Blog without url",
            author: "No url Author",
            likes: 3
        }
        const blogsAtStart = await Blog.find({})

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await Blog.find({})
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })    

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: "New Blog",
            author: "Test Author",
            url: "http://example.com/new-blog",
            likes: 4
        }
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const currentBlogs = await Blog.find({})
        assert.strictEqual(currentBlogs.length, blogs.length + 1)

        const titles = currentBlogs.map(b => b.title)
        assert.ok(titles.includes('New Blog'))
    })
})


after (async() => {
    await mongoose.connection.close()
})