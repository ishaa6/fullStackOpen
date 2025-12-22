import Blog from "../src/components/Blog";
import BlogPost from "../src/components/BlogForm";
import {render, screen} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import { expect } from 'vitest'
import blogService from '../src/services/blogs'

vi.mock('../src/services/blogs', () => {
  return {
    default : {
        updateData: vi.fn(() => Promise.resolve({})),
        deleteData: vi.fn()
    }
  }
})

test('check data rendered', () => {
    const blog = {
        title: 'Testing',
        author: 'Shreyaa',
        like: 10,
        url: 'sample.com',
        user: { id: '123' }
    }

    const {container} = render(<Blog blog={blog}/>)

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')
    const like = container.querySelector('.like')

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).not.toBeVisible()
    expect(like).not.toBeVisible()
})

test('check data rendered after set to visible', async () => {
    const blog = {
        title: 'Testing',
        author: 'Shreyaa',
        like: 10,
        url: 'sample.com',
        user: { id: '123' }
    }

    const {container} = render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const view = screen.getByText('view')
    await user.click(view)

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')
    const like = container.querySelector('.like')

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).toBeVisible()
    expect(like).toBeVisible()
})

test('click count of like button', async() => {
    const blog = {
        title: 'Testing',
        author: 'Shreyaa',
        like: 10,
        url: 'sample.com',
        user: { id: '123' }
    }

    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const like = screen.getByText('like')

    await user.click(like)
    await user.click(like)

    expect(blogService.updateData).toHaveBeenCalledTimes(2)
})

test('Event handler of form', async() => {
    const createForm = vi.fn()
    const user = userEvent.setup()

    render(<BlogPost handlePost={createForm}/>)

    const inputTitle = screen.getByLabelText('title:')
    const inputAuthor = screen.getByLabelText('author:')
    const inputUrl = screen.getByLabelText('url:')
    const create = screen.getByText('create')

    await user.type(inputTitle, 'test blog')
    await user.type(inputAuthor, 'Shreyaa')
    await user.type(inputUrl, 'example.com')
    await user.click(create)

    expect(createForm.mock.calls).toHaveLength(1)
})