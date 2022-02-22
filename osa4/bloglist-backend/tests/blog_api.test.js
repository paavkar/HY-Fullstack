const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there is a correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('id of a blog is id, not _id ', async () => {
    const response = await helper.blogsInDb()
    const ids = response.map(b => b.id)
  
    expect(ids).toBeDefined()
  })

  describe('editing of an existing blog', () => {
    test('a valid blog can be edited', async () => {
      const blogsAtStart = await helper.blogsInDb()
      let blogToEdit = blogsAtStart[1]

      blogToEdit.likes = 99

      await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(blogToEdit)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(b => b.likes)
      expect(likes).toContain(99)

    })
  })
  

  describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Testing blogs with async/await',
        author: 'Paavo Karppinen',
        url: 'github.com/paavkar',
        likes: 9
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
      const titles = blogsAtEnd.map(n => n.title)
      expect(titles).toContain(
        'Testing blogs with async/await'
      )
    })

    test('if no likes is declared, put 0', async () => {
      const newBlog = {
        title: 'Testing with no likes',
        author: 'Paavo Karppinen',
        url: 'github.com/paavkar'
      }
      if (newBlog.likes === undefined) {
        newBlog.likes = 0
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      } else {
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
      }
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
      const contents = blogsAtEnd.map(n => n.title)
      expect(contents).toContain(
        'Testing with no likes'
      )
    })


    test('blog without title and url is not added', async () => {
      const newBlog = {
        author: 'Paavo Karppinen',
        likes: 4
      }
  
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
  
      const blogsAtEnd = await helper.blogsInDb()
  
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with a status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(b => b.titles)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})