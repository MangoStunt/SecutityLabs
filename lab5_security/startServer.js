const server = require('./app');
const port = process.env.PORT || 5050

server.listen(port, () => console.log(`Server has been started on port ${port}!`))
