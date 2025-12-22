import { login, getToken } from './helper'
const {test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({page, request}) => {
        await request.post('http://localhost:3003/api/testing/reset')
        
        const token = await getToken(page, request)
        await page.request.post('http://localhost:3003/api/blogs', {
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
            await page.getByLabel('title:').fill('test blog')
            await page.getByLabel('author:').fill('Shreyaa')
            await page.getByLabel('url:').fill('sample.com')
            await page.getByRole('button', {name:'create'}).click()  

            await expect(page.getByText('a new blog test blog by Shreyaa added')).toBeVisible()
        })

        test.only('a blog can be liked', async({page}) => {
            await page.getByRole('button', {name: 'view'}).click()
            const likeDiv = page.locator('.like')

            await expect(likeDiv).toContainText('0')
            await page.getByRole('button', {name:'like'}).click()
            await expect(likeDiv).toContainText('1')
        })
    })
})