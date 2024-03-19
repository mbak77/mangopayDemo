import {test, expect} from '@playwright/test';

test('API Get', async ({request}) => {
    const response = await request.get('https://reqres.in/api/users/2')
    expect(response.status()).toBe(200)

    const text = await response.text();
    await console.log(text)
})

test('API Post', async ({request}) => {
    const response = await request.post('https://reqres.in/api/users', {
        data: {
            "name": "Mike",
            "job": "CEO"
        }
    })
    expect(response.status()).toBe(201)

    const text = await response.text();
    expect(text).toContain('Mike')
    await console.log(text)
})

test('API Put', async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/273', {
        data: {
            "name": "Mike",
            "job": "bla bla"
        }
    })
    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain('Mike')
    await console.log(text)
})

test('API Patch', async ({request}) => {
    const response = await request.patch('https://reqres.in/api/users/273', {
        data: {
            "name": "Mike",
            "job": "bla bla"
        }
    })
    expect(response.status()).toBe(200)

    const text = await response.text();
    expect(text).toContain('Mike')
    await console.log(text)
})

test.only('API Delete', async ({request}) => {
    const response = await request.delete('https://reqres.in/api/users/273')
    expect(response.status()).toBe(204)
    const text = await response.text();
    await console.log(text)
})