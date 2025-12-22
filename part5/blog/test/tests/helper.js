const login = async(page, username, password) => {
        await page.getByLabel('username').fill(username)
        await page.getByLabel('password').fill(password)
        await page.getByRole('button', {name: 'login'}).click()

        if(username === 'test' && password === '123') {
            await page.getByText('Welcome Shreyaa').waitFor()
        }
}

const getToken = async(page, request) => {
        const loginResponse = await page.request.post('http://localhost:3003/api/login', {
            data: { username: 'test', password: '123' }
        })
        const body = await loginResponse.json()
        return body.token
}

export {login, getToken}