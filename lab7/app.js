const express = require('express')
const fs = require('fs')
const HTTPS = require('https')
const HTTP = require('http')
const server = express()
const port = process.env.PORT || 5050
const protocol = process.env.PROTOCOL || 'https'

if (protocol === 'https') {
    let key = './certificates/privateKey.key';
    let certificate = './certificates/certificate.crt';

    const options = {
        key: fs.readFileSync(key),
        cert: fs.readFileSync(certificate)
    }
    HTTPS.createServer(options, server)
} else {
    HTTP.createServer(server)
}

server.use((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'})
    fs.readFile('./index.html', null, function (err, data) {
        if (err) {
            res.writeHead(404)
            res.write('Template file doesn`t found =(')
        } else {
            res.write(data)
        }
        res.end()
    })
})

server.listen(port, () => console.log(`Server has been started on port ${port}!`))





