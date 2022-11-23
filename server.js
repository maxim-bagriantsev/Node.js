const http = require('http')

const fs = require('fs')

const pages = {
    home: '/home',
    about: '/about',
    image: '/image',
    script: '/script'
}

const delay = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const server = http.createServer(async (request, response) => {
    if (request.url !== '/favicon.ico') {
        switch (request.url) {
            case pages.home: {
                try {
                    const data = await readFile('pages/home.html')
                    response.write(data)
                    response.end()
                } catch (err) {
                    response.write('something wrong, 500')
                    response.end()
                }
                break
            }
            case pages.about: {
                await delay(3000)
                response.write('About course')
                response.end()
                break
            }
            case pages.image: {
                try {
                    const data = await readFile('public/image.jpeg')
                    const type = 'image/jpeg'
                    response.write(data)
                    response.writeHead(200, {'Content-Type': type});
                    response.end()
                } catch (err) {

                    response.write('something wrong, 500')
                    response.end()
                }
                break
            }
            case pages.script: {
                try {
                    const data = await readFile('script.html')
                    response.write(data)
                    response.end()
                } catch (err) {
                    response.write('something wrong, 500')
                    response.end()
                }
                break
            }
            default:
                response.write('404 not found')
                response.end()
        }
    }
})

server.listen('3005')