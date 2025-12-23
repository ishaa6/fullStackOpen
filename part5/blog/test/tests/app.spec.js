import { login, getToken, createUser, logout, createBlog, like, view } from './helper'
const {test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await createUser(request, 'test', 'Shreyaa', '123')
        const token = await getToken(request)
        await request.post('http://localhost:3003/api/blogs', {
            data: { title: 'test', author: 'Shreyaa', url: 'sample.com' },
            headers: { 'Authorization': `Bearer ${token}` } 
        })
        await page.goto('http://localhost:5173') 
    })

    test('login form is shown', async ({page}) => {
        await expect(page.getByText('log in to application')).toBeVisible()
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
        await expect(page.getByRole('button', {name:'login'})).toBeVisible()
    })

    describe('Login', () => {
        test('success with correct credentials', async({page}) => {
            await login(page, 'test', '123')
            await expect(page.getByText('Welcome Shreyaa')).toBeVisible()           
        })

        test('fails with wrong credentials', async({page}) => {
            await login(page, 'shreyaa', '123')
            await expect(page.getByText('invalid credentials')).toBeVisible()
        })
    })

    describe('when logged in', () => {
        beforeEach(async({page}) => {
            await login(page, 'test', '123')
        })

        test('a new blog can be created', async({page}) => {
            await page.getByRole('button', {name:'create new blog'}).click()
            await createBlog(page, 'test blog', 'Shreyaa', 'sample.com')
            await expect(page.getByText('a new blog test blog by Shreyaa added')).toBeVisible()
        })

        test('a blog can be liked', async({page}) => {
            await view(page)
            const likeDiv = page.locator('.like')

            await expect(likeDiv).toContainText('0')
            await like(page)
            await expect(likeDiv).toContainText('1')
        })
        
        test('user who created the blog can delete it', async({page}) => {
            await view(page)
            page.on('dialog', async (dialog) => {
                expect(dialog.type()).toBe('confirm')
                await dialog.accept()
            })
            await page.getByRole('button', {name:'remove'}).click()
            await expect(page.getByText('test')).not.toBeVisible()
        })
    })

    test('only user creating blog can delete the blog', async({request, page}) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await createUser(request, 'user1', 'one', '123')
        await createUser(request, 'user2', 'two', '123')
        await page.reload()

        await login(page, 'user1', '123')
        await page.getByRole('button', {name:'create new blog'}).click()
        await createBlog(page, 'blog1', 'One', 'sample.com')
        await view(page)
        await expect(page.getByRole('button', {name: 'remove'})).toBeVisible()

        await logout(page)

        await login(page, 'user2', '123')
        await expect(page.getByText('blog1')).not.toBeVisible()
    })

    test('blog posts are sorted by number of likes', async({request, page}) => {
        await login(page, 'test', '123')         

        await page.getByRole('button', {name:'create new blog'}).click()

        await createBlog(page, 'like1', 'Shreyaa', 'sample.com')
        const blog1 = await page.locator('.blog', { hasText: 'like1' })
        await view(blog1)
        await like(blog1)
        await expect(blog1.locator('.like')).toContainText('1')

        await createBlog(page, 'like2', 'Shreyaa', 'sample.com')
        const blog2 = page.locator('.blog', {hasText: 'like2'})
        await view(blog2)
        await like(blog2)
        await expect(blog2.locator('.like')).toContainText('1')
        await like(blog2)
        await expect(blog2.locator('.like')).toContainText('2')

        await createBlog(page, 'like3', 'Shreyaa', 'sample.com')
        const blog3 = page.locator('.blog', {hasText: 'like3'})
        await view(blog3)
        await like(blog3)
        await expect(blog3.locator('.like')).toContainText('1')
        await like(blog3)
        await expect(blog3.locator('.like')).toContainText('2')
        await like(blog3)
        await expect(blog3.locator('.like')).toContainText('3')

        const blogs = page.locator('.blog')

        expect(blogs.nth(0)).toContainText('like3')
        expect(blogs.nth(1)).toContainText('like2')
        expect(blogs.nth(2)).toContainText('like1')
    })
})