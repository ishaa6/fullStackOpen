const login = async(page, username, password) => {
        await page.getByLabel('username').fill(username)
        await page.getByLabel('password').fill(password)
        await page.getByRole('button', {name: 'login'}).click()

        if(username === 'test' && password === '123') {
            await page.getByText('Welcome Shreyaa').waitFor()
        }
}

const getToken = async(request) => {
        const loginResponse = await request.post('http://localhost:3003/api/login', {
            data: { username: 'test', password: '123' }
        })
        const body = await loginResponse.json()
        return body.token
}

const createUser = async(request, username, name, password) => {
    await request.post('http://localhost:3003/api/users', {
        data: {username, name, password}
    })
} 

const logout = async(page) => {
    await page.getByRole('button', {name:'logout'}).click()
}

const createBlog = async(page, title, author, url) => {
    await page.getByLabel('title:').fill(title)
    await page.getByLabel('author:').fill(author)
    await page.getByLabel('url:').fill(url)
    await page.getByRole('button', {name: 'create'}).click()
}

const like = async(page) => {
    await page.getByRole('button', {name: 'like'}).click()
}

const view = async(page) => {
    await page.getByRole('button', {name: 'view'}).click()
}

export {login, getToken, createUser, logout, createBlog, like, view}